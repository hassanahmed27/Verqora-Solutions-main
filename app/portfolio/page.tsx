import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    slug: 'focusly-ai-agent',
    title: 'Focusly AI Agent',
    description: 'Autonomous AI productivity agent for smart scheduling and deep work optimization.',
    image: 'https://mahadhussaini.netlify.app/project-images/focusly-weld.vercel.app_.png',
    website: 'https://focusly-weld.vercel.app/',
    github: 'https://github.com/mahadhussaini/focusly',
    bullets: ['30K+ users and 2M+ sessions', '85% automation rate', 'Next.js, TypeScript, Vercel AI SDK', 'Calendar + behavior analytics'],
  },
  {
    slug: 'crm-erp-platform',
    title: 'CRM-ERP Platform',
    description: 'Enterprise-grade CRM and ERP suite with operational analytics and workflow automation.',
    image: 'https://mahadhussaini.netlify.app/project-images/crm-erp-platform.vercel.app_.png',
    website: 'https://crm-erp-platform.vercel.app/',
    github: 'https://github.com/mahadhussaini/crm-erp-platform',
    bullets: ['500+ users with 98% uptime', '60% process automation', 'TypeScript, React, GraphQL', 'Role-based dashboards'],
  },
  {
    slug: 'memrise-clone',
    title: 'Memrise Clone',
    description: 'Spaced repetition learning platform with gamification and progress tracking.',
    image: 'https://mahadhussaini.netlify.app/project-images/memrise-eight.vercel.app_.png',
    website: 'https://memrise-eight.vercel.app/',
    github: 'https://github.com/mahadhussaini/memrise',
    bullets: ['2,000+ users, 150+ courses', '85% retention', 'React, Node.js, MongoDB', 'Adaptive learning algorithm'],
  },
  {
    slug: 'closette-social-platform',
    title: 'Closette Social Platform',
    description: 'Fashion community social app with real-time messaging and content discovery.',
    image: 'https://mahadhussaini.netlify.app/project-images/closette-zeta.vercel.app_.png',
    website: 'https://closette-zeta.vercel.app/',
    github: 'https://github.com/mahadhussaini/closette',
    bullets: ['10K+ users and 500K+ messages', '92% DAU', 'Socket.io + Redis', 'Rich media streams'],
  },
  {
    slug: 'formify-builder',
    title: 'Formify Builder',
    description: 'Drag-and-drop form builder with advanced validation and analytics.',
    image: 'https://mahadhussaini.netlify.app/project-images/formify-wine.vercel.app_.png',
    website: 'https://formify-wine.vercel.app/',
    github: 'https://github.com/mahadhussaini/formify',
    bullets: ['50K forms and 2M submissions', '96% satisfaction', 'Node.js, MongoDB, D3', 'Conditional workflows'],
  },
  {
    slug: 'nutri-ai-assistant',
    title: 'NutriAI Assistant',
    description: 'AI nutrition assistant with meal-planning and calorie recognition.',
    image: 'https://mahadhussaini.netlify.app/project-images/nutri-ai-theta.vercel.app_.png',
    website: 'https://nutri-ai-theta.vercel.app/',
    github: 'https://github.com/mahadhussaini/nutriAI',
    bullets: ['15K+ users', '94% recognition accuracy', 'Python, TensorFlow, FastAPI', 'Goal tracking + recommendations'],
  },
];

export const metadata = {
  title: 'Verqora | Portfolio',
  description: 'Explore Verqora portfolio with case studies, project details, and technology insights.',
};

export default function PortfolioPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-950/75 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Portfolio</h1>
        <p className="mt-3 text-lg text-slate-300">
          Explore our selected projects with case details, technology strategy, and measurable outcomes.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <article key={project.slug} className="rounded-2xl border border-slate-700 bg-slate-900/80 p-0 overflow-hidden shadow-xl transition hover:-translate-y-1 hover:border-brand-400">
              <Link href={`/portfolio/${project.slug}`} className="block overflow-hidden relative h-40 w-full">
                <Image src={project.image} alt={`${project.title} snapshot`} fill style={{ objectFit: 'cover' }} className="transition duration-300 hover:scale-105" />
              </Link>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                <p className="mt-2 text-slate-300">{project.description}</p>

                <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
                  {project.bullets.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href={`/portfolio/${project.slug}`} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">View Case Study</Link>
                  <a href={project.website} target="_blank" rel="noreferrer" className="rounded-lg border border-brand-500 px-4 py-2 text-sm font-semibold text-brand-100 hover:bg-brand-500/25">Live Site</a>
                  <a href={project.github} target="_blank" rel="noreferrer" className="rounded-lg border border-brand-500 px-4 py-2 text-sm font-semibold text-brand-100 hover:bg-brand-500/25">GitHub</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
