'use client';

import { useEffect, useRef, useState } from 'react';

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
    title: 'Mission',
    description: 'Deliver reliable, future-ready products that drive growth, reduce risk, and improve operational efficiency for clients worldwide.',
    accent: 'violet',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    title: 'Vision',
    description: 'Be the go-to partner for teams who want modern architecture, transparent process, and relentless product focus.',
    accent: 'cyan',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Values',
    description: 'Confidence through competence, strong communication, continuous improvement, and unwavering client-centricity.',
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
  orange: {
    gradient: 'from-orange-500/20 to-amber-500/20',
    border: 'hover:border-orange-500/50',
    iconBg: 'bg-orange-500/20 text-orange-300 ring-orange-500/30',
    text: 'text-orange-400',
    topLine: 'from-orange-500/60 to-amber-500/60',
  },
};

const approach = [
  'Discovery workshops and problem validation before writing a single line of code',
  'Modular architecture with solid test coverage from day one',
  'CI/CD pipelines and automated release processes for fast, safe delivery',
  'Ongoing maintenance, performance reviews, and iterative improvement',
];

const deliverables = [
  'Clear delivery roadmap with weekly progress reports',
  'Working MVP typically delivered in 4–8 weeks',
  'Full documentation, handover, and developer enablement',
  'Data confidentiality and full code ownership rights',
];

const stats = [
  { value: '20+', label: 'Projects Delivered', accent: 'violet' },
  { value: '6', label: 'Team Members', accent: 'cyan' },
  { value: '4–8w', label: 'Avg MVP Timeline', accent: 'emerald' },
  { value: '100%', label: 'Client Ownership', accent: 'orange' },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const { ref, inView } = useInView();
  const colors = accentMap[pillar.accent];

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(28px)',
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
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ring-1 mb-4 transition-transform duration-300 group-hover:scale-105 ${colors.iconBg}`}>
          {pillar.icon}
        </div>
        <h2 className={`font-semibold text-base mb-2 ${colors.text}`}>{pillar.title}</h2>
        <p className="text-slate-300 text-sm leading-relaxed">{pillar.description}</p>
      </div>
    </div>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, inView } = useInView();
  const colors = accentMap[stat.accent];

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
      className={`
        relative group rounded-2xl border border-slate-700/60 bg-slate-800/50
        backdrop-blur-sm p-5 text-center transition-all duration-300 overflow-hidden
        ${colors.border} hover:bg-slate-800/80 hover:-translate-y-1
      `}
    >
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colors.gradient} pointer-events-none`} />
      <div className="relative z-10">
        <p className={`text-3xl font-bold ${colors.text}`}>{stat.value}</p>
        <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
      </div>
    </div>
  );
}

function ListCard({
  title,
  items,
  accent,
  icon,
  delay = 0,
}: {
  title: string;
  items: string[];
  accent: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  const colors = accentMap[accent];

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
      className={`
        relative group rounded-2xl border border-slate-700/60 bg-slate-800/50
        backdrop-blur-sm p-7 transition-all duration-300 overflow-hidden
        ${colors.border} hover:bg-slate-800/80 hover:shadow-2xl hover:-translate-y-1
      `}
    >
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colors.gradient} pointer-events-none`} />
      <div className={`absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${colors.topLine}`} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ring-1 transition-transform duration-300 group-hover:scale-105 ${colors.iconBg}`}>
            {icon}
          </div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        <ul className="space-y-3">
          {items.map(item => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
              <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.text}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AboutContent() {
  const { ref: heroRef, inView: heroInView } = useInView(0.1);
  const { ref: statsRef, inView: statsInView } = useInView(0.1);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-20 sm:px-6 lg:px-8">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <section className="mx-auto max-w-6xl space-y-10">

        {/* Hero */}
        <div
          ref={heroRef}
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm p-10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400" />
            <h1 className="text-4xl font-bold tracking-tight">About Verqora</h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            Verqora is a passionate team building innovative, scalable digital products for businesses globally.
            We help startups and enterprises achieve product-market fit quickly while maintaining long-term engineering quality.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-400">Delivering quality since day one</span>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.title} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Approach + Deliverables */}
        <div className="grid gap-5 lg:grid-cols-2">
          <ListCard
            title="Our Approach"
            items={approach}
            accent="violet"
            delay={0}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.798-1.345 2.798H4.345c-1.376 0-2.345-1.799-1.344-2.798L5 14.5" />
              </svg>
            }
          />
          <ListCard
            title="What You Get"
            items={deliverables}
            accent="cyan"
            delay={0.1}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            }
          />
        </div>

      </section>
    </main>
  );
}