'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import TechGlobe from '@/components/skills/TechGlobe';
import { Palette, Server, Database, Brain } from '@/lib/icons';

import { site, computedStats } from '@/data/site';

const categories = [
  { key: 'frontend', label: 'Frontend Development', icon: Palette, dotColor: '#61DAFB', count: computedStats.categoryCount.frontend },
  { key: 'backend',  label: 'Backend Development',  icon: Server, dotColor: '#339933', count: computedStats.categoryCount.backend },
  { key: 'database', label: 'Database & DevOps',    icon: Database, dotColor: '#47A248', count: computedStats.categoryCount.database },
  { key: 'ai',       label: 'AI & Python',          icon: Brain, dotColor: '#3776AB', count: computedStats.categoryCount.ai },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const viewport = { once: true, amount: 0.2 };

  return (
    <section id="skills" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionLabel
          number="02"
          label="Skills"
          title="My Universe"
          subtitle= {`${computedStats.technologies} technologies — hover to explore.`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center mt-4">
          {/* Left: Legend (40%) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-2 space-y-3"
          >
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 + i * 0.08 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-cream border-orange/30 shadow-sm'
                      : 'bg-cream/50 border-border hover:border-orange/20'
                  }`}
                  style={{ transform: isActive ? 'translateY(-2px)' : 'translateY(0)' }}
                  onMouseEnter={() => setActiveCategory(cat.key)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cat.dotColor}15` }}
                  >
                    <Icon size={20} style={{ color: cat.dotColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-ink truncate">{cat.label}</p>
                  </div>
                  <span className="flex-shrink-0 px-2.5 py-0.5 text-[11px] font-mono border border-orange/25 text-orange bg-orange/5 rounded-full">
                    {cat.count}
                  </span>
                </motion.div>
              );
            })}
            <p className="text-sm text-muted font-sans mt-4 pl-1 leading-relaxed">
              Hover a category to highlight its technologies on the globe. Drag the globe to rotate.
            </p>
          </motion.div>

          {/* Right: Globe (60%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
            className="lg:col-span-3 min-h-[520px] flex items-center"
          >
            <TechGlobe activeCategory={activeCategory} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
