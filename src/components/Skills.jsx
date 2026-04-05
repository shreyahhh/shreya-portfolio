import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'HTML5', 'CSS3', 'C++'],
  },
  {
    title: 'Frontend Technologies',
    skills: ['React.js', 'Next.js 14', 'Vue.js', 'Tailwind CSS', 'Bootstrap', 'Shadcn/ui', 'Redux'],
  },
  {
    title: 'Backend & APIs',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'RESTful APIs', 'GraphQL', 'WebSockets', 'n8n Automation'],
  },
  {
    title: 'Databases & Cloud',
    skills: ['PostgreSQL', 'SQLite', 'Firebase', 'Supabase', 'Vercel', 'Netlify', 'Docker', 'Linux'],
  },
  {
    title: 'AI & Machine Learning',
    skills: ['Google Gemini API', 'OpenRouter', 'NLP', 'Sentiment Analysis', 'XGBoost', 'OpenCV'],
  },
  {
    title: 'Tools & Security',
    skills: ['Git', 'GitHub', 'OAuth 2.0', 'JWT', 'Firebase Auth', 'NHost', 'VS Code', 'Cursor', 'Copilot'],
  },
]

const SkillsTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left text-xs font-semibold text-[#a1a1a1] pb-3 pl-4 uppercase tracking-widest">Category</th>
          <th className="text-left text-xs font-semibold text-[#a1a1a1] pb-3 uppercase tracking-widest">Skills</th>
        </tr>
      </thead>
      <tbody>
        {skillCategories.map((category) => (
          <tr key={category.title} className="border-b border-white/8 hover:bg-white/2 transition-colors">
            <td className="align-top py-4 pl-4 pr-8 font-semibold text-sm text-[#ededed] whitespace-nowrap">
              {category.title}
            </td>
            <td className="py-4">
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-[#a1a1a1] bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const Skills = ({ standalone }) => {
  if (standalone) return <SkillsTable />

  return (
    <motion.section
      id="skills"
      className="section bg-[#060606] text-[#ededed] py-16"
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
        Technical Skills
      </motion.h2>
      <div className="w-full max-w-7xl mx-auto px-2 md:px-8">
        <SkillsTable />
      </div>
    </motion.section>
  )
}

export default Skills
