'use client';
import { useRef, useEffect, useState } from 'react';
import { TECH_ICONS } from '@/lib/icons';

const TECHS = Object.entries(TECH_ICONS).map(([name, data]) => ({
  name,
  Icon: data.Icon,
  color: data.color,
  category: data.category,
}));

function fibSphere(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
}

interface TechGlobeProps {
  activeCategory: string | null;
}

export default function TechGlobe({ activeCategory }: TechGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesWrapperRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>(new Array(TECHS.length).fill(null));

  const [hoveredNode, setHoveredNode] = useState<number>(-1);

  const stateRef = useRef({
    rafId: 0,
    isVisible: true,
    rotX: 0, rotY: 0,
    velX: 0, velY: 0.003,
    isDragging: false,
    lastX: 0, lastY: 0,
    RADIUS: 160, CX: 240, CY: 240,
    alphas: new Array(TECHS.length).fill(1),
    targetAlphas: new Array(TECHS.length).fill(1),
    sizes: new Array(TECHS.length).fill(1),
    targetSizes: new Array(TECHS.length).fill(1),
  });

  const activeCatRef = useRef<string | null>(null);
  const hoveredRef = useRef<number>(-1);
  const spherePoints = useRef(fibSphere(TECHS.length));

  // Sync activeCategory prop to ref
  useEffect(() => {
    activeCatRef.current = activeCategory;
    const s = stateRef.current;
    for (let i = 0; i < TECHS.length; i++) {
      if (!activeCategory) {
        s.targetAlphas[i] = 1;
        s.targetSizes[i] = 1;
      } else {
        s.targetAlphas[i] = TECHS[i].category === activeCategory ? 1 : 0.15;
        s.targetSizes[i] = TECHS[i].category === activeCategory ? 1.15 : 0.85;
      }
    }
  }, [activeCategory]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;
    const pts = spherePoints.current;

    // IntersectionObserver
    const io = new IntersectionObserver(
      ([e]) => { s.isVisible = e.isIntersecting; },
      { threshold: 0.1 }
    );
    io.observe(container);

    // Resize
    let resizeTimer: NodeJS.Timeout;
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const dpr = window.devicePixelRatio || 1;
        const w = container.clientWidth;
        const h = container.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        s.RADIUS = Math.min(w, h) * 0.46;
        s.CX = w / 2;
        s.CY = h / 2;
      }, 100);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    // Draw & Update
    function draw() {
      if (!s.isVisible) { s.rafId = requestAnimationFrame(draw); return; }
      
      const { CX, CY, RADIUS } = s;
      if (!RADIUS) { s.rafId = requestAnimationFrame(draw); return; }

      // 1. Draw Canvas background grid
      const dpr = window.devicePixelRatio || 1;
      const w = canvas!.width / dpr;
      const h = canvas!.height / dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      // Velocity / auto-spin
      if (!s.isDragging) {
        s.rotY += s.velY;
        s.rotX += s.velX;
        s.velX *= 0.96;
        s.velY *= 0.96;
        if (Math.abs(s.velY) < 0.0005) s.velY = 0.003;
      }

      // Grid ellipses
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI;
        ctx!.beginPath();
        ctx!.ellipse(CX, CY - Math.cos(a) * RADIUS * 0.3, Math.sin(a) * RADIUS * 0.9, Math.sin(a) * RADIUS * 0.25, 0, 0, Math.PI * 2);
        ctx!.strokeStyle = 'rgba(200,75,17,0.06)';
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // Outer ring
      ctx!.beginPath();
      ctx!.arc(CX, CY, RADIUS + 4, 0, Math.PI * 2);
      ctx!.strokeStyle = 'rgba(200,75,17,0.12)';
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // 2. 3D projection & updating DOM Nodes
      // Lerp alphas + sizes
      for (let i = 0; i < TECHS.length; i++) {
        s.alphas[i] += (s.targetAlphas[i] - s.alphas[i]) * 0.1;
        s.sizes[i] += (s.targetSizes[i] - s.sizes[i]) * 0.1;
      }

      const FOV = 2.4;
      const cY = Math.cos(s.rotY), sY = Math.sin(s.rotY);
      const cX = Math.cos(s.rotX), sX = Math.sin(s.rotX);

      for (let i = 0; i < pts.length; i++) {
        const [x0, y0, z0] = pts[i];
        const x1 = x0 * cY + z0 * sY;
        const z1 = -x0 * sY + z0 * cY;
        const y1 = y0 * cX - z1 * sX;
        const z2 = y0 * sX + z1 * cX;
        
        const sc = RADIUS * FOV / (FOV + z2 + 1);
        const px = CX + x1 * sc;
        const py = CY - y1 * sc;

        const domNode = nodeRefs.current[i];
        if (domNode) {
          const depthAlpha = 0.3 + ((z2 + 1) / 2) * 0.7; // fade back elements
          const catAlpha = s.alphas[i];
          const isH = hoveredRef.current === i;
          
          const depthSize = 0.7 + ((z2 + 1) / 2) * 0.3; // Distant elements smaller
          const sizeMult = s.sizes[i];
          const hoverScale = isH ? 1.4 : 1;
          const finalScale = depthSize * sizeMult * hoverScale;

          domNode.style.transform = `translate(${px}px, ${py}px) scale(${finalScale})`;
          domNode.style.opacity = (depthAlpha * catAlpha).toFixed(3);
          domNode.style.zIndex = Math.floor(z2 * 100 + 500).toString(); // z-index for correct stacking
          
          // Optional: Add glow or active styling based on depth/z
          if (isH) {
            domNode.style.zIndex = "1000"; // bring to front on hover
            domNode.style.opacity = "1";
          }
        }
      }

      s.rafId = requestAnimationFrame(draw);
    }
    s.rafId = requestAnimationFrame(draw);

    // Interaction handlers on container
    const onDown = (e: MouseEvent) => { s.isDragging = true; s.lastX = e.clientX; s.lastY = e.clientY; };
    const onMove = (e: MouseEvent) => {
      if (s.isDragging) {
        const dx = e.clientX - s.lastX, dy = e.clientY - s.lastY;
        s.rotY += dx * 0.006; s.rotX += dy * 0.006;
        s.velY = dx * 0.006; s.velX = dy * 0.006;
        s.lastX = e.clientX; s.lastY = e.clientY;
      }
    };
    const onUp = () => { s.isDragging = false; };
    const onLeave = () => { s.isDragging = false; };

    const onTouchStart = (e: TouchEvent) => { 
      s.isDragging = true; s.lastX = e.touches[0].clientX; s.lastY = e.touches[0].clientY; 
    };
    const onTouchMove = (e: TouchEvent) => {
      if (s.isDragging) {
        // Only prevent default if we're actually dragging the globe significantly to avoid breaking page scroll completely
        const dx = e.touches[0].clientX - s.lastX, dy = e.touches[0].clientY - s.lastY;
        s.rotY += dx * 0.006; s.rotX += dy * 0.006;
        s.velY = dx * 0.006; s.velX = dy * 0.006;
        s.lastX = e.touches[0].clientX; s.lastY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => { s.isDragging = false; };

    container.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove); // window to allow drag outside
    window.addEventListener('mouseup', onUp);
    container.addEventListener('mouseleave', onLeave);
    
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(s.rafId);
      io.disconnect();
      ro.disconnect();
      clearTimeout(resizeTimer);
      container.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[560px] mx-auto cursor-grab active:cursor-grabbing">
      {/* Background canvas for grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ willChange: 'transform' }}
      />
      
      {/* Absolute positioned DOM elements for nodes */}
      <div ref={nodesWrapperRef} className="absolute inset-0 pointer-events-none" style={{ left: 0, top: 0 }}>
        {TECHS.map((tech, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) nodeRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 hidden md:flex flex-col items-center justify-center transition-none will-change-transform"
            style={{ 
              marginTop: '-21px', // center offset (32px / 2 = 16)
              marginLeft: '-21px',
              pointerEvents: 'auto', // allow hovering individual elements
              display: 'flex'
            }}
            onMouseEnter={() => {
              hoveredRef.current = i;
              setHoveredNode(i);
            }}
            onMouseLeave={() => {
              hoveredRef.current = -1;
              setHoveredNode(-1);
            }}
          >
            {/* The icon circle */}
            <div 
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center bg-white shadow-sm border border-black/5"
              style={{
                boxShadow: hoveredNode === i ? `0 0 16px ${tech.color}40, 0 4px 12px rgba(0,0,0,0.1)` : '0 2px 8px rgba(0,0,0,0.06)',
                borderColor: hoveredNode === i ? tech.color : 'rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease'
              }}
            >
              <tech.Icon size={22} color={tech.color} />
            </div>
            
            {/* Hover Tooltip Label */}
            <div 
              className="absolute top-[100%] mt-2 whitespace-nowrap px-2.5 py-1 text-[12px] font-sans font-medium text-white rounded bg-ink shadow-lg"
              style={{
                opacity: hoveredNode === i ? 1 : 0,
                transform: hoveredNode === i ? 'translateY(0)' : 'translateY(-4px)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                pointerEvents: 'none'
              }}
            >
              {tech.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
