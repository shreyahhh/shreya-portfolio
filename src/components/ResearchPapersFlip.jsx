const PAPERS = [
  {
    publisher: 'Springer',
    year: '2024',
    title:
      "A New Approach to Compute Customers' Influential Power in Review Network for Improved Recommendation",
    description:
      'NLP-driven analysis linking Amazon review signals to customer satisfaction using sentiment analysis.',
    coverUrl:
      'https://media.springernature.com/w316/springer-static/cover-hires/book/978-981-97-8946-7',
    url: 'https://link.springer.com/chapter/10.1007/978-981-97-8946-7_24',
  },
  {
    publisher: 'Elsevier',
    year: '2025',
    title:
      'A review of multimodal sentiment analysis: Taxonomy, issues, challenges, and future perspectives',
    description:
      'Journal review spanning taxonomy, open issues, and future directions across text, audio, and vision.',
    coverUrl: 'https://ars.els-cdn.com/content/image/X00457906.jpg',
    url: 'https://www.sciencedirect.com/science/article/abs/pii/S0045790626000273',
  },
]

const BEZIER = 'cubic-bezier(0.22, 0.61, 0.36, 1)'
const GOLD = '#B8860B'
const MONO = '"ui-monospace", "SFMono-Regular", "Menlo", monospace'
const INDIGO = '#6366f1'

function PaperCard({ paper }) {
  return (
    <div
      className="rpf-outer"
      style={{
        height: 280,
        perspective: '1200px',
        cursor: 'default',
      }}
    >
      {/* Inner wrapper — flips + scales on hover via CSS */}
      <div
        className="rpf-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: `transform 0.7s ${BEZIER}`,
        }}
      >
        {/* ── FRONT ──────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 14,
            overflow: 'hidden',
            backfaceVisibility: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
          }}
        >
          {/* Left — journal cover image, 45% */}
          <div
            style={{
              width: '45%',
              flexShrink: 0,
              overflow: 'hidden',
              background: '#0d0d0d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 0,
            }}
          >
            <img
              src={paper.coverUrl}
              alt=""
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right — dark text panel, 55% */}
          <div
            style={{
              width: '55%',
              background: '#111111',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <p
              style={{
                fontSize: 17,
                fontWeight: 600,
                color: 'white',
                margin: '0 0 8px',
                lineHeight: 1.35,
              }}
            >
              {paper.title}
            </p>
            <p
              style={{
                fontFamily: MONO,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.45)',
                margin: 0,
              }}
            >
              {paper.publisher}
            </p>
          </div>
        </div>

        {/* ── BACK ───────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 14,
            overflow: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#161616',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: GOLD,
              margin: 0,
            }}
          >
            {paper.publisher}
          </p>

          <p
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              margin: '12px 0 0',
            }}
          >
            {paper.year}
          </p>

          <p
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: 'white',
              lineHeight: 1.65,
              margin: '20px 0 0',
            }}
          >
            {paper.description}
          </p>

          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 'auto',
              paddingTop: 16,
              fontSize: 13,
              color: GOLD,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              alignSelf: 'flex-start',
            }}
          >
            Read paper
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M17 7H9M17 7V15" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ResearchPapersFlip() {
  return (
    <>
      <style>{`
        .rpf-outer:hover .rpf-inner {
          transform: rotateY(180deg) scale(1.02);
        }
        .rpf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .rpf-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section
        aria-labelledby="research-papers-heading"
        style={{
          background: '#060606',
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            paddingLeft: 80,
            paddingRight: 80,
            boxSizing: 'border-box',
          }}
        >
          <header style={{ marginBottom: 32 }}>
            <p
              style={{
                margin: 0,
                fontFamily: MONO,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: INDIGO,
              }}
            >
              PUBLICATIONS
            </p>
            <h2
              id="research-papers-heading"
              style={{
                margin: '10px 0 0',
                fontSize: 'clamp(28px, 4vw, 32px)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.2,
              }}
            >
              Research papers
            </h2>
          </header>

          <div className="rpf-grid">
            {PAPERS.map((paper) => (
              <PaperCard key={paper.url} paper={paper} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
