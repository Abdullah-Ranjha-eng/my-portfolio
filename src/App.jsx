import { useEffect, useRef, useState } from "react";
import Hero3D from "./components/Hero3D.jsx";

// ---- Scroll reveal ----
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return [ref, visible];
}

const Reveal = ({ children, className = "" }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Eyebrow = ({ children }) => (
  <p className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-signal mb-3">
    {children}
  </p>
);

// ---- Content ----
const SKILLS = [
  { group: "Languages", items: ["JavaScript", "Python", "C++", "C#"] },
  { group: "Front-end", items: ["React", "HTML", "CSS", "Tailwind"] },
  { group: "Tooling", items: ["Git", "GitHub", "VS Code"] },
];

const PROJECTS = [
  {
    title: "Portfolio",
    desc: "This site — a personal portfolio built to showcase projects and skills.",
    stack: ["React", "Tailwind", "Three.js"],
  },
  {
    title: "RanjhaFlix",
    desc: "A Netflix-style front-end clone focused on layout, browsing, and media cards.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Weather WebApp",
    desc: "Live weather lookup with a clean, responsive interface.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Music Player",
    desc: "A Spotify-inspired player with playlist controls and a custom UI.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "LMS",
    desc: "A Learning Management System handling courses, users, and records.",
    stack: ["C#", ".NET Framework"],
  },
  {
    title: "GameVerse",
    desc: "A packaged gaming app exploring desktop app structure and UX.",
    stack: ["Java"],
  },
];

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-ink text-paper min-h-screen font-body antialiased">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-ink-border/60 bg-ink/80 backdrop-blur-md">
        <div className="max-w-content mx-auto flex justify-between items-center px-6 py-4">
          <a href="#" className="font-display font-semibold text-lg tracking-tight">
            Abdullah Ilyas
          </a>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-paper-muted">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-paper transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-base text-paper-muted">
              <a
                href="https://github.com/Abdullah-Ranjha-eng"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          <button
            className="md:hidden text-paper text-xl"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <i className={`fas ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-ink-border/60 bg-ink px-6 py-4 flex flex-col gap-4 font-mono text-sm uppercase tracking-wider text-paper-muted">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-paper transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero — full viewport width, 3D scene reacting to the cursor */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-24">
        <Hero3D className="absolute inset-0 w-full h-full" />
        {/* gradient to keep the left-aligned copy legible over the scene */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />

        <div className="relative z-10 max-w-content w-full mx-auto px-6">
          <div className="max-w-xl">
            <Eyebrow>● Available for freelance work</Eyebrow>
            <h1 className="font-display font-semibold text-5xl sm:text-6xl leading-[1.05] tracking-tight">
              Abdullah Ilyas
            </h1>
            <p className="mt-5 text-lg text-paper-muted leading-relaxed">
              Software engineering student building fast, considered
              front-end experiences — from interface to interaction.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-signal hover:bg-signal-soft transition-colors rounded-md font-medium text-sm"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-ink-border hover:border-paper-muted transition-colors rounded-md font-medium text-sm"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-ink-border/60">
        <Reveal>
          <div className="max-w-content mx-auto px-6 py-24 grid md:grid-cols-[1fr_1.4fr] gap-10">
            <div>
              <Eyebrow>About</Eyebrow>
              <h2 className="font-display font-semibold text-3xl">
                A little bit about me
              </h2>
            </div>
            <p className="text-paper-muted leading-relaxed text-lg">
              I'm currently pursuing a BS in Software Engineering, exploring
              front-end, back-end, and creative coding along the way. I care
              about interfaces that feel deliberate — clear structure, quick
              feedback, and details that hold up under real use. Most of my
              time goes into building small, complete projects rather than
              unfinished big ones.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section id="skills" className="border-t border-ink-border/60">
        <Reveal>
          <div className="max-w-content mx-auto px-6 py-24">
            <Eyebrow>Stack</Eyebrow>
            <h2 className="font-display font-semibold text-3xl mb-12">
              What I've been using
            </h2>
            <div className="grid sm:grid-cols-3 gap-10">
              {SKILLS.map((group) => (
                <div key={group.group}>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-paper-dim mb-4">
                    {group.group}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="px-3 py-1.5 bg-ink-surface border border-ink-border rounded-md text-sm text-paper"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-ink-border/60">
        <Reveal>
          <div className="max-w-content mx-auto px-6 py-24">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="font-display font-semibold text-3xl mb-12">
              Projects I've built
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECTS.map((p) => (
                <div
                  key={p.title}
                  className="group bg-ink-surface border border-ink-border rounded-xl p-6 hover:border-signal/60 transition-colors"
                >
                  <h3 className="font-display font-semibold text-lg">
                    {p.title}
                  </h3>
                  <p className="text-paper-muted mt-2 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[11px] uppercase tracking-wide text-cyan-signal/90"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-ink-border/60">
        <Reveal>
          <div className="max-w-content mx-auto px-6 py-24">
            <Eyebrow>Services</Eyebrow>
            <h2 className="font-display font-semibold text-3xl mb-12">
              How I can help
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-ink-surface border border-ink-border rounded-xl p-8">
                <h3 className="font-display font-semibold text-xl">
                  Front-end development
                </h3>
                <p className="text-paper-muted mt-3 leading-relaxed">
                  Responsive, interactive websites built with React and
                  Tailwind — from a starting design to a working product.
                </p>
                <a
                  href="#contact"
                  className="inline-block mt-6 px-6 py-2.5 bg-signal hover:bg-signal-soft transition-colors rounded-md text-sm font-medium"
                >
                  Request work
                </a>
              </div>
              <div className="bg-ink-surface border border-ink-border rounded-xl p-8">
                <h3 className="font-display font-semibold text-xl">
                  UI polish &amp; interaction
                </h3>
                <p className="text-paper-muted mt-3 leading-relaxed">
                  Motion, micro-interactions, and small details that make an
                  existing interface feel considered and finished.
                </p>
                <a
                  href="#contact"
                  className="inline-block mt-6 px-6 py-2.5 border border-ink-border hover:border-paper-muted transition-colors rounded-md text-sm font-medium"
                >
                  Request work
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-ink-border/60">
        <Reveal>
          <div className="max-w-content mx-auto px-6 py-24 text-center">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="font-display font-semibold text-3xl">
              Let's build something
            </h2>
            <p className="text-paper-muted mt-4 max-w-md mx-auto">
              Open to freelance work and new opportunities — reach out on
              GitHub or LinkedIn, or send a message directly.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="https://github.com/Abdullah-Ranjha-eng"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-signal hover:bg-signal-soft transition-colors rounded-md font-medium text-sm"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-ink-border hover:border-paper-muted transition-colors rounded-md font-medium text-sm"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-border/60">
        <div className="max-w-content mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-paper-dim font-mono">
          <span>Abdullah Ilyas © 2023 — 2026</span>
          <span>Built with React, Tailwind &amp; Three.js</span>
        </div>
      </footer>
    </div>
  );
}
