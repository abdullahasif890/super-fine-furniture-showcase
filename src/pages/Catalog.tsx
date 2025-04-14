
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductFilter from "@/components/catalog/ProductFilter";
import ProductGrid from "@/components/catalog/ProductGrid";
import { sampleProducts } from "@/components/catalog/ProductData";

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("newest");

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "all"
    ? sampleProducts
    : sampleProducts.filter(product => product.category === selectedCategory);

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
          
          <ProductFilter 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

          <ProductGrid products={sortedProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
