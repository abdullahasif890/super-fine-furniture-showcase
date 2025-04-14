
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronDown, Filter, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the product color type
type ProductColor = {
  name: string;
  value: string;
};

// Define the product type
type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  category: string;
  colors: ProductColor[];
};

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("newest");

  // Sample product data - this would typically come from an API or data source
  const products: Product[] = [
    {
      id: "chair-001",
      code: "CH-001",
      name: "Modern Ergonomic Chair",
      description: "A sleek, ergonomic chair designed for maximum comfort and durability.",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "chairs",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
        { name: "Blue", value: "#3498DB" },
      ],
    },
    {
      id: "chair-002",
      code: "CH-002",
      name: "Classic Dining Chair",
      description: "A timeless design that fits perfectly with any dining table.",
      image: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "chairs",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
        { name: "Red", value: "#E74C3C" },
      ],
    },
    {
      id: "table-001",
      code: "TB-001",
      name: "Modern Dining Table",
      description: "A stylish dining table perfect for family gatherings and entertaining guests.",
      image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "tables",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
      ],
    },
    {
      id: "table-002",
      code: "TB-002",
      name: "Coffee Table",
      description: "A modern coffee table with clean lines and practical storage solutions.",
      image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "tables",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Brown", value: "#8B4513" },
      ],
    },
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    // Default: newest (assuming id order represents chronology)
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Product Catalog</h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <Tabs 
              defaultValue="all" 
              className="w-full md:w-auto"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="chairs">Chairs</TabsTrigger>
                <TabsTrigger value="tables">Tables</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto w-full md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Sort
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                  <DropdownMenuRadioItem value="newest">
                    Newest
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name-asc">
                    Name (A-Z)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name-desc">
                    Name (Z-A)
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
            ))}
          </div>
          
          {sortedProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
