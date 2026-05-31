'use client';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Compass } from 'lucide-react';

export default function Footer() {
  const { dict } = useLanguage();
  return (
    <footer className="bg-gray-900 justify-end text-gray-300 py-12 mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
            <Compass className="w-6 h-6 text-primary" />
            <span>AsiaTerra</span>
          </div>
          <p className="text-sm max-w-sm mb-6 text-gray-400">
            {dict.hero.subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-2">
           <h4 className="text-white font-semibold mb-2">Company</h4>
           <a href="#" className="text-sm hover:text-primary transition-colors">About Us</a>
           <a href="#" className="text-sm hover:text-primary transition-colors">Careers</a>
           <a href="#" className="text-sm hover:text-primary transition-colors">Contact</a>
        </div>
        <div className="flex flex-col gap-2">
           <h4 className="text-white font-semibold mb-2">Support</h4>
           <a href="#" className="text-sm hover:text-primary transition-colors">FAQ</a>
           <a href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</a>
           <a href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</a>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>{dict.footer.rights}</p>
      </div>
    </footer>
  );
}
