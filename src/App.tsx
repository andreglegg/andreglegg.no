import { heroCopy, experiences, projects, contact } from './data/content';

const resumeHref = new URL('../data/andre-glegg-resume.pdf', import.meta.url).href;

const App = () => {
  return (
    <main>
      <header className="page-header">
        <div>
          <strong>André Glegg</strong>
          <p>Design-minded engineer crafting delightful frontends.</p>
        </div>
        <nav aria-label="Primary navigation">
          <ul>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="card split" id="hero">
        <div>
          <p>{heroCopy.greeting}</p>
          <h1>{heroCopy.role}</h1>
          <p>{heroCopy.blurb}</p>
          <div className="socials" role="list">
            {contact.socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <div className="hero-meta">
          <p>{contact.availability}</p>
          <a className="resume-link" href={resumeHref} download>
            Download résumé
            <span aria-hidden="true">→</span>
          </a>
          <p className="hero-location">
            Based in <strong>{contact.location}</strong> · <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
      </section>

      <section id="experience">
        <h2>Experience</h2>
        <div className="grid">
          {experiences.map((job) => (
            <article className="card" key={`${job.company}-${job.title}`}>
              <div className="experience-heading">
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                </div>
                <span className="tenure">
                  {job.start} – {job.end}
                </span>
              </div>
              <p>{job.summary}</p>
              <ul className="bullet-list">
                {job.highlights.map((point) => (
                  <li key={point}>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="projects">
        <h2>Selected Projects</h2>
        <div className="grid">
          {projects.map((project) => (
            <article className="card" key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tag-list">
                {project.tech.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="socials link-row">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="card">
        <h2>Let\'s build something</h2>
        <p>
          I love partnering with teams who value accessibility, typography, and tidy systems as much as robust
          architecture. If that sounds like you, let\'s talk.
        </p>
        <a className="resume-link" href={`mailto:${contact.email}`}>
          Say hello
        </a>
      </section>

      <footer style={{ marginTop: '6rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} André Glegg. Crafted with Vite + React.
      </footer>
    </main>
  );
};

export default App;
