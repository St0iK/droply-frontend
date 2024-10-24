import React from 'react';
import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[400px] bg-gradient-to-r from-teal-500 to-teal-600">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000"
          alt="Food background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Your favorite food, delivered fast
        </h1>
        
        <div className="max-w-xl">
          <div className="flex items-center bg-white rounded-full shadow-lg">
            <div className="pl-6">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for restaurants or cuisines"
              className="w-full py-4 px-4 rounded-full focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}