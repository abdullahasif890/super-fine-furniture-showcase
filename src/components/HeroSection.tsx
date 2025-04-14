
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              <span className="block">Stylish</span>
              <span className="text-brand-blue">Plastic Furniture</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-lg">
              Modern designs built with quality and comfort
            </p>
            
            <div className="pt-4">
              <button 
                onClick={scrollToAbout}
                className="px-8 py-3 bg-brand-red text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <span>Discover Our Products</span>
                <ArrowDown size={18} />
              </button>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="Modern Plastic Chair" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300 hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="Comfortable Plastic Chair" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1565330502541-4937be8552e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="Modern Plastic Table" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300 hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="Stylish Plastic Furniture" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <button
          onClick={scrollToAbout}
          className="p-2 rounded-full bg-white shadow-md"
          aria-label="Scroll down"
        >
          <ArrowDown size={24} className="text-brand-blue" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
