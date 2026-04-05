import type { Metadata } from 'next';
import TeamContent from './TeamContent';

export const metadata: Metadata = {
  title: 'Verqora | Our Team',
  description: 'Meet the talented Verqora development team.',
};

export default function TeamPage() {
  return <TeamContent />;
}