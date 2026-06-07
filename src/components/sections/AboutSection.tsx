'use client';
import { motion } from 'framer-motion';
import { site } from '@/data/site';
import SectionLabel from '@/components/ui/SectionLabel';
import { Code2, Briefcase, MapPin } from '@/lib/icons';

export default function AboutSection() {
  const viewport = { once: true, amount: 0.2 };

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionLabel number="01" label="About" title="Who I Am" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <p className="text-lg text-muted font-sans leading-[1.8]">
              {site.summary}
            </p>
            <p className="mt-6 text-base text-muted font-sans leading-[1.8]">
              I focus on writing clean, maintainable code and building systems that are not just functional
              but genuinely enjoyable to use. Every project is an opportunity to learn, iterate, and deliver
              real value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="space-y-4"
          >
            {[
              { icon: Code2, label: 'Focus', value: site.role },
              { icon: Briefcase, label: 'Experience', value: `${site.stats.years}+ Year Building Web Apps` },
              { icon: MapPin, label: 'Location', value: site.location },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-4 bg-white border border-border rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-orange/5 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-orange" />
                </div>
                <div>
                  <p className="text-[11px] font-mono tracking-[0.12em] uppercase text-muted">{item.label}</p>
                  <p className="text-sm font-sans font-medium text-ink mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
