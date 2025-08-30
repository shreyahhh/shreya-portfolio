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
    <section className="min-h-screen flex items-center justify-center bg-black pt-20" id="hero">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col justify-center md:items-start items-center text-left">
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-4 text-white leading-tight">
            Building Smart<br />
            &nbsp;<span className="text-green-400">Scalable</span><br />
            Web Solutions
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl">
            A web developer who's passionate about performance, security,<br />
            And great user experience. From concept to clean code
          </p>
          <div className="flex gap-4 mt-2">
            <a 
              href="https://drive.google.com/file/d/1FTu7q8XIFaV_2CfZccgg6Xww4HEVNU4s/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow hover:bg-gray-200 transition-all text-base border border-gray-300"
            >
              Resume
            </a>
            <a 
              href="https://calendly.com/shreyyaaa369" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-green-400 text-green-300 font-semibold bg-black hover:bg-green-900 hover:text-yellow-300 transition-all shadow text-base"
            >
              Schedule a Meeting
            </a>
            <a 
              href="https://github.com/shreyahhh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
              style={{ width: '48px', height: '48px' }}
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10 text-white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.911 1.234 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576 4.765-1.584 8.199-6.081 8.199-11.384 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center md:justify-end items-center">
          <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-green-900 bg-green-900 bg-opacity-30 flex items-center justify-center">
            <img 
              src="/image.png" 
              alt="Profile" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;