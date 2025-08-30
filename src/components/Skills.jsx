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
				className="section bg-black text-white py-16"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7 }}
			>
				<motion.h2
					className="text-3xl font-bold mb-10 text-white text-center"
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					Technical Skills
				</motion.h2>
								<div className="w-full max-w-7xl mx-auto px-2 md:px-8">
									<div className="overflow-x-auto">
										<table className="w-full">
											<thead>
												<tr>
													<th className="text-left text-lg font-semibold text-gray-300 pb-2 pl-4">Category</th>
													<th className="text-left text-lg font-semibold text-gray-300 pb-2">Skills</th>
												</tr>
											</thead>
											<tbody>
												{skillCategories.map((category, idx) => (
													<tr key={category.title} className="border-b border-gray-700">
														<td className="align-top py-4 pl-4 pr-8 font-bold text-base text-white whitespace-nowrap">
															{category.title}
														</td>
														<td className="py-4">
															<span className="text-base text-gray-100">
																{category.skills.join(', ')}
															</span>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
			</motion.section>
		);
};

export default Skills;