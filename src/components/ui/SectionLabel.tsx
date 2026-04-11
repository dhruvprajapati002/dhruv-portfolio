'use client';
import { motion } from 'framer-motion';

interface SectionLabelProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionLabel({ number, label, title, subtitle }: SectionLabelProps) {
  const viewport = { once: true, amount: 0.2 };

  return (
    <div className="mb-12 md:mb-16">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-mono text-xs tracking-[0.15em] uppercase text-orange mb-4"
      >
        // {number} — {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
        className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-ink leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.16 }}
          className="mt-4 text-muted font-sans text-base max-w-lg"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.24 }}
        className="w-10 h-[4px] bg-orange mt-6 origin-left"
      />
    </div>
  );
}
