import type {Metadata} from 'next';
import './globals.css';
import { Inter, Libre_Baskerville } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const libreBaskerville = Libre_Baskerville({ weight: ['400', '700'], style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'AsiaTerra Travel',
  description: 'Tourist website specializing in curated experiences across Southeast Asian landscapes.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-bg text-text" suppressHydrationWarning>
        <LanguageProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 shadow-lg z-50 cursor-pointer hover:bg-gray-700 transition-colors">
            <span>Backend: Connected</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
