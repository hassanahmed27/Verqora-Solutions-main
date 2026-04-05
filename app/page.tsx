import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: 'Verqora | Home',
  description: 'Modern IT solutions for business growth with Verqora.',
};

export default function Home() {
  return <HomeContent />;
}