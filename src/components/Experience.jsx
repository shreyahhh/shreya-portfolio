import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      role: "Software Developer",
      company: "Discover Architects and Designs",
      location: "Lucknow",
      period: "Sept 2024 - Dec 2024",
      achievements: [
        "Lead the full-stack development of the company website, managing both frontend and backend aspects, enhancing the company's online presence by 100%.",
        "Integrated Calendly API with real-time email notifications to automate customer call bookings, reducing manual scheduling effort by 80% and improving the owner's response time by 30%."
      ]
    },
    {
      role: "Design Head",
      company: "Spark E-Cell, Bennett University",
      location: "Greater Noida",
      period: "Sept 2023 - Jan 2024",
      achievements: [
        "Led a team of 4 designers, achieving a 30% increase in efficiency.",
        "Conceptualized and executed impactful promotional materials, enhancing visual appeal and engagement across diverse marketing campaigns by 10%."
      ]
    },
    {
      role: "Graphic Designer",
      company: "Syncra",
      location: "Greater Noida",
      period: "Sept 2023",
      achievements: [
        "Collaborated with another designer and designed 25 design concepts, ensuring 95% adherence to brand guidelines."
      ]
    }
  ];

  return (
    <section id="experience" className="section bg-lavender/5">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-pink/30"></div>
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-pink flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              
              <div className="card border-l-4 border-pink">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-display font-medium text-gray-800">{exp.role}</h3>
                    <p className="text-pink">{exp.company}, {exp.location}</p>
                  </div>
                  <span className="mt-2 md:mt-0 text-sm bg-sand/50 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-peach mr-2 mt-1 flex-shrink-0">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 