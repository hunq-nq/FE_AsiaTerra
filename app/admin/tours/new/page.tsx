'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface ItineraryDay {
  day: number;
  title: string;
  content: string;
}

export default function AddTourPage() {
  const { dict } = useLanguage();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    duration: '',
    image: '',
    description: ''
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { day: 1, title: '', content: '' }
  ]);

  const handleItineraryChange = (index: number, field: keyof ItineraryDay, value: string | number) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setItinerary(newItinerary);
  };

  const addItineraryDay = () => {
    const nextDay = itinerary.length > 0 ? Math.max(...itinerary.map(i => i.day)) + 1 : 1;
    setItinerary([...itinerary, { day: nextDay, title: '', content: '' }]);
  };

  const removeItineraryDay = (index: number) => {
    const newItinerary = [...itinerary];
    newItinerary.splice(index, 1);
    // Re-adjust day numbers
    const adjustedItinerary = newItinerary.map((item, i) => ({ ...item, day: i + 1 }));
    setItinerary(adjustedItinerary);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we'd save it to database here.
    // For now, let's just log and go back.
    console.log('Sending new tour to backend...', { ...formData, itinerary });
    // Return to admin dashboard
    router.push('/admin');
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 bg-white rounded-full text-gray-500 hover:text-gray-900 shadow-sm transition-colors border border-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Tour</h1>
            <p className="text-gray-500 mt-1">Create a new tour destination and itinerary.</p>
          </div>
        </div>

        {/* Form Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Tour Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                required
                className="w-full border-gray-200 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. Halong Bay Majestic Cruise"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Location (Country / City)</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                required
                className="w-full border-gray-200 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. Vietnam, Hanoi"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price ($)</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                value={formData.price} 
                onChange={handleChange}
                required
                min="0"
                className="w-full border-gray-200 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. 350"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="duration" className="block text-sm font-semibold text-gray-700">Duration (Days)</label>
              <input 
                type="number" 
                id="duration" 
                name="duration" 
                value={formData.duration} 
                onChange={handleChange}
                required
                min="1"
                className="w-full border-gray-200 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. 3"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Image URL</label>
              <input 
                type="url" 
                id="image" 
                name="image" 
                value={formData.image} 
                onChange={handleChange}
                required
                className="w-full border-gray-200 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Tour Description</label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                required
                rows={4}
                className="w-full border-gray-200 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                placeholder="Briefly describe the tour highlights and experience..."
              ></textarea>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Itinerary</h3>
                <p className="text-sm text-gray-500 mt-1">Plan the daily activities for this tour.</p>
              </div>
              <button
                type="button"
                onClick={addItineraryDay}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" /> Add Day
              </button>
            </div>

            <div className="space-y-6">
              {itinerary.map((item, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 relative">
                  <div className="absolute top-6 right-6">
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      disabled={itinerary.length <= 1}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {item.day}
                    </div>
                    <h4 className="font-bold text-gray-900">Day {item.day}</h4>
                  </div>
                  <div className="space-y-4 max-w-2xl">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                        required
                        className="w-full border-gray-200 rounded-lg p-2.5 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        placeholder="e.g. Arrival & Check-in"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Activities / Description</label>
                      <textarea
                        value={item.content}
                        onChange={(e) => handleItineraryChange(index, 'content', e.target.value)}
                        required
                        rows={3}
                        className="w-full border-gray-200 rounded-lg p-2.5 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-sm"
                        placeholder="Describe the activities for this day..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
            <Link 
              href="/admin" 
              className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Save className="w-5 h-5" /> Save Tour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
