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
    <section id="skills" className="section bg-lavender/5">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technical Skills
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={category.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="text-xl font-display font-medium mb-4 text-pink">{category.title}</h3>
              <motion.div 
                className="flex flex-wrap"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {category.skills.map(skill => (
                  <motion.span 
                    key={skill} 
                    className="skill-tag"
                    variants={item}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 