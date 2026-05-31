'use client';

import React, { useState, useEffect } from 'react';
import { getTours, Tour } from '@/lib/api';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LayoutDashboard, Package, Users, Settings, Plus, DollarSign, Activity } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminDashboard() {
  const { dict } = useLanguage();
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getTours();
      setTours(data);
    }
    load();
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-6">Menu</h2>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary font-semibold rounded-lg">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Package className="w-5 h-5" /> {dict.admin.manage_tours}
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Users className="w-5 h-5" /> Bookings
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-8">
              <Settings className="w-5 h-5" /> Settings
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{dict.admin.title}</h1>
            <p className="text-gray-500 mt-1">Manage your platform and view statistics.</p>
          </div>
          <Link href="/admin/tours/new" className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm transition-colors">
            <Plus className="w-5 h-5" /> {dict.admin.add_tour}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-500">{dict.admin.total_bookings}</h3>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">1,248</p>
            <p className="text-sm text-green-600 font-medium mt-2">↑ 12% from last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-500">{dict.admin.revenue}</h3>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">$84,500</p>
            <p className="text-sm text-green-600 font-medium mt-2">↑ 8% from last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-500">{dict.admin.active_tours}</h3>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{tours.length}</p>
            <p className="text-sm text-gray-500 font-medium mt-2">Ready for booking</p>
          </div>
        </div>

        {/* Recent Tours Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900">{dict.admin.manage_tours}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Tour Name</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden relative">
                         <Image src={tour.image} alt={tour.title} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      {tour.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{tour.location}</td>
                    <td className="px-6 py-4 font-semibold">${tour.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit">
                        ⭐ {tour.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3 text-primary font-medium">
                      <button className="hover:underline">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
