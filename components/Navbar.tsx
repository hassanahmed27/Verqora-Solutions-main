'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Team', href: '/team' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `text-sm font-medium transition ${
      pathname === href ? 'text-white underline underline-offset-4 decoration-brand-400' : 'text-slate-300 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-xl border-b border-slate-500/40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 md:p-6">
        <Link href="/" className="flex items-center gap-4 text-2xl font-bold tracking-tight text-white">
          <div className="relative h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 overflow-visible">
            <div className="absolute inset-0 scale-[1.9] sm:scale-[2.1] md:scale-[2.4] origin-left">
              <Image src="/logo-white.png" alt="Verqora Logo" fill sizes="150px" style={{ objectFit: 'contain' }} />
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(prev => !prev)}
          className="md:hidden p-2 text-slate-200"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div className={`md:hidden ${mobileOpen ? 'block' : 'hidden'} border-t border-slate-400/20 bg-slate-900/90`}>
        <div className="flex flex-col gap-2 p-4">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? 'text-sm font-medium text-white underline underline-offset-4 decoration-brand-400'
                  : 'text-sm font-medium text-slate-200 hover:text-white'
              }
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
