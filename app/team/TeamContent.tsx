'use client';

import { useEffect, useRef, useState } from 'react';

const team = [
  {
    name: 'Syed Asad Arshad Hussaini',
    role: 'Software Developer',
    specialty: 'Application Development & Problem Solving',
    current: 'Team Lead Software Engineer @ Paysys Labs',
    tags: ['Java', 'Spring Boot', 'ISO20022', 'Microservices', 'RAAST', 'Digital Payments', 'FinTech'],
    linkedin: 'https://www.linkedin.com/in/asad-arshad-80a6b9196',
    initials: 'SA',
  },
  {
    name: 'Syed Mahad Arshad Hussaini',
    role: 'Full Stack Developer',
    specialty: 'Web Applications & System Development',
    current: 'Full Stack Engineer @ Recv | Developing Scalable Financial Solutions',
    tags: ['React', 'Node.js', 'TypeScript', 'Financial Systems', 'Scalable Architecture'],
    linkedin: 'https://www.linkedin.com/in/mahad-arshad',
    initials: 'MA',
  },
{
    name: 'Areeb Ahmed Siddiqui',
    role: 'ASP.NET Developer',
    specialty: 'Web Applications & Backend Systems',
    current: 'ASP.NET Developer @ CIS Pvt. Ltd.',
    tags: ['ASP.NET', 'C#', 'SQL Server', 'MVC', 'REST APIs'],
    linkedin: 'https://www.linkedin.com/in/areebahmedsiddiqui08',
    initials: 'AS',
  },
  {
    name: 'Syed Sarmad Arshad Hussaini',
    role: 'Full-Stack Developer',
    specialty: 'MERN · Next.js · TypeScript',
    current: '',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Next.js', 'TypeScript'],
    linkedin: 'https://www.linkedin.com/in/syedsarmadarshad',
    initials: 'SR',
  },
  {
    name: 'Sufiyan Imran',
    role: 'Full-Stack Developer',
    specialty: 'MERN · Next.js · TypeScript',
    current: '',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Next.js', 'TypeScript'],
    linkedin: 'https://www.linkedin.com/in/sufiyanimran',
    initials: 'SI',
  },
   {
    name: 'Hassan Ahmed Siddiqui',
    role: 'Frontend Developer',
    specialty: 'React · TypeScript · JavaScript',
    current: '',
    tags: ['React', 'TypeScript', 'JavaScript', 'UI Development'],
    linkedin: 'https://www.linkedin.com/in/hassan-ahmed-siddiqui2728',
    initials: 'HA',
  },
];

const gradients = [
  'from-violet-500/20 to-indigo-500/20',
  'from-cyan-500/20 to-blue-500/20',
  'from-emerald-500/20 to-teal-500/20',
  'from-orange-500/20 to-amber-500/20',
  'from-pink-500/20 to-rose-500/20',
  'from-purple-500/20 to-fuchsia-500/20',
];

const accentColors = [
  'text-violet-400',
  'text-cyan-400',
  'text-emerald-400',
  'text-orange-400',
  'text-pink-400',
  'text-purple-400',
];

const borderAccents = [
  'hover:border-violet-500/50',
  'hover:border-cyan-500/50',
  'hover:border-emerald-500/50',
  'hover:border-orange-500/50',
  'hover:border-pink-500/50',
  'hover:border-purple-500/50',
];

const avatarColors = [
  'bg-violet-500/20 text-violet-300 ring-violet-500/30',
  'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
  'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
  'bg-orange-500/20 text-orange-300 ring-orange-500/30',
  'bg-pink-500/20 text-pink-300 ring-pink-500/30',
  'bg-purple-500/20 text-purple-300 ring-purple-500/30',
];

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

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
      className={`
        relative group rounded-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm p-6
        transition-all duration-300 cursor-default overflow-hidden
        ${borderAccents[index % borderAccents.length]}
        hover:bg-slate-800/80 hover:shadow-2xl hover:-translate-y-1
      `}
    >
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-br ${gradients[index % gradients.length]}
        pointer-events-none
      `} />

      <div className={`
        absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        bg-gradient-to-r ${gradients[index % gradients.length].replace('/20', '/60')}
      `} />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold
            ring-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-105
            ${avatarColors[index % avatarColors.length]}
          `}>
            {member.initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-base leading-tight truncate">{member.name}</h3>
            <p className={`text-sm font-medium mt-0.5 ${accentColors[index % accentColors.length]}`}>
              {member.role}
            </p>
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-3 leading-relaxed">{member.specialty}</p>

        {member.current && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-slate-700/40 border border-slate-600/30">
            <p className="text-xs text-slate-300 leading-relaxed">{member.current}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4">
          {member.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/40"
            >
              {tag}
            </span>
          ))}
        </div>

        
        <a
  href={member.linkedin}
  target="_blank"
  rel="noopener noreferrer"
  className={`
    inline-flex items-center gap-1.5 text-xs font-medium transition-all duration-200
    ${accentColors[index % accentColors.length]} hover:opacity-80
  `}
>
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
  LinkedIn Profile
</a>
      </div>
    </div>
  );
}

export default function TeamContent() {
  const { ref: heroRef, inView: heroInView } = useInView(0.1);

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

      <section className="mx-auto max-w-6xl">
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
            <h1 className="text-4xl font-bold tracking-tight">Our Team</h1>
          </div>
          <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
            A dedicated team of developers, designers, and engineers building the future of technology.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-400">{team.length} team members</span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}