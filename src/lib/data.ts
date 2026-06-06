export type Lang = "en" | "es";

export const PROFILE = {
  name: "Lucas Curto",
  role: { en: "Full-Stack Software Developer", es: "Desarrollador Full-Stack" },
  roleAccent: { en: "backend-driven", es: "orientado al backend" },
  location: "Montevideo, Uruguay",
  email: "lucascurtoo@gmail.com",
  linkedin: "https://www.linkedin.com/in/lucas-curto/",
  github: "https://github.com/lucascurto",
  phone: "+598 91886037",
  tagline: {
    en: "I own the backend. I ship the frontend. I run the infra — NestJS, Next.js, AWS. One developer, end to end.",
    es: "Domino el backend. Construyo el frontend. Manejo la infra — NestJS, Next.js, AWS. Un desarrollador, de punta a punta.",
  },
};

export const NAV_ITEMS = [
  { id: "about",      en: "About",      es: "Sobre mí" },
  { id: "projects",   en: "Projects",   es: "Proyectos" },
  { id: "skills",     en: "Skills",     es: "Skills" },
  { id: "experience", en: "Experience", es: "Experiencia" },
  { id: "education",  en: "Education",  es: "Educación" },
  { id: "contact",    en: "Contact",    es: "Contacto" },
];

export const PROJECTS = [
  {
    name: "Varel",
    tagline: {
      en: "My own watch e-commerce — Casio, Q&Q and more",
      es: "Mi propio e-commerce de relojes — Casio, Q&Q y más",
    },
    description: {
      en: "Built end-to-end: Medusa v2 headless backend, Next.js 15 storefront, self-hosted on Dokploy. Handles catalog, cart, orders, and email notifications.",
      es: "Construido de punta a punta: backend headless con Medusa v2, storefront en Next.js 15, self-hosted en Dokploy. Gestiona catálogo, carrito, pedidos y notificaciones por email.",
    },
    tags: ["Medusa v2", "Next.js 15", "PostgreSQL", "Redis", "Cloudflare R2", "Dokploy"],
    url: "https://varel.uy",
    github: null,
    type: { en: "Personal project · Live", es: "Proyecto personal · En vivo" },
    featured: true,
  },
  {
    name: "Alher Distribuidora",
    tagline: {
      en: "Stock control system with thermal ticket printing",
      es: "Sistema de control de stock con impresión de tickets térmicos",
    },
    description: {
      en: "Internal software for a distributor: product inventory, movement tracking, and direct thermal ticket printing. Built end-to-end solo.",
      es: "Software interno para una distribuidora: inventario de productos, registro de movimientos e impresión directa de tickets térmicos. Full-stack construido solo.",
    },
    tags: ["NestJS", "Next.js", "PostgreSQL", "React Query", "Zustand"],
    url: null,
    github: null,
    type: { en: "Client project · Private", es: "Proyecto cliente · Privado" },
    featured: true,
  },
  {
    name: "Gastito",
    tagline: {
      en: "AI-powered personal expense tracker",
      es: "Control de gastos personales con IA",
    },
    description: {
      en: "Log expenses by photo, text, or PDF. Claude + Gemini extract amounts and categories automatically. Push notifications for budget alerts. Built with Next.js and Supabase.",
      es: "Registrá gastos por foto, texto o PDF. Claude + Gemini extraen montos y categorías automáticamente. Notificaciones push para alertas de presupuesto. Construido con Next.js y Supabase.",
    },
    tags: ["Next.js", "Supabase", "Claude AI", "Gemini", "Groq", "OCR", "Web Push"],
    url: null,
    github: null,
    type: { en: "Personal project", es: "Proyecto personal" },
    featured: true,
  },
  {
    name: "CRM Platform",
    tagline: {
      en: "Multiple CRMs built — Meta & WhatsApp integrations",
      es: "Múltiples CRMs desarrollados — integraciones Meta y WhatsApp",
    },
    description: {
      en: "Designed and built several CRM systems from scratch with Meta (Facebook/Instagram) and WhatsApp Business API integrations. Automated lead capture, conversation flows, and contact management.",
      es: "Diseñé y construí varios CRMs desde cero con integraciones de Meta (Facebook/Instagram) y WhatsApp Business API. Captura automatizada de leads, flujos de conversación y gestión de contactos.",
    },
    tags: ["NestJS", "React", "WhatsApp API", "Meta API", "MongoDB", "WebSockets"],
    url: null,
    github: null,
    type: { en: "Various clients · Private", es: "Varios clientes · Privado" },
    featured: false,
  },
];

export const SKILLS = [
  {
    group: { en: "Backend", es: "Backend" },
    items: [
      { name: "NestJS", slug: "nestjs" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "DDD", slug: null },
      { name: "REST APIs", slug: null },
    ],
  },
  {
    group: { en: "Frontend", es: "Frontend" },
    items: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Redux Toolkit", slug: "redux" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Zustand", slug: null },
      { name: "React Query", slug: "reactquery" },
      { name: "shadcn/ui", slug: "shadcnui" },
      { name: "Figma", slug: "figma" },
    ],
  },
  {
    group: { en: "Cloud & DevOps", es: "Cloud & DevOps" },
    items: [
      { name: "AWS", slug: "amazonwebservices" },
      { name: "Docker", slug: "docker" },
      { name: "Docker Compose", slug: "docker" },
      { name: "Dokploy", slug: null },
      { name: "CI/CD", slug: null },
    ],
  },
  {
    group: { en: "Soft Skills", es: "Habilidades Blandas" },
    items: [
      { name: "Technical Ownership", slug: null },
      { name: "System Design", slug: null },
      { name: "Problem Solving", slug: null },
      { name: "Team Collaboration", slug: null },
      { name: "English B2", slug: null },
    ],
  },
];

export const EXPERIENCE = [
  {
    role: { en: "Mid-level Software Developer", es: "Desarrollador de Software Semi-Senior" },
    company: "Global Assist",
    period: { en: "Aug 2024 — Present", es: "Ago 2024 — Presente" },
    current: true,
    points: {
      en: [
        "Migrated the entire backend architecture to DDD — making a legacy system maintainable and extensible.",
        "Built a parallel MongoDB database to handle sessions and real-time notifications without loading the main system.",
        "Replaced the old component library with shadcn/ui and rebuilt dynamic dashboards with NestJS + React + WebSockets.",
        "Implemented backend monitoring with Prometheus via interceptors.",
        "Owned deployment: EC2, Secrets Manager, Docker, Dokploy — zero-downtime pipelines.",
      ],
      es: [
        "Migré toda la arquitectura backend a DDD — convirtiendo un sistema legacy en algo mantenible y extensible.",
        "Construí una base de datos paralela en MongoDB para manejar sesiones y notificaciones en tiempo real sin cargar el sistema principal.",
        "Reemplacé la librería de componentes con shadcn/ui y reconstruí dashboards dinámicos con NestJS + React + WebSockets.",
        "Implementé monitoreo del backend con Prometheus mediante interceptors.",
        "Lideré el deploy completo: EC2, Secrets Manager, Docker, Dokploy — pipelines sin downtime.",
      ],
    },
  },
  {
    role: { en: "Frontend Developer", es: "Desarrollador Frontend" },
    company: "Mayeutic",
    period: { en: "Nov 2023 — Jan 2024", es: "Nov 2023 — Ene 2024" },
    current: false,
    points: {
      en: [
        "Built the BackOffice admin panel from scratch — no handoff, just a design and a deadline.",
        "Refactored legacy code while shipping new features without breaking existing flows.",
        "Matched the product's design language across every new screen.",
      ],
      es: [
        "Construí el panel de administración BackOffice desde cero — sin handoff, solo un diseño y una fecha límite.",
        "Refactoricé código legacy mientras entregaba nuevas funcionalidades sin romper flujos existentes.",
        "Mantuve el lenguaje visual del producto en cada pantalla nueva.",
      ],
    },
  },
  {
    role: { en: "Software Developer Intern", es: "Practicante de Desarrollo de Software" },
    company: "Moove-it / Qubika",
    period: { en: "Apr 2021 — Nov 2022", es: "Abr 2021 — Nov 2022" },
    current: false,
    points: {
      en: [
        "Worked across the stack: JavaScript, React, Python, Django REST.",
        "Contributed to the company's public website alongside senior engineers.",
        "Paired with senior developers from week one — zero hand-holding.",
      ],
      es: [
        "Trabajé en todo el stack: JavaScript, React, Python, Django REST.",
        "Contribuí al sitio web público de la empresa junto a ingenieros senior.",
        "Hice pair con seniors desde la primera semana — sin período de adaptación.",
      ],
    },
  },
];

export const EDUCATION = [
  {
    title: { en: "Computer Engineering", es: "Ingeniería en Computación" },
    org: "FING, UDELAR",
    period: { en: "Mar 2025 — Present", es: "Mar 2025 — Presente" },
    current: true,
  },
  {
    title: { en: "Technical Education in IT — Software Development", es: "Bachillerato Tecnológico TIC — Desarrollo de Software" },
    org: "ÁNIMA · Bachillerato Tecnológico TIC",
    period: { en: "Feb 2020 — Nov 2022", es: "Feb 2020 — Nov 2022" },
    current: false,
  },
];

export const CERTS = [
  {
    title: { en: "Software Development Internship Completion", es: "Finalización de Pasantía en Desarrollo de Software" },
    org: "Moove-it",
    status: "done" as const,
  },
  {
    title: { en: "Complete Web & Mobile Designer: UI/UX, Figma +more", es: "Diseñador Web & Mobile Completo: UI/UX, Figma y más" },
    org: "Udemy",
    status: "done" as const,
  },
  {
    title: { en: "Microservices Architecture & Implementation", es: "Arquitectura e Implementación de Microservicios" },
    org: "Udemy",
    status: "progress" as const,
  },
];

export const TERMINAL_LINES = {
  en: [
    { type: "comment", text: "// lucas-curto.ts" },
    { type: "blank", text: "" },
    { type: "key", text: "const", val: "developer", rest: " = {" },
    { type: "prop", key: "  name", val: '"Lucas Curto"' },
    { type: "prop", key: "  stack", val: '["NestJS", "Next.js", "AWS"]' },
    { type: "prop", key: "  pattern", val: '"Domain-Driven Design"' },
    { type: "prop", key: "  ship", val: "true" },
    { type: "close", text: "};" },
    { type: "blank", text: "" },
    { type: "comment", text: "// always learning, always building" },
  ],
  es: [
    { type: "comment", text: "// lucas-curto.ts" },
    { type: "blank", text: "" },
    { type: "key", text: "const", val: "desarrollador", rest: " = {" },
    { type: "prop", key: "  nombre", val: '"Lucas Curto"' },
    { type: "prop", key: "  stack", val: '["NestJS", "Next.js", "AWS"]' },
    { type: "prop", key: "  patron", val: '"Domain-Driven Design"' },
    { type: "prop", key: "  prodListo", val: "true" },
    { type: "close", text: "};" },
    { type: "blank", text: "" },
    { type: "comment", text: "// siempre aprendiendo, siempre construyendo" },
  ],
};

export const COPY = {
  nav: { cta: { en: "Contact", es: "Contacto" } },
  hero: {
    cta1: { en: "See My Work", es: "Ver Mi Trabajo" },
    cta2: { en: "Contact", es: "Contacto" },
  },
  about: {
    eyebrow: { en: "01. About", es: "01. Sobre mí" },
    title: { en: "How I work", es: "Cómo trabajo" },
    body: {
      en: "I start with the domain, not the framework. Before writing a line of code I model the business problem — then build the API, the frontend, and the infrastructure around it. I've shipped 3 complete production systems end-to-end in my current role, applying Domain-Driven Design with NestJS and deploying on AWS.",
      es: "Empiezo por el dominio, no por el framework. Antes de escribir una línea de código, entiendo el problema de negocio — luego construyo la API, el frontend y la infraestructura alrededor. En mi rol actual entregué 3 sistemas completos en producción, de punta a punta, aplicando DDD con NestJS y desplegando en AWS.",
    },
    facts: {
      location: { en: "Location", es: "Ubicación" },
      focus: { en: "Approach", es: "Enfoque" },
      focusVal: { en: "DDD · Full-stack", es: "DDD · Full-stack" },
      english: { en: "English", es: "Inglés" },
      englishVal: { en: "B2 — work-ready", es: "B2 — nivel laboral" },
      available: { en: "Status", es: "Estado" },
      availableVal: { en: "Open to opportunities", es: "Abierto a oportunidades" },
    },
  },
  projects: {
    eyebrow: { en: "02. Projects", es: "02. Proyectos" },
    title: { en: "Things I've built", es: "Cosas que construí" },
    live: { en: "Live site", es: "Ver sitio" },
    private: { en: "Private", es: "Privado" },
  },
  skills: { eyebrow: { en: "03. Skills", es: "03. Skills" }, title: { en: "Tech stack", es: "Stack tecnológico" } },
  experience: { eyebrow: { en: "04. Experience", es: "04. Experiencia" }, title: { en: "Work history", es: "Historial laboral" } },
  education: { eyebrow: { en: "05. Education", es: "05. Educación" }, title: { en: "Education", es: "Educación" } },
  certs: { title: { en: "Certifications", es: "Certificaciones" } },
  contact: {
    eyebrow: { en: "06. Contact", es: "06. Contacto" },
    title: { en: "Ready to ship\ntogether.", es: "Listo para\nconstruir juntos." },
    body: {
      en: "Open to full-time roles and freelance projects. If you have something interesting — distributed systems, DDD, or anything with serious backend depth — let's talk.",
      es: "Abierto a oportunidades full-time y proyectos freelance. Si tenés algo interesante — sistemas distribuidos, DDD, o cualquier cosa con un backend serio detrás — hablemos.",
    },
    links: {
      email: { en: "Send an email", es: "Enviar un email" },
      linkedin: { en: "Connect on LinkedIn", es: "Conectar en LinkedIn" },
      github: { en: "View GitHub", es: "Ver GitHub" },
      phone: { en: "Call / WhatsApp", es: "Llamar / WhatsApp" },
    },
  },
  footer: {
    built: { en: "Built with Next.js & Tailwind", es: "Construido con Next.js & Tailwind" },
  },
};
