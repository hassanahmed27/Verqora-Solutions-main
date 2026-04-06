'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.1) {
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

const contactInfo = [
  {
    label: 'Response Time',
    value: 'Within 24 hours',
    accent: 'violet',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Project Kickoff',
    value: 'Within 1 week',
    accent: 'cyan',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    label: 'Availability',
    value: 'Mon – Sat, 9am – 7pm',
    accent: 'emerald',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
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

function InfoCard({ item, index }: { item: typeof contactInfo[0]; index: number }) {
  const { ref, inView } = useInView();
  const colors = accentMap[item.accent];

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
      className={`
        relative group rounded-2xl border border-slate-700/60 bg-slate-800/50
        backdrop-blur-sm p-5 transition-all duration-300 overflow-hidden
        ${colors.border} hover:bg-slate-800/80 hover:-translate-y-1 hover:shadow-xl
      `}
    >
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colors.gradient} pointer-events-none`} />
      <div className={`absolute top-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${colors.topLine}`} />
      <div className="relative z-10 flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ring-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${colors.iconBg}`}>
          {item.icon}
        </div>
        <div>
          <p className="text-xs text-slate-400">{item.label}</p>
          <p className={`text-sm font-semibold mt-0.5 ${colors.text}`}>{item.value}</p>
        </div>
      </div>
    </div>
  );
}

export default function ContactContent() {
  const { ref: heroRef, inView: heroInView } = useInView(0.1);
  const { ref: formRef, inView: formInView } = useInView(0.1);

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Message sent successfully!');
        form.reset(); // Form clear kar do
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  }

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

      <section className="mx-auto max-w-4xl space-y-8">

        {/* Header */}
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
            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          </div>
          <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
            Need help with your digital project? Send us a message and we'll get back to you within 24 hours.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-400">Currently accepting new projects</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {contactInfo.map((item, index) => (
            <InfoCard key={item.label} item={item} index={index} />
          ))}
        </div>

        {/* Form */}
        <div
          ref={formRef}
          style={{
            opacity: formInView ? 1 : 0,
            transform: formInView ? 'translateY(0px)' : 'translateY(28px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
          className="relative group rounded-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm p-8 overflow-hidden"
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 pointer-events-none" />
          <div className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-500/60 to-cyan-500/60" />

          <div className="relative z-10">
            <h2 className="text-lg font-semibold text-white mb-6">Send a Message</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Name */}
              <label className="space-y-1.5">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Name *</span>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
                />
              </label>

              {/* Email */}
              <label className="space-y-1.5">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email *</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@company.com"
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
                />
              </label>

              {/* Subject */}
              <label className="col-span-1 sm:col-span-2 space-y-1.5">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Subject</span>
                <input
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
                />
              </label>

              {/* Message */}
              <label className="col-span-1 sm:col-span-2 space-y-1.5">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Message *</span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 resize-none"
                />
              </label>

              {/* Submit Button */}
              <div className="col-span-1 sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-wait px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Status Message */}
                {message && (
                  <div className={`mt-4 flex items-center gap-2 text-sm rounded-xl px-4 py-3 border ${
                    status === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}>
                    {status === 'success' ? (
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                    )}
                    {message}
                  </div>
                )}
              </div>

            </form>
          </div>
        </div>

      </section>
    </main>
  );
}