
import { ArrowRight } from "lucide-react";

const ProductsSection = () => {
  const products = [
    {
      id: "chairs",
      title: "Stylish Chairs",
      description: "Our ergonomically designed chairs combine comfort with durability. Available in various colors and designs to suit different spaces and preferences.",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      features: ["Ergonomic design", "UV resistant", "Stackable options", "Weather-proof"]
    },
    {
      id: "tables",
      title: "Modern Tables",
      description: "From dining tables to side tables, our collection offers functional and stylish options for homes, offices, and outdoor spaces.",
      image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      features: ["Sturdy construction", "Easy to clean", "Multiple sizes", "Contemporary design"]
    }
  ];

  return (
    <section id="products" className="section bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Our Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold mb-3">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <ul className="mt-auto mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 mb-2">
                      <ArrowRight size={16} className="text-brand-blue mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
