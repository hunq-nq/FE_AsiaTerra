'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getTours, Tour } from '@/lib/api';
import TourCard from '@/components/TourCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function ToursContent() {
  const { dict } = useLanguage();
  const searchParams = useSearchParams();
  const locationParam = searchParams.get('location') || '';
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(locationParam);

  useEffect(() => {
    async function loadTours() {
      const data = await getTours();
      setTours(data);
      setLoading(false);
    }
    loadTours();
  }, []);

  useEffect(() => {
    if (locationParam) {
      Promise.resolve().then(() => setSelectedLocation(locationParam));
    }
  }, [locationParam]);

  const locations = Array.from(new Set(tours.map(t => t.location)));

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation ? tour.location === selectedLocation : true;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="bg-bg min-h-screen pb-20">
      {/* Header Block */}
      <div className="bg-primary pt-12 pb-24 px-4 text-white">
        <div className="container mx-auto max-w-7xl">
          <h1 className="font-serif text-4xl font-bold mb-4">{dict.tours.title}</h1>
          <p className="text-white/80 max-w-2xl text-lg opacity-90 font-light">Browse our complete catalogue of curated experiences across the mesmerizing landscapes of Southeast Asia.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-7xl px-4 -mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-card-bg p-6 rounded-2xl border border-border sticky top-24 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-lg mb-6 text-gray-900 pb-4 border-b border-border">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                {dict.tours.filters.title}
              </div>
              
              {/* Filter By Location */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">{dict.tours.filters.location}</h3>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setSelectedLocation('')}
                    className={`text-left text-sm flex items-center gap-2 ${!selectedLocation ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary transition-colors'}`}
                  >
                    <input type="radio" checked={!selectedLocation} readOnly className="accent-primary" /> All Locations
                  </button>
                  {locations.map(loc => (
                    <button 
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`text-left text-sm flex items-center gap-2 ${selectedLocation === loc ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary transition-colors'}`}
                    >
                      <input type="radio" checked={selectedLocation === loc} readOnly className="accent-primary" /> {loc}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quote Block referencing the design */}
              <div className="bg-[#f0fdf4] p-4 rounded-lg border border-[#bbf7d0] mt-8">
                <p className="text-xs text-primary leading-relaxed font-medium">“AsiaTerra organized the perfect tailormade trip for us in Luang Prabang.”<br/><span className="italic opacity-80 mt-1 block">— Jean-Paul D.</span></p>
              </div>
            </div>
          </div>

          {/* Tour Grid */}
          <div className="w-full lg:w-3/4">
            {/* Search Bar Top */}
            <div className="bg-card-bg p-4 rounded-xl border border-border mb-8 flex items-center shadow-sm">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Search specific tours..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full outline-none bg-transparent text-sm font-medium"
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center text-gray-500">
                    No tours found matching your criteria.
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <ToursContent />
    </Suspense>
  );
}
