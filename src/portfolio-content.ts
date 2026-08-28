export type ExperienceItem = {
  period: string;
  role: string;
  organization: string;
  location?: string;
  summary: string;
  highlights: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const links = {
  github: 'https://github.com/andreglegg',
  linkedin: 'https://www.linkedin.com/in/andre-glegg-060a3164/',
  medium: 'https://medium.com/@andreglegg',
  email: 'mailto:andreglegg@me.com',
  resume: '/andre-glegg-resume.pdf',
  forgeGithub: 'https://github.com/andreglegg/forge',
  forgeNpm: 'https://www.npmjs.com/package/@aglegg/forge-harness',
  treegenGithub: 'https://github.com/andreglegg/treegen',
  aize: 'https://www.aize.io/',
  endlessSite: 'https://endlessdescent.andreglegg.no/',
  endlessIos: 'https://apps.apple.com/app/id6768305126',
  endlessAndroid: 'https://play.google.com/store/apps/details?id=no.andreglegg.endlessdescent',
  lastcoilIos: 'https://apps.apple.com/us/app/lastcoil-snake-battle-royale/id6758517312',
  lastcoilAndroid: 'https://play.google.com/store/apps/details?id=io.lastcoil.game',
} as const;

export const forgeInstallCommand = 'npm install --global @aglegg/forge-harness';

export const experience: ExperienceItem[] = [
  {
    period: 'Jul 2024 — Present',
    role: 'Independent Software Engineer & Product Builder',
    organization: 'Personal & Open-Source Projects',
    location: 'Norway',
    summary:
      'I design, build, ship and operate software across AI developer tooling, distributed systems, realtime multiplayer, procedural 3D and mobile products.',
    highlights: [
      'Built Forge, Cognara and treegen; shipped LastCoil and Endless Descent on iOS and Android.',
      'Own architecture, implementation, networking, persistence, testing, benchmarking, observability, deployment and release automation.',
    ],
  },
  {
    period: 'Aug 2021 — Jun 2024',
    role: 'Senior Software Engineer',
    organization: 'Aize AS',
    location: 'Oslo, Norway',
    summary:
      'Built browser-based 3D digital-twin viewers and engineering-document tools for navigating large, complex industrial datasets.',
    highlights: [
      'Worked across TypeScript/JavaScript, React/Angular, Three.js/WebGL, model navigation, annotations, document workflows and client-side data processing.',
      'Improved rendering, geometry-loading and interaction performance while strengthening automated testing and reliability.',
    ],
  },
  {
    period: 'Jun 2018 — Aug 2021',
    role: 'Full-Stack Developer / Team Lead',
    organization: 'Fjong Norge AS',
    location: 'Oslo, Norway',
    summary:
      'Led a four-person development team and owned delivery for a fashion-rental platform spanning customer flows, inventory, subscriptions, internal tools and cloud operations.',
    highlights: [
      'Built full-stack systems with JavaScript/TypeScript, Node.js/Express, .NET/C#, databases and Azure infrastructure.',
      'Designed Elasticsearch search and discovery, improved CI/CD, mentored developers and coordinated technical priorities.',
    ],
  },
  {
    period: 'Jan 2018',
    role: 'Programming Instructor',
    organization: 'Bitcamp / StartupLab',
    location: 'Oslo, Norway',
    summary: 'Taught programming fundamentals to students aged 7–16 at Oslo International School.',
    highlights: [],
  },
  {
    period: '2011 — 2017',
    role: 'Freelance Programmer',
    organization: 'Independent clients',
    location: 'Jamaica',
    summary: 'Built websites and mobile applications for iOS and Android for independent clients.',
    highlights: [],
  },
  {
    period: 'Oct 2008 — Nov 2011',
    role: 'Web & Mobile Application Developer',
    organization: 'Irie FM / Zip FM',
    location: 'Jamaica',
    summary: 'Built websites, digital-media systems, Linux servers and Shoutcast streaming infrastructure.',
    highlights: [],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend & 3D',
    items: ['TypeScript', 'React', 'Angular', 'Three.js', 'WebGL', 'RxJS', 'Godot'],
  },
  {
    label: 'Backend & Data',
    items: ['Node.js', 'Express', 'WebSockets', 'REST', 'GraphQL', 'PostgreSQL', 'Redis', 'Elasticsearch'],
  },
  {
    label: 'AI & Developer Systems',
    items: ['LLM agents', 'Local LLMs', 'MCP', 'TypeScript Compiler API', 'Rust', 'QUIC / iroh', 'Benchmarking'],
  },
  {
    label: 'Testing & Delivery',
    items: ['Vitest', 'Jest', 'Playwright', 'Docker', 'CI/CD', 'Azure DevOps', 'Fly.io', 'Firebase'],
  },
];

export const moreWork = [
  {
    name: 'LastCoil',
    eyebrow: 'Realtime multiplayer · iOS & Android',
    description:
      'A shipped multiplayer mobile game built with Three.js, TypeScript, Node.js, WebSockets, PostgreSQL and Redis, with bots, persistence, leaderboards and production performance gates.',
    tags: ['Three.js', 'TypeScript', 'Node.js', 'WebSockets'],
    links: [
      { label: 'App Store', href: links.lastcoilIos },
      { label: 'Google Play', href: links.lastcoilAndroid },
    ],
  },
  {
    name: 'treegen',
    eyebrow: 'Procedural 3D · Public developer tool',
    description:
      'A deterministic low-poly tree generator and public MCP service that exports game-ready GLB/OBJ assets for browser, Node.js and AI coding-client workflows.',
    tags: ['Three.js', 'MCP', 'GLB / OBJ', 'Procedural'],
    links: [{ label: 'GitHub', href: links.treegenGithub }],
  },
] as const;
