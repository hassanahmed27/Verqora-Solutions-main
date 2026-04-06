'use client';

import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    quote: 'Working with Verqora Solutions on our client web platform was outstanding. The team was responsive, solved complex bugs, and delivered QR and calendar features seamlessly with strong communication throughout.',
    author: 'E-commerce Director',
    company: 'Global Startup',
    rating: 5,
    accent: 'violet',
  },
  {
    quote: 'Verqora Solutions consistently delivers high-quality work and transparent collaboration. They improved performance across our site, introduced reliable automation flows, and made cross-team coordination effortless.',
    author: 'Product Lead',
    company: 'Fintech Services',
    rating: 5,
    accent: 'cyan',
  },
  {
    quote: 'Verqora\'s engineering team showed excellent professionalism and problem-solving. They fixed hard issues quickly, optimized speed metrics significantly, and kept customers informed every step of the way.',
    author: 'Operations Manager',
    company: 'SaaS Platform',
    rating: 5,
    accent: 'emerald',
  },
];

const accentMap: Record<string, {
  gradient: string;
  border: string;
  avatar: string;
  text: string;
  star: string;
  quote: string;
}> = {
  violet: {
    gradient: 'from-violet-500/20 to-indigo-500/20',
    border: 'hover:border-violet-500/50',
    avatar: 'bg-violet-500/20 text-violet-300 ring-violet-500/30',
    text: 'text-violet-400',
    star: 'text-violet-400',
    quote: 'text-violet-300/30',
  },
  cyan: {
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'hover:border-cyan-500/50',
    avatar: 'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
    text: 'text-cyan-400',
    star: 'text-cyan-400',
    quote: 'text-cyan-300/30',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-teal-500/20',
    border: 'hover:border-emerald-500/50',
    avatar: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
    text: 'text-emerald-400',
    star: 'text-emerald-400',
    quote: 'text-emerald-300/30',
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

function StarRating({ count, colorClass }: { count: number; colorClass: string }) {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? colorClass : 'text-slate-600'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ item, index }: { item: typeof testimonials[0]; index: number }) {
  const { ref, inView } = useInView();
  const colors = accentMap[item.accent];

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
      className={`
        relative group rounded-2xl border border-slate-700/60 bg-slate-800/50
        backdrop-blur-sm p-7 transition-all duration-300 overflow-hidden
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
        transition-opacity duration-300 bg-gradient-to-r ${colors.gradient.replace('/20', '/60')}
      `} />

      {/* Big decorative quote mark */}
      <div className={`absolute top-4 right-6 text-7xl font-serif leading-none ${colors.quote} select-none pointer-events-none`}>
        {"\u201C"}
      </div>

      <div className="relative z-10">
        {/* Stars */}
        <StarRating count={item.rating} colorClass={colors.star} />

        {/* Quote */}
        <p className="text-slate-200 text-sm leading-relaxed mb-6">
          {"\u201C"}{item.quote}{"\u201D"}
        </p>

        {/* Divider */}
        <div className="border-t border-slate-700/50 pt-4">
          <div className="flex items-center gap-3">
            <div className={`
              w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold
              ring-1 flex-shrink-0 ${colors.avatar}
            `}>
              {item.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p className={`text-sm font-semibold ${colors.text}`}>{item.author}</p>
              <p className="text-xs text-slate-400">{item.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsContent() {
  const { ref: heroRef, inView: heroInView } = useInView(0.1);

  const avgRating = testimonials.reduce((a, b) => a + b.rating, 0) / testimonials.length;

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
            <h1 className="text-4xl font-bold tracking-tight">Testimonials</h1>
          </div>
          <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
            What our clients say about working with Verqora Solutions.
          </p>
          <div className="mt-6 flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-400">{testimonials.length} client reviews</span>
            </div>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-sm text-slate-400 ml-1">{avgRating.toFixed(1)} avg rating</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} item={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}