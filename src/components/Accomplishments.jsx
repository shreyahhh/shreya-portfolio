import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Accomplishments = () => {
  const scrollRef = useRef(null);

  const accomplishments = [
    {
      title: "Top 10 Innovator",
      description: "Ranked in the top 10 nationally in the Luminous innovation competition out of 45,000+ teams.",
      icon: null,
      color: "sand"
    },
    {
      title: "Semi-Finalist at NEST2025 (Novartis)",
      description: "Recognized as a semi-finalist for developing a data-driven ML framework to forecast clinical trial Recruitment Rate (RR).",
      icon: null,
      color: "blue"
    },
    {
      title: "Multiple Certificate Holder",
      description: "Earned various certificates in technical domains, demonstrating a commitment to continuous learning and skill enhancement.",
      icon: null,
      color: "pink"
    },
    {
      title: "Authored a Research Paper",
      description: "Published research in a Springer conference, showcasing analytical skills and contribution to academic knowledge.",
      icon: null,
      color: "peach"
    },
    {
      title: "Hackathon Buff",
      description: "Active participant in hackathons including Woodpecker and Myntra Hackerramp WeForShe, developing solutions under pressure.",
      icon: null,
      color: "lavender"
    }
  ];

  // Create a long queue of cards for smooth infinite scroll
  const queueCards = [...accomplishments, ...accomplishments, ...accomplishments, ...accomplishments];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollPos = 0;
    const scrollSpeed = 1;
    const cardWidth = 304; // 280px card + 24px gap

    const scroll = () => {
      scrollPos += scrollSpeed;
      
      // Reset when we've scrolled through one complete set
      if (scrollPos >= cardWidth * accomplishments.length) {
        scrollPos = 0;
      }
      
      container.scrollLeft = scrollPos;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <motion.section
      id="accomplishments"
      className="section bg-black text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="text-3xl font-bold mb-6 text-white text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Accomplishments
      </motion.h2>
      
      <div className="flex justify-center">
        <div
          ref={scrollRef}
          className="flex gap-6 w-full max-w-6xl overflow-hidden"
        >
          {queueCards.map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              className="card text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0"
              style={{ backgroundColor: '#dedddc', width: '280px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-white">
                {item.title.includes('Certificate') && '📜'}
                {item.title.includes('Research') && '📖'}
                {item.title.includes('Hackathon') && '💡'}
                {item.title.includes('Top 10') && '🥇'}
                {item.title.includes('NEST2025') && '🏆'}
              </div>
              <h3 className="text-lg font-display font-medium mb-2 text-black">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Accomplishments; 