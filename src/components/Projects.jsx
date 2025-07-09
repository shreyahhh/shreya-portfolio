import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "Ecosync",
      timeline: "Oct 2024 - Dec 2024",
      stack: ["ML", "Gamification", "XGBoost", "React", "TypeScript", "Vite"],
      highlights: [
        "Ranked top 10 nationally in the Luminous innovation competition, out of 45,000+ teams.",
        "Designed a solar energy management platform projected to lower household energy costs by up to 25% and increase solar energy utilization by 30%.",
        "Created energy analytics that saved users up to 15% on electricity bills by identifying peak usage and recommending cost-effective adjustments."
      ],
      github: "https://github.com/shreyahhh/Ecosync-Luminous-Top-10-Project",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
    },
    {
      title: "Swasth-Kheti",
      timeline: "Sept 2024",
      stack: ["ML", "Chatbot Development"],
      highlights: [
        "Developed an AI-powered plant disease detection system, achieving an accuracy of 97% using the Swin Transformer model for image classification.",
        "Boosted user engagement by 25% with a chatbot interface using the Gemini AI model, handling 500 queries daily."
      ],
      github: "https://github.com/shreyahhh/Swasth-Kheti",
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80"
    },
    {
      title: "Amazon Review Analyzer",
      timeline: "Nov 2023 - May 2024",
      stack: ["Python", "Statistical techniques", "ML"],
      highlights: [
        "Developed insights into how reviews impact customer satisfaction and product success, influencing strategies that improved customer satisfaction scores by 15%.",
        "Authored a research paper accepted for presentation at Springer conference 2024."
      ],
      github: "https://github.com/shreyahhh/AmazonReviewAnalyser",
      image: "https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
    },
    {
      title: "CalmCounsel",
      timeline: "Oct 2023 - Nov 2023",
      stack: ["NLP", "ML", "NLTK", "fuzzywuzzy", "Matplotlib"],
      highlights: [
        "Implemented a therapy chatbot integrating sentiment analysis and fuzzy string matching algorithms.",
        "Handled over 1000 unique user inputs, ensuring reliable and scalable intent recognition.",
        "Achieved a 90% success rate in matching user queries to intents."
      ],
      github: "https://github.com/shreyahhh/CalmCounsel-A-Therapy-Chatbot",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1988&q=80"
    },
    {
      title: "Demand Forecasting",
      timeline: "2023",
      stack: ["Data Analysis", "Forecasting Models", "Python"],
      highlights: [
        "Created a system to predict future demand for products based on historical sales data.",
        "Implemented time series forecasting models to improve inventory management and reduce stockouts."
      ],
      github: "https://github.com/shreyahhh/Electricity_Demand_and_Price_forecasting",
      image: "/src/components/demand_image.jpg"
    },
    {
      title: "FFN-MNIST Dataset",
      timeline: "2023",
      stack: ["Machine Learning", "Neural Networks", "Python"],
      highlights: [
        "Classified images in the MNIST dataset of handwritten digits using a Feed Forward Network.",
        "Achieved high accuracy in digit recognition."
      ],
      github: "https://github.com/shreyahhh/FFN-MNIST_dataset",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  return (
    <motion.section
      id="projects"
      className="section bg-black text-black"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="container">
        <motion.h2
          className="text-3xl font-bold mb-6 text-white text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.title}
              className="card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ backgroundColor: '#dedddc' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="h-48 overflow-hidden mb-4 rounded-md">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-display font-medium text-pink">{project.title}</h3>
                  <span className="text-sm text-gray-500">{project.timeline}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map(tech => (
                    <span key={tech} className="bg-lavender/10 text-lavender text-xs px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <ul className="mb-4 text-sm space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-peach mr-2 mt-1 flex-shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-pink hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" clipRule="evenodd" />
                  </svg>
                  GitHub Repository
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects; 