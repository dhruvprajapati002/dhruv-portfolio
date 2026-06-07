import { arch } from "os";

const YEARS_OF_EXPERIENCE = 1;

export const site = {
  name: 'Dhruv Prajapati',
  role: 'Software Developer',
  location: 'Mahesana, Gujarat, India',
  email: 'dhruvprajapati0023@gmail.com',
  phone: '+91-6351987712',
  github: 'https://github.com/dhruvprajapati002/',
  linkedin: 'https://www.linkedin.com/in/dhruv-prajapati-204549278/',
  resume: '/resume.pdf',

  taglines: [
    'Aspiring Software Developer',
    'MERN Stack Developer',
    'Full-Stack Engineer',
    'Problem Solver',
    'Code Enthusiast',
  ],


  stats: { years: YEARS_OF_EXPERIENCE },

  skills: {
    'Frontend Development': {
      icon: 'Palette',
      color: 'from-blue-500 to-cyan-500',
      items: ['React', 'Tailwind CSS', 'React Router', 'Vite', 'HTML/CSS', 'JavaScript'],
    },
    'Backend Development': {
      icon: 'Server',
      color: 'from-green-500 to-emerald-500',
      items: ['Node.js', 'Express.js','Postman', 'REST APIs', 'JWT', 'RBAC', 'PHP', 'TypeScript'],
    },  
    'Database & DevOps': {
      icon: 'Database',
      color: 'from-purple-500 to-pink-500',
      items: ['MongoDB', 'MySQL', 'OpenSearch', 'Git', 'GitHub', 'AWS', 'Docker', 'Vercel', 'Render'],
    },
    'AI & Python': {
      icon: 'Brain',
      color: 'from-orange-500 to-red-500',
      items: ['Python', 'Flask', 'TensorFlow', 'OpenCV'],
    },
  },

  experience: [
    {
      title: "Software Developer",
      company: "Forensic CyberTech",
      location: "ahemdabad / India",
      date: "May 2026 – Present",
      duration: "Ongoing",
      type: "Full-time",
      status: "Ongoing",
      description: "Transitioned to a full-time role to anchor the development of cybersecurity platforms and threat intelligence tools.",
      points: [
        "Leading development of new cybersecurity tools and platform features",
        "Authentication, role-based access control, and secure API design",
        "Designing scalable database architectures and data refinement pipelines",
        "Optimizing application performance across frontend and backend"
      ],
      tech: ["Next.js", "TypeScript", "MongoDB", "Node.js", "REST APIs"],
      
    },
    {
      title: "React Developer Intern",
      company: "Forensic CyberTech",
      location: "ahemdabad / India",
      date: "Nov 2025 – Apr 2026",
      duration: "6 Months",
      type: "Internship",
      status: "Completed",
      description: "Worked on cybersecurity-focused platforms with full-stack responsibilities beyond assigned frontend role.",
      points: [
        "Developed IOC Analyzer platform for fetching and analyzing Indicators of Compromise (IOCs)",
        "Built using Next.js, TypeScript, and MongoDB with scalable architecture",
        "Handled both frontend and backend responsibilities despite frontend role",
        "Worked with real-world threat intelligence and cybersecurity datasets",
        "Optimized performance for handling large IOC datasets"
      ],
      tech: ["Next.js", "TypeScript", "MongoDB", "React", "Node.js"],
      relatedProjectId: "ioc-analyzer"
    },
    {
      title: 'MERN Stack Developer Intern',
      company: 'CreArt Solutions Pvt. Ltd.',
      location: 'Ahmedabad, Gujarat',
      date: 'June 2025',
      duration: '1 Month',
      type: 'Internship',
      status: 'Completed',
      description: 'Gained hands-on full-stack experience using MERN technologies during intensive 1-month internship.',
      points: [
        'Developed Employee Management System modules using MERN stack within tight deadlines',
        'Implemented JWT authentication and Role-Based Access Control (RBAC)',
        'Built responsive React + Tailwind CSS UI components',
        'Collaborated in Agile environment with daily standups',
        'Practiced industry-standard code reviews and Git version control',
      ],
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Mongoose', 'Tailwind CSS'],
    }],

  education: [{
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Hemchandracharya North Gujarat University',
    location: 'Mahesana, Gujarat',
    years: '2022 –   2026',
    gpa: '	8.84 / 10',
    status: 'In Progress',
    subjects: ['DSA', 'DBMS', 'Web Technologies', 'Software Engineering', 'Computer Networks', 'Operating Systems'],
    journey: [
      { year: '2022', title: 'Started Learning', desc: 'HTML, CSS, JavaScript fundamentals', color: 'green' },
      { year: '2023', title: 'MERN Stack', desc: 'React, Node.js, Express, MongoDB deep dive', color: 'blue' },
      { year: '2024', title: 'Real Projects', desc: '5+ full-stack apps + internship experience', color: 'purple' },
      { year: '2025', title: 'Advanced Projects + Internship', desc: 'Built 7+ projects and working as a React developer intern in cybersecurity domain', color: 'purple' },
      { year: 'Now', title: 'Working Full-time  ', desc: 'Software Developer at forensic cyberTech ', color: 'orange' },
    ],
  }],
  summary: `Aspiring Software Developer with ${YEARS_OF_EXPERIENCE}+ year hands-on experience in MERN stack. Built secure, responsive applications with authentication, CRUD operations, and modern cloud deployments through personal projects and internship experience.`,

  projects: [
    {
      id: "ioc-analyzer",
      name: "IOC Analyzer",
      tagline: "Cybersecurity platform for fetching and analyzing threat intelligence (IOCs)",
      category: "Software Security",
      year: "2025–Present",
      status: "Ongoing",
      featured: true,
      demoAvailable: true,
      description: "Software cybersecurity platform that fetches and analyzes Indicators of Compromise (IOCs) including IPs, domains, and hashes using external threat intelligence sources.",
      problem: "Security analysts struggle to manually gather and analyze IOC data from multiple sources, leading to slow threat response.",
      solution: "Built an automated IOC analysis platform that aggregates threat data, processes it efficiently, and presents insights through a clean UI.",
      tech: ["Next.js", "TypeScript", "MongoDB", "Node.js", "REST APIs"],
       links: {
        demo: 'https://ioc-analyzer.vercel.app/',
        code: 'https://github.com/dhruvprajapati002/IOC-Analyzer',
      },
      features: [
        "IOC fetching (IPs, domains, hashes)",
        "Threat intelligence aggregation",
        "Fast search and filtering system",
        "Scalable backend with MongoDB",
        "Clean dashboard UI for analysis"
      ],
      arch :{
        title: "Threat Intelligence Aggregation Pipeline",
        nodes: [
          { id: 'client', label: 'Next.js Frontend', layer: 0, type: 'frontend', accent: true },
          { id: 'api', label: 'Node.js Backend', layer: 1, type: 'backend' },
          { id: 'aggregator', label: 'Data Refinement Engine', layer: 2, type: 'service' },
          { id: 'mongo', label: 'MongoDB Cache', layer: 2, type: 'database' },
          { id: 'threat', label: 'VirusTotal, AbuseIPDB, MalwareBazaar, URLhaus, ThreatFox, IPQS, GreyNoise', layer: 3, type: 'external' },
        ],
        edges: [
          { from: 'client', to: 'api', label: 'Search IOC Request' },
          { from: 'api', to: 'mongo', label: 'Check Cache' },
          { from: 'api', to: 'aggregator', label: 'Dispatch Searches' },
          { from: 'aggregator', to: 'threat', label: 'Query Threat Platforms' },
          { from: 'threat', to: 'aggregator', label: 'Raw Responses' },
          { from: 'aggregator', to: 'api', label: 'Refined & Standardized Data' },
          { from: 'api', to: 'mongo', label: 'Store Cache' },
          { from: 'api', to: 'client', label: 'Aggregated Threat Report' },
        ],
      }
    },
    {
      id: 'hotel-booking',
      name: 'Hotel Booking System',
      tagline: 'Real-time room management with automated email workflows',
      category: 'Software Development',
      year: '2024',
      status: 'Completed',
      featured: true,
      demoAvailable: false,
      description: 'Full-stack booking platform with user authentication, real-time room availability, booking cancellations, and automated email confirmations via PHPMailer.',
      problem: 'Hotel staff managed bookings manually via spreadsheets, causing double-bookings and missed confirmation emails.',
      solution: 'Built a web-based system with real-time room state, automated email pipelines, and admin dashboard — reducing booking errors to zero.',
      tech: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'PHPMailer', 'Bootstrap'],
      links: { code: 'https://github.com/dhruvprajapati002/HotelBooking' },
      features: [
        'Real-time room availability matrix',
        'Secure booking & cancellation flow',
        'Automated email confirmations via PHPMailer',
        'Admin dashboard with booking overview',
        'Session-based authentication',
      ],
      arch: {
        title: 'System Architecture',
        nodes: [
          { id: 'user', label: 'User Browser', layer: 0, type: 'client' },
          { id: 'front', label: 'HTML/JS/CSS', layer: 1, type: 'frontend' },
          { id: 'php', label: 'PHP Backend', layer: 2, type: 'backend', accent: true },
          { id: 'session', label: 'Session Auth', layer: 2, type: 'service' },
          { id: 'mysql', label: 'MySQL DB', layer: 3, type: 'database' },
          { id: 'mailer', label: 'PHPMailer', layer: 3, type: 'service' },
          { id: 'email', label: 'Email Inbox', layer: 4, type: 'output' },
          { id: 'admin', label: 'Admin Panel', layer: 4, type: 'output' },
        ],
        edges: [
          { from: 'user', to: 'front', label: 'HTTP Request' },
          { from: 'front', to: 'php', label: 'Form Submit' },
          { from: 'php', to: 'session', label: 'Auth Check' },
          { from: 'php', to: 'mysql', label: 'CRUD Queries' },
          { from: 'php', to: 'mailer', label: 'Trigger Email' },
          { from: 'mailer', to: 'email', label: 'SMTP Send' },
          { from: 'mysql', to: 'admin', label: 'Read Bookings' },
        ],
      },
    },
    {
      id: 'medical-enhancer',
      name: 'Medical Image Enhancer',
      tagline: 'EDSR deep learning model for grayscale medical upscaling',
      category: 'AI / Machine Learning',
      year: '2024–2025',
      status: 'Completed',
      featured: true,
      demoAvailable: true,
      description: 'AI-powered Flask app using Enhanced Deep Super-Resolution (EDSR) model to upscale grayscale medical images with noise reduction in real time.',
      problem: 'Low-resolution medical scans from older equipment make diagnosis difficult. Manual enhancement is slow and inconsistent.',
      solution: 'Deployed EDSR deep learning model behind a Flask API. Users upload images and receive enhanced outputs in seconds via a Hugging Face Space.',
      tech: ['Python', 'Flask', 'TensorFlow', 'OpenCV', 'HTML5', 'CSS3', 'JavaScript'],
      links: {
        demo: 'https://huggingface.co/spaces/dhruv020/EDSR-model',
        code: 'https://github.com/dhruvprajapati002/Emage_Enhancer',
      },
      features: [
        'EDSR model with 4× upscaling factor',
        'Real-time image processing pipeline',
        'OpenCV noise reduction preprocessing',
        'Drag-and-drop upload interface',
        'Side-by-side before/after comparison',
      ],
      arch: {
        title: 'ML Pipeline Architecture',
        nodes: [
          { id: 'upload', label: 'Image Upload', layer: 0, type: 'client' },
          { id: 'flask', label: 'Flask API', layer: 1, type: 'backend', accent: true },
          { id: 'opencv', label: 'OpenCV Preprocess', layer: 2, type: 'service' },
          { id: 'edsr', label: 'EDSR TF Model', layer: 2, type: 'ai' },
          { id: 'postproc', label: 'Post-Process', layer: 3, type: 'service' },
          { id: 'output', label: 'Enhanced Image', layer: 4, type: 'output' },
          { id: 'hf', label: 'HuggingFace Space', layer: 0, type: 'infra' },
        ],
        edges: [
          { from: 'upload', to: 'flask', label: 'multipart/form-data' },
          { from: 'flask', to: 'opencv', label: 'Raw pixels' },
          { from: 'opencv', to: 'edsr', label: 'Cleaned tensor' },
          { from: 'edsr', to: 'postproc', label: '4× output' },
          { from: 'postproc', to: 'output', label: 'PNG response' },
          { from: 'hf', to: 'flask', label: 'Hosts app' },
        ],
      },
    },
    {
      id: 'weather-dashboard',
      name: 'Weather Dashboard',
      tagline: 'Live forecasts, Chart.js visualizations, geolocation',
      category: 'Frontend Development',
      year: '2024',
      status: 'Completed',
      featured: false,
      demoAvailable: true,
      description: 'Interactive React app with real-time weather data, 5-day forecasts, animated Chart.js charts, dark mode, and intelligent city search with geolocation.',
      problem: 'Most weather apps are either too complex or too simple — lacking data visualization and live API integration in a clean UI.',
      solution: 'Built a full-stack React + Express app that caches API responses in MongoDB, serves live data, and visualizes it with animated Chart.js graphs.',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Chart.js', 'OpenWeatherMap API'],
      links: {
        demo: 'https://weather-dashboard-cq8s.vercel.app/',
        code: 'https://github.com/dhruvprajapati002/weather-dashboard',
      },
      features: [
        'Live data from OpenWeatherMap API',
        '5-day forecast with animated bar chart',
        'Geolocation auto-detect on load',
        'City search with debounce',
        'Dark / light mode toggle',
      ],
      arch: {
        title: 'Data Flow Architecture',
        nodes: [
          { id: 'react', label: 'React UI', layer: 0, type: 'frontend', accent: true },
          { id: 'express', label: 'Express API', layer: 1, type: 'backend' },
          { id: 'mongo', label: 'MongoDB Cache', layer: 2, type: 'database' },
          { id: 'owm', label: 'OpenWeatherMap', layer: 2, type: 'external' },
          { id: 'chartjs', label: 'Chart.js Layer', layer: 0, type: 'frontend' },
          { id: 'geo', label: 'Geolocation API', layer: 0, type: 'browser' },
        ],
        edges: [
          { from: 'react', to: 'express', label: 'City query' },
          { from: 'express', to: 'mongo', label: 'Cache check' },
          { from: 'express', to: 'owm', label: 'Fetch if stale' },
          { from: 'owm', to: 'mongo', label: 'Store response' },
          { from: 'express', to: 'react', label: 'JSON weather' },
          { from: 'react', to: 'chartjs', label: 'Render chart' },
          { from: 'geo', to: 'react', label: 'lat/lng coords' },
        ],
      },
    },
    {
      id: 'passguard',
      name: 'PassGuard',
      tagline: 'AES-256 encrypted MERN password vault with JWT auth',
      category: 'Full-Stack Security',
      year: '2024',
      status: 'Completed',
      featured: true,
      demoAvailable: true,
      description: 'Secure MERN password manager with AES-256 client-side encryption, strength analysis, categorized vault storage, and JWT authentication.',
      problem: 'Storing passwords in browsers or plain text is dangerous. Existing managers are expensive or closed-source.',
      solution: 'Built an open-source vault where passwords are encrypted on the client before ever leaving the browser, then stored as ciphertext in MongoDB.',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS', 'Crypto-JS', 'JWT'],
      links: {
        demo: 'https://pass-guard-pink.vercel.app/',
        code: 'https://github.com/dhruvprajapati002/PassGuard',
      },
      features: [
        'AES-256 encryption before API transit',
        'Password strength meter (zxcvbn)',
        'Category-based vault organizer',
        'JWT httpOnly cookie auth',
        'Password generator (customizable)',
      ],
      arch: {
        title: 'Security Architecture',
        nodes: [
          { id: 'browser', label: 'React Browser', layer: 0, type: 'client' },
          { id: 'cryptojs', label: 'Crypto-JS (AES)', layer: 0, type: 'security', accent: true },
          { id: 'jwt', label: 'JWT Middleware', layer: 1, type: 'security' },
          { id: 'express', label: 'Express API', layer: 1, type: 'backend' },
          { id: 'bcrypt', label: 'Bcrypt Hash', layer: 2, type: 'security' },
          { id: 'mongo', label: 'MongoDB Atlas', layer: 3, type: 'database' },
        ],
        edges: [
          { from: 'browser', to: 'cryptojs', label: 'Plaintext' },
          { from: 'cryptojs', to: 'express', label: 'AES Ciphertext' },
          { from: 'express', to: 'jwt', label: 'Verify token' },
          { from: 'express', to: 'bcrypt', label: 'Hash master pw' },
          { from: 'express', to: 'mongo', label: 'Store encrypted' },
          { from: 'mongo', to: 'cryptojs', label: 'Decrypt on read' },
        ],
      },
    },
    {
      id: 'movieflix',
      name: 'MovieFlix',
      tagline: 'Netflix-inspired TMDB browsing app with state management',
      category: 'Frontend Development',
      year: '2025',
      status: 'Completed',
      featured: true,
      demoAvailable: true,
      description: 'Netflix-inspired React app with TMDB API integration, movie search, genre filtering, favorites management via Context API, and dynamic routing.',
      problem: 'TMDB API is powerful but raw — no clean UI for browsing, saving favorites, or deep-diving into movie details.',
      solution: 'Built a React SPA that acts as a polished TMDB client with search debounce, genre filters, persistent watchlist, and animated route transitions.',
      tech: ['React', 'JavaScript', 'Tailwind CSS', 'TMDB API', 'Context API', 'React Router', 'Axios', 'Vite'],
      links: {
        demo: 'https://movieflix-beta-seven.vercel.app/',
        code: 'https://github.com/dhruvprajapati002/movieflix',
      },
      features: [
        'TMDB REST API integration via Axios',
        'Debounced search with live results',
        'Genre + rating filters',
        'Global state via Context API',
        'Animated route transitions',
      ],
      arch: {
        title: 'Frontend Architecture',
        nodes: [
          { id: 'router', label: 'React Router', layer: 0, type: 'frontend', accent: true },
          { id: 'context', label: 'Context + State', layer: 0, type: 'frontend' },
          { id: 'pages', label: 'Pages (Home/Detail/Search)', layer: 1, type: 'frontend' },
          { id: 'axios', label: 'Axios Layer', layer: 2, type: 'service' },
          { id: 'tmdb', label: 'TMDB API', layer: 3, type: 'external' },
          { id: 'local', label: 'localStorage', layer: 1, type: 'storage' },
        ],
        edges: [
          { from: 'router', to: 'pages', label: 'Route match' },
          { from: 'context', to: 'pages', label: 'Global state' },
          { from: 'pages', to: 'axios', label: 'Data request' },
          { from: 'axios', to: 'tmdb', label: 'GET /movie/*' },
          { from: 'tmdb', to: 'axios', label: 'JSON response' },
          { from: 'context', to: 'local', label: 'Persist watchlist' },
        ],
      },
    },
    {
      id: 'age-calculator',
      name: 'Age Calculator',
      tagline: 'Precise multi-unit calculator — years to seconds',
      category: 'Frontend Development',
      year: '2024',
      status: 'Completed',
      featured: false,
      demoAvailable: true,
      description: 'React app computing precise age across years, months, days, hours, minutes, and seconds — with date validation, error handling, and Dockerized deployment.',
      problem: 'Most age calculators show only years, missing the granular breakdown users want for milestones.',
      solution: 'Built a clean React utility with date-fns for precision math, validation edge cases handled, and deployed as a Docker container on Vercel.',
      tech: ['React', 'JavaScript', 'Tailwind CSS', 'Date-fns', 'Vite', 'Docker'],
      links: {
        demo: 'https://birthdaymath.vercel.app/',
        code: 'https://github.com/dhruvprajapati002/age-calculator',
      },
      features: [
        'Precise 6-unit age breakdown',
        'Date input validation & error states',
        'Real-time recalculation',
        'Dockerized container build',
        'Mobile-first responsive design',
      ],
      arch: {
        title: 'Component Architecture',
        nodes: [
          { id: 'input', label: 'DateInput Component', layer: 0, type: 'frontend' },
          { id: 'state', label: 'React useState', layer: 1, type: 'frontend', accent: true },
          { id: 'datefns', label: 'date-fns Library', layer: 2, type: 'service' },
          { id: 'calc', label: 'Calc Engine', layer: 2, type: 'service' },
          { id: 'display', label: 'Result Grid', layer: 3, type: 'frontend' },
          { id: 'docker', label: 'Docker Container', layer: 0, type: 'infra' },
          { id: 'vercel', label: 'Vercel CDN', layer: 0, type: 'infra' },
        ],
        edges: [
          { from: 'input', to: 'state', label: 'onChange' },
          { from: 'state', to: 'calc', label: 'Date object' },
          { from: 'calc', to: 'datefns', label: 'diff()' },
          { from: 'datefns', to: 'display', label: 'Duration object' },
          { from: 'docker', to: 'vercel', label: 'Deploy image' },
        ],
      },
    },
  ],
};

// ─── Computed stats (auto-derived — never edit these manually) ───────────────

export const computedStats = {

  // Total projects = length of projects array
  projects: site.projects.length,

  // Years experience = manual, update when it grows
  years: site.stats.years,

  // Total unique technologies across ALL skill categories
  technologies: new Set(
    Object.values(site.skills).flatMap(cat => cat.items)
  ).size,

  // Per-category skill counts — used in SkillsSection badges
  skillCounts: Object.fromEntries(
    Object.entries(site.skills).map(([label, cat]) => [label, cat.items.length])
  ) as Record<string, number>,

  // Category key → count map for TechGlobe filter badges
  categoryCount: {
    frontend: site.skills['Frontend Development'].items.length,
    backend: site.skills['Backend Development'].items.length,
    database: site.skills['Database & DevOps'].items.length,
    ai: site.skills['AI & Python'].items.length,
  },

};
