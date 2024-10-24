import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import RestaurantHeader from '../components/RestaurantHeader';
import MenuCard from '../components/MenuCard';
import { restaurants } from '../data/restaurants';
import { menuItems } from '../data/menu-items';
import type { MenuItem } from '../types';

interface Props {
  id: string;
  onBack: () => void;
}

export default function RestaurantPage({ id, onBack }: Props) {
  const restaurant = restaurants.find((r) => r.id === id);
  const menu = menuItems[id as keyof typeof menuItems] || [];
  const categories = [...new Set(menu.map((item) => item.category))];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!restaurant) return null;

  const filteredMenu = selectedCategory
    ? menu.filter((item) => item.category === selectedCategory)
    : menu;

  return (
    <div className="min-h-screen bg-white">
      <button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <RestaurantHeader restaurant={restaurant} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium \${
              !selectedCategory ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap \${
                selectedCategory === category
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="divide-y">
          {filteredMenu.map((item: MenuItem) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
