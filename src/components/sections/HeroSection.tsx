'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { site, computedStats } from '@/data/site';
import NodeGraph from '@/components/ui/NodeGraph';
import { useCounter } from '@/hooks/useCounter';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerWords = ['Building', 'systems', 'that', 'actually', 'scale.'];

export default function HeroSection() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const projectCount = computedStats.projects;
  const yearCount    = computedStats.years;
  const techCount    = computedStats.technologies;

  // Typewriter effect
  useEffect(() => {
    const tagline = site.taglines[currentTagline];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < tagline.length) {
        timeout = setTimeout(() => {
          setDisplayText(tagline.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentTagline((prev) => (prev + 1) % site.taglines.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTagline]);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen flex items-center overflow-hidden grain"
      id="hero"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full py-24 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left Column — 60% */}
          <div className="lg:col-span-3">
            {/* Eyebrow */}
            <motion.div variants={childVariants} className="flex items-center gap-3 mb-8">
              <div className="w-7 h-[2px] bg-orange" />
              <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-orange">
                {site.role} · {site.location}
              </span>
            </motion.div>

            {/* H1 word stagger */}
            <motion.h1 variants={childVariants} className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] tracking-tight">
              {headerWords.map((word, index) => (
                <motion.span
                  key={index}
                  className={`inline-block mr-3 mb-2 ${index === 4 ? 'italic text-orange' : ''}`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={childVariants} className="mt-6 flex items-center gap-2">
              <span className="font-mono text-orange text-sm">&gt;</span>
              <span className="font-mono text-sm text-ink">
                {displayText}
                <span className="inline-block w-[2px] h-4 bg-orange ml-0.5 animate-pulse" />
              </span>
            </motion.div>

            {/* Summary */}
            <motion.p variants={childVariants} className="mt-6 max-w-lg text-base text-muted font-sans leading-relaxed">
              {site.summary}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={childVariants} className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden inline-flex items-center px-7 py-3 bg-ink text-white font-sans text-sm font-medium tracking-wider uppercase rounded-full transition-colors duration-200 no-underline group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">View My Work ↓</span>
              </motion.a>
              <motion.a
                href={site.resume}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center px-7 py-3 border border-ink text-ink font-sans text-sm font-medium tracking-wider uppercase rounded-full hover:bg-ink hover:text-white transition-colors duration-200 no-underline"
              >
                Download Resume
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={childVariants} className="mt-12 pt-8 border-t border-border flex gap-10 md:gap-16">
              {[
                { num: projectCount, suffix: '+', label: 'Projects' },
                { num: yearCount, suffix: '+', label: 'Years' },
                { num: techCount, suffix: '', label: 'Technologies' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl md:text-4xl font-black text-ink">
                    {stat.num}
                    <span className="text-orange">{stat.suffix}</span>
                  </div>
                  <div className="font-sans text-[11px] tracking-[0.08em] uppercase text-muted mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column — NodeGraph */}
          <div className="lg:col-span-2 hidden md:block">
            <motion.div
              variants={childVariants}
              className="w-full aspect-square max-w-[460px] mx-auto overflow-hidden rounded-xl"
            >
              <NodeGraph />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom indicators */}
      <motion.div variants={childVariants} className="absolute bottom-8 left-6 md:left-10 font-mono text-[10px] tracking-wider text-ink/20 z-10">
        PORTFOLIO · 2025 · STATUS: ACTIVE
      </motion.div>
      <motion.div variants={childVariants} className="absolute bottom-8 right-6 md:right-10 flex items-center gap-3 z-10">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">
          Scroll to explore
        </span>
        <div className="w-10 h-[1px] bg-border relative overflow-hidden">
          <div className="absolute h-full w-5 bg-orange animate-scroll-line" />
        </div>
      </motion.div>
    </motion.section>
  );
}
