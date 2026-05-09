'use client';
import { useState, useEffect } from 'react';
import { Github, Linkedin, ArrowUp } from '@/lib/icons';
import { site } from '@/data/site';

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer className="relative bg-ink text-white grain">
        <div className="relative z-10">
          <div
            className="border-t max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {/* Left: Logo */}
            <div>
              <a href="#" className="font-display text-2xl font-bold no-underline text-white">
                Dhruv Prajapati<span className="text-orange ml-0.5">●</span>
              </a>
              <p className="mt-3 text-sm text-gray-400 font-sans max-w-xs">
                Full-stack developer crafting performant, scalable web applications.
              </p>
            </div>

            {/* Center: Nav links */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-gray-500 mb-2">Navigation</p>
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-gray-400 hover:text-white font-sans transition-colors duration-200 no-underline"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Right: Social icons */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-gray-500 mb-2">Connect</p>
              <div className="flex gap-4">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-orange hover:text-orange transition-colors duration-200 no-underline"
                >
                  <Github size={18} />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-orange hover:text-orange transition-colors duration-200 no-underline"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="border-t max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500 font-sans"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <span>© 2025 Dhruv Prajapati</span>
            <span>Built with React in India ♥</span>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-orange text-white flex items-center justify-center transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
