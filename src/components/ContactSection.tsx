
import { MapPin, Mail, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Contact Us</h2>
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-700">
            Interested in our products? Get in touch with us for inquiries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-brand-red/10 flex items-center justify-center">
                <MapPin size={28} className="text-brand-red" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-600">Pakistan</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <Mail size={28} className="text-brand-blue" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600 overflow-hidden text-ellipsis">
              superfineindustriesspk@gmail.com
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-brand-yellow/10 flex items-center justify-center">
                <Phone size={28} className="text-brand-yellow" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <a 
              href="https://wa.me/92317408656" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 mt-2"
            >
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
