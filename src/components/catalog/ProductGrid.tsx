
import { Product } from "./ProductCard";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
