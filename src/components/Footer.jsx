const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-gray-900 text-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-display font-medium text-pink">Shreya</span>
          </div>
          
          <div className="text-center md:text-right text-sm text-gray-400">
            <p>© {currentYear} Shreya. All rights reserved.</p>
            <p className="mt-1"></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 