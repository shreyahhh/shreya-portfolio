import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      role: "Full Stack Developer",
      company: "NeuRazor Labs",
      location: "Remote",
      period: "Oct 2025 - Present",
      achievements: [
        "Architected full-stack assessment platform using React 19, Vite, Supabase; built 15+ interactive modules with real-time scoring, reducing administration time by 75%.",
        "Designed scalable RESTful API architecture handling 2000+ database operations across 20+ tables; achieved 99.5% uptime and sub-200ms response time.",
        "Optimized performance through code splitting and lazy loading; reduced bundle size by 45%, achieved 92+ Lighthouse score."
      ]
    },
    {
      role: "Software Developer",
      company: "Discover Architects and Designs",
      location: "Remote",
      period: "Sept 2024 - Dec 2024",
      achievements: [
        "Engineered a full-stack web platform using React, TypeScript, and SQLite, increasing client engagement by 60% and serving 2000+ monthly users.",
        "Integrated Calendly API with SMTP notifications, automating 500+ bookings monthly and reducing manual scheduling overhead by 80%.",
        "Introduced file upload functionality with Multer middleware, supporting 1000+ gallery uploads and reducing access issues by 50%."
      ]
    }
  ];

  return (
    <motion.section
      id="experience"
      className="section bg-[#0a0a0a] text-[#ededed]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="text-3xl font-semibold mb-10 text-[#ededed] text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Professional Experience
      </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={`${exp.company}-${exp.role}`}
              className="relative pl-8 pb-12 last:pb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Timeline stem */}
              {idx < experiences.length - 1 && (
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-indigo-500/30"></div>
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              
              <div className="bg-[#111111] border-l-4 border-indigo-500 border border-gray-700 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#ededed] mb-1">{exp.role}</h3>
                    <p className="text-indigo-400">{exp.company}, {exp.location}</p>
                  </div>
                  <span className="mt-2 md:mt-0 text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[#a1a1a1]">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start text-[#a1a1a1]">
                      <span className="text-indigo-400 mr-2 mt-1 flex-shrink-0">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
    </motion.section>
  );
};

export default Experience;