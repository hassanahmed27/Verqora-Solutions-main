import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'Verqora | About',
  description: 'Learn about Verqora mission, vision and values.',
};

export default function AboutPage() {
  return <AboutContent />;
}