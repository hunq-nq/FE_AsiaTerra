import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DestinationsPage() {
  const destinations = [
    {
      country: 'Vietnam',
      subtitle: 'Land of the Ascending Dragon',
      image: 'https://images.unsplash.com/photo-1555661530-68c8e98db4e6?auto=format&fit=crop&w=1200&h=600',
      description: 'From the staggering limestone karsts of Ha Long Bay to the vibrant energy of Ho Chi Minh City, Vietnam is a country of breathtaking diversity and profound history. Experience the culinary delights of street food, the peaceful terraced rice fields of Sapa, and the ancient ruins of Hue.',
      highlights: ['Ha Long Bay Cruises', 'Sapa Trekking', 'Hanoi Old Quarter', 'Mekong Delta Explore'],
      tourLink: '/tours?location=Vietnam'
    },
    {
      country: 'Cambodia',
      subtitle: 'Kingdom of Wonder',
      image: 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&w=1200&h=600',
      description: 'Home to the magnificent Angkor Wat, Cambodia offers a deep dive into an ancient empire. But there is more to this resilient nation—discover the untouched beaches of Koh Rong, the dense jungles of the Cardamom Mountains, and the lively capital of Phnom Penh.',
      highlights: ['Angkor Wat Sunrise', 'Tonle Sap Floating Villages', 'Phnom Penh History', 'Koh Rong Beaches'],
      tourLink: '/tours?location=Cambodia'
    },
    {
      country: 'Thailand',
      subtitle: 'The Land of Smiles',
      image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&h=600',
      description: 'Thailand perfectly balances serene Buddhist temples with world-class beaches and extraordinary wildlife. Journey through the mountainous north around Chiang Mai, dive into the turquoise waters of the Andaman Sea, and feel the pulse of Bangkok.',
      highlights: ['Bangkok Grand Palace', 'Chiang Mai Temples', 'Phuket Island Hopping', 'Khao Sok National Park'],
      tourLink: '/tours?location=Thailand'
    },
    {
      country: 'Laos',
      subtitle: 'The Serene Heart of Southeast Asia',
      image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=1200&h=600',
      description: 'Often overlooked, Laos is a laid-back oasis of emerald landscapes and Buddhist traditions. Cruise the majestic Mekong River, witness morning alms in Luang Prabang, and explore the spectacular waterfalls scattered across the country.',
      highlights: ['Luang Prabang Heritage', 'Kuang Si Falls', 'Mekong River Cruises', 'Vang Vieng Adventure'],
      tourLink: '/tours?location=Laos'
    }
  ];

  return (
    <div className="bg-bg min-h-screen pb-24">
      {/* Header Block */}
      <div className="bg-primary pt-12 pb-24 px-4 text-white">
        <div className="container mx-auto max-w-7xl text-center md:text-left">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Destinations</h1>
          <p className="text-white/80 max-w-2xl mx-auto md:mx-0 text-lg opacity-90 font-light text-balance leading-relaxed">
            Discover a curated collection of extraordinary places across Southeast Asia. Each country offers a unique tapestry of cultures, landscapes, and stories waiting to be unraveled.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-7xl -mt-10 relative z-10">
        <div className="space-y-16 lg:space-y-24">
          {destinations.map((dest, idx) => (
            <div key={dest.country} className="bg-card-bg rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="relative h-64 md:h-[400px] w-full">
                <Image 
                  src={dest.image}
                  alt={`Explore ${dest.country}`}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-2">{dest.country}</h2>
                  <p className="text-white/90 text-lg font-medium">{dest.subtitle}</p>
                </div>
              </div>
              
              <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">About {dest.country}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">
                    {dest.description}
                  </p>
                  
                  <Link 
                    href={dest.tourLink} 
                    className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors text-sm"
                  >
                    View {dest.country} Tours
                  </Link>
                </div>
                
                <div className="lg:w-1/3">
                  <div className="bg-bg p-6 rounded-xl border border-border">
                    <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-4">Top Highlights</h4>
                    <ul className="space-y-3">
                      {dest.highlights.map(highlight => (
                        <li key={highlight} className="flex items-center gap-3 text-gray-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
