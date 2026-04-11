'use client';
import { motion } from 'framer-motion';
import { site } from '@/data/site';
import SectionLabel from '@/components/ui/SectionLabel';

const dotColors: Record<string, string> = {
  green: '#2D6A4F',
  blue: '#1A4F8A',
  purple: '#4A3B8C',
  orange: '#C84B11',
};

export default function EducationSection() {
  const edu = site.education[0];
  const viewport = { once: true, amount: 0.2 };

  return (
    <section id="education" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionLabel
          number="05"
          label="Education"
          title="Academic Journey"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
          {/* Left: Degree info card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="bg-white border border-border rounded-xl p-6 md:p-8"
          >
            <h3 className="font-display text-xl md:text-2xl font-bold text-ink">{edu.degree}</h3>
            <p className="text-sm text-muted font-sans mt-1">{edu.school}</p>
            <p className="text-sm text-muted font-sans">{edu.location}</p>

            <div className="flex items-center gap-4 mt-4">
              <span className="px-3 py-1 border border-orange text-orange text-[11px] font-mono tracking-wider rounded-full">
                {edu.years}
              </span>
              <span className="text-sm font-sans text-ink font-medium">GPA: {edu.gpa}</span>
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted mb-3">
                Key Subjects
              </p>
              <div className="flex flex-wrap gap-2">
                {edu.subjects.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 + i * 0.05 }}
                    className="px-3 py-1 text-[12px] font-mono border border-border text-muted bg-subtle rounded"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Journey timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="relative"
          >
            <div className="relative pl-8">
              {/* Vertical connecting line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-border" />

              <div className="space-y-8">
                {edu.journey.map((step, i) => {
                  const color = dotColors[step.color] || '#C84B11';
                  const isActive = step.year === 'Now';
                  return (
                    <motion.div
                      key={step.year}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewport}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 + i * 0.1 }}
                      className="relative"
                    >
                      {/* Dot */}
                      <div
                        className={`absolute -left-8 top-1 w-6 h-6 rounded-full border-[2px] bg-white flex items-center justify-center ${
                          isActive ? 'shadow-[0_0_12px_rgba(200,75,17,0.3)]' : ''
                        }`}
                        style={{ borderColor: color }}
                      >
                        <div
                          className={`rounded-full ${isActive ? 'w-3 h-3' : 'w-2 h-2'}`}
                          style={{ backgroundColor: color }}
                        />
                      </div>

                      {/* Content */}
                      <span
                        className="inline-block px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full mb-2"
                        style={{
                          backgroundColor: `${color}10`,
                          color: color,
                          border: `1px solid ${color}30`,
                        }}
                      >
                        {step.year}
                      </span>
                      <h4 className="font-sans text-sm font-medium text-ink">{step.title}</h4>
                      <p className="text-sm text-muted font-sans mt-0.5">{step.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
