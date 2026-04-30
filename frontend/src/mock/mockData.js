// Mock data sourced from LinkedIn PDF + GitHub (Diptesh-coder)
// Will later be replaced/augmented via backend integration.

export const personalInfo = {
  name: "Diptesh Maji",
  firstName: "Diptesh",
  lastName: "Maji",
  title: "AI/ML Engineer",
  subtitle: "Full Stack Developer",
  tagline: "Building intelligent systems with scalable full-stack solutions",
  bio: "B.Tech student in Artificial Intelligence & Machine Learning at Asansol Engineering College. I build production-grade AI systems \u2014 from permission-safe RAG platforms and multi-agent research assistants to deep-learning driven health prediction tools. Passionate about shipping intelligent, scalable, and elegant full-stack products.",
  location: "Asansol, West Bengal, India",
  email: "diptesh.aiml.aec@gmail.com",
  linkedin: "https://www.linkedin.com/in/diptesh-maji-468138168/",
  github: "https://github.com/Diptesh-coder",
  availability: "Open to internship & collaboration opportunities",
};

export const aboutHighlights = [
  {
    label: "Focus",
    value: "AI / ML Engineering",
  },
  {
    label: "Stack",
    value: "Python \u00b7 React \u00b7 FastAPI",
  },
  {
    label: "Specialty",
    value: "RAG \u00b7 LLM Orchestration",
  },
  {
    label: "Status",
    value: "B.Tech \u2014 CSE (AI & ML)",
  },
];

export const coreSkills = [
  "Machine Learning",
  "Deep Learning",
  "Full Stack Development",
  "Retrieval-Augmented Generation",
  "Role-Based Access Control",
  "LLM Orchestration",
];

export const skillCategories = [
  {
    id: "ai",
    name: "AI / ML",
    color: "#22d3ee",
    skills: [
      { name: "PyTorch", level: 88 },
      { name: "TensorFlow", level: 82 },
      { name: "LangChain", level: 90 },
      { name: "Scikit-learn", level: 92 },
      { name: "RAG Pipelines", level: 90 },
      { name: "Groq / LLaMA", level: 85 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    color: "#818cf8",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "Python", level: 94 },
      { name: "Node.js", level: 78 },
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 76 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    color: "#a78bfa",
    skills: [
      { name: "React", level: 88 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Three.js", level: 74 },
      { name: "Framer Motion", level: 82 },
      { name: "TypeScript", level: 76 },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    color: "#38bdf8",
    skills: [
      { name: "Git & GitHub", level: 92 },
      { name: "Docker", level: 72 },
      { name: "Linux", level: 80 },
      { name: "VS Code", level: 95 },
      { name: "Jupyter", level: 90 },
      { name: "Postman", level: 84 },
    ],
  },
];

export const projects = [
  {
    id: "ragvault",
    name: "RAGVault",
    subtitle: "Permission-Safe AI Platform",
    description:
      "A production-ready Retrieval-Augmented Generation platform with enterprise-grade Role-Based Access Control. Documents, vectors and LLM responses stay strictly scoped to the requesting user's permissions.",
    highlights: [
      "Fine-grained RBAC for vector retrieval",
      "Multi-tenant document isolation",
      "Streaming LLM responses with citation",
    ],
    stack: ["React", "FastAPI", "LangChain", "Postgres", "pgvector", "JWT"],
    github: "https://github.com/Diptesh-coder/RAGVault--Permission-Safe-AI-Platform",
    demo: null,
    accent: "#22d3ee",
    featured: true,
  },
  {
    id: "ai-uml",
    name: "AI UML Generator",
    subtitle: "Docs \u2192 Diagrams, automatically",
    description:
      "AI-powered automated UML diagram generator built on FastAPI + LangChain + Groq (llama-3.3-70b). Parses technical docs and emits clean PlantUML diagrams inside a modern web UI.",
    highlights: [
      "LLM-driven document analysis",
      "PlantUML rendering pipeline",
      "Fast inference via Groq",
    ],
    stack: ["FastAPI", "LangChain", "Groq", "PlantUML", "Python"],
    github: "https://github.com/Diptesh-coder/AI_UML_Generator",
    demo: null,
    accent: "#818cf8",
    featured: true,
  },
  {
    id: "mini-chatgpt",
    name: "Mini-ChatGPT",
    subtitle: "Conversational AI, from scratch",
    description:
      "A lightweight ChatGPT-style conversational assistant with session memory, streaming replies and a clean chat interface \u2014 built to demystify LLM orchestration end-to-end.",
    highlights: [
      "Session-aware chat memory",
      "Streaming token output",
      "Clean, minimal chat UI",
    ],
    stack: ["Python", "LLM APIs", "NLP", "Flask"],
    github: "https://github.com/Diptesh-coder/Mini-ChatGPT",
    demo: null,
    accent: "#a78bfa",
    featured: true,
  },
  {
    id: "multi-agent",
    name: "Multi-Agent Research Synthesis",
    subtitle: "Autonomous research crew",
    description:
      "An orchestrated multi-agent system where specialized agents plan, search, read and synthesize research answers with citations \u2014 turning vague questions into structured knowledge.",
    highlights: [
      "Planner / Researcher / Writer agents",
      "Tool-using web + doc retrieval",
      "Cited, structured outputs",
    ],
    stack: ["LangGraph", "Python", "OpenAI", "Tavily"],
    github: "https://github.com/Diptesh-coder",
    demo: null,
    accent: "#38bdf8",
    featured: true,
  },
  {
    id: "diabetes",
    name: "Diabetes Prediction",
    subtitle: "ML for preventive healthcare",
    description:
      "Predictive analytics system that identifies diabetes risk from patient health metrics \u2014 covering preprocessing, feature engineering, model training and evaluation end-to-end.",
    highlights: [
      "Feature engineering pipeline",
      "Multiple classifier benchmark",
      "Clear evaluation reports",
    ],
    stack: ["Python", "scikit-learn", "pandas", "Jupyter"],
    github: "https://github.com/Diptesh-coder/Diabetes-Prediction",
    demo: null,
    accent: "#67e8f9",
    featured: false,
  },
  {
    id: "genai-mini",
    name: "Generative AI Mini Projects",
    subtitle: "Experiments & notebooks",
    description:
      "A curated collection of compact generative-AI experiments \u2014 prompt engineering, embeddings, small RAG demos and LLM-powered utilities \u2014 all documented in Jupyter.",
    highlights: [
      "Prompt engineering patterns",
      "Embeddings & similarity demos",
      "RAG building blocks",
    ],
    stack: ["Python", "Jupyter", "LangChain", "OpenAI"],
    github: "https://github.com/Diptesh-coder/Generative-AI-Mini-Projects",
    demo: null,
    accent: "#c4b5fd",
    featured: false,
  },
];

export const experience = [
  {
    id: "exp-1",
    role: "AI Engineer \u2014 Independent Projects",
    company: "Self-directed",
    period: "2024 \u2014 Present",
    description:
      "Designing and shipping AI-first products: RAGVault (permission-safe RAG), AI UML Generator, and multi-agent research systems. Focused on LLM orchestration, retrieval and clean full-stack delivery.",
    tags: ["LangChain", "FastAPI", "React", "RAG"],
  },
  {
    id: "exp-2",
    role: "Data Analytics Job Simulation",
    company: "Deloitte Australia \u00b7 Forage",
    period: "2024",
    description:
      "Completed a Deloitte-designed virtual job simulation covering data analysis, dashboard design, forensic technology and coding \u2014 translating raw data into executive-level insight.",
    tags: ["Data Analytics", "Dashboards", "Insights"],
  },
  {
    id: "exp-3",
    role: "B.Tech \u2014 CSE (AI & ML)",
    company: "Asansol Engineering College",
    period: "Sep 2023 \u2014 Jul 2026",
    description:
      "Undergraduate specialization in Artificial Intelligence & Machine Learning. Strong foundation in Python, C++ (OOP), data structures, deep learning and modern data-science methodology.",
    tags: ["AI & ML", "Python", "C++", "Deep Learning"],
  },
];

export const certifications = [
  {
    id: "cert-deloitte",
    name: "Deloitte Australia \u2014 Data Analytics Job Simulation",
    issuer: "Forage",
  },
  { id: "cert-ai-eng", name: "AI Engineer Certification", issuer: "Professional" },
  { id: "cert-py-workshop", name: "Python \u2014 3hr Workshop Certificate", issuer: "Workshop" },
];

export const socials = [
  {
    name: "GitHub",
    handle: "@Diptesh-coder",
    url: "https://github.com/Diptesh-coder",
  },
  {
    name: "LinkedIn",
    handle: "diptesh-maji-468138168",
    url: "https://www.linkedin.com/in/diptesh-maji-468138168/",
  },
  {
    name: "Email",
    handle: "diptesh.aiml.aec@gmail.com",
    url: "mailto:diptesh.aiml.aec@gmail.com",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
