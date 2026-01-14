import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Developer Workspace Illustration (Cursor UI Style)
const DeveloperWorkspace = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {/* Top left workspace illustration - in background */}
      <motion.div
        className="absolute top-0 left-[-40px] z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="w-[480px] h-[340px] bg-gradient-to-br from-indigo-500/35 to-purple-500/35 rounded-lg border border-indigo-500/50 p-6 backdrop-blur-sm shadow-lg overflow-hidden">
          {/* Cursor UI style window */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500/80"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-500/80"></div>
              <div className="w-4 h-4 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 h-5 bg-white/15 rounded px-3 flex items-center">
              <div className="w-2.5 h-2.5 rounded bg-indigo-400/60"></div>
              <div className="ml-3 h-2 w-32 bg-white/15 rounded"></div>
            </div>
          </div>
          {/* Code lines */}
          <div className="space-y-2.5">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 text-right text-xs text-indigo-400/60">{i + 1}</div>
                <div className="flex-1">
                  {i === 0 && <div className="h-2.5 w-full bg-indigo-400/30 rounded mb-1"></div>}
                  {i === 1 && (
                    <>
                      <div className="h-2.5 w-4/5 bg-white/18 rounded mb-1"></div>
                      <div className="h-2.5 w-3/5 bg-indigo-400/25 rounded"></div>
                    </>
                  )}
                  {i === 3 && (
                    <>
                      <div className="h-2.5 w-5/6 bg-white/20 rounded mb-1"></div>
                      <div className="h-2.5 w-4/6 bg-indigo-400/28 rounded"></div>
                    </>
                  )}
                  {![0, 1, 3].includes(i) && (
                    <div className={`h-2.5 rounded bg-white/${16 + (i % 4) * 2}`} style={{ width: `${85 - (i % 3) * 10}%` }}></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom right workspace illustration - larger with more designs, in foreground */}
      <motion.div
        className="absolute bottom-[-40px] right-[-120px] z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <div className="w-[520px] h-[360px] bg-gradient-to-br from-purple-500/32 to-indigo-500/32 rounded-lg border border-white/20 p-5 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-5 bg-white/15 rounded px-3 flex items-center">
              <div className="w-2.5 h-2.5 rounded bg-purple-400/55"></div>
              <div className="ml-3 h-2 w-36 bg-white/15 rounded"></div>
            </div>
          </div>
          {/* Terminal/code view with more lines */}
          <div className="space-y-2.5 mb-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-9 text-right text-xs text-purple-400/55">{i + 1}</div>
                <div className="flex-1">
                  {i === 0 && (
                    <>
                      <div className="h-2.5 w-full bg-purple-400/30 rounded mb-1"></div>
                      <div className="h-2.5 w-5/6 bg-white/15 rounded"></div>
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <div className="h-2.5 w-4/5 bg-indigo-400/28 rounded mb-1"></div>
                      <div className="h-2.5 w-3/5 bg-white/18 rounded mb-1"></div>
                      <div className="h-2.5 w-4/5 bg-purple-400/25 rounded"></div>
                    </>
                  )}
                  {i === 5 && (
                    <>
                      <div className="h-2.5 w-5/6 bg-white/20 rounded mb-1"></div>
                      <div className="h-2.5 w-4/6 bg-indigo-400/30 rounded"></div>
                    </>
                  )}
                  {i === 8 && (
                    <>
                      <div className="h-2.5 w-full bg-purple-400/28 rounded mb-1"></div>
                      <div className="h-2.5 w-3/4 bg-white/16 rounded"></div>
                    </>
                  )}
                  {![0, 2, 5, 8].includes(i) && (
                    <div className={`h-2.5 rounded bg-white/${15 + (i % 5) * 2}`} style={{ width: `${90 - (i % 4) * 8}%` }}></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Bottom panel with additional design elements */}
          <div className="mt-3 space-y-2">
            <div className="h-10 bg-white/8 rounded flex items-center px-3 gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400/40"></div>
              <div className="h-1.5 w-28 bg-white/10 rounded"></div>
              <div className="ml-auto flex gap-2">
                <div className="h-1.5 w-12 bg-purple-400/25 rounded"></div>
                <div className="h-1.5 w-8 bg-indigo-400/25 rounded"></div>
              </div>
            </div>
            {/* Sidebar design element */}
            <div className="absolute right-2 top-16 bottom-3 w-12 bg-white/5 rounded border border-white/10 flex flex-col items-center pt-3 gap-2">
              <div className="w-6 h-6 rounded bg-purple-400/20 border border-purple-400/30"></div>
              <div className="w-6 h-6 rounded bg-indigo-400/20 border border-indigo-400/30"></div>
              <div className="w-6 h-6 rounded bg-white/10 border border-white/20"></div>
              <div className="mt-auto w-4 h-4 rounded-full bg-green-400/30 border border-green-400/40"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// GitHub Contribution Graph with "HELLO!" animation
const GitHubContributionGraph = ({ opacity = 1, zIndex = 1, position = {}, delay = 0 }) => {
  const gridCols = 27; // ~6 months (6 months * ~4.5 weeks)
  const gridRows = 7; // days of week
  const [showHello, setShowHello] = useState(false);
  const [gridState, setGridState] = useState([]);
  const [greenCellPositions, setGreenCellPositions] = useState([]);
  
  // "hello" pixel pattern (7 rows, 27 columns)
  // h(4) e(4) l(4) l(4) o(4) + spaces = 27 columns
  const helloPattern = [
    //    h      e      l      l      o
    [1,0,0,1, 0, 1,1,1,1, 0, 1,0,0,0, 0, 1,0,0,0, 0, 0,1,1,0, 0, 0,0], // row 0
    [1,0,0,1, 0, 1,0,0,0, 0, 1,0,0,0, 0, 1,0,0,0, 0, 1,0,0,1, 0, 0,0], // row 1
    [1,1,1,1, 0, 1,1,1,0, 0, 1,0,0,0, 0, 1,0,0,0, 0, 1,0,0,1, 0, 0,0], // row 2
    [1,0,0,1, 0, 1,0,0,0, 0, 1,0,0,0, 0, 1,0,0,0, 0, 1,0,0,1, 0, 0,0], // row 3
    [1,0,0,1, 0, 1,1,1,0, 0, 1,0,0,0, 0, 1,0,0,0, 0, 1,0,0,1, 0, 0,0], // row 4
    [1,0,0,1, 0, 1,0,0,0, 0, 1,0,0,0, 0, 1,0,0,0, 0, 1,0,0,1, 0, 0,0], // row 5
    [1,0,0,1, 0, 1,1,1,1, 0, 1,1,1,1, 0, 1,1,1,1, 0, 0,1,1,0, 0, 0,0], // row 6
  ];
  
  // Count total green cells needed
  const totalGreenCells = helloPattern.reduce((sum, row) => 
    sum + row.reduce((rowSum, cell) => rowSum + (cell === 1 ? 1 : 0), 0), 0
  );
  
  // Get all target positions for "hello" pattern
  const getHelloPositions = () => {
    const positions = [];
    helloPattern.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell === 1) {
          positions.push({ row: rowIdx, col: colIdx });
        }
      });
    });
    return positions;
  };
  
  // Generate contribution levels - more green squares
  const getContributionLevel = (row, col, useHello = false) => {
    // Check if we should show "HELLO!" pattern
    if (useHello && helloPattern[row] && helloPattern[row][col] === 1) {
      return 4; // Bright green for "HELLO!"
    }
    
    // More green squares overall
    const seed = (row * gridCols + col) * 17;
    const random = (Math.sin(seed) * 10000) % 1;
    // Increased green probability
    const recentBoost = col > gridCols * 0.5 ? 0.4 : 0.2;
    if (random < 0.3 + recentBoost) return 0; // No contribution
    if (random < 0.45 + recentBoost) return 1; // Level 1
    if (random < 0.65 + recentBoost) return 2; // Level 2
    if (random < 0.8 + recentBoost) return 3; // Level 3
    return 4; // Level 4 (more green)
  };
  
  // Initialize grid state with exactly the right number of green cells
  useEffect(() => {
    const helloPositions = getHelloPositions();
    
    // Generate random starting positions for green cells
    const allPositions = [];
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        allPositions.push({ row, col });
      }
    }
    
    // Shuffle and take exactly totalGreenCells positions
    const shuffled = [...allPositions].sort(() => Math.random() - 0.5);
    const initialGreenPositions = shuffled.slice(0, totalGreenCells).map(pos => ({
      ...pos,
      targetRow: pos.row,
      targetCol: pos.col,
    }));
    
    setGreenCellPositions(initialGreenPositions);
    
    const initialGrid = Array.from({ length: gridRows }).map((_, row) =>
      Array.from({ length: gridCols }).map((_, col) => {
        const isGreen = initialGreenPositions.some(p => p.row === row && p.col === col);
        return {
          row,
          col,
          level: isGreen ? 4 : 0,
          targetLevel: isGreen ? 4 : 0,
        };
      })
    );
    setGridState(initialGrid);
  }, []);
  
  // Smooth animation sequence - move green cells to form "hello"
  useEffect(() => {
    if (greenCellPositions.length === 0) return;
    
    const helloPositions = getHelloPositions();
    
    const animateToHello = () => {
      setShowHello(true);
      
      // Assign each green cell to a target position in the "hello" pattern
      const newPositions = greenCellPositions.map((pos, idx) => ({
        ...pos,
        targetRow: helloPositions[idx].row,
        targetCol: helloPositions[idx].col,
      }));
      
      setGreenCellPositions(newPositions);
      
      // Update grid state
      setGridState(prev => {
        const newGrid = Array.from({ length: gridRows }).map((_, row) =>
          Array.from({ length: gridCols }).map((_, col) => ({
            row,
            col,
            level: 0,
            targetLevel: 0,
          }))
        );
        
        newPositions.forEach(pos => {
          newGrid[pos.targetRow][pos.targetCol] = {
            row: pos.targetRow,
            col: pos.targetCol,
            level: 4,
            targetLevel: 4,
          };
        });
        
        return newGrid;
      });
    };
    
    const animateToNormal = () => {
      setShowHello(false);
      
      // Scatter green cells randomly again
      const allPositions = [];
      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          allPositions.push({ row, col });
        }
      }
      const shuffled = [...allPositions].sort(() => Math.random() - 0.5);
      const randomPositions = shuffled.slice(0, totalGreenCells).map(pos => ({
        ...pos,
        targetRow: pos.row,
        targetCol: pos.col,
      }));
      
      setGreenCellPositions(randomPositions);
      
      setGridState(prev => {
        const newGrid = Array.from({ length: gridRows }).map((_, row) =>
          Array.from({ length: gridCols }).map((_, col) => ({
            row,
            col,
            level: 0,
            targetLevel: 0,
          }))
        );
        
        randomPositions.forEach(pos => {
          newGrid[pos.row][pos.col] = {
            row: pos.row,
            col: pos.col,
            level: 4,
            targetLevel: 4,
          };
        });
        
        return newGrid;
      });
    };
    
    // Initial delay
    const timer1 = setTimeout(() => {
      animateToHello();
    }, 2000);
    
    // Return to normal
    const timer2 = setTimeout(() => {
      animateToNormal();
    }, 6000);
    
    // Loop animation
    const interval = setInterval(() => {
      animateToHello();
      setTimeout(() => {
        animateToNormal();
      }, 4000);
    }, 10000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, [greenCellPositions.length]);
  
  const getSquareColor = (level) => {
    switch(level) {
      case 0: return '#161b22'; // No contributions
      case 1: return '#0e4429'; // 1-2 contributions
      case 2: return '#006d32'; // 3-4 contributions
      case 3: return '#26a641'; // 5-6 contributions
      case 4: return '#39d353'; // 7+ contributions
      default: return '#161b22';
    }
  };
  
  const getSquareColorClass = (level) => {
    switch(level) {
      case 0: return 'bg-[#161b22]'; // No contributions
      case 1: return 'bg-[#0e4429]'; // 1-2 contributions
      case 2: return 'bg-[#006d32]'; // 3-4 contributions
      case 3: return 'bg-[#26a641]'; // 5-6 contributions
      case 4: return 'bg-[#39d353]'; // 7+ contributions
      default: return 'bg-[#161b22]';
    }
  };
  
  const containerClass = position.top && position.right 
    ? `absolute ${position.top} ${position.right} w-80`
    : 'w-full relative';
  
  
  return (
    <motion.div 
      className={`${containerClass} bg-transparent relative`}
      style={{ opacity, zIndex }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity, x: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {/* Developer Workspace Background */}
      <DeveloperWorkspace />
      
      {/* Contribution grid */}
      <div className="w-full relative z-20">
        {/* Grid squares - 7 rows × 27 columns (6 months) */}
        <div 
          className="grid w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridCols}, 14px)`,
            gridTemplateRows: `repeat(${gridRows}, 14px)`,
            gap: '3px',
          }}
        >
          {Array.from({ length: gridRows }).map((_, row) =>
            Array.from({ length: gridCols }).map((_, col) => {
              const shouldBeGreen = showHello 
                ? (helloPattern[row] && helloPattern[row][col] === 1)
                : (gridState.length > 0 && gridState[row] && gridState[row][col] && gridState[row][col].level === 4);
              
              const color = shouldBeGreen ? getSquareColor(4) : getSquareColor(0);
              
              return (
                <motion.div
                  key={`${row}-${col}`}
                  className="rounded hover:ring-1 hover:ring-white/20 cursor-pointer"
                  animate={{
                    scale: shouldBeGreen && showHello ? [1, 1.2, 1] : 1,
                    backgroundColor: color,
                  }}
                  transition={{
                    scale: {
                      duration: 0.5,
                      delay: shouldBeGreen && showHello ? (row * gridCols + col) * 0.003 : 0,
                      repeat: shouldBeGreen && showHello ? Infinity : 0,
                      repeatDelay: 1.5,
                    },
                    backgroundColor: { 
                      duration: 1.5, 
                      ease: "easeInOut",
                    },
                  }}
                  style={{ 
                    width: '14px', 
                    height: '14px',
                    backgroundColor: color,
                  }}
                  title={`${shouldBeGreen ? 'green' : 'empty'} cell`}
                />
              );
            })
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-[#a1a1a1] relative z-10">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-[#161b22]"></div>
          <div className="w-3 h-3 rounded bg-[#0e4429]"></div>
          <div className="w-3 h-3 rounded bg-[#006d32]"></div>
          <div className="w-3 h-3 rounded bg-[#26a641]"></div>
          <div className="w-3 h-3 rounded bg-[#39d353]"></div>
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
};

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
        className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-[#ededed]"
      >
        <span aria-live="polite" aria-label={`Introduction: ${currentText}`} className="text-[#ededed]">
          {currentText}
        </span>
        <motion.span
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className="text-[#ededed] ml-2"
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
    <section className="min-h-screen flex items-center justify-center bg-[#0a0a0a] pt-20" id="hero">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col justify-center md:items-start items-center text-left">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4 text-[#ededed] leading-tight">
            Building Smart<br />
            &nbsp;<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Scalable</span><br />
            Web Solutions
          </h1>
          <p className="text-base md:text-lg text-[#a1a1a1] mb-8 max-w-xl">
            A web developer who's passionate about performance, security,<br />
            And great user experience. From concept to clean code
          </p>
          <div className="flex gap-4 mt-2">
            <a 
              href="https://drive.google.com/file/d/1Ra6JNYZAlCX9SH5oXi_cdeMR5G03JdJR/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-base"
            >
              Resume
            </a>
            <a 
              href="https://calendly.com/shreyyaaa369" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-[#ededed] font-semibold hover:bg-white/10 transition-all text-base"
            >
              Schedule a Meeting
            </a>
            <a 
              href="https://github.com/shreyahhh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-[#ededed]"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.911 1.234 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576 4.765-1.584 8.199-6.081 8.199-11.384 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
        {/* Right: Workspace Illustrations */}
        <div className="flex-1 flex justify-center md:justify-end items-center relative min-h-[400px]">
          <DeveloperWorkspace />
        </div>
      </div>
    </section>
  );
};

export default Hero;