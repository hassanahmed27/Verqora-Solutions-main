'use client';

import Link from 'next/link';
import { Linkedin, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const links = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Our Team', href: '/team' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Web Development', href: '/services' },
    { label: 'Frontend Development', href: '/services' },
    { label: 'Backend Development', href: '/services' },
    { label: 'Graphic Designing', href: '/services' },
    { label: 'Surveillance & Security', href: '/services' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/40 bg-slate-950/80 backdrop-blur-sm px-4 pt-16 pb-8 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-6xl">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400" />
              <span className="text-xl font-bold text-white tracking-tight">
                Verqora
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Building innovative, scalable digital products for businesses globally.
              From startups to enterprises we deliver engineering quality that lasts.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2.5">
              <a
                href="mailto:contact@verqora.com"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-violet-400 transition-colors duration-200"
              >
                <Mail size={14} className="text-violet-400 flex-shrink-0" />
                verqorasolution@gmail.com
              </a>

              <a
                href="tel:+923278711795"
              className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Phone size={14} className="text-cyan-400 flex-shrink-0" />
              +92 327 8711795
            </a>

              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin size={14} className="text-emerald-400 flex-shrink-0" />
                Karachi, Pakistan
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">

              <a
                href="https://www.linkedin.com/in/verqora-solutions-8a12b0401/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-700/60 bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200"
              >
                <Linkedin size={15} />
              </a>

              <a
                href="https://www.instagram.com/verqorasolutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-700/60 bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-200"
              >
                <Instagram size={15} />
              </a>

              {/* <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-700/60 bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-200"
              >
                <Twitter size={15} />
              </a> */}

            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Company
            </h4>

            <ul className="space-y-2.5">
              {links.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-violet-400 transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Services
            </h4>

            <ul className="space-y-2.5">
              {links.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-slate-700/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Verqora Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-500">
              Currently accepting new projects
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}