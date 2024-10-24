import React from 'react';
import { Clock, Star } from 'lucide-react';
import type { Restaurant } from '../types';

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantHeader({ restaurant }: Props) {
  return (
    <div className="relative h-[300px]">
      <div className="absolute inset-0">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-end pb-8">
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{restaurant.deliveryTime} mins</span>
            </div>
            <span>{restaurant.categories.join(' · ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}