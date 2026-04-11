'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { Menu, X } from '@/lib/icons';
import { site } from '@/data/site';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    if (latest > 80 && latest > previous) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav
        layout
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        initial={{ y: 0 }}
        animate={{ y: hidden ? '-100%' : '0%', background: scrolled ? 'rgba(248,246,241,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? '0.5px solid rgba(0,0,0,0.07)' : 'none' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="font-display text-xl md:text-2xl font-bold text-ink no-underline">
            {site.name}<span className="text-orange ml-0.5">●</span>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="block font-sans text-[11px] font-medium tracking-[0.08em] uppercase text-muted hover:text-ink transition-colors duration-200 no-underline"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Hire Me Button */}
          <div className="hidden md:block">
            <MagneticButton href="#contact">
              <span className="inline-block px-5 py-2.5 border border-ink text-ink text-[11px] font-sans font-medium tracking-[0.08em] uppercase rounded-full hover:bg-orange hover:border-orange hover:text-white transition-colors duration-200">
                Hire Me →
              </span>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-cream flex flex-col items-center justify-center overflow-hidden"
          >
            <button
              className="absolute top-6 right-6 p-2 text-ink"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="font-display text-3xl font-bold text-ink no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-4 px-8 py-3 bg-orange text-white font-sans text-sm font-medium tracking-wider uppercase rounded-full no-underline"
                onClick={() => setMobileOpen(false)}
              >
                Hire Me →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
