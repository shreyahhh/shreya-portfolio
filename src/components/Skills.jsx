import { motion } from 'framer-motion';

const skillCategories = [
	{
		title: 'Programming Languages',
		skills: [
			'JavaScript',
			'TypeScript',
			'Python',
			'Java',
			'SQL',
			'HTML5',
			'CSS3',
			'C++',
			'PHP',
			'HiveQL',
			'Pig Latin',
		],
	},
	{
		title: 'Frontend Technologies',
		skills: [
			'React.js',
			'Next.js 14',
			'Vue.js',
			'Tailwind CSS',
			'Bootstrap',
			'Shadcn/ui',
			'Redux',
		],
	},
	{
		title: 'Backend & APIs',
		skills: [
			'Node.js',
			'Express.js',
			'FastAPI',
			'RESTful APIs',
			'GraphQL',
			'WebSockets',
			'n8n Automation',
		],
	},
	{
		title: 'Databases & Cloud',
		skills: [
			'PostgreSQL',
			'SQLite',
			'Firebase',
			'Supabase',
			'Vercel',
			'Netlify',
			'Docker',
			'Linux',
		],
	},
	{
		title: 'AI & Machine Learning',
		skills: [
			'Google Gemini API',
			'OpenRouter',
			'NLP',
			'Sentiment Analysis',
			'XGBoost',
			'OpenCV',
		],
	},
	{
		title: 'Tools & Security',
		skills: [
			'Git',
			'GitHub',
			'OAuth 2.0',
			'JWT',
			'Firebase Auth',
			'NHost',
			'VS Code',
			'Vite',
			'Webpack',
			'CORS',
		],
	},
	{
		title: 'Libraries',
		skills: [
			'Pandas',
			'NumPy',
			'Matplotlib',
			'Scikit-learn',
			'TensorFlow',
			'Seaborn',
			'Plotly',
			'NLTK',
			'PySpark',
			'LightGBM',
			'Statsmodels',
		],
	},
];

const leftCategories = [skillCategories[0], skillCategories[2], skillCategories[6]];
const rightCategories = [skillCategories[1], skillCategories[3], skillCategories[4], skillCategories[5]];

const Skills = () => {
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
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 md:px-4">
				<div className="flex flex-col gap-4">
					{leftCategories.map((category, idx) => (
						<div key={category.title} className="border border-gray-400 rounded-xl p-3">
							<h3 className="text-lg font-semibold mb-2 text-white text-left">{category.title}</h3>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill, i) => (
									<span key={i} className="skill-tag px-2 py-1 rounded-full text-xs font-medium bg-white text-black border border-gray-300">
										{skill}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
				<div className="flex flex-col gap-4">
					{rightCategories.map((category, idx) => (
						<div key={category.title} className="border border-gray-400 rounded-xl p-3">
							<h3 className="text-lg font-semibold mb-2 text-white text-left">{category.title}</h3>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill, i) => (
									<span key={i} className="skill-tag px-2 py-1 rounded-full text-xs font-medium bg-white text-black border border-gray-300">
										{skill}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</motion.section>
	);
};

export default Skills;