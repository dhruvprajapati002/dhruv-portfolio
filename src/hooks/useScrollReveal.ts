'use client';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

type InViewOptions = NonNullable<Parameters<typeof useInView>[1]>;

export function useScrollReveal(margin: InViewOptions['margin'] = '-80px') {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin });
  return { ref, inView };
}
