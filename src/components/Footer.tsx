
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img 
              src="/placeholder.svg" 
              alt="Super Fine Industries Logo" 
              className="h-10 mb-2"
            />
            <p className="text-gray-400 text-sm">
              Premium plastic furniture manufacturer
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p>&copy; {currentYear} Super Fine Industries. All rights reserved.</p>
            <p className="text-gray-400 mt-1 text-sm">
              Made in Pakistan for the world
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
