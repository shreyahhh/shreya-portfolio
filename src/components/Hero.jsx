import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TypewriterIntro = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.5 });
  const phrases = [
    "Hi, I'm Shreya",
    "Full-Stack Developer",
    "Building digital experiences",
    "Let's create something amazing"
  ];
  const getTypingSpeed = () => Math.max(40, 80 + Math.random() * 40 - 20);
  const getBackspaceSpeed = () => Math.max(25, 50 + Math.random() * 20 - 10);
  useEffect(() => {
    if (isInView) {
      setCurrentText('');
      setCurrentIndex(0);
      setIsTyping(true);
      setCurrentPhraseIndex(0);
    }
  }, [isInView]);
  useEffect(() => {
    if (!isInView) return;
    const currentPhrase = phrases[currentPhraseIndex];
    const timer = setTimeout(() => {
      if (isTyping) {
        if (currentIndex < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        } else {
          if (currentPhraseIndex < phrases.length - 1) {
            setTimeout(() => setIsTyping(false), 1500);
          }
        }
      } else {
        if (currentIndex > 0) {
          setCurrentText(currentPhrase.slice(0, currentIndex - 1));
          setCurrentIndex(prev => prev - 1);
        } else {
          setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
          setIsTyping(true);
        }
      }
    }, isTyping ? getTypingSpeed() : getBackspaceSpeed());
    return () => clearTimeout(timer);
  }, [currentIndex, isTyping, currentPhraseIndex, isInView]);
  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(cursorTimer);
  }, []);
  return (
    <div ref={ref} className="relative mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold mb-4 text-white"
      >
        <span aria-live="polite" aria-label={`Introduction: ${currentText}`} className="text-white">
          {currentText}
        </span>
        <motion.span
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className="text-white ml-2"
          aria-hidden="true"
        >
          |
        </motion.span>
      </motion.div>
      {/* Remove the slide dots */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.6 : 0 }}
        transition={{ delay: 2 }}
        className="flex justify-center space-x-2 mt-12"
      >
        {phrases.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-6 rounded-full transition-all duration-500 ${
              index === currentPhraseIndex
                ? 'bg-white'
                : index < currentPhraseIndex
                ? 'bg-gray-600'
                : 'bg-gray-800'
            }`}
          />
        ))}
      </motion.div> */}
      {/* Remove the call to action button */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isInView && currentPhraseIndex === phrases.length - 1 ? 1 : 0,
          y: isInView && currentPhraseIndex === phrases.length - 1 ? 0 : 20
        }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-16"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300 text-lg"
        >
          View My Work
        </motion.button>
      </motion.div> */}
    </div>
  );
};

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
            <TypewriterIntro />
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

          {/* Removed top buttons for Product Management, AI/ML, Full Stack, Product Design */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a 
              href="https://drive.google.com/file/d/1FTu7q8XIFaV_2CfZccgg6Xww4HEVNU4s/view?usp=sharing" 
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