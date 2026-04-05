import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Verqora | Services',
  description: 'Explore Verqora services for web, frontend, backend and optimization.',
};

export default function ServicesPage() {
  return <ServicesContent />;
}