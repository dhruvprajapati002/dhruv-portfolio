'use client';
import { useMemo } from 'react';

interface ArchNode {
  id: string;
  label: string;
  layer: number;
  type: string;
  accent?: boolean;
}

interface ArchEdge {
  from: string;
  to: string;
  label: string;
}

interface ArchData {
  title: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
}

const nodeStyles: Record<string, { fill: string; stroke: string; textColor: string }> = {
  client:   { fill: '#F0EBE0', stroke: '#111111', textColor: '#111111' },
  frontend: { fill: '#E8F0FB', stroke: '#185FA5', textColor: '#185FA5' },
  backend:  { fill: '#111111', stroke: '#111111', textColor: '#FFFFFF' },
  database: { fill: '#2D6A4F', stroke: '#2D6A4F', textColor: '#FFFFFF' },
  service:  { fill: '#FEF0E8', stroke: '#C84B11', textColor: '#C84B11' },
  security: { fill: '#FEE8E8', stroke: '#C84B11', textColor: '#991B1B' },
  external: { fill: '#F5F5F5', stroke: '#999999', textColor: '#666666' },
  ai:       { fill: '#EDE8FB', stroke: '#4A3B8C', textColor: '#4A3B8C' },
  infra:    { fill: '#E8E4DC', stroke: '#6B6B6B', textColor: '#6B6B6B' },
  output:   { fill: '#FFFFFF', stroke: '#E8E4DC', textColor: '#111111' },
  browser:  { fill: '#E8F0FB', stroke: '#185FA5', textColor: '#185FA5' },
  storage:  { fill: '#F0EBE0', stroke: '#6B6B6B', textColor: '#6B6B6B' },
};

const NODE_W = 130;
const NODE_H = 44;
const LAYER_GAP = 160;
const NODE_GAP = 72;

export default function ArchDiagram({ arch }: { arch: ArchData }) {
  const layout = useMemo(() => {
    // Group nodes by layer
    const layers: Record<number, ArchNode[]> = {};
    arch.nodes.forEach((n) => {
      if (!layers[n.layer]) layers[n.layer] = [];
      layers[n.layer].push(n);
    });

    const layerKeys = Object.keys(layers).map(Number).sort((a, b) => a - b);
    const maxNodesInLayer = Math.max(...layerKeys.map((k) => layers[k].length));
    const totalHeight = maxNodesInLayer * (NODE_H + NODE_GAP) - NODE_GAP + 40;
    const totalWidth = layerKeys.length * LAYER_GAP + 40;

    // Calculate positions
    const positions: Record<string, { x: number; y: number }> = {};
    layerKeys.forEach((layerIdx, li) => {
      const nodesInLayer = layers[layerIdx];
      const layerHeight = nodesInLayer.length * (NODE_H + NODE_GAP) - NODE_GAP;
      const startY = (totalHeight - layerHeight) / 2;
      nodesInLayer.forEach((node, ni) => {
        positions[node.id] = {
          x: 20 + li * LAYER_GAP,
          y: startY + ni * (NODE_H + NODE_GAP),
        };
      });
    });

    return { positions, totalWidth, totalHeight, layerKeys, layers };
  }, [arch]);

  const { positions, totalWidth, totalHeight } = layout;

  return (
    <div className="w-full overflow-x-auto py-4">
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="w-full min-w-[500px]"
        style={{ maxHeight: '420px' }}
      >
        <defs>
          <marker id="arrowOrange" viewBox="0 0 10 8" refX="10" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 4L0 8z" fill="#C84B11" />
          </marker>
          <marker id="arrowGray" viewBox="0 0 10 8" refX="10" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 4L0 8z" fill="rgba(0,0,0,0.3)" />
          </marker>
        </defs>

        {/* Edges */}
        {arch.edges.map((edge, i) => {
          const fromPos = positions[edge.from];
          const toPos = positions[edge.to];
          if (!fromPos || !toPos) return null;

          const fromNode = arch.nodes.find((n) => n.id === edge.from);
          const toNode = arch.nodes.find((n) => n.id === edge.to);
          const isAccent = fromNode?.accent || toNode?.accent;

          const x1 = fromPos.x + NODE_W;
          const y1 = fromPos.y + NODE_H / 2;
          const x2 = toPos.x;
          const y2 = toPos.y + NODE_H / 2;

          const dx = x2 - x1;
          const cp1x = x1 + dx * 0.4;
          const cp2x = x2 - dx * 0.4;

          const path = `M${x1},${y1} C${cp1x},${y1} ${cp2x},${y2} ${x2},${y2}`;
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;

          return (
            <g key={i}>
              <path
                d={path}
                fill="none"
                stroke={isAccent ? '#C84B11' : 'rgba(0,0,0,0.2)'}
                strokeWidth={1}
                markerEnd={isAccent ? 'url(#arrowOrange)' : 'url(#arrowGray)'}
                className="arch-edge"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              />
              {/* Edge label */}
              <g transform={`translate(${midX}, ${midY})`}>
                <rect
                  x={-edge.label.length * 3.2 - 6}
                  y={-9}
                  width={edge.label.length * 6.4 + 12}
                  height={18}
                  rx={9}
                  fill="#F0EBE0"
                  stroke="#E8E4DC"
                  strokeWidth={0.5}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#6B6B6B"
                  fontSize={8}
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {edge.label}
                </text>
              </g>
            </g>
          );
        })}

        {/* Nodes */}
        {arch.nodes.map((node, i) => {
          const pos = positions[node.id];
          if (!pos) return null;

          const style = nodeStyles[node.type] || nodeStyles.client;
          const layerIndex = layout.layerKeys.indexOf(node.layer);
          const isDashed = node.type === 'external';

          return (
            <g
              key={node.id}
              className={`arch-node ${node.accent ? 'arch-accent' : ''}`}
              style={{ animationDelay: `${layerIndex * 0.1}s` }}
            >
              {/* Output type: left orange stripe */}
              {node.type === 'output' && (
                <rect x={pos.x} y={pos.y} width={4} height={NODE_H} rx={2} fill="#C84B11" />
              )}

              {/* Accent glow */}
              {node.accent && (
                <rect
                  x={pos.x - 3}
                  y={pos.y - 3}
                  width={NODE_W + 6}
                  height={NODE_H + 6}
                  rx={9}
                  fill="none"
                  stroke="#C84B11"
                  strokeWidth={1.5}
                  opacity={0.4}
                />
              )}

              {/* Node body */}
              {node.type === 'database' ? (
                // Cylinder shape for database
                <g>
                  <rect x={pos.x} y={pos.y + 6} width={NODE_W} height={NODE_H - 6} fill={style.fill} stroke={style.stroke} strokeWidth={1} />
                  <ellipse cx={pos.x + NODE_W / 2} cy={pos.y + 6} rx={NODE_W / 2} ry={6} fill={style.fill} stroke={style.stroke} strokeWidth={1} />
                  <ellipse cx={pos.x + NODE_W / 2} cy={pos.y + NODE_H} rx={NODE_W / 2} ry={6} fill={style.fill} stroke={style.stroke} strokeWidth={1} />
                </g>
              ) : (
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={6}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={node.accent ? 2 : 1}
                  strokeDasharray={isDashed ? '4 2' : 'none'}
                />
              )}

              {/* Node label */}
              <text
                x={pos.x + NODE_W / 2}
                y={pos.y + NODE_H / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill={style.textColor}
                fontSize={10}
                fontFamily="'JetBrains Mono', monospace"
                fontWeight={node.accent ? 700 : 400}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
