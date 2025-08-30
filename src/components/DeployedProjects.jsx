
import React, { useState, useEffect } from 'react';

const projects = [
  {
    title: "MouseAI - Intelligent Chat Application",
    url: "https://mouseai.netlify.app/",
    github: "https://github.com/shreyahhh/My-Chatbot-MOUSE",
    tags: ["Next.js 14", "TypeScript", "GraphQL", "PostgreSQL"],
    highlights: [
      "Crafted a production-ready AI chatbot with Next.js 14 and PostgreSQL, handling 100+ concurrent users.",
      "Designed a real-time messaging system using GraphQL subscriptions and PostgreSQL, delivering sub-200ms response times with 99.9% message delivery success rate.",
      "Built an automated n8n webhook pipeline with OpenRouter AI integration, processing 500+ daily chat requests through an 8-node validation system with 95% accuracy."
    ],
    screenshot: null
  },
  {
    title: "Emote- AI Mental Wellness Platform",
    url: "https://emote-ai-journal.vercel.app/",
    github: "https://github.com/shreyahhh/EmoteAI_Journal",
    tags: ["React", "Firebase", "Gemini AI", "Chart.js"],
    highlights: [
      "Pioneered an AI-powered journaling platform with Google Gemini API for emotional analysis, generating personalized insights that improved user self-awareness metrics by 500%.",
      "Created a comprehensive mental health dashboard with mood tracking and goal management features, serving 100+ active users with a 95% user satisfaction rating.",
      "Constructed a secure full-stack architecture using Firebase Auth and Firestore with real-time synchronization, ensuring HIPAA-compliant data protection for 10,000+ journal entries."
    ],
    screenshot: null
  },
  {
  title: "ADmyBRAND-UI/UX Project",
    url: "https://a-dmy-brand-ultimate-ui-ux-project-cw6n-q9j31q0e4.vercel.app/",
    github: "https://github.com/shreyahhh/ADmyBRAND-Ultimate-UI-UX-Project",
    tags: ["Next.js", "React 18+", "TypeScript", "Tailwind CSS", "Framer Motion", "ESLint", "PostCSS", "Vercel"],
    highlights: [
      "Developed AI marketing platform using Next.js, React, and TypeScript with 15+ reusable components, achieving 100% type safety and 40% faster development.",
      "Built responsive web app with Tailwind CSS and Framer Motion, delivering 60fps animations and 98% cross-device compatibility.",
      "Engineered complete UX with pricing calculator, testimonial carousel, glassmorphism design, and authentication, improving engagement by 65%.",
      "Deployed production app with Next.js optimization and Vercel hosting, achieving sub-2s load times and 99.9% uptime."
    ],
    screenshot: null
  },
  {
    title: "Ecosync",
    url: "https://venerable-belekoy-5b5dd9.netlify.app/",
    github: "https://github.com/shreyahhh/Ecosync-Luminous-Top-10-Project",
    tags: ["ML", "Gamification", "XGBoost", "React", "TypeScript", "Vite"],
    highlights: [
      "Ranked top 10 nationally in the Luminous innovation competition, out of 45,000+ teams.",
      "Designed a solar energy management platform projected to lower household energy costs by up to 25% and increase solar energy utilization by 30%.",
      "Created energy analytics that saved users up to 15% on electricity bills by identifying peak usage and recommending cost-effective adjustments."
    ],
    screenshot: null
  }
];

const DeployedProjects = () => {
  const [loading, setLoading] = useState(projects.map(() => true));
  const [blocked, setBlocked] = useState(projects.map(() => false));

  const handleIframeLoad = idx => {
    setLoading(l => l.map((v, i) => (i === idx ? false : v)));
    setBlocked(b => b.map((v, i) => (i === idx ? false : v)));
  };
  const handleIframeError = idx => {
    setLoading(l => l.map((v, i) => (i === idx ? false : v)));
    setBlocked(b => b.map((v, i) => (i === idx ? true : v)));
  };

  return (
    <section className="py-16 bg-black">
      <div className="portfolio-container mx-auto max-w-[1800px] px-4">
        <header className="portfolio-header text-center mb-12 text-white">
          <h1 className="text-3xl md:text-4xl font-light mb-2 drop-shadow">Deployed Projects</h1>
          <p className="text-base opacity-90">Full-width interactive previews of my deployed applications</p>
        </header>
        <div className="flex flex-col gap-16">
          {projects.map((project, idx) => (
            <div key={project.title} className="w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col md:flex-row border border-gray-800">
              {/* Left: Project Preview (iframe or screenshot) */}
              <div className="md:w-2/3 w-full h-[600px] relative flex-shrink-0" style={{ minWidth: 0 }}>
                {project.screenshot ? (
                  <img src={project.screenshot} alt={project.title + ' screenshot'} className="screenshot-preview w-full h-full object-cover" />
                ) : (
                  <>
                    <iframe
                      className={`project-iframe w-full h-full border-none ${blocked[idx] ? 'iframe-blocked hidden' : ''}`}
                      src={project.url}
                      title={project.title}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      onLoad={() => handleIframeLoad(idx)}
                      onError={() => handleIframeError(idx)}
                    />
                    {loading[idx] && (
                      <div className="loading-spinner absolute inset-0 flex flex-col items-center justify-center text-gray-300 z-10 bg-black bg-opacity-80">
                        <div className="spinner animate-spin w-12 h-12 border-4 border-gray-700 border-t-indigo-500 rounded-full mb-2"></div>
                        <span>Loading preview...</span>
                      </div>
                    )}
                    <div className={`fallback-preview absolute inset-0 ${blocked[idx] ? 'show flex flex-col items-center justify-center text-center text-white p-10' : 'hidden'}`}>
                      <div className="fallback-icon text-6xl mb-4 opacity-80">🚀</div>
                      <div className="fallback-title text-2xl font-bold mb-2">{project.title}</div>
                      <div className="fallback-subtitle text-base opacity-90 mb-4">Preview not available - Click to visit live site</div>
                      <button className="preview-btn bg-white bg-opacity-20 border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-30 transition-all" onClick={e => {e.stopPropagation(); window.open(project.url, '_blank', 'noopener,noreferrer')}}>Visit Live Site</button>
                    </div>
                  </>
                )}
                <div className="click-overlay absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300">
                  <div className="click-hint bg-black bg-opacity-95 px-6 py-3 rounded-full font-semibold text-white opacity-0 group-hover:opacity-100 shadow-lg transition-all">Click to open in new tab</div>
                </div>
              </div>
              {/* Right: Project Details */}
              <div className="md:w-1/3 w-full flex flex-col justify-center p-8 gap-4 bg-black text-white">
                <div className="project-title text-xl md:text-2xl font-bold mb-2 text-white">{project.title}</div>
                {/* Icons for live link and GitHub */}
                <div className="flex gap-4 mb-2">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" title="Live Site" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 text-indigo-400">
                    {/* Chain Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                      <path d="M17 7a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7 0 5 5 0 0 1 0-7l1-1" />
                      <path d="M8 16l-3 3" />
                      <path d="M16 8l3-3" />
                    </svg>
                  </a>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 text-white">
                      {/* GitHub Icon (Octicons) */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.6-.18-3.29-.8-3.29-3.56 0-.79.28-1.44.74-1.95-.07-.18-.32-.92.07-1.91 0 0 .6-.19 1.97.74.57-.16 1.18-.24 1.79-.24.61 0 1.22.08 1.79.24 1.37-.93 1.97-.74 1.97-.74.39.99.14 1.73.07 1.91.46.51.74 1.16.74 1.95 0 2.77-1.69 3.38-3.3 3.56.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  )}
                </div>
                {/* Skills/Tags */}
                <div className="tech-tags flex flex-wrap gap-2 mt-1">
                  {project.tags.map(tag => (
                    <span key={tag} className="tech-tag bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                  ))}
                </div>
                {/* Points/Highlights */}
                {project.highlights && (
                  <ul className="mt-4 list-disc list-inside text-gray-300 text-sm md:text-base space-y-2">
                    {project.highlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeployedProjects;
