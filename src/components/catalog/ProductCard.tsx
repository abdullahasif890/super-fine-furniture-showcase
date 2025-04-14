
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

// Define the product color type
export type ProductColor = {
  name: string;
  value: string;
};

// Define the product type
export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  category: string;
  colors: ProductColor[];
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <CardDescription className="mt-1">Product Code: {product.code}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <a href="#" title="View Details">
              <Info className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="mt-auto">
          <h4 className="text-sm font-medium mb-2">Available Colors:</h4>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <div 
                key={color.name} 
                className="flex items-center gap-1"
              >
                <div 
                  className="h-4 w-4 rounded-full border" 
                  style={{ backgroundColor: color.value, borderColor: color.value === '#FFFFFF' ? '#e2e8f0' : color.value }}
                />
                <span className="text-xs">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
