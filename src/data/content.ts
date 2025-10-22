export interface Experience {
  company: string;
  title: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export const heroCopy = {
  greeting: 'Hei, I\'m André Glegg',
  role: 'Full-stack developer focused on thoughtful digital experiences.',
  blurb:
    'I enjoy building resilient products with teams that care about craft, accessibility, and the humans using our software.',
};

export const experiences: Experience[] = [
  {
    company: 'Productcraft Studio',
    title: 'Lead Frontend Engineer',
    start: '2022',
    end: 'Present',
    summary:
      'Guiding the frontend practice, shaping design systems, and partnering closely with product teams from discovery to delivery.',
    highlights: [
      'Architected a reusable component library adopted by three client teams.',
      'Improved page performance by 40% through bundling, code splitting, and design system audits.',
      'Mentored eight engineers through onboarding, pairing, and growth conversations.',
    ],
  },
  {
    company: 'Nordic Cloud Collective',
    title: 'Senior Software Engineer',
    start: '2019',
    end: '2022',
    summary:
      'Shipped cloud-native applications with a focus on customer experience, observability, and reliability.',
    highlights: [
      'Introduced contract testing that reduced integration bugs by 60%.',
      'Led rollout of GraphQL gateway serving 200k+ monthly users.',
      'Coordinated on-call rotations and incident response improvements.',
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'Wayfinder',
    description:
      'A progressive web app that helps remote teams surface availability, collaboration modes, and focus time.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    link: 'https://wayfinder.example.com',
  },
  {
    name: 'Oslo Trails',
    description:
      'Maps and trail conditions for weekend adventures around Oslo, built with offline-first caching.',
    tech: ['Next.js', 'Mapbox', 'GraphQL'],
    link: 'https://oslotrails.example.com',
  },
  {
    name: 'Design Tokens CLI',
    description:
      'CLI tool that synchronizes Figma tokens with codebases and keeps themes versioned.',
    tech: ['Node.js', 'TypeScript', 'Tsup'],
    repo: 'https://github.com/andreglegg/design-tokens-cli',
  },
];

export const contact = {
  email: 'hello@andreglegg.no',
  location: 'Oslo, Norway',
  availability: 'Open to principal-level frontend or product engineering roles, contract or permanent.',
  socials: [
    { label: 'GitHub', url: 'https://github.com/andreglegg' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/andreglegg/' },
    { label: 'Twitter', url: 'https://twitter.com/andreglegg' },
  ] as SocialLink[],
};
