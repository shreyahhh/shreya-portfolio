const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 text-[#ededed] py-8 text-center">
      <span className="text-xl font-semibold text-[#ededed]">Shreya</span>
      <div className="text-center md:text-right text-sm text-[#a1a1a1]">
        <p className="mt-1"></p>
      </div>
    </footer>
  );
};

export default Footer; 