import { motion } from 'framer-motion'

const RESUME_URL = "https://drive.google.com/file/d/1OgplMsVuovtLxsdZKzXAOrVxCq9QTQZV/view?usp=sharing"
const RESUME_EMBED = "https://drive.google.com/file/d/1OgplMsVuovtLxsdZKzXAOrVxCq9QTQZV/preview"

const ResumePage = () => {
  return (
    <div className="bg-[#060606] text-[#ededed] pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16 border-b border-white/8 mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#a1a1a1] mb-4">Document</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-semibold">Resume</h1>
              <p className="mt-4 text-[#a1a1a1] max-w-xl">
                Full-stack developer with experience in React, Node.js, AI/ML integrations and cloud deployments.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white text-sm font-semibold transition-all shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Open in Google Drive
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-[#ededed] text-sm font-semibold transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download
              </a>
            </div>
          </div>
        </motion.div>

        {/* Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#111111]" style={{ paddingTop: '130%' }}>
            <iframe
              src={RESUME_EMBED}
              title="Shreya's Resume"
              className="absolute inset-0 w-full h-full border-none"
              allow="autoplay"
            />
          </div>
          <p className="text-center text-xs text-[#a1a1a1] mt-4">
            Can't see the preview?{' '}
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Open directly in Google Drive →
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ResumePage
