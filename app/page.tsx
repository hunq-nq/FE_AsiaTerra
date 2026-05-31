'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { mockTours } from '@/lib/api';
import TourCard from '@/components/TourCard';
import { MapPin, Search, Star } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function Home() {
  const { dict } = useLanguage();
  
  // Featured tours (first 3)
  const featuredTours = mockTours.slice(0, 3);
  
  const destinations = [
    { name: 'Vietnam', image: 'https://images.unsplash.com/photo-1555661530-68c8e98db4e6?auto=format&fit=crop&w=600&h=800' },
    { name: 'Thailand', image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=600&h=800' },
    { name: 'Cambodia', image: 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&w=600&h=800' },
    { name: 'Laos', image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=600&h=800' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1920&h=1080" 
            alt="Southeast Asia Landscape" 
            fill 
            className="object-cover brightness-[0.65]"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center mt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          >
            {dict.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-white opacity-90 mb-10 max-w-2xl mx-auto drop-shadow-sm font-light"
          >
            {dict.hero.subtitle}
          </motion.p>
          
          {/* Main Search Component in Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card-bg p-4 md:p-5 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto border border-border mt-8"
          >
            <div className="flex-1 flex flex-col items-start w-full px-2">
               <span className="text-[11px] font-bold uppercase text-primary mb-1">Destination</span>
               <input 
                 type="text" 
                 placeholder={dict.hero.searchPlaceholder} 
                 className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 font-medium text-sm"
               />
            </div>
            <div className="hidden md:block w-px h-10 bg-border"></div>
            <div className="flex-1 flex flex-col items-start w-full px-2">
               <span className="text-[11px] font-bold uppercase text-primary mb-1">Month</span>
               <input 
                 type="text" 
                 placeholder="Any month" 
                 className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 font-medium text-sm"
               />
            </div>
            <div className="hidden md:block w-px h-10 bg-border"></div>
            <div className="flex-1 flex flex-col items-start w-full px-2">
               <span className="text-[11px] font-bold uppercase text-primary mb-1">Tour Type</span>
               <input 
                 type="text" 
                 placeholder="Adventure, Cultural..." 
                 className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 font-medium text-sm"
               />
            </div>

            <Link 
              href="/tours"
              className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center shadow-md whitespace-nowrap ml-auto"
            >
               {dict.hero.btn_search}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-bg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text mb-4">{dict.destinations.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">{dict.destinations.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div 
                key={dest.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer shadow-sm border border-border"
              >
                <Image 
                  src={dest.image} 
                  alt={dest.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white text-left">
                  <h3 className="font-serif text-2xl font-bold mb-1">{dest.name}</h3>
                  <p className="text-sm font-medium text-gray-200 group-hover:text-accent transition-colors flex items-center gap-1">
                    Explore tours <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                </div>
                <Link href="/destinations" className="absolute inset-0 z-10">
                  <span className="sr-only">Explore {dest.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-24 bg-card-bg border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-text mb-4">{dict.tours.title}</h2>
              <p className="text-gray-500 max-w-xl text-lg font-light">Hand-picked itineraries designed to immerse you in local culture.</p>
            </div>
            <Link href="/tours" className="mt-6 md:mt-0 text-primary font-semibold hover:text-primary-hover transition-colors flex items-center gap-1">
              View all tours →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 bg-bg border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text mb-4">What Our Travelers Say</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">Read stories from those who have journeyed with us across the region.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Jean-Paul D.',
                role: 'Traveled to Laos',
                content: 'AsiaTerra organized the perfect tailormade trip for us in Luang Prabang. Every detail was taken care of, and our guide was phenomenal.',
                rating: 5,
              },
              {
                name: 'Sarah Mitchell',
                role: 'Traveled to Vietnam',
                content: 'The Ha Long Bay cruise and our hike in Sapa were unforgettable experiences. The local knowledge of our guides made all the difference.',
                rating: 5,
              },
              {
                name: 'Elena & Marco',
                role: 'Traveled to Cambodia',
                content: 'Witnessing the sunrise at Angkor Wat was magical. The itinerary was perfectly balanced between cultural tours and free time to relax.',
                rating: 5,
              }
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card-bg p-8 rounded-2xl border border-border shadow-sm flex flex-col"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 flex-1">&quot;{review.content}&quot;</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
