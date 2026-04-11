'use client';
import { motion } from 'framer-motion';
import { site } from '@/data/site';
import { getTechIcon } from '@/lib/icons';
import SectionLabel from '@/components/ui/SectionLabel';
import { ArrowRight } from 'lucide-react';

export default function ExperienceSection() {
  const viewport = { once: true, amount: 0.2 };

  return (
    <section id="experience" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionLabel
          number="04"
          label="Experience"
          title="Work History"
        />

        {/* Timeline wrapper */}
        <div className="relative pl-8 md:pl-12 mt-4 space-y-12">
          {/* Vertical orange line */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-[2px] bg-orange/20 z-0" />

          {site.experience.map((exp, index) => {
            const relatedProject = exp.relatedProjectId
              ? site.projects.find((p) => p.id === exp.relatedProjectId)
              : null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
                className="relative z-10"
              >
                {/* Timeline dot */}
                <div className="absolute -left-7 md:-left-9 top-2 w-5 h-5 rounded-full border-[2px] border-orange bg-white z-10" />

                {/* Entry card */}
                <div className="bg-cream border border-border rounded-xl p-6 md:p-8">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-sans text-base font-medium text-ink">{exp.company}</h3>
                      <p className="text-sm text-muted font-sans">{exp.location}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-ink text-white text-[11px] font-sans font-medium tracking-wider rounded-full">
                        {exp.title}
                      </span>
                      <span className="px-3 py-1 border border-orange text-orange text-[11px] font-mono tracking-wider rounded-full">
                        {exp.date}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted font-sans leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-3 mb-6">
                    {exp.points.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 + index * 0.1 + i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                        <p className="text-sm text-muted font-sans leading-relaxed">{point}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {exp.tech.map((t, i) => {
                      const techData = getTechIcon(t);
                      return (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={viewport}
                          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 + index * 0.1 + i * 0.05 }}
                          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono border rounded"
                          style={{
                            backgroundColor: techData?.bg ?? 'rgba(200,75,17,0.05)',
                            borderColor: techData ? `${techData.color}40` : 'rgba(200,75,17,0.3)',
                            color: techData?.color ?? '#C84B11'
                          }}
                        >
                          {techData && <techData.Icon size={12} />}
                          {t}
                        </motion.span>
                      );
                    })}
                  </div>

                  {/* Related Project Link */}
                  {relatedProject && (
                    <div className="mt-6 pt-4 border-t border-border">
                      <a
                        href={`#projects`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-sans font-medium text-ink hover:border-orange hover:text-orange transition-colors"
                      >
                        <span className="text-muted">Built:</span>
                        {relatedProject.name} <ArrowRight size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
