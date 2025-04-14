
import { Award, ThumbsUp, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">About Us</h2>
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            We are a leading manufacturer of high-quality plastic furniture, dedicated to providing durable and elegantly designed products. With years of expertise in the industry, we pride ourselves on our commitment to innovation and customer satisfaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <Award size={32} className="text-brand-blue" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
            <p className="text-gray-600">
              Our furniture is crafted with premium materials ensuring durability and longevity.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center">
                <ThumbsUp size={32} className="text-brand-red" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Customer Satisfaction</h3>
            <p className="text-gray-600">
              We prioritize our customers' needs through responsive service and reliable products.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-brand-yellow/10 flex items-center justify-center">
                <Users size={32} className="text-brand-yellow" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Global Presence</h3>
            <p className="text-gray-600">
              Our exports reach customers across UAE, UK, Saudi Arabia, and many more countries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
