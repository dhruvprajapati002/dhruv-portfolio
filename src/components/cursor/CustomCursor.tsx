'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isProjectHover, setIsProjectHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) return;
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.project-card')) {
        setIsProjectHover(true);
        setIsHovering(false);
      } else if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
        setIsProjectHover(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.project-card') || target.closest('a') || target.closest('button')) {
        setIsHovering(false);
        setIsProjectHover(false);
      }
    };

    let rafId: number;
    const lerp = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        // We set transform in JS, CSS classes transition the scale portion via other means,
        // Wait, since we are overriding transform completely in JS, we shouldn't use CSS for hover scale.
        // But for minimal changes: We inject the translates, and let the CSS class scale apply?
        // Actually CSS class `.cursor-ring.hovering` overrides the entire `transform`.
        // A better approach is to use standard `left` and `top` BUT wrap it in a `requestAnimationFrame` and disable pointer events so it doesn't cause hit-test thrashing.
        // Alternatively, use exact transforms:
        const isHover = ringRef.current.classList.contains('hovering');
        const isProject = ringRef.current.classList.contains('project-hover');
        let targetScale = 1;
        if (isProject) targetScale = 2.8;
        else if (isHover) targetScale = 2;
        
        scaleRef.current += (targetScale - scaleRef.current) * 0.15;
        
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
      }
      rafId = requestAnimationFrame(lerp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          opacity: isVisible && !isHovering ? 1 : 0,
          left: 0,
          top: 0
        }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'hovering' : ''} ${isProjectHover ? 'project-hover' : ''}`}
        style={{ opacity: isVisible ? 1 : 0, left: 0, top: 0 }}
      >
        <span className="cursor-text">VIEW</span>
      </div>
    </>
  );
}
