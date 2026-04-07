import type { Metadata } from 'next';
import PortfolioContent from './PortfolioContent';

export const metadata: Metadata = {
  title: 'Verqora | Portfolio',
  description: 'Explore Verqora portfolio with case studies, project details, and technology insights.',
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}