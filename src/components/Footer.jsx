const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-8 text-center">
      <span className="text-xl font-display font-medium text-white">Shreya</span>
      <div className="text-center md:text-right text-sm text-gray-400">
        <p className="mt-1"></p>
      </div>
    </footer>
  );
};

export default Footer; 