'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: 'Web Development',
    description: 'Designed for conversion, speed, and accessibility across devices.',
    features: ['Responsive UI', 'Static & dynamic content', 'SEO-driven structure'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm-3.5-9h7m-7 0l2.5-2.5M8.5 12l2.5 2.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h2m14 0h2M12 3v2m0 14v2" />
      </svg>
    ),
    accent: 'violet',
  },
  {
    title: 'Frontend Development',
    description: 'Pixel-perfect UI with clean architecture and maintainable state.',
    features: ['React/Next.js', 'Performance budgets', 'UI component libraries'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    accent: 'cyan',
  },
  {
    title: 'Backend Development',
    description: 'APIs, data models, and business logic built for security and scale.',
    features: ['REST/GraphQL', 'DB design', 'Authentication & authorization'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V6a3 3 0 013-3h13.5a3 3 0 013 3v5.25a3 3 0 01-3 3m-13.5 0v3.75a3 3 0 003 3h7.5a3 3 0 003-3v-3.75" />
      </svg>
    ),
    accent: 'emerald',
  },
  {
    title: 'DevOps & Hosting',
    description: 'Infrastructure setup, deployment automation, and monitoring.',
    features: ['Cloud architecture', 'CI/CD pipelines', 'Logging/observability'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    accent: 'orange',
  },
  {
    title: 'Product Strategy',
    description: 'Product planning, MVP definition and iterative delivery guidance.',
    features: ['Roadmapping', 'Feature prioritization', 'User testing feedback'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    accent: 'pink',
  },
  {
    title: 'Support & Maintenance',
    description: 'Ongoing support, updates, and continuous improvement cycles.',
    features: ['Bug triage', 'Performance audits', 'Feature upgrades'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    accent: 'purple',
  },
  {
    title: 'Graphic Designing',
    description: 'Creative visuals, brand identity, and digital assets that make an impression.',
    features: ['Logo & brand identity', 'UI/UX design', 'Marketing creatives'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    accent: 'teal',
  },
  {
    title: 'Surveillance & Security',
    description: 'End-to-end security solutions for physical and digital environments.',
    features: ['CCTV & IP camera setup', 'Access control systems', 'Network security audits'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: 'red',
  },
];

const accentMap: Record<string, {
  gradient: string;
  border: string;
  iconBg: string;
  text: string;
  check: string;
  topLine: string;
}> = {
  violet: {
    gradient: 'from-violet-500/20 to-indigo-500/20',
    border: 'hover:border-violet-500/50',
    iconBg: 'bg-violet-500/20 text-violet-300 ring-violet-500/30',
    text: 'text-violet-400',
    check: 'text-violet-400',
    topLine: 'from-violet-500/60 to-indigo-500/60',
  },
  cyan: {
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
    text: 'text-cyan-400',
    check: 'text-cyan-400',
    topLine: 'from-cyan-500/60 to-blue-500/60',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-teal-500/20',
    border: 'hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
    text: 'text-emerald-400',
    check: 'text-emerald-400',
    topLine: 'from-emerald-500/60 to-teal-500/60',
  },
  orange: {
    gradient: 'from-orange-500/20 to-amber-500/20',
    border: 'hover:border-orange-500/50',
    iconBg: 'bg-orange-500/20 text-orange-300 ring-orange-500/30',
    text: 'text-orange-400',
    check: 'text-orange-400',
    topLine: 'from-orange-500/60 to-amber-500/60',
  },
  pink: {
    gradient: 'from-pink-500/20 to-rose-500/20',
    border: 'hover:border-pink-500/50',
    iconBg: 'bg-pink-500/20 text-pink-300 ring-pink-500/30',
    text: 'text-pink-400',
    check: 'text-pink-400',
    topLine: 'from-pink-500/60 to-rose-500/60',
  },
  purple: {
    gradient: 'from-purple-500/20 to-fuchsia-500/20',
    border: 'hover:border-purple-500/50',
    iconBg: 'bg-purple-500/20 text-purple-300 ring-purple-500/30',
    text: 'text-purple-400',
    check: 'text-purple-400',
    topLine: 'from-purple-500/60 to-fuchsia-500/60',
  },
  teal: {
    gradient: 'from-teal-500/20 to-cyan-500/20',
    border: 'hover:border-teal-500/50',
    iconBg: 'bg-teal-500/20 text-teal-300 ring-teal-500/30',
    text: 'text-teal-400',
    check: 'text-teal-400',
    topLine: 'from-teal-500/60 to-cyan-500/60',
  },
  red: {
    gradient: 'from-red-500/20 to-rose-500/20',
    border: 'hover:border-red-500/50',
    iconBg: 'bg-red-500/20 text-red-300 ring-red-500/30',
    text: 'text-red-400',
    check: 'text-red-400',
    topLine: 'from-red-500/60 to-rose-500/60',
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

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, inView } = useInView();
  const colors = accentMap[service.accent];

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
      className={`
        relative group rounded-2xl border border-slate-700/60 bg-slate-800/50
        backdrop-blur-sm p-6 transition-all duration-300 overflow-hidden
        ${colors.border} hover:bg-slate-800/80 hover:shadow-2xl hover:-translate-y-1
      `}
    >
      {/* Gradient glow */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
        transition-opacity duration-500 bg-gradient-to-br ${colors.gradient} pointer-events-none
      `} />

      {/* Top accent line */}
      <div className={`
        absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100
        transition-opacity duration-300 bg-gradient-to-r ${colors.topLine}
      `} />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center ring-1 mb-4
          transition-transform duration-300 group-hover:scale-105 ${colors.iconBg}
        `}>
          {service.icon}
        </div>

        {/* Title */}
        <h2 className="text-white font-semibold text-base mb-2">{service.title}</h2>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.description}</p>

        {/* Features */}
        <ul className="space-y-2">
          {service.features.map(feature => (
            <li key={feature} className="flex items-center gap-2 text-xs text-slate-300">
              <svg className={`w-3.5 h-3.5 flex-shrink-0 ${colors.check}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CTASection() {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
      }}
      className="mt-12 relative group rounded-2xl border border-violet-500/30 bg-violet-500/5 backdrop-blur-sm p-10 text-center overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 pointer-events-none" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">Start Your Project With Us</h3>
        <p className="text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
          Describe your business challenge, and we&apos;ll propose a roadmap with a detailed timeline and transparent costs.
        </p>
        
        <a
        href="/contact"
        className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-7 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5"
        >
        Request a Proposal
        <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
        </svg>
        </a>
      </div>
    </div>
  );
}

export default function ServicesContent() {
  const { ref: heroRef, inView: heroInView } = useInView(0.1);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-20 sm:px-6 lg:px-8">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div
          ref={heroRef}
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="mb-14 rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm p-10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400" />
            <h1 className="text-4xl font-bold tracking-tight">Services</h1>
          </div>
          <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
            Our full-service technology offering for businesses — from design to deployment.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-400">{services.length} services available</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <CTASection />
      </section>
    </main>
  );
}