
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { HexColorPicker } from "react-colorful";
import { ArrowLeft, Check, Plus, Trash, Upload, X } from "lucide-react";

// Define color type
type ProductColor = {
  name: string;
  value: string;
};

// Form schema
const productSchema = z.object({
  code: z.string().min(1, "Product code is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  image: z.any().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<string | null>(product?.image || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [colors, setColors] = useState<ProductColor[]>(product?.colors || []);
  const [newColor, setNewColor] = useState<ProductColor>({ name: "", value: "#3498DB" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      code: product?.code || "",
      name: product?.name || "",
      description: product?.description || "",
      category: product?.category || "",
      image: undefined,
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    
    try {
      let finalImageUrl = imageUrl;

      // Handle image upload if there's a new image
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('product-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        finalImageUrl = publicUrl;
      }

      const productData = {
        code: values.code,
        name: values.name,
        description: values.description || "",
        category: values.category,
        image: finalImageUrl,
        colors: colors,
      };

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;

        toast({
          title: "Product updated",
          description: "The product has been successfully updated",
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;

        toast({
          title: "Product created",
          description: "The product has been successfully created",
        });
      }

      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        variant: "destructive",
        title: "Error saving product",
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setImageFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addColor = () => {
    if (newColor.name.trim() === "") {
      toast({
        variant: "destructive",
        title: "Invalid color",
        description: "Please provide a color name",
      });
      return;
    }
    
    setColors([...colors, { ...newColor }]);
    setNewColor({ name: "", value: "#3498DB" });
    setShowColorPicker(false);
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-4">
        <Button
          variant="ghost"
          size="sm"
          className="mb-2 w-fit -ml-2"
          onClick={onClose}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Products
        </Button>
        <CardTitle className="text-xl font-semibold">
          {product ? "Edit Product" : "Add New Product"}
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Code*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. CH-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Modern Ergonomic Chair" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description..."
                      className="resize-none min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="chairs">Chairs</SelectItem>
                      <SelectItem value="tables">Tables</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="w-full"
                            onChange={(e) => {
                              handleImageChange(e);
                              onChange(e.target.files);
                            }}
                            {...fieldProps}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </div>
                    
                    <div className="aspect-video flex items-center justify-center border rounded-md bg-gray-50 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Product preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-400 flex flex-col items-center">
                          <Upload className="h-8 w-8 mb-2" />
                          <span>No image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <div>
              <h3 className="text-sm font-medium mb-2">Available Colors</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {colors.map((color, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                  >
                    <div 
                      className="h-4 w-4 rounded-full border" 
                      style={{ 
                        backgroundColor: color.value, 
                        borderColor: color.value === '#FFFFFF' ? '#e2e8f0' : color.value 
                      }}
                    />
                    <span className="text-xs">{color.name}</span>
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5" 
                      onClick={() => removeColor(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Color name"
                    value={newColor.name}
                    onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                    className="w-full max-w-xs"
                  />
                  <div 
                    className="h-8 w-8 rounded cursor-pointer border"
                    style={{ backgroundColor: newColor.value }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addColor}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add
                  </Button>
                </div>

                {showColorPicker && (
                  <div className="relative z-10">
                    <div className="absolute mt-1 p-2 bg-white rounded shadow-md border">
                      <HexColorPicker 
                        color={newColor.value} 
                        onChange={(color) => setNewColor({ ...newColor, value: color })} 
                      />
                      <div className="flex justify-end mt-2">
                        <Button 
                          type="button" 
                          size="sm" 
                          variant="outline"
                          onClick={() => setShowColorPicker(false)}
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Select
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : product ? "Update Product" : "Create Product"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ProductForm;
