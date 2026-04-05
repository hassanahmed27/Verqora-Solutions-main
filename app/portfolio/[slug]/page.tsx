import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  website: string;
  github: string;
  details: string[];
  results: string[];
  tech: string[];
};

const projects: Project[] = [
  {
    slug: 'focusly-ai-agent',
    title: 'Focusly AI Agent',
    image: 'https://mahadhussaini.netlify.app/project-images/focusly-weld.vercel.app_.png',
    website: 'https://focusly-weld.vercel.app/',
    github: 'https://github.com/mahadhussaini/focusly',
    description: 'Autonomous AI productivity agent that manages schedule, minimizes interruptions, and periodically nudges deep work.',
    details: [
      'Streamlines calendar workflows using smart time-blocking',
      'Applies AI signals to triage tasks and low-energy windows',
      'Integrates with Google Calendar and Slack for notifications',
    ],
    results: ['30K+ users onboarded', '2M+ sessions', '85% automation rate'],
    tech: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'PostgreSQL', 'TRPC'],
  },
  {
    slug: 'crm-erp-platform',
    title: 'CRM-ERP Platform',
    image: 'https://mahadhussaini.netlify.app/project-images/crm-erp-platform.vercel.app_.png',
    website: 'https://crm-erp-platform.vercel.app/',
    github: 'https://github.com/mahadhussaini/crm-erp-platform',
    description: 'Full-service CRM and ERP with customer lifecycle management, inventory tracking, and enterprise controls.',
    details: [
      'Role-based dashboards and multi-tenant data partitioning',
      'GraphQL API for analytics and real-time inventory update',
      'Workflow automation for billing and order reconciliation',
    ],
    results: ['500+ active users', '98% uptime', '60% process automation'],
    tech: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'Redis'],
  },
  {
    slug: 'memrise-clone',
    title: 'Memrise Clone',
    image: 'https://mahadhussaini.netlify.app/project-images/memrise-eight.vercel.app_.png',
    website: 'https://memrise-eight.vercel.app/',
    github: 'https://github.com/mahadhussaini/memrise',
    description: 'Gamified language learning platform with adaptive spaced repetition and interactive exercises.',
    details: [
      'Adaptive repetition algorithm for vocabulary retention',
      'Gamification via badges, levels, and leaderboards',
      'Course authoring toolkit for instructors',
    ],
    results: ['2,000+ users', '150+ courses', '85% retention'],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
  },
  {
    slug: 'closette-social-platform',
    title: 'Closette Social Platform',
    image: 'https://mahadhussaini.netlify.app/project-images/closette-zeta.vercel.app_.png',
    website: 'https://closette-zeta.vercel.app/',
    github: 'https://github.com/mahadhussaini/closette',
    description: 'Fashion-focused social ecosystem with community feeds, real-time chat, and trend discovery.',
    details: [
      'Real-time messaging and notifications using Socket.io',
      'Algorithmic trending feed and user content moderation',
      'Rich media uploads, tagging and topic channels',
    ],
    results: ['10K+ users', '500K+ messages', '92% DAU'],
    tech: ['React', 'Node.js', 'Socket.io', 'Redis', 'MongoDB'],
  },
  {
    slug: 'formify-builder',
    title: 'Formify Builder',
    image: 'https://mahadhussaini.netlify.app/project-images/formify-wine.vercel.app_.png',
    website: 'https://formify-wine.vercel.app/',
    github: 'https://github.com/mahadhussaini/formify',
    description: 'Visual forms builder with conditional logic, analytics, and form embedding.',
    details: [
      'Drag-and-drop form creation with field rules',
      'Real-time submission dashboard and export',
      'Custom webhook and third-party integration pipelines',
    ],
    results: ['50K+ forms', '2M+ submissions', '96% user satisfaction'],
    tech: ['React', 'Node.js', 'MongoDB', 'D3.js', 'TypeScript'],
  },
  {
    slug: 'nutri-ai-assistant',
    title: 'NutriAI Assistant',
    image: 'https://mahadhussaini.netlify.app/project-images/nutri-ai-theta.vercel.app_.png',
    website: 'https://nutri-ai-theta.vercel.app/',
    github: 'https://github.com/mahadhussaini/nutriAI',
    description: 'AI-powered health companion for meal planning, calorie tracking, and progress suggestions.',
    details: [
      'Image recognition for estimating calories and nutrients',
      'Personalized meal plans based on goals and dietary restrictions',
      'Progress reports, reminders and smart notifications',
    ],
    results: ['15K+ users', '94% accuracy', '78% goal achievement'],
    tech: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
  },
];

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export default function ProjectDetails({ params }: { params: { slug: string } }) {
  const project = projects.find(item => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-950/80 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/portfolio" className="text-sm text-brand-300 hover:underline">
          &larr; Back to Portfolio
        </Link>
        <h1 className="mt-3 text-4xl font-bold">{project.title}</h1>
        <p className="mt-2 text-slate-300">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a href={project.website} target="_blank" rel="noreferrer" className="rounded-lg border border-brand-500 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-100 hover:bg-brand-500/20">Live Project</a>
          <a href={project.github} target="_blank" rel="noreferrer" className="rounded-lg border border-brand-500 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-100 hover:bg-brand-500/20">GitHub Repo</a>
          <Link href="/portfolio" className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700">Back to Portfolio</Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
            <h2 className="text-xl font-semibold">Project highlights</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              {project.details.map((detail, index) => <li key={index}>{detail}</li>)}
            </ul>
          </article>

          <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
            <h2 className="text-xl font-semibold">Results</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              {project.results.map((result, index) => <li key={index}>{result}</li>)}
            </ul>
          </article>

          <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 md:col-span-2">
            <h2 className="text-xl font-semibold">Tech stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span key={index} className="rounded-full bg-brand-500/20 px-3 py-1 text-sm text-brand-100">
                  {tech}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 md:col-span-2">
            <h2 className="text-xl font-semibold">Screenshot with Lightbox</h2>
            <p className="mt-2 text-slate-400">Click the screenshot to view full size in a new tab (lightbox-style interaction).</p>
            <a href={project.image} target="_blank" rel="noreferrer" className="mt-4 block overflow-hidden rounded-xl border border-slate-700 transition hover:border-brand-400 hover:shadow-xl relative h-72 w-full">
              <Image src={project.image} alt={`${project.title} screenshot`} fill style={{ objectFit: 'cover' }} className="transition duration-300 transform hover:scale-105" />
            </a>
            <p className="mt-2 text-xs text-slate-400">Screenshot source URL: <a href={project.image} target="_blank" rel="noreferrer" className="text-brand-300 hover:underline">Open full resolution</a></p>
          </article>
        </div>
      </div>
    </section>
  );
}
