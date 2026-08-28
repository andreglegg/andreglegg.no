import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Network,
  Package,
  Smartphone,
  Terminal,
  TreePine,
  X,
} from 'lucide-react';
import writingData from './data/writing.json';
import portrait from './assets/images/andre-portrait.jpg';
import { experience, forgeInstallCommand, links, moreWork, skillGroups } from './portfolio-content';

type WritingPost = {
  title: string;
  url: string;
  published: string;
  label: string;
  tags: string[];
  summary: string;
};

const writing = writingData as { posts: WritingPost[] };
const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const;

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Writing', href: '#writing' },
  { label: 'About', href: '#about' },
] as const;

const currentWork = [
  {
    name: 'Forge',
    meta: 'Public alpha · npm',
    description: 'Coding-agent harness for local and small models',
    href: '#forge',
    icon: <Terminal aria-hidden="true" />,
  },
  {
    name: 'Cognara',
    meta: 'Private research · 2026',
    description: 'Distributed inference across ordinary machines',
    href: '#cognara',
    icon: <Network aria-hidden="true" />,
  },
  {
    name: 'Endless Descent',
    meta: 'iOS · Android',
    description: 'Shipped one-thumb mobile arcade game',
    href: '#endless-descent',
    icon: <Smartphone aria-hidden="true" />,
  },
  {
    name: 'Writing',
    meta: `${writing.posts.length} latest posts`,
    description: 'Engineering, agents and local AI systems',
    href: '#writing',
    icon: <BookOpen aria-hidden="true" />,
  },
] as const;

function ExternalTextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="text-link" href={href} {...externalProps}>
      {children}
      <ArrowRight size={15} aria-hidden="true" />
    </a>
  );
}

function CopyCommand() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(forgeInstallCommand);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      const input = document.createElement('textarea');
      input.value = forgeInstallCommand;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  }

  return (
    <div className="command-row">
      <code>{forgeInstallCommand}</code>
      <button type="button" onClick={copy} aria-label="Copy the Forge install command">
        {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}

function NetworkVisual() {
  const nodes = useMemo(
    () => [
      { x: 18, y: 54, size: 14 },
      { x: 38, y: 28, size: 11 },
      { x: 58, y: 60, size: 16 },
      { x: 78, y: 30, size: 12 },
      { x: 88, y: 68, size: 9 },
    ],
    [],
  );

  return (
    <div className="network-visual" aria-hidden="true">
      <svg viewBox="0 0 100 90" preserveAspectRatio="none">
        <path d="M18 54 L38 28 L58 60 L78 30 L88 68" />
        <path d="M18 54 L58 60 M38 28 L78 30 M58 60 L88 68" />
      </svg>
      {nodes.map((node, index) => (
        <span
          key={`${node.x}-${node.y}`}
          className={`network-node network-node-${index + 1}`}
          style={{ left: `${node.x}%`, top: `${node.y}%`, width: node.size, height: node.size }}
        />
      ))}
      <span className="network-label">QUIC / iroh</span>
    </div>
  );
}

function ForgeVisual() {
  return (
    <div className="forge-visual">
      <div className="forge-visual-head">
        <img src="/assets/forge-icon.png" alt="" />
        <span>forge — benchmark</span>
      </div>
      <code>Aider Polyglot Benchmark</code>
      <strong>60.00% <span>(135 / 225)</span></strong>
      <code>Local multi-file suite</code>
      <strong>14 / 14 <span>passing</span></strong>
      <small>Measured Aug 4, 2026</small>
    </div>
  );
}

function AizeVisual() {
  return (
    <div className="aize-product-visual">
      <img
        className="aize-product-shot"
        src="/assets/aize-product.jpg"
        alt="Published Aize digital-twin product interface showing an industrial 3D model and equipment data"
      />
      <div className="aize-brand-panel">
        <img src="/assets/aize-logo-inverted.svg" alt="Aize" />
        <span>Industrial digital twin</span>
      </div>
    </div>
  );
}

function EndlessDescentVisual() {
  return (
    <div className="game-showcase endless-showcase">
      <div className="game-showcase-glow" aria-hidden="true" />
      <img className="game-phone game-phone-back" src="/assets/endless-descent-gameplay-2.png" alt="" />
      <img
        className="game-phone game-phone-front"
        src="/assets/endless-descent-gameplay.png"
        alt="Endless Descent App Store gameplay screenshot"
      />
      <div className="game-showcase-badge">
        <img src="/assets/endless-descent-icon.jpg" alt="" />
        <span><strong>Endless Descent</strong><small>Shipped · iOS & Android</small></span>
      </div>
    </div>
  );
}

function LastCoilVisual() {
  return (
    <div className="lastcoil-showcase">
      <img
        className="lastcoil-shot"
        src="/assets/lastcoil-gameplay.png"
        alt="LastCoil App Store gameplay screenshot showing a live multiplayer snake arena"
      />
      <div className="lastcoil-badge">
        <img src="/assets/lastcoil-icon.jpg" alt="" />
        <span><strong>LastCoil</strong><small>Real-time multiplayer · iOS & Android</small></span>
      </div>
    </div>
  );
}

function ProjectCard({
  id,
  eyebrow,
  title,
  role,
  description,
  proof,
  tags,
  visual,
  actions,
}: {
  id: string;
  eyebrow: string;
  title: string;
  role: string;
  description: string;
  proof?: string;
  tags: string[];
  visual: React.ReactNode;
  actions: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <article className="project-card" id={id}>
      <div className="project-visual">{visual}</div>
      <div className="project-body">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p className="project-role">{role}</p>
        <p className="project-description">{description}</p>
        {proof && <p className="project-proof">{proof}</p>}
        <ul className="tag-list" aria-label={`${title} technologies`}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="project-actions">
          {actions.map((action) => (
            <a
              key={`${title}-${action.label}`}
              href={action.href}
              {...(action.external ? externalProps : {})}
            >
              {action.label}
              {action.external ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function PortfolioApp() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="André Glegg home">
          André Glegg
          <span aria-hidden="true">›_</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
          <a className="nav-resume" href={links.resume} {...externalProps}>Résumé</a>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? 'mobile-nav-open' : ''}`}
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <a href={links.resume} {...externalProps} onClick={() => setMenuOpen(false)}>View résumé</a>
          <a href={links.email} onClick={() => setMenuOpen(false)}>Get in touch</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid site-width">
            <div className="hero-copy">
              <p className="eyebrow">Senior Software Engineer · Oslo</p>
              <h1>I build complex systems and turn them into products that <em>ship.</em></h1>
              <p className="hero-lead">
                15+ years building production software across full-stack product engineering, 3D/WebGL,
                realtime systems and AI developer tooling — from industrial software to open-source tools
                and shipped mobile games.
              </p>

              <div className="hero-ctas">
                <a className="button button-primary" href={links.resume} {...externalProps}>
                  View résumé
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className="button button-secondary" href={links.email}>
                  Get in touch
                  <Mail size={17} aria-hidden="true" />
                </a>
              </div>

              <div className="social-row" aria-label="Professional profiles">
                <a href={links.github} {...externalProps}><Code2 size={18} aria-hidden="true" />GitHub</a>
                <a href={links.linkedin} {...externalProps}><BriefcaseBusiness size={18} aria-hidden="true" />LinkedIn</a>
                <span><MapPin size={18} aria-hidden="true" />Oslo, Norway</span>
              </div>

              <div className="hero-signals" aria-label="Career highlights">
                <div><strong>15+</strong><span>years building production software</span></div>
                <div><strong>4-person</strong><span>development team led at Fjong</span></div>
                <div><strong>2</strong><span>mobile games shipped to both stores</span></div>
              </div>

              <div className="career-proof" aria-label="Selected professional experience">
                <span>Professional experience</span>
                <img src="/assets/aize-logo-inverted.svg" alt="Aize" />
                <span className="career-proof-divider" aria-hidden="true" />
                <strong>Fjong Norge</strong>
              </div>
            </div>

            <aside className="current-panel" aria-label="Current work">
              <div className="panel-label"><span />Current work</div>
              <ol>
                {currentWork.map((item) => (
                  <li key={item.name}>
                    <a href={item.href}>
                      <span className="current-icon">{item.icon}</span>
                      <span className="current-copy">
                        <strong>{item.name}</strong>
                        <span>{item.description}</span>
                        <small>{item.meta}</small>
                      </span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <aside className="forge-proof-card" aria-label="Forge benchmark evidence">
              <div className="forge-proof-title">
                <div>
                  <p className="eyebrow">Forge · Public alpha</p>
                  <h2>Coding-agent harness for local models.</h2>
                </div>
                <img src="/assets/forge-icon.png" alt="Forge icon" />
              </div>
              <CopyCommand />
              <div className="metric-grid">
                <div><strong>60.00%</strong><span>Aider Polyglot</span></div>
                <div><strong>135 / 225</strong><span>official cases</span></div>
                <div><strong>14 / 14</strong><span>local multi-file suite</span></div>
              </div>
              <p className="metric-note">Measured Aug 4, 2026. Public benchmark evidence is kept in the Forge repository.</p>
              <div className="forge-links">
                <ExternalTextLink href={links.forgeGithub}><Code2 size={16} aria-hidden="true" />GitHub</ExternalTextLink>
                <ExternalTextLink href={links.forgeNpm}><Package size={16} aria-hidden="true" />npm</ExternalTextLink>
              </div>
            </aside>
          </div>
        </section>

        <section className="section site-width" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected engineering work</p>
              <h2>Hard problems, shipped systems, visible evidence.</h2>
            </div>
            <p>
              The common thread is ownership: architecture through implementation, verification,
              performance and production behavior.
            </p>
          </div>

          <div className="project-grid">
            <ProjectCard
              id="forge"
              eyebrow="Open source · Developer tooling · 2026"
              title="Forge"
              role="Local-first coding-agent harness written in TypeScript."
              description="I built Forge around the failure modes I saw when smaller models touched real repositories: bounded Git-aware navigation, transactional edits, approval boundaries, verification gates, traces, replay, undo and isolated worktree runs."
              proof="Aider Polyglot: 60.00% (135/225). Pinned 42-case screens: 28/42 and 27/42 across two Forge runs."
              tags={['TypeScript', 'Local LLMs', 'Git', 'Agent architecture', 'Benchmarking']}
              visual={<ForgeVisual />}
              actions={[
                { label: 'Source', href: links.forgeGithub, external: true },
                { label: 'npm package', href: links.forgeNpm, external: true },
              ]}
            />

            <ProjectCard
              id="aize"
              eyebrow="Professional work · Aug 2021 — Jun 2024"
              title="Aize / Industrial 3D"
              role="Senior Software Engineer working on industrial digital-twin and engineering-document products."
              description="Built and maintained browser-based 3D systems for navigating complex industrial datasets, working across React/Angular, TypeScript, Three.js/WebGL, model navigation, annotations, document workflows and client-side data processing."
              proof="Focused on rendering, geometry-loading and interaction performance while owning features end to end and strengthening automated reliability."
              tags={['TypeScript', 'React', 'Angular', 'Three.js', 'WebGL']}
              visual={<AizeVisual />}
              actions={[{ label: 'About Aize', href: links.aize, external: true }]}
            />

            <ProjectCard
              id="cognara"
              eyebrow="Private research · Distributed AI · 2026"
              title="Cognara"
              role="A distributed-inference research system built in Rust around ordinary networked machines."
              description="Cognara explores model-partitioned inference over a peer-to-peer data plane, including pipeline-sharded execution, failure handling, OpenAI-compatible serving and measured recovery behavior."
              proof="24-hour reliability soak: 4,317 / 4,319 requests succeeded (99.954% availability); 4/4 induced degraded windows recovered; final two-node distributed serving capacity was restored."
              tags={['Rust', 'QUIC / iroh', 'Distributed inference', 'Soak testing']}
              visual={<NetworkVisual />}
              actions={[]}
            />

            <ProjectCard
              id="endless-descent"
              eyebrow="Independent product · iOS & Android"
              title="Endless Descent"
              role="A shipped one-thumb mobile arcade game built with Godot."
              description="Designed, built and released the game across both mobile stores, including movement, progression, leaderboards, platform integrations and the production work required to ship and maintain it."
              proof="Released on both the App Store and Google Play, with gameplay, progression, leaderboards and platform integrations built and shipped end to end."
              tags={['Godot', 'iOS', 'Android', 'Leaderboards']}
              visual={<EndlessDescentVisual />}
              actions={[
                { label: 'App Store', href: links.endlessIos, external: true },
                { label: 'Google Play', href: links.endlessAndroid, external: true },
                { label: 'Game site', href: links.endlessSite, external: true },
              ]}
            />
          </div>

          <div className="more-work-heading">
            <div>
              <p className="eyebrow">More shipped work</p>
              <h3>Products I built beyond the flagship case studies.</h3>
            </div>
          </div>

          <div className="more-work-grid">
            {moreWork.map((project) => (
              <article className={`more-card ${project.name === 'LastCoil' ? 'more-card-game' : ''}`} key={project.name}>
                <div className="more-card-visual">
                  {project.name === 'LastCoil' ? (
                    <LastCoilVisual />
                  ) : (
                    <div className="treegen-mark" aria-hidden="true"><TreePine /></div>
                  )}
                </div>
                <div className="more-card-content">
                  <p className="eyebrow">{project.eyebrow}</p>
                  <div className="more-title-row">
                    {project.name === 'LastCoil' && <img src="/assets/lastcoil-icon.jpg" alt="" />}
                    <h3>{project.name}</h3>
                  </div>
                  <p>{project.description}</p>
                  <ul className="tag-list">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <div className="project-actions">
                    {project.links.map((action) => (
                      <a key={action.label} href={action.href} {...externalProps}>
                        {action.label}<ExternalLink size={14} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="site-width experience-layout">
            <div className="experience-main">
              <div className="section-heading compact">
                <div>
                  <p className="eyebrow">Experience</p>
                  <h2>15+ years of production engineering.</h2>
                </div>
                <p>From media systems in Jamaica to product engineering, technical leadership, industrial 3D and independent systems work in Norway.</p>
              </div>

              <ol className="timeline">
                {experience.map((item) => (
                  <li key={`${item.organization}-${item.period}`}>
                    <div className="timeline-marker" aria-hidden="true" />
                    <time>{item.period}</time>
                    <div className="timeline-content">
                      <div className="timeline-title-row">
                        <h3>{item.role}</h3>
                        <span>{item.organization}</span>
                      </div>
                      {item.location && <p className="timeline-location">{item.location}</p>}
                      <p>{item.summary}</p>
                      {item.highlights.length > 0 && (
                        <ul>
                          {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="skills-panel" id="skills">
              <div className="skills-sticky">
                <p className="eyebrow">Technical capabilities</p>
                <h2>Broad enough to own the system. Deep where it matters.</h2>
                <p className="skills-intro">These are technologies and engineering areas used in professional or shipped project work—not a wishlist.</p>
                <div className="skill-groups">
                  {skillGroups.map((group) => (
                    <section key={group.label}>
                      <h3>{group.label}</h3>
                      <ul>
                        {group.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="writing-section site-width" id="writing">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Writing</p>
              <h2>I build, measure, then write down what I learned.</h2>
            </div>
            <p>Notes on agent architecture, tool design, local models and the engineering tradeoffs behind them.</p>
          </div>

          <div className="writing-grid">
            {writing.posts.map((post) => (
              <article className="writing-card" key={post.url}>
                <div className="writing-icon"><BookOpen aria-hidden="true" /></div>
                <time dateTime={post.published}>{post.label}</time>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <a href={post.url} {...externalProps}>
                  Read on Medium <ArrowRight size={15} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>

          <div className="writing-more">
            <ExternalTextLink href={links.medium}>Read all writing on Medium</ExternalTextLink>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="site-width about-card">
            <div className="about-intro">
              <img src={portrait} alt="André Glegg" />
              <div>
                <p className="eyebrow">About</p>
                <h2>From Jamaica to Norway. Always learning. Always building.</h2>
                <p>
                  I am a self-taught engineer who has spent my career moving between product, systems and interactive work.
                  The technologies change; the habit stays the same: understand the problem, build the smallest solid system,
                  measure what matters and keep shipping.
                </p>
              </div>
            </div>
            <div className="principles">
              <article><Code2 aria-hidden="true" /><h3>Engineering-first</h3><p>Clear architecture, performance, testing and maintainability.</p></article>
              <article><BriefcaseBusiness aria-hidden="true" /><h3>Own the outcome</h3><p>From problem framing through production behavior and release.</p></article>
              <article><Package aria-hidden="true" /><h3>Builder & shipper</h3><p>Tools and products are valuable when people can actually use them.</p></article>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="site-width contact-card">
            <div>
              <p className="eyebrow">Next</p>
              <h2>Let’s build something useful.</h2>
              <p>Open to senior software engineering roles and difficult product or systems problems.</p>
            </div>
            <div className="contact-actions">
              <a className="button button-primary" href={links.email}><Mail size={17} aria-hidden="true" />Get in touch</a>
              <a className="button button-secondary" href={links.resume} {...externalProps}>View résumé<ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-width footer-grid">
          <div>
            <strong>André Glegg</strong>
            <p>Senior Software Engineer · Oslo, Norway</p>
          </div>
          <div className="footer-links">
            <a href={links.email}><Mail size={16} aria-hidden="true" />andreglegg@me.com</a>
            <a href={links.github} {...externalProps}><Code2 size={16} aria-hidden="true" />GitHub</a>
            <a href={links.linkedin} {...externalProps}><BriefcaseBusiness size={16} aria-hidden="true" />LinkedIn</a>
          </div>
          <p className="footer-fine">© 2026 André Glegg. Built as a static, accessible React + TypeScript portfolio.</p>
        </div>
      </footer>
    </div>
  );
}

export default PortfolioApp;
