'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const projects = [
  {
    slug: 'focusly-ai-agent',
    title: 'Focusly AI Agent',
    description: 'Autonomous AI productivity agent for smart scheduling and deep work optimization.',
    image: 'https://mahadhussaini.netlify.app/project-images/focusly-weld.vercel.app_.png',
    website: 'https://focusly-weld.vercel.app/',
    github: 'https://github.com/mahadhussaini/focusly',
    bullets: ['30K+ users and 2M+ sessions', '85% automation rate', 'Next.js, TypeScript, Vercel AI SDK', 'Calendar + behavior analytics'],
  },
  {
    slug: 'crm-erp-platform',
    title: 'CRM-ERP Platform',
    description: 'Enterprise-grade CRM and ERP suite with operational analytics and workflow automation.',
    image: 'https://mahadhussaini.netlify.app/project-images/crm-erp-platform.vercel.app_.png',
    website: 'https://crm-erp-platform.vercel.app/',
    github: 'https://github.com/mahadhussaini/crm-erp-platform',
    bullets: ['500+ users with 98% uptime', '60% process automation', 'TypeScript, React, GraphQL', 'Role-based dashboards'],
  },
  {
    slug: 'memrise-clone',
    title: 'Memrise Clone',
    description: 'Spaced repetition learning platform with gamification and progress tracking.',
    image: 'https://mahadhussaini.netlify.app/project-images/memrise-eight.vercel.app_.png',
    website: 'https://memrise-eight.vercel.app/',
    github: 'https://github.com/mahadhussaini/memrise',
    bullets: ['2,000+ users, 150+ courses', '85% retention', 'React, Node.js, MongoDB', 'Adaptive learning algorithm'],
  },
  {
    slug: 'closette-social-platform',
    title: 'Closette Social Platform',
    description: 'Fashion community social app with real-time messaging and content discovery.',
    image: 'https://mahadhussaini.netlify.app/project-images/closette-zeta.vercel.app_.png',
    website: 'https://closette-zeta.vercel.app/',
    github: 'https://github.com/mahadhussaini/closette',
    bullets: ['10K+ users and 500K+ messages', '92% DAU', 'Socket.io + Redis', 'Rich media streams'],
  },
  {
    slug: 'formify-builder',
    title: 'Formify Builder',
    description: 'Drag-and-drop form builder with advanced validation and analytics.',
    image: 'https://mahadhussaini.netlify.app/project-images/formify-wine.vercel.app_.png',
    website: 'https://formify-wine.vercel.app/',
    github: 'https://github.com/mahadhussaini/formify',
    bullets: ['50K forms and 2M submissions', '96% satisfaction', 'Node.js, MongoDB, D3', 'Conditional workflows'],
  },
  {
    slug: 'nutri-ai-assistant',
    title: 'NutriAI Assistant',
    description: 'AI nutrition assistant with meal-planning and calorie recognition.',
    image: 'https://mahadhussaini.netlify.app/project-images/nutri-ai-theta.vercel.app_.png',
    website: 'https://nutri-ai-theta.vercel.app/',
    github: 'https://github.com/mahadhussaini/nutriAI',
    bullets: ['15K+ users', '94% recognition accuracy', 'Python, TensorFlow, FastAPI', 'Goal tracking + recommendations'],
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
      className="group relative rounded-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm p-0 overflow-hidden transition-all duration-300 hover:bg-slate-800/80 hover:shadow-2xl hover:-translate-y-1 hover:border-violet-500/50"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 pointer-events-none" />
      <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-500/60 to-cyan-500/60" />
      <Link href={`/portfolio/${project.slug}`} className="block overflow-hidden relative h-40 w-full">
        <Image src={project.image} alt={`${project.title} snapshot`} fill style={{ objectFit: 'cover' }} className="transition duration-300 hover:scale-105" />
      </Link>
      <div className="relative z-10 p-6">
        <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
        <p className="mt-2 text-slate-400 text-sm leading-relaxed">{project.description}</p>
        <ul className="mt-3 space-y-2">
          {project.bullets.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={`/portfolio/${project.slug}`} className="rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-violet-500/25">View Case Study</Link>
          <a href={project.website} target="_blank" rel="noreferrer" className="rounded-lg border border-violet-500/50 px-4 py-2 text-sm font-semibold text-violet-100 hover:bg-violet-500/25 transition">Live Site</a>
          <a href={project.github} target="_blank" rel="noreferrer" className="rounded-lg border border-violet-500/50 px-4 py-2 text-sm font-semibold text-violet-100 hover:bg-violet-500/25 transition">GitHub</a>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioContent() {
  const { ref: heroRef, inView: heroInView } = useInView(0.1);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
      <section className="mx-auto max-w-6xl">
        <div ref={heroRef} style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }} className="mb-14 rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400" />
            <h1 className="text-4xl font-bold tracking-tight">Portfolio</h1>
          </div>
          <p className="text-lg text-slate-300 max-w-xl leading-relaxed">Explore our selected projects with case details, technology strategy, and measurable outcomes.</p>
          <div className="mt-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-400">{projects.length} projects</span>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}