/**
 * Tiny grid-based pixel art (SVG) — crisp edges, no external assets.
 * Rows: same length strings; '.' = transparent; other chars map via palette.
 */
export function PixelSprite({ rows, palette, pixelSize = 6, className = '' }) {
  const h = rows.length
  const w = rows.reduce((m, r) => Math.max(m, r.length), 0)

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * pixelSize}
      height={h * pixelSize}
      className={className}
      style={{ imageRendering: 'pixelated' }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {rows.map((row, y) =>
        row.split('').map((ch, x) => {
          if (ch === '.' || !palette[ch]) return null
          return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[ch]} />
        })
      )}
    </svg>
  )
}

const PALETTE_TREE_ROUND = {
  T: '#1b4332',
  t: '#2d6a4f',
  b: '#5c4033',
  B: '#3d2817',
}

const PALETTE_TREE_PINE = {
  T: '#1b4332',
  t: '#40916c',
  b: '#6f4e37',
  B: '#4a3728',
}

const PALETTE_FLOWER_DAISY = {
  P: '#ff8fab',
  p: '#ffb3c6',
  Y: '#ffd60a',
  y: '#ffea00',
  G: '#2d6a4f',
  g: '#52b788',
}

const PALETTE_FLOWER_TULIP = {
  R: '#c1121f',
  r: '#e63946',
  G: '#1b4332',
  g: '#40916c',
}

/** Example sprites for the Contact Resources section */
export const PIXEL_NATURE_EXAMPLES = [
  {
    key: 'tree-round',
    label: 'Tree — round canopy',
    caption: 'Classic blob canopy + thick trunk.',
    rows: [
      '....TTtt....',
      '...TTtttt...',
      '..TTtttttt..',
      '..TTtttttt..',
      '....bbbb....',
      '.....bb.....',
      '.....bb.....',
      '....BBBB....',
    ],
    palette: PALETTE_TREE_ROUND,
  },
  {
    key: 'tree-pine',
    label: 'Tree — pine',
    caption: 'Layered triangles, narrow trunk.',
    rows: [
      '.....T......',
      '....ttt.....',
      '...TTttt....',
      '..TTttttt...',
      '.TTttttttt..',
      '.....b......',
      '.....b......',
      '....BBB.....',
    ],
    palette: PALETTE_TREE_PINE,
  },
  {
    key: 'flower-daisy',
    label: 'Flower — daisy',
    caption: 'Alternating petals around a bright center.',
    rows: [
      '....ppp.....',
      '...PyPyP....',
      '....ppp.....',
      '.....G......',
      '.....G......',
      '....ggg.....',
    ],
    palette: PALETTE_FLOWER_DAISY,
  },
  {
    key: 'flower-tulip',
    label: 'Flower — tulip',
    caption: 'Cup shape on a short stem.',
    rows: [
      '.....r......',
      '....RRR.....',
      '...RRRRR....',
      '....RRR.....',
      '.....G......',
      '.....G......',
      '....ggg.....',
    ],
    palette: PALETTE_FLOWER_TULIP,
  },
]
