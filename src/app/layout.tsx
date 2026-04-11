import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dhruv Prajapati — Full Stack Developer',
  description:
    'Portfolio of Dhruv Prajapati — aspiring full-stack developer specializing in MERN stack, React, Node.js, and modern web technologies.',
  keywords: ['Dhruv Prajapati', 'Full Stack Developer', 'MERN Stack', 'React', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Dhruv Prajapati' }],
  openGraph: {
    title: 'Dhruv Prajapati — Full Stack Developer Portfolio',
    description: 'Building systems that actually scale.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} bg-cream text-ink font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
