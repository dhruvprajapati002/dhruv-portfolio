'use client';
import { useEffect, useRef, useCallback } from 'react';
import { getTechIcon } from '@/lib/icons';

interface StageNode {
  label: string;
  angle: number;
  subs: [string, string];
  r: number;
  targetR: number;
  offsetX: number;
  offsetY: number;
}

interface Particle {
  progress: number;
  speed: number;
  edgeIndex: number;
}

export default function NodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<StageNode[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const isVisibleRef = useRef(true);
  const subNodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const initNodes = useCallback((w: number, h: number) => {
    const stagesData = [
      { label: 'Plan', angle: -90 * (Math.PI / 180), subs: ['Figma', 'GitHub Issues'] as [string, string] },
      { label: 'Design', angle: -18 * (Math.PI / 180), subs: ['Tailwind', 'Framer'] as [string, string] },
      { label: 'Build', angle: 54 * (Math.PI / 180), subs: ['MongoDB', 'REST API'] as [string, string] },
      { label: 'Test', angle: 126 * (Math.PI / 180), subs: ['Postman', 'Docker'] as [string, string] },
      { label: 'Deploy', angle: 198 * (Math.PI / 180), subs: ['Vercel', 'AWS'] as [string, string] },
    ];

    const nodes: StageNode[] = stagesData.map(s => ({
      ...s,
      r: 26,
      targetR: 26,
      offsetX: 0,
      offsetY: 0,
    }));
    nodesRef.current = nodes;

    const particles: Particle[] = [];
    for (let i = 0; i < nodes.length; i++) {
      particles.push({
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.003,
        edgeIndex: i,
      });
    }
    particlesRef.current = particles;
    sizeRef.current = { w, h };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        const container = canvas.parentElement;
        if (!container) return;
        const dpr = window.devicePixelRatio || 1;
        const w = container.clientWidth;
        const h = container.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.scale(dpr, dpr);
        initNodes(w, h);
      }, 150);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', handleMouse);

    const draw = () => {
      if (!isVisibleRef.current) { animRef.current = requestAnimationFrame(draw); return; }
      const { w, h } = sizeRef.current;
      if (!w || !h) { animRef.current = requestAnimationFrame(draw); return; }

      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.clip();

      timeRef.current += 0.016;
      const t = timeRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const minDim = Math.min(w, h);
      const innerRadius = Math.min(w, h) * 0.28;
      const outerRadius = Math.min(w, h) * 0.44;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update orbiting angles for stage nodes
      for (const n of nodes) {
        n.angle += 0.0004;
      }

      // Draw edges: center -> stage
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const stageX = cx + Math.cos(n.angle) * innerRadius + n.offsetX;
        const stageY = cy + Math.sin(n.angle) * innerRadius + n.offsetY;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(stageX, stageY);
        ctx.strokeStyle = 'rgba(0,0,0,0.08)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        ctx.stroke();

        // Draw edges: stage -> sub-nodes
        const sub1X = cx + Math.cos(n.angle - 0.55) * outerRadius;
        const sub1Y = cy + Math.sin(n.angle - 0.55) * outerRadius;
        const sub2X = cx + Math.cos(n.angle + 0.55) * outerRadius;
        const sub2Y = cy + Math.sin(n.angle + 0.55) * outerRadius;

        ctx.beginPath();
        ctx.moveTo(stageX, stageY);
        ctx.lineTo(sub1X, sub1Y);
        ctx.moveTo(stageX, stageY);
        ctx.lineTo(sub2X, sub2Y);
        ctx.strokeStyle = 'rgba(200,75,17,0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw sub-nodes
        [ { x: sub1X, y: sub1Y, label: n.subs[0] }, { x: sub2X, y: sub2Y, label: n.subs[1] } ].forEach(sub => {
          ctx.beginPath();
          ctx.arc(sub.x, sub.y, 18, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200,75,17,0.06)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(200,75,17,0.25)';
          ctx.lineWidth = 1;
          ctx.stroke();

          const iconLabels = ['MongoDB', 'Vercel', 'AWS', 'Postman', 'Docker', 'GitHub Issues', 'Tailwind', 'Figma'];
          if (iconLabels.includes(sub.label)) {
            const el = subNodeRefs.current[sub.label];
            if (el) {
              el.style.transform = `translate(${sub.x}px, ${sub.y}px)`;
            }
          } else {
            ctx.fillStyle = '#C84B11';
            ctx.font = '400 9px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(sub.label, sub.x, sub.y);
          }
        });
      }

      // Traveling particles on center -> stage edges
      for (const p of particlesRef.current) {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const n = nodes[p.edgeIndex];
        const stageX = cx + Math.cos(n.angle) * innerRadius + n.offsetX;
        const stageY = cy + Math.sin(n.angle) * innerRadius + n.offsetY;
        const px = cx + (stageX - cx) * p.progress;
        const py = cy + (stageY - cy) * p.progress;
        const alpha = Math.sin(p.progress * Math.PI);

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,75,17,${alpha * 0.8})`;
        ctx.fill();
      }

      // Pulse rings for center node
      for (let r = 0; r < 2; r++) {
        const phase = t * 0.8 + r * 1.25;
        const ringScale = 1 + (Math.sin(phase) * 0.5 + 0.5) * 0.15;
        const ringAlpha = 0.3 - (Math.sin(phase) * 0.5 + 0.5) * 0.2;
        ctx.beginPath();
        ctx.arc(cx, cy, 42 * ringScale + r * 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,75,17,${Math.max(0, ringAlpha)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw stage nodes on top
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const stageX = cx + Math.cos(n.angle) * innerRadius + n.offsetX;
        const stageY = cy + Math.sin(n.angle) * innerRadius + n.offsetY;

        // Mouse interaction on stage nodes only
        const dx = mouse.x - stageX;
        const dy = mouse.y - stageY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          n.targetR = 32;
          n.offsetX += (dx * 0.05 - n.offsetX * 0.1) * 0.3;
          n.offsetY += (dy * 0.05 - n.offsetY * 0.1) * 0.3;
        } else {
          n.targetR = 26;
          n.offsetX *= 0.92;
          n.offsetY *= 0.92;
        }
        n.r += (n.targetR - n.r) * 0.12;

        ctx.save();
        ctx.beginPath();
        ctx.arc(stageX, stageY, n.r, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#111111';
        ctx.font = '500 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.label, stageX, stageY);
        ctx.restore();
      }

      // Center node DHRUV
      const pulseScale = 1 + Math.sin(t * 2) * 0.04;
      const centerR = 42 * pulseScale;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
      ctx.fillStyle = '#C84B11';
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('DHRUV', cx, cy);
      ctx.restore();
      
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouse);
      clearTimeout(resizeTimeout);
      observer.disconnect();
    };
  }, [initNodes]);

  return (
    <div className="relative w-full h-full min-h-[420px] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full"
        style={{ willChange: 'transform' }}
      />
      
      {/* Absolute positioned DOM elements for specific logos */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {['MongoDB', 'Vercel', 'AWS', 'Postman', 'Docker', 'GitHub Issues', 'Tailwind', 'Figma'].map(label => {
          const techName = label === 'GitHub Issues' ? 'GitHub' : label === 'Tailwind' ? 'Tailwind CSS' : label;
          const techData = getTechIcon(techName);
          if (!techData) return null;
          // specific size logic, like FaFigma usually fits well at 18
          const size = label === 'Figma' || label === 'Postman' || label === 'Vercel' ? 18 : 20;
          return (
            <div
              key={label}
              ref={el => { subNodeRefs.current[label] = el; }}
              className="absolute left-0 top-0 flex items-center justify-center transition-none will-change-transform"
              style={{ width: 36, height: 36, marginLeft: -18, marginTop: -18 }}
            >
              <techData.Icon size={size} color={techData.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
