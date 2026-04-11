'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from '@/lib/icons';
import { getTechIcon } from '@/lib/icons';
import ArchDiagram from './ArchDiagram';

interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  features: string[];
  demoAvailable: boolean;
  links: { demo?: string; code?: string };
  arch?: {
    title: string;
    nodes: { id: string; label: string; layer: number; type: string; accent?: boolean }[];
    edges: { from: string; to: string; label: string }[];
  };
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.documentElement.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
    }
    return () => document.documentElement.classList.remove('modal-open');
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-${project.id}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-2xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-subtle flex items-center justify-center text-ink hover:bg-orange hover:text-white transition-colors duration-200"
        >
          <X size={16} />
        </motion.button>

        <div className="p-6 md:p-10">
          {/* Header */}
          <span className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-orange bg-orange/5 px-3 py-1 rounded-full mb-4">
            {project.category}
          </span>
          <h2 className="font-display text-3xl md:text-[40px] font-bold text-ink leading-tight">
            {project.name}
          </h2>
          <p className="mt-2 text-muted font-sans text-base">{project.tagline}</p>

          {/* Tech chips + links */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.tech.map((t) => {
              const techData = getTechIcon(t);
              return (
                <span 
                  key={t} 
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono border rounded"
                  style={{
                    backgroundColor: techData?.bg ?? 'rgba(200,75,17,0.05)',
                    borderColor: techData ? `${techData.color}40` : 'rgba(200,75,17,0.3)',
                    color: techData?.color ?? '#C84B11'
                  }}
                >
                  {techData && <techData.Icon size={12} />}
                  {t}
                </span>
              );
            })}
            <div className="flex items-center gap-3 ml-auto">
              {project.demoAvailable && project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-sans text-orange hover:text-orange-light transition-colors no-underline"
                >
                  <ExternalLink size={14} /> Demo
                </a>
              )}
              {project.links.code && (
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-sans text-muted hover:text-ink transition-colors no-underline"
                >
                  <Github size={14} /> Code
                </a>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[0.5px] bg-orange/30 my-8" />

          {/* Problem / Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-display text-lg font-bold text-ink mb-3">The Problem</h3>
              <p className="text-muted font-sans text-[15px] leading-[1.8]">{project.problem}</p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-ink mb-3">The Solution</h3>
              <p className="text-muted font-sans text-[15px] leading-[1.8]">{project.solution}</p>
            </div>
          </div>

          {/* Architecture Diagram */}
          {project.arch && (
            <>
              <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-6">
                {project.arch.title}
              </h3>
              <div className="bg-cream rounded-xl p-4 md:p-6 mb-10">
                <ArchDiagram arch={project.arch} />
              </div>
            </>
          )}

          {/* Key Features */}
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-6">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
            {project.features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                <p className="text-sm font-sans text-muted leading-relaxed">{f}</p>
              </div>
            ))}
          </div>

          {/* Footer buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            {project.demoAvailable && project.links.demo && (
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange text-white font-sans text-sm font-medium tracking-wider uppercase rounded-lg transition-colors duration-200 no-underline group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">View Live Demo →</span>
              </motion.a>
            )}
            {project.links.code && (
              <motion.a
                href={project.links.code}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-ink text-ink font-sans text-sm font-medium tracking-wider uppercase rounded-lg hover:bg-ink hover:text-white transition-colors duration-200 no-underline"
              >
                Source Code →
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
