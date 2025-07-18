import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-black pt-20"
      id="hero"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
              <img 
                src="/image.png" 
                alt="Shreya's Profile" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold mb-4 text-white">
              <span className="block">Hello, I'm</span>
              <span className="text-white">Shreya</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-300">
              Aspiring Software Developer & AI Enthusiast
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl mb-10 font-display italic text-gray-400">
              "Designing intelligent solutions with empathy and elegance."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <a href="#product-management" className="btn btn-secondary">Product Management</a>
            <a href="#ai-ml" className="btn btn-secondary">AI/ML</a>
            <a href="#full-stack" className="btn btn-secondary">Full Stack</a>
            <a href="#product-design" className="btn btn-secondary">Product Design</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a 
              href="https://drive.google.com/file/d/10ftHzNjr_5E1UZscmR-QgvB_qvgd7_uG/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Resume
            </a>
            <a 
              href="#contact" 
              className="btn btn-outline"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 