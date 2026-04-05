'use client';

import { useEffect, useRef, useState } from 'react';
import { Code2, Layers, ShieldCheck, Wrench, Camera, Palette } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Fast, responsive, and professional websites with modern tooling.',
    points: ['SEO-friendly markup', 'Mobile-first design', 'Accessibility compliant'],
    accent: 'violet',
  },
  {
    icon: Layers,
    title: 'Frontend Development',
    description: 'Modern UI/UX using React, Next.js, and latest frameworks.',
    points: ['Component libraries', 'State management', 'UX performance optimization'],
    accent: 'cyan',
  },
  {
    icon: ShieldCheck,
    title: 'Backend Development',
    description: 'Secure, scalable systems with APIs and database integrations.',
    points: ['REST/GraphQL API design', 'Postgres, MySQL, MongoDB', 'Authentication & RBAC'],
    accent: 'emerald',
  },
  {
    icon: Wrench,
    title: 'Bug Fixing & Optimization',
    description: 'Improve performance and resolve issues in existing systems.',
    points: ['Code audits and remediation', 'Database query tuning', 'Performance metrics tracking'],
    accent: 'orange',
  },
  {
    icon: Palette,
    title: 'Graphic Designing',
    description: 'Creative visuals and brand identity that leave a lasting impression.',
    points: ['Logo & brand identity', 'UI/UX design', 'Marketing creatives'],
    accent: 'pink',
  },
  {
    icon: Camera,
    title: 'Surveillance & Security',
    description: 'End-to-end security solutions for physical and digital environments.',
    points: ['CCTV & IP camera setup', 'Access control systems', 'Network security audits'],
    accent: 'red',
  },
];

const accentMap: Record<string, {
  gradient: string;
  border: string;
  iconBg: string;
  text: string;
  topLine: string;
  dot: string;
}> = {
  violet: {
    gradient: 'from-violet-500/20 to-indigo-500/20',
    border: 'hover:border-violet-500/50',
    iconBg: 'bg-violet-500/20 text-violet-300 ring-violet-500/30',
    text: 'text-violet-400',
    topLine: 'from-violet-500/60 to-indigo-500/60',
    dot: 'bg-violet-400',
  },
  cyan: {
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
    text: 'text-cyan-400',
    topLine: 'from-cyan-500/60 to-blue-500/60',
    dot: 'bg-cyan-400',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-teal-500/20',
    border: 'hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
    text: 'text-emerald-400',
    topLine: 'from-emerald-500/60 to-teal-500/60',
    dot: 'bg-emerald-400',
  },
  orange: {
    gradient: 'from-orange-500/20 to-amber-500/20',
    border: 'hover:border-orange-500/50',
    iconBg: 'bg-orange-500/20 text-orange-300 ring-orange-500/30',
    text: 'text-orange-400',
    topLine: 'from-orange-500/60 to-amber-500/60',
    dot: 'bg-orange-400',
  },
  pink: {
    gradient: 'from-pink-500/20 to-rose-500/20',
    border: 'hover:border-pink-500/50',
    iconBg: 'bg-pink-500/20 text-pink-300 ring-pink-500/30',
    text: 'text-pink-400',
    topLine: 'from-pink-500/60 to-rose-500/60',
    dot: 'bg-pink-400',
  },
  red: {
    gradient: 'from-red-500/20 to-rose-500/20',
    border: 'hover:border-red-500/50',
    iconBg: 'bg-red-500/20 text-red-300 ring-red-500/30',
    text: 'text-red-400',
    topLine: 'from-red-500/60 to-rose-500/60',
    dot: 'bg-red-400',
  },
};

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

function ServiceCard({ item, index }: { item: typeof services[0]; index: number }) {
  const { ref, inView } = useInView();
  const colors = accentMap[item.accent];
  const Icon = item.icon;

  return (
    <article
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
      className={`
        relative group rounded-2xl border border-slate-700/60 bg-slate-800/50
        backdrop-blur-sm p-6 transition-all duration-300 overflow-hidden
        ${colors.border} hover:bg-slate-800/80 hover:shadow-2xl hover:-translate-y-1
      `}
    >
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colors.gradient} pointer-events-none`} />
      <div className={`absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${colors.topLine}`} />

      <div className="relative z-10">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ring-1 mb-4 transition-transform duration-300 group-hover:scale-105 ${colors.iconBg}`}>
          <Icon size={20} />
        </div>
        <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>
        <ul className="space-y-2">
          {item.points.map(point => (
            <li key={point} className="flex items-start gap-2 text-xs text-slate-300">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Services() {
  const { ref: headerRef, inView: headerInView } = useInView(0.1);

  return (
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400" />
            <h2 className="text-3xl font-bold text-white sm:text-4xl tracking-tight">Our Services</h2>
            <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-violet-400" />
          </div>
          <p className="mx-auto max-w-2xl text-slate-300 leading-relaxed">
            End-to-end delivery with clear milestones and production-ready architecture for your digital goals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}