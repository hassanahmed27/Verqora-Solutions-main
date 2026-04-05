import type { Metadata } from 'next';
import TestimonialsContent from './TestimonialsContent';

export const metadata: Metadata = {
  title: 'Verqora | Testimonials',
  description: 'See what our clients say about Verqora.',
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}