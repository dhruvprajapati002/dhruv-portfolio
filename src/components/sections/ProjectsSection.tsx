'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '@/data/site';
import SectionLabel from '@/components/ui/SectionLabel';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectModal from '@/components/projects/ProjectModal';

const filters = ['All', 'Full-Stack', 'AI/ML', 'Frontend'];

type Project = (typeof site.projects)[number];

function matchesFilter(project: Project, filter: string): boolean {
  if (filter === 'All') return true;
  const cat = project.category.toLowerCase();
  if (filter === 'Full-Stack') return cat.includes('full-stack');
  if (filter === 'AI/ML')      return cat.includes('ai') || cat.includes('machine learning');
  if (filter === 'Frontend')   return cat.includes('frontend');
  return false;
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = site.projects.filter((p) => matchesFilter(p, activeFilter));
  const viewport = { once: true, amount: 0.2 };

  const filterCounts: Record<string, number> = {
    'All':        site.projects.length,
    'Full-Stack': site.projects.filter(p => matchesFilter(p, 'Full-Stack')).length,
    'AI/ML':      site.projects.filter(p => matchesFilter(p, 'AI/ML')).length,
    'Frontend':   site.projects.filter(p => matchesFilter(p, 'Frontend')).length,
  };

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionLabel
          number="03"
          label="Projects"
          title="Selected Work"
          subtitle="A showcase of full-stack applications, AI tools, and frontend experiments."
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2 text-[11px] font-sans font-medium tracking-[0.08em] uppercase rounded-full border transition-colors duration-200 ${
                activeFilter === f
                  ? 'bg-ink text-white border-ink'
                  : 'bg-transparent text-ink border-border hover:border-ink'
              }`}
            >
              {f} ({filterCounts[f]})
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpenModal={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
