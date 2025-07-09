import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Java", "Python", "C/C++", "SQL", "JavaScript", "HTML/CSS", "PHP", "HiveQL", "Pig Latin", "LightGBM", "Statsmodels"]
    },
    {
      title: "Frameworks",
      skills: ["Bootstrap", "React", "Node.js", "Hadoop", "Apache Spark", "TensorFlow", "Keras", "PyTorch", "Scikit-learn", "XGBoost", "Streamlit"]
    },
    {
      title: "Libraries",
      skills: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn", "TensorFlow", "Seaborn", "Plotly", "NLTK", "PySpark", "LightGBM", "Statsmodels"]
    },
    {
      title: "Developer Tools",
      skills: ["Git", "Github", "VS Code", "PyCharm", "Jupyter Notebook", "Jira", "Linux", "Excel", "PowerBi", "Cloudera", "Google Colaboratory"]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      id="skills"
      className="section bg-black text-black"
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
        Technical Skills
      </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8 px-4 md:px-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              className="card" style={{ backgroundColor: '#dedddc' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="text-xl font-display font-medium mb-4 text-black text-center">{category.title}</h3>
              <motion.div className="flex flex-wrap justify-center">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-tag mx-1 my-1 px-4 py-2 rounded-full text-sm font-medium inline-block" style={{ backgroundColor: '#fff', color: '#111' }}>
                    {skill}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
    </motion.section>
  );
};

export default Skills; 