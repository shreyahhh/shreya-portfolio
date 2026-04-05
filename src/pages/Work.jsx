import { motion } from 'framer-motion'
import Accomplishments from '../components/Accomplishments'
import ResearchPapersFlip from '../components/ResearchPapersFlip'
import StackingExperience from '../components/StackingExperience'

export default function Work() {
  return (
    <div className="bg-[#060606] pt-16">
      <div className="mx-auto box-border max-w-[1200px] px-[80px]">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-white/10 py-16"
        >
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-400">Work</p>
          <h1 className="font-bold text-white" style={{ fontSize: 'clamp(48px, 5vw, 52px)', lineHeight: 1.1 }}>
            Experience &amp; more
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#a1a1a1]">
            ByteHint, NeuRazor Labs, and Discover Architects — timeline below, then publications and highlights.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed experience timeline */}
      <StackingExperience />

      {/* Full-bleed — owns its own max-width 1200px and 80px padding */}
      <ResearchPapersFlip />

      {/* Full-bleed accomplishments — owns its own max-width and padding */}
      <Accomplishments />
    </div>
  )
}
