import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Verqora | Contact',
  description: 'Get in touch with Verqora Solutions.',
};

export default function ContactPage() {
  return <ContactContent />;
}