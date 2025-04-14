
import { Product } from "./ProductCard";

// Sample product data - this would typically come from an API or data source
export const sampleProducts: Product[] = [
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
