'use client';

import React, { useState, useEffect, use } from 'react';
import { getTourById, Tour } from '@/lib/api';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Image from 'next/image';
import { MapPin, Clock, Star, Users, CheckCircle, ChevronRight, Share, Heart, Calendar, Globe, XCircle, Info, Pencil, X } from 'lucide-react';
import Link from 'next/link';

export default function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { dict } = useLanguage();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = tour ? [
    tour.image.replace('800/600', '1000/800'),
    'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1000&h=800',
    'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1000&h=800',
    'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=1000&h=800'
  ] : [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    async function load() {
      const data = await getTourById(resolvedParams.id);
      if (data) {
        setTour(data);
      }
      setLoading(false);
    }
    load();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Tour Not Found</h1>
        <Link href="/tours" className="text-primary hover:underline">Return to all tours</Link>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen text-text">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 max-w-7xl py-6">
        <nav className="flex text-sm text-gray-500 gap-2 items-center">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/tours" className="hover:text-primary transition-colors">Tours</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{tour.title}</span>
        </nav>
      </div>

      {/* Header Info */}
      <div className="container mx-auto px-4 max-w-7xl mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1 font-semibold">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-gray-900">{tour.rating}</span>
                <span className="text-gray-500">({tour.reviews} reviews)</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border"></div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{tour.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card-bg hover:bg-gray-50 transition-colors text-sm font-semibold">
              <Share className="w-4 h-4 text-gray-500" /> Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card-bg hover:bg-gray-50 transition-colors text-sm font-semibold">
              <Heart className="w-4 h-4 text-gray-500" /> Save
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 max-w-7xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:h-[450px] rounded-2xl overflow-hidden">
          <div className="md:col-span-2 relative h-[250px] md:h-full group cursor-pointer" onClick={() => openLightbox(0)}>
            <Image 
              src={tour.image.replace('800/600', '1000/800')} 
              alt={tour.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:block relative h-full group cursor-pointer" onClick={() => openLightbox(1)}>
            <Image 
              src={`https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=600&h=800`} 
              alt={tour.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:flex flex-col gap-2 h-full">
            <div className="relative h-1/2 group cursor-pointer overflow-hidden" onClick={() => openLightbox(2)}>
              <Image 
                src={`https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=600&h=400`} 
                alt={tour.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative h-1/2 group cursor-pointer overflow-hidden" onClick={() => openLightbox(3)}>
              <Image 
                src={`https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=600&h=400`} 
                alt={tour.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-lg border-2 border-white px-4 py-2 rounded-lg">See All Photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Content */}
      <div className="container mx-auto px-4 max-w-7xl pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column (Content) */}
          <div className="w-full lg:w-2/3">
            
            {/* Tour Snapshot Bar */}
            <div className="flex items-center gap-6 py-6 border-y border-border mb-8 overflow-x-auto">
               <div className="flex items-center gap-3 min-w-max">
                 <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary">
                    <Clock className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Duration</p>
                   <p className="text-sm font-semibold text-gray-900">{tour.duration} {dict.tours.duration}</p>
                 </div>
               </div>
               <div className="w-px h-8 bg-border"></div>
               <div className="flex items-center gap-3 min-w-max">
                 <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary">
                    <Users className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Group Size</p>
                   <p className="text-sm font-semibold text-gray-900">Max 12 People</p>
                 </div>
               </div>
               <div className="w-px h-8 bg-border"></div>
               <div className="flex items-center gap-3 min-w-max">
                 <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary">
                    <Globe className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Languages</p>
                   <p className="text-sm font-semibold text-gray-900">English, French</p>
                 </div>
               </div>
            </div>

            {/* Overview */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-bold mb-6 text-gray-900">Tour Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {tour.description} This deeply immersive journey offers a perfect blend of guided exploration and free time. Venture off the beaten path and discover hidden gems, connect with local communities, and create memories that will last a lifetime. Our expert guides are passionate storytellers, breathing life into every landmark and landscape.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you&apos;re exploring ancient ruins at sunrise, navigating bustling local markets, or simply enjoying the serene beauty of the region, our carefully crafted itinerary ensures you experience the true essence of {tour.location}.
              </p>
            </section>
            
            <div className="w-full h-px bg-border mb-12"></div>

            {/* Highlights */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-bold mb-6 text-gray-900">Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Experience stunning sunrises over ancient temples', 'Taste authentic local street food with an expert', 'Travel comfortably in air-conditioned vehicles', 'Explore rural villages and traditional crafts', 'Small group size for personalized attention'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-primary mt-0.5 flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="w-full h-px bg-border mb-12"></div>
            
            {/* Includes / Excludes */}
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-bold mb-6 text-gray-900">What&apos;s Included</h2>
              <div className="bg-card-bg rounded-xl border border-border p-6 md:p-8 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /> Included</h3>
                  <ul className="space-y-3">
                    {['Expert Local Guide', 'All Transportation', 'Entrance Fees', 'Hotel Pickup & Drop-off', 'Selected Local Meals'].map(item => (
                       <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                         <span>{item}</span>
                       </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden md:block w-px bg-border"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><XCircle className="w-5 h-5 text-red-500" /> Excluded</h3>
                  <ul className="space-y-3">
                    {['International Flights', 'Travel Insurance', 'Personal Expenses', 'Tips and Gratuities'].map(item => (
                       <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                         <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                         <span>{item}</span>
                       </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-border mb-12"></div>

            {/* Itinerary */}
             <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold mb-8 text-gray-900">Itinerary</h2>
              <div className="relative ml-3 lg:ml-4 border-l border-gray-200 space-y-10 pb-4">
                 {[
                   { day: 1, title: 'Airport Pick Up', content: 'Like on all of our trips, we can collect you from the airport when you land and take you directly to your hotel. The first Day is just a check-in Day so you have this freedom to explore the city and get settled in.' },
                   { day: 2, title: 'Temples & River Cruise', content: 'After breakfast, we will head out to explore the ancient temples. You will learn about the rich history and architecture. In the evening, enjoy a relaxing river cruise with dinner.' },
                   { day: 3, title: 'Massage & Overnight Train', content: 'Start your day with a traditional massage. Later, we will board the overnight train to our next destination, a fun and unique way to travel like a local.' },
                   { day: 4, title: 'Khao Sok National Park', content: 'Arrive early and head into the lush jungle. We will take a boat ride on the lake and stay in floating bungalows surrounded by breathtaking limestone karsts.' }
                 ].map((item, index) => (
                   <div key={item.day} className="relative pl-8">
                     {index === 0 ? (
                       <div className="absolute -left-[20px] top-0 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_0_4px_var(--color-bg)] z-10">
                         <MapPin className="w-5 h-5 fill-current" />
                       </div>
                     ) : (
                       <div className="absolute -left-[7px] top-1.5 bg-primary w-3.5 h-3.5 rounded-full shadow-[0_0_0_4px_var(--color-bg)] z-10"></div>
                     )}
                     <div className="mt-1">
                       <h4 className="font-semibold text-gray-900 text-lg mb-2">Day {item.day}: {item.title}</h4>
                       <p className="text-gray-600 leading-relaxed text-sm md:text-base pr-4">{item.content}</p>
                     </div>
                   </div>
                 ))}
                 
                 {/* End marker */}
                 <div className="absolute -left-[7px] bottom-0 bg-gray-300 w-3.5 h-3.5 rounded-full shadow-[0_0_0_4px_var(--color-bg)] z-10"></div>
                 <div className="absolute left-0 bottom-0 w-8 h-8 bg-gradient-to-t from-bg to-transparent -translate-x-[15px] translate-y-4"></div>
              </div>
            </section>

            <div className="w-full h-px bg-border mb-12"></div>

            {/* Personalize this tour */}
            <section className="mb-12">
              <div className="text-center mb-10">
                <h2 className="font-sans text-[22px] font-medium mb-3 text-[#1a5b98] flex items-center justify-center gap-2">
                  <Pencil className="w-6 h-6 fill-[#1a5b98] text-white" /> Personalize this tour
                </h2>
                <p className="text-[#333333] text-[15px] font-light max-w-[800px] mx-auto leading-relaxed text-center">
                  With Asiatica Travel, there are no 100% similar tours from one to another, but it is different according to the customers&apos; wishes.<br />
                  Please give us your travel need and we will customize it for you.
                </p>
              </div>

              <form className="max-w-full mx-auto space-y-5">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label className="font-semibold text-[15px] text-[#333333] w-full md:w-[280px]">Your name<span className="text-[#e65c5c]">*</span></label>
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <select className="sm:w-[200px] border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all">
                      <option>Mr</option>
                      <option>Ms</option>
                      <option>Mrs</option>
                    </select>
                    <input type="text" placeholder="Your name" className="flex-1 border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all" required />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label className="font-semibold text-[15px] text-[#333333] w-full md:w-[280px]">E-mail<span className="text-[#e65c5c]">*</span></label>
                  <input type="email" placeholder="E-mail" className="flex-1 border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all" required />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label className="font-semibold text-[15px] text-[#333333] w-full md:w-[280px]">WhatsApp<span className="text-[#e65c5c]">*</span></label>
                  <div className="flex flex-col sm:flex-row gap-4 flex-1 sm:w-auto w-full md:w-[400px]">
                    <select className="sm:w-[150px] border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all">
                      <option>🇻🇳 +84</option>
                      <option>🇺🇸 +1</option>
                      <option>🇬🇧 +44</option>
                    </select>
                    <input type="tel" placeholder="0912 345 678" className="flex-1 sm:w-[234px] border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all" required />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label className="font-semibold text-[15px] text-[#333333] w-full md:w-[280px]">Nationality<span className="text-[#e65c5c]">*</span></label>
                  <select className="flex-1 sm:w-[500px] border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all md:flex-none">
                    <option>Vietnam</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label className="font-semibold text-[15px] text-[#333333] w-full md:w-[280px]">Your travel date<span className="text-[#e65c5c]">*</span></label>
                  <div className="flex gap-4 flex-col sm:flex-row sm:w-[350px]">
                    <select className="flex-1 border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all">
                      <option>Month</option>
                      <option>January</option>
                      <option>February</option>
                    </select>
                    <select className="flex-1 border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all">
                      <option>Year</option>
                      <option>2026</option>
                      <option>2027</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label className="font-semibold text-[15px] text-[#333333] w-full md:w-[280px]">You&apos;re in group of<span className="text-[#e65c5c]">*</span></label>
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <input type="text" placeholder="Adults" className="flex-1 border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all" required />
                    <input type="text" placeholder="Children ( 2 - 12 years old )" className="flex-1 border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all" />
                    <input type="text" placeholder="Infant ( < 2 years old )" className="flex-1 border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all" />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label className="font-semibold text-[15px] text-[#333333] w-full md:w-[280px]">Your approximated budget <span className="text-[#e65c5c]">*</span></label>
                  <select className="flex-1 sm:flex-none sm:w-[500px] border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all">
                    <option>Choose</option>
                    <option>Under $1000</option>
                    <option>$1000 - $3000</option>
                    <option>Above $3000</option>
                  </select>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label className="font-semibold text-[15px] text-[#333333] w-full md:w-[280px]">How do you know about Asiatica Travel?</label>
                  <select className="flex-1 sm:flex-none sm:w-[500px] border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all">
                    <option>Searching on the internet</option>
                    <option>Friend recommendation</option>
                    <option>Social Media</option>
                  </select>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4 pt-1">
                  <label className="font-semibold text-[15px] text-[#333333] w-full md:w-[280px] mt-2">Your special requests</label>
                  <textarea rows={4} placeholder="Optional - tell us if you have specific plans" className="flex-1 border border-[#e5e5e5] rounded-[4px] p-2 text-[15px] text-[#555] focus:border-[#66afe9] focus:outline-none focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.075),0_0_8px_rgba(102,175,233,0.6)] transition-all resize-none"></textarea>
                </div>

                <div className="pt-8 text-[15px] text-[#333333] space-y-4">
                  <p className="italic font-light">Fields marked with <span className="text-[#e65c5c]">*</span>are mandatory.</p>
                  <p className="leading-relaxed font-light">
                    Now click SEND to submit your request to us. We will reply to you with a quote within 24 hours.<br />
                    If you cannot send the request, please send the message directly to this address: <a href="mailto:info.en@asiatica.com" className="text-[#1a5b98] hover:underline">info.en@asiatica.com</a>
                  </p>
                  
                  <div className="flex justify-center mt-8 pb-4">
                    <button type="button" className="bg-[#ee5e5e] hover:bg-[#d95555] text-white px-10 py-2.5 rounded text-[16px] font-medium tracking-wide transition-colors">
                      SEND
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card-bg p-6 rounded-2xl border border-border sticky top-24 shadow-sm">
              <div className="flex items-end gap-2 mb-6">
                <span className="text-3xl font-bold text-primary">${tour.price}</span>
                <span className="text-sm font-normal text-gray-500 mb-1">/ person</span>
              </div>
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="border border-border rounded-lg overflow-hidden flex flex-col">
                  <div className="p-3 border-b border-border hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">Date</label>
                    <div className="flex items-center justify-between text-gray-900 font-medium text-sm">
                      Select tour date
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="p-3 hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">Travelers</label>
                    <div className="flex items-center justify-between text-gray-900 font-medium text-sm">
                      2 Adults
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-sm hover:bg-primary-hover transition-colors shadow-none mb-4">
                {dict.tours.book_now}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-2.5 rounded-lg border border-green-100 font-medium">
                <Info className="w-4 h-4 fill-green-600 text-white" /> Free cancellation up to 48h
              </div>
            </div>
          </div>

        </div>
      </div>
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/30 w-12 h-12 flex flex-col items-center justify-center rounded-full transition-colors z-50"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/30 w-12 h-12 flex items-center justify-center rounded-full transition-colors z-50 hidden sm:flex"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
            }}
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>

          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/30 w-12 h-12 flex items-center justify-center rounded-full transition-colors z-50 hidden sm:flex"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={galleryImages[currentImageIndex]} 
              alt={`Gallery image ${currentImageIndex + 1}`} 
              fill 
              className="object-contain" 
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-1.5 rounded-full font-medium">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}

