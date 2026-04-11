'use client';
import React, { useEffect } from 'react';
import { MotionConfig, useScroll, useSpring, motion, AnimatePresence } from 'framer-motion';
import CustomCursor from '@/components/cursor/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';

const MemoAbout = React.memo(AboutSection);
const MemoExperience = React.memo(ExperienceSection);
const MemoEducation = React.memo(EducationSection);
const MemoContact = React.memo(ContactSection);

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorNode = target.closest('a');
      if (anchorNode && anchorNode.hash && anchorNode.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(anchorNode.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-orange z-50 origin-left"
            style={{ scaleX }}
          />
          <CustomCursor />
          <Navbar />
          <main>
            <HeroSection />
            <MemoAbout />
            <SkillsSection />
            <ProjectsSection />
            <MemoExperience />
            <MemoEducation />
            <MemoContact />
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
