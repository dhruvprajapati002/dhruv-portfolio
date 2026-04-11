import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs,
  FaGitAlt, FaDocker, FaPhp, FaDatabase, FaServer,
  FaGithub, FaPython, FaAws,
  FaFigma
} from 'react-icons/fa';
import {
  SiMongodb, SiExpress, SiTypescript, SiNextdotjs,
  SiTailwindcss, SiVite, SiVercel, SiPostman, SiMysql,
  SiFlask, SiTensorflow, SiOpencv, SiChartdotjs,
  SiJsonwebtokens, SiRender, SiOpenai, SiOpensearch
} from 'react-icons/si';
import { IconType } from 'react-icons';

export interface TechIcon {
  Icon: IconType;
  color: string;       // brand hex color
  bg: string;          // 10-15% tint of brand color for pill backgrounds
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'tool' | 'external';
}

export const TECH_ICONS: Record<string, TechIcon> = {
  // ── Frontend ──────────────────────────────
  'React': { Icon: FaReact, color: '#61DAFB', bg: '#E8FAFE', category: 'frontend' },
  'Next.js': { Icon: SiNextdotjs, color: '#000000', bg: '#F0F0F0', category: 'frontend' },
  'TypeScript': { Icon: SiTypescript, color: '#3178C6', bg: '#E8F2FB', category: 'frontend' },
  'JavaScript': { Icon: FaJs, color: '#F7DF1E', bg: '#FEFCE8', category: 'frontend' },
  'HTML5': { Icon: FaHtml5, color: '#E34F26', bg: '#FEF0EC', category: 'frontend' },
  'HTML/CSS': { Icon: FaHtml5, color: '#E34F26', bg: '#FEF0EC', category: 'frontend' },
  'CSS3': { Icon: FaCss3Alt, color: '#1572B6', bg: '#E8F2FB', category: 'frontend' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4', bg: '#E8F7FD', category: 'frontend' },
  'Vite': { Icon: SiVite, color: '#646CFF', bg: '#EEEEFF', category: 'frontend' },
  'React Router': { Icon: FaReact, color: '#CA4245', bg: '#FCEAEA', category: 'frontend' },
  'Chart.js': { Icon: SiChartdotjs, color: '#FF6384', bg: '#FFF0F3', category: 'frontend' },
  'Bootstrap': { Icon: FaDatabase, color: '#7952B3', bg: '#F3EEFF', category: 'frontend' },
  'Figma': { Icon: FaFigma, color: '#b3a152ff', bg: '#F3EEFF', category: 'frontend' },

  // ── Backend ───────────────────────────────
  'Node.js': { Icon: FaNodeJs, color: '#339933', bg: '#EDFAED', category: 'backend' },
  'Express.js': { Icon: SiExpress, color: '#000000', bg: '#F0F0F0', category: 'backend' },
  'Express': { Icon: SiExpress, color: '#000000', bg: '#F0F0F0', category: 'backend' },
  'REST API': { Icon: FaServer, color: '#FF6B35', bg: '#FFF1EB', category: 'backend' },
  'REST APIs': { Icon: FaServer, color: '#FF6B35', bg: '#FFF1EB', category: 'backend' },
  'JWT': { Icon: SiJsonwebtokens, color: '#D63AFF', bg: '#F9EEFF', category: 'backend' },
  'RBAC': { Icon: FaServer, color: '#6366f1', bg: '#EEEEFF', category: 'backend' },
  'PHP': { Icon: FaPhp, color: '#777BB4', bg: '#F0F0FA', category: 'backend' },
  'Flask': { Icon: SiFlask, color: '#000000', bg: '#F0F0F0', category: 'ai' },

  // ── Database & DevOps ─────────────────────
  'MongoDB': { Icon: SiMongodb, color: '#47A248', bg: '#EEF9EE', category: 'database' },
  'MongoDB Atlas': { Icon: SiMongodb, color: '#47A248', bg: '#EEF9EE', category: 'database' },
  'MySQL': { Icon: SiMysql, color: '#4479A1', bg: '#E8F0F8', category: 'database' },
  'OpenSearch': { Icon: SiOpensearch, color: '#005571', bg: '#E6F4F7', category: 'database' },
  'Git': { Icon: FaGitAlt, color: '#F05032', bg: '#FEF1EE', category: 'tool' },
  'GitHub': { Icon: FaGithub, color: '#181717', bg: '#F0F0F0', category: 'tool' },
  'Docker': { Icon: FaDocker, color: '#2496ED', bg: '#E8F4FD', category: 'database' },
  'Vercel': { Icon: SiVercel, color: '#000000', bg: '#F0F0F0', category: 'tool' },
  'Render': { Icon: SiRender, color: '#46E3B7', bg: '#E8FDF8', category: 'tool' },
  'Postman': { Icon: SiPostman, color: '#FF6C37', bg: '#FFF0EB', category: 'tool' },
  'AWS': { Icon: FaAws, color: '#FF9900', bg: '#FFF7E6', category: 'database' },

  // ── AI & Python ───────────────────────────
  'Python': { Icon: FaPython, color: '#3776AB', bg: '#E9F2FA', category: 'ai' },
  'TensorFlow': { Icon: SiTensorflow, color: '#FF6F00', bg: '#FFF3E0', category: 'ai' },
  'OpenCV': { Icon: SiOpencv, color: '#5C3EE8', bg: '#EEEEFF', category: 'ai' },

  // ── Mongoose / ORM ───────────────────────
  'Mongoose': { Icon: SiMongodb, color: '#47A248', bg: '#EEF9EE', category: 'database' },
  'Crypto-JS': { Icon: FaServer, color: '#000000', bg: '#F0F0F0', category: 'backend' },
  'Date-fns': { Icon: FaJs, color: '#770A2E', bg: '#F9E6EB', category: 'tool' },
  'TMDB API': { Icon: FaDatabase, color: '#01B4E4', bg: '#E6FAFF', category: 'database' },
  'Axios': { Icon: FaServer, color: '#5A29E4', bg: '#F0EAFB', category: 'tool' },
  'Context API': { Icon: FaReact, color: '#61DAFB', bg: '#E8FAFE', category: 'frontend' },
  'OpenWeatherMap API': { Icon: FaDatabase, color: '#EB6E4B', bg: '#FDECE7', category: 'external' },
  'PHPMailer': { Icon: FaPhp, color: '#777BB4', bg: '#F0F0FA', category: 'backend' },
};

export { Palette, Server, Database, Brain, Github, Linkedin, Mail, Phone, ExternalLink, ArrowUp, Menu, X, Download, ChevronRight, Star, Code2, Briefcase, MapPin } from 'lucide-react';

export function getTechIcon(name: string): TechIcon | null {
  return TECH_ICONS[name] ?? null;
}
