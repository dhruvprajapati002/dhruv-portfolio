'use client';
import { CpuArchitecture } from '@/components/ui/cpu-architecture';
import {
  SiFigma, SiTailwindcss, SiVercel, SiPostman,
  SiMongodb, SiDocker,
} from 'react-icons/si';
import {
  FaReact, FaNodeJs, FaGitAlt, FaServer, FaGithub,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { clipPath } from 'framer-motion/client';

interface Tool { name: string; Icon: IconType; color: string; }
interface Stage {
  label: string;
  stageColor: string;
  // Exact position in SVG viewBox 200×100 coordinate space
  svgX: number;
  svgY: number;
  tools: Tool[];
}

// Positions mapped to SVG wire start-points (viewBox 200×100).
const STAGES: Stage[] = [
  {
    label: 'PLAN',
    stageColor: '#6366f1',
    svgX: 0, svgY: 14,
    tools: [
      { name: 'Figma', Icon: SiFigma,  color: '#F24E1E' },
      { name: 'Git',   Icon: FaGitAlt, color: '#F05032' },
    ],
  },
  {
    label: 'DEBUG',
    stageColor: '#f43f5e',
    svgX: 29, svgY: 25, // Brought slightly right, closer to the endpoint at x=30
    tools: [
      { name: 'Git',    Icon: FaGitAlt, color: '#F05032' },
      { name: 'GitHub', Icon: FaGithub, color: '#555555' },
    ],
  },
  {
    label: 'DESIGN',
    stageColor: '#3b82f6',
    svgX: 168, svgY: 4,
    tools: [
      { name: 'React',    Icon: FaReact,       color: '#61DAFB' },
      { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    label: 'BUILD',
    stageColor: '#22c55e',
    svgX: 116, svgY: 8,
    tools: [
      { name: 'Node.js', Icon: FaNodeJs, color: '#339933' },
      { name: 'Express', Icon: FaServer, color: '#888888' },
    ],
  },
  {
    label: 'DEPLOY',
    stageColor: '#C84B11',
    svgX: 161, svgY: 82, // Pulled up significantly for bottom breathing room
    tools: [
      { name: 'Vercel', Icon: SiVercel, color: '#555555' },
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
    ],
  },
  {
    label: 'SHIP',
    stageColor: '#f97316',
    svgX: 126.5, svgY: 59, // Pushed up to increase distance from DEPLOY
    tools: [
      { name: 'Render', Icon: FaServer, color: '#46E3B7' },
      { name: 'GitHub', Icon: FaGithub, color: '#555555' },
    ],
  },
  {
    label: 'TEST',
    stageColor: '#a855f7',
    svgX: 55, svgY: 80, // Pulled upwards for deep breathing room from padding
    tools: [
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
      { name: 'Docker',  Icon: SiDocker,  color: '#2496ED' },
    ],
  },
  {
    label: 'MONITOR',
    stageColor: '#06b6d4',
    svgX: 98, svgY: 80, // Strongly pulled up from bottom bounds
    tools: [
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    ],
  },
];

function StageLabel({ stage }: { stage: Stage }) {
  return (
    <foreignObject
      x={stage.svgX}
      y={stage.svgY}
      width="30"
      height="12"
      overflow="visible"
    >
      {/* xmlns required for foreignObject HTML to render correctly */}
      <div
        // @ts-expect-error – xmlns needed for SVG foreignObject HTML rendering
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5px',
          pointerEvents: 'none',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        }}
      >
        {/* Stage name */}
        <span
          style={{
            fontSize: '5.5px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: stage.stageColor,
            lineHeight: 1,
          }}
        >
          {stage.label}
        </span>

        {/* Pills row */}
        <div style={{ display: 'flex', gap: '2.5px' }}>
          {stage.tools.map((tool) => (
            <span
              key={tool.name}
              title={tool.name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px', // Reduce padding to make a neat squarish container for tools
                borderRadius: '4.5px',
                backgroundColor: 'rgba(255,255,255,0.92)',
                border: `0.4px solid ${stage.stageColor}55`,
                boxShadow: '0 0.5px 2px rgba(0,0,0,0.1)',
                color: '#444',
              }}
            >
              <tool.Icon
                size={7}
                color={tool.color}
                style={{ flexShrink: 0 }}
              />
            </span>
          ))}
        </div>
      </div>
    </foreignObject>
  );
}

export default function DevWorkflowDiagram() {
  return (
    // 16:9 gives more vertical breathing room vs the original 2:1.
    // overflow-hidden + clipPath together guarantee no dot escapes the boundary.
    <div
      className="relative w-full select-none overflow-hidden cpu-architecture-wrapper"
      style={{ aspectRatio: '16 / 10' }}
    >
      {/* Layer 1: CPU Architecture base SVG — fills container */}
      <CpuArchitecture
        text="DHRUV"
        width="100%"
        height="100%"
        showCpuConnections={true}
        animateText={true}
        animateLines={true}
        animateMarkers={true}
        lineMarkerSize={18}
      />

      {/* Layer 2: Label overlay SVG — identical viewBox, hard-clipped to bounds */}
      <svg
        viewBox="0 0 200 100"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Hard clip at viewBox boundary — prevents any element escaping */}
          <clipPath id="diagram-bounds">
            <rect x="0" y="0" width="200" height="100" />
          </clipPath>
        </defs>

        <g clipPath="url(#diagram-bounds)">
          {STAGES.map((stage) => (
            <StageLabel key={stage.label} stage={stage} />
          ))}

          {/* Center subtitle under CPU box
          <text
            x="100"
            y="72"
            textAnchor="middle"
            fill="#999"
            fontSize="3.5"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            letterSpacing="0.12em"
            opacity="0.7"
          >
            FULL-STACK DEV
          </text> */}
        </g>
      </svg>
    </div>
  );
}
