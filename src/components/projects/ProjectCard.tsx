'use client';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from '@/lib/icons';
import { getTechIcon } from '@/lib/icons';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    tagline: string;
    category: string;
    year: string;
    featured: boolean;
    demoAvailable: boolean;
    tech: string[];
    links: { demo?: string; code?: string };
  };
  index: number;
  onOpenModal: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      layoutId={`project-${project.id}`}
      layout
      className="project-card bg-white border border-border rounded-xl overflow-hidden cursor-pointer group relative"
      onClick={onOpenModal}
    >
      {/* Top strip */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-border/50 bg-white relative z-10">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-orange">
          {project.category}
        </span>
        <div className="flex items-center gap-2">
          {project.featured && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-orange bg-orange/5 px-2 py-0.5 rounded-full">
              <Star size={10} fill="#C84B11" /> Featured
            </span>
          )}
          <span className="text-[11px] font-mono text-muted">{project.year}</span>
        </div>
      </div>

      {/* Middle */}
      <div className="px-5 py-5 bg-white relative z-10">
        <h3 className="font-display text-xl md:text-[22px] font-bold text-ink leading-tight">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-muted font-sans line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tech chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => {
            const techData = getTechIcon(t);
            return (
              <span
                key={t}
                className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono border rounded"
                style={{
                  backgroundColor: techData?.bg ?? 'rgba(200,75,17,0.05)',
                  borderColor: techData ? `${techData.color}40` : 'rgba(200,75,17,0.3)',
                  color: techData?.color ?? '#C84B11'
                }}
              >
                {techData && <techData.Icon size={10} />}
                {t}
              </span>
            );
          })}
          {project.tech.length > 5 && (
            <span className="px-2 py-0.5 text-[11px] font-mono text-muted">
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="px-5 pb-4 flex items-center justify-between border-t border-border/50 pt-3 bg-white relative z-10">
        <div className="flex items-center gap-3">
          {project.links.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-orange transition-colors duration-200 cursor-pointer relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
            </a>
          )}
          {project.demoAvailable && project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-orange transition-colors duration-200 cursor-pointer relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="text-[11px] font-sans font-medium tracking-wider uppercase text-ink px-3 py-1.5 rounded-md hover:bg-orange hover:text-white transition-colors duration-200 cursor-pointer relative z-20"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
        >
          Case Study →
        </motion.button>
      </div>

      {/* Hover border accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />
    </motion.div>
  );
}
