import React, { useEffect, useRef, useState } from "react";

// Simple hook for scroll animation
function useReveal() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 👇 Toggle visibility BOTH ways
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, visible];
}

const Section = ({ children }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
    >
      {children}
    </div>
  );
};

export default function Portfolio() {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

          {/* Left Side: Name + Links */}
          <div className="flex items-center space-x-10">
            <h1 className="font-bold text-xl">Abdullah Ilyas</h1>

            <div className="space-x-6 text-sm">
              <a href="#" className="hover:text-black transition">Home</a>
              <a href="#about" className="hover:text-black transition">About</a>
              <a href="#projects" className="hover:text-black transition">Projects</a>
              <a href="#services" className="hover:text-black transition">Services</a>
            </div>
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex items-center space-x-4 text-lg">

            {/* GitHub */}
            <a
              href="https://github.com/Abdullah-Ranjha-eng"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <i className="fab fa-github"></i>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <i className="fab fa-linkedin"></i>
            </a>

          </div>

        </div>
      </nav>

      {/* Hero */}
      <Section>
        <div className="text-center py-20">
          <div className="w-40 h-40 mx-auto rounded-full bg-black mb-6"></div>
          <h1 className="text-4xl font-bold">Hey, I’m Abdullah Ilyas.</h1>
          <p className="mt-2 text-sm">● Available for freelance work</p>
          <p className="mt-4 text-gray-600">
            I like making code look good and work even better.
          </p>
        </div>
      </Section>

      {/* About */}
      <Section>
        <div id="about" className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-4">A little bit about me</h2>
          <p className="text-gray-600 leading-relaxed">
            I’m currently pursuing a BS in Software Engineering, exploring
            front-end, back-end, and creative coding. I focus on building
            simple, useful, and creative applications.
          </p>
        </div>
      </Section>

      {/* Tech Stack */}
      <Section>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-6">What I’ve been using</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "JavaScript",
              "React",
              "HTML",
              "CSS",
              "Python",
              "Tailwind",
              "C++",
              "C#",
              "Git",
              "GitHub",
              "VS Code",
            ].map((tech) => (
              <div
                key={tech}
                className="bg-white p-4 rounded-xl shadow text-center"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section>
        <div id="projects" className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Projects I’ve built
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Portfolio",
                desc: "Personal portfolio website to showcase my projects(JavaScript, React, Tailwind CSS).",
              },
              {
                title: "Weather WebApp",
                desc: "Weather WebApp using html,css and js",
              },
              {
                title: "RanjhaFlix",
                desc: "Like Netflix using html,css and js (Frontend clone).",
              },
              {
                title: "LMS",
                desc: "Learning Management System using c# (.Net Framework)",
              },
              {
                title: "GameVerse",
                desc: "A package gaming app using java",
              },
              {
                title: "Music Player",
                desc: "A Music player like Spotify using html,css and js.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section>
        <div id="services" className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-6">
            Services I am Providing
          </h2>
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="font-semibold text-lg">
              Front-End Development
            </h3>
            <p className="text-gray-600 mt-2">
              I build responsive and interactive websites using React.
            </p>
            <button className="mt-4 px-6 py-2 bg-black text-white rounded">
              Request
            </button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="text-center text-sm py-10 text-gray-500">
        Built and designed by Abdullah Ilyas © 2023 - 2026
      </footer>
    </div>
  );
}
