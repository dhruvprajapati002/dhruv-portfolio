'use client';
import { useCallback, useEffect, useState, RefObject } from 'react';

export function useMagneticButton(ref: RefObject<HTMLElement | null>) {
  const [style, setStyle] = useState({ transform: 'translate(0px, 0px)' });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 60) {
        setStyle({
          transform: `translate(${dx * 0.3}px, ${dy * 0.3}px)`,
        });
      }
    },
    [ref]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({ transform: 'translate(0px, 0px)' });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);

  return { style };
}
