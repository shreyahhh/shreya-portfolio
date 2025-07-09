import { motion } from 'framer-motion';

const Accomplishments = () => {
  const accomplishments = [
    {
      title: "Top 10 Innovator",
      description: "Ranked in the top 10 nationally in the Luminous innovation competition out of 45,000+ teams.",
      icon: null, // will use emoji
      color: "sand"
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accomplishments.map((item, idx) => (
            <motion.div 
              key={item.title}
              className="card text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ backgroundColor: '#dedddc' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-white">
                {/* Use a relevant emoji for each accomplishment */}
                {item.title.includes('Certificate') && '📜'}
                {item.title.includes('Research') && '📖'}
                {item.title.includes('Hackathon') && '💡'}
                {item.title.includes('Top 10') && '🥇'}
              </div>
              <h3 className="text-lg font-display font-medium mb-2 text-black">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
    </motion.section>
  );
};

export default Accomplishments; 