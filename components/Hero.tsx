'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const base = 'transition-all duration-700 ease-out';
  const hidden = 'opacity-0 translate-y-5';
  const visible = 'opacity-100 translate-y-0';

  return (
    <section id="home" className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8">

      {/* Background radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.15),_transparent_45%)] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-6xl text-center">

        {/* Badge */}
        <div
          className={`${base} ${mounted ? visible : hidden} inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 mb-8`}
          style={{ transitionDelay: '0ms' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-violet-300">
            Accepting new projects
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`${base} ${mounted ? visible : hidden} text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl tracking-tight`}
          style={{ transitionDelay: '100ms' }}
        >
          Build Smart{' '}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Solutions
            </span>
          </span>{' '}
          with Verqora
        </h1>

        {/* Subheading */}
        <p
          className={`${base} ${mounted ? visible : hidden} mt-6 max-w-2xl mx-auto text-lg text-slate-300 sm:text-xl leading-relaxed`}
          style={{ transitionDelay: '200ms' }}
        >
          From web apps to security systems — we deliver modern IT solutions that drive real business growth.
        </p>

        {/* CTA Buttons */}
        <div
          className={`${base} ${mounted ? visible : hidden} mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center`}
          style={{ transitionDelay: '300ms' }}
        >

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5"
          >
            Get Started
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/50 hover:bg-slate-800 px-8 py-3 text-sm font-semibold text-slate-100 transition-all duration-200 hover:border-violet-500/50 hover:-translate-y-0.5 backdrop-blur-sm"
          >
            Explore Services
          </Link>

        </div>

        {/* Stats */}
        <div
          className={`${base} ${mounted ? visible : hidden} mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto`}
          style={{ transitionDelay: '400ms' }}
        >
          {[
            { value: '20+', label: 'Projects Delivered' },
            { value: '6', label: 'Team Members' },
            { value: '24h', label: 'Response Time' },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm px-4 py-4 text-center"
            >
              <p className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div
          className={`${base} ${mounted ? visible : hidden} mt-8 mx-auto max-w-3xl rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm p-7`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-sm text-slate-300 leading-relaxed">
            End-to-end digital engineering for startups and enterprises — responsive user experiences, secure APIs, graphic design, surveillance solutions, and optimized performance for fast launch and business-ready growth.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {['Web Development','Frontend','Backend','DevOps','Graphic Design','Surveillance & Security'].map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/40"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}