import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/lib/store/ReduxProvider';
import { AuthProvider } from '@/lib/AuthContext';
import { Navbar } from '@/components/Navbar';
import { WelcomePopup } from '@/components/WelcomePopup';
import { Footer } from '@/components/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cineplanet Challenge',
  description: 'Technical challenge for Cineplanet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        <ReduxProvider>
          <AuthProvider>
            <Navbar />
            <WelcomePopup />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
