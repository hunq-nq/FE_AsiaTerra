import { Tour } from '@/lib/api';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Clock, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TourCard({ tour }: { tour: Tour }) {
  const { dict } = useLanguage();

  return (
    <div className="bg-card-bg rounded-xl border border-border overflow-hidden hover:scale-[1.02] transition-transform duration-200 flex flex-col h-full group shadow-none">
      <Link href={`/tours/${tour.id}`} className="relative h-40 w-full block overflow-hidden">
        <Image 
          src={tour.image} 
          alt={tour.title} 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-[11px] text-gray-500 uppercase font-semibold mb-1">
          {tour.location} • {tour.duration} {dict.tours.duration}
        </div>
        
        <h4 className="font-semibold text-base text-gray-900 leading-snug mb-3">
          <Link href={`/tours/${tour.id}`} className="hover:text-primary transition-colors">
            {tour.title}
          </Link>
        </h4>
        
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50">
          <div className="text-primary font-bold text-base">
            ${tour.price} <span className="text-xs text-gray-400 font-normal">/ pp</span>
          </div>
          <div className="text-xs text-yellow-600 font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-600" /> {tour.rating} ({tour.reviews})
          </div>
        </div>
      </div>
    </div>
  );
}
