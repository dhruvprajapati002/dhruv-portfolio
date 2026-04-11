'use client';
import { motion } from 'framer-motion';
import { site } from '@/data/site';
import { Mail, Phone, Github, Linkedin, ExternalLink } from '@/lib/icons';

const contacts = [
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phone}` },
  { icon: Github, label: 'GitHub', value: 'dhruvprajapati002', href: site.github },
  { icon: Linkedin, label: 'LinkedIn', value: 'Dhruv Prajapati', href: site.linkedin },
];

export default function ContactSection() {
  const viewport = { once: true, amount: 0.2 };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-ink text-white grain">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-mono text-xs tracking-[0.15em] uppercase text-orange mb-4"
            >
              // 06 — Contact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
              className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight"
            >
              Let&apos;s build something
              <br />
              <span className="italic text-orange">together.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.16 }}
              className="mt-6 text-base text-gray-400 font-sans max-w-md leading-relaxed"
            >
              I&apos;m currently open to full-time opportunities and freelance projects.
              Whether you have a question or just want to say hi — my inbox is always open.
            </motion.p>
          </div>

          {/* Right: Contact cards */}
          <div className="space-y-4">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.label === 'GitHub' || c.label === 'LinkedIn' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                whileHover={{ rotate: 10, scale: 1.2 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-xl no-underline transition-colors transition-transform duration-200 group origin-left"
                style={{
                  background: '#1A1A1A',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#C84B11';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <c.icon size={18} className="text-orange" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-mono tracking-[0.12em] uppercase text-gray-500">
                    {c.label}
                  </p>
                  <p className="text-sm font-sans text-white mt-0.5 whitespace-nowrap">{c.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Email CTA */}
            <motion.a
              href={`mailto:${site.email}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.55 }}
              className="relative overflow-hidden mt-6 w-full inline-flex items-center justify-center px-8 py-3.5 bg-orange text-white font-sans text-sm font-medium tracking-wider uppercase rounded-lg transition-colors duration-200 no-underline group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Send me an email →</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
