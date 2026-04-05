'use client';

import { useEffect, useRef, useState } from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';

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

const pillars = [
  {
    title: 'Our Mission',
    description: 'Empower businesses with digital products built for measurable impact, speed, and reliability.',
    accent: 'violet',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    title: 'Our Vision',
    description: 'Be the trusted technology partner for teams who demand modern engineering and transparent delivery.',
    accent: 'cyan',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Core Values',
    description: 'Agility, collaboration, quality engineering, and long-term customer trust in everything we build.',
    accent: 'emerald',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const accentMap: Record<string, {
  gradient: string;
  border: string;
  iconBg: string;
  text: string;
  topLine: string;
}> = {
  violet: {
    gradient: 'from-violet-500/20 to-indigo-500/20',
    border: 'hover:border-violet-500/50',
    iconBg: 'bg-violet-500/20 text-violet-300 ring-violet-500/30',
    text: 'text-violet-400',
    topLine: 'from-violet-500/60 to-indigo-500/60',
  },
  cyan: {
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
    text: 'text-cyan-400',
    topLine: 'from-cyan-500/60 to-blue-500/60',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-teal-500/20',
    border: 'hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
    text: 'text-emerald-400',
    topLine: 'from-emerald-500/60 to-teal-500/60',
  },
};

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const { ref, inView } = useInView();
  const colors = accentMap[pillar.accent];

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
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
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ring-1 mb-4 transition-transform duration-300 group-hover:scale-105 ${colors.iconBg}`}>
          {pillar.icon}
        </div>
        <h3 className={`font-semibold text-base mb-2 ${colors.text}`}>{pillar.title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{pillar.description}</p>
      </div>
    </div>
  );
}

function AboutSection() {
  const { ref: headerRef, inView: headerInView } = useInView(0.1);

  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
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
            <h2 className="text-3xl font-bold text-white sm:text-4xl tracking-tight">About Verqora</h2>
            <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-violet-400" />
          </div>
          <p className="mx-auto max-w-2xl text-slate-300 leading-relaxed">
            We're a full-stack software lab building high-growth products and platforms with rapid delivery and sustainable architecture.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.title} pillar={pillar} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
      <main className="relative">
        <Hero />
        <AboutSection />
        <Services />
        <WhyChooseUs />
      </main>
    </div>
  );
}