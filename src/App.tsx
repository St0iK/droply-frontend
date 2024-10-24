import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RestaurantCard from './components/RestaurantCard';
import RestaurantPage from './pages/RestaurantPage';
import { restaurants } from './data/restaurants';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          {selectedRestaurant ? (
            <RestaurantPage
              id={selectedRestaurant}
              onBack={() => setSelectedRestaurant(null)}
            />
          ) : (
            <>
              <Header />
              <Hero />
              <main className="max-w-6xl mx-auto px-4 py-12">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Restaurants</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {restaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onClick={() => setSelectedRestaurant(restaurant.id)}
                      />
                    ))}
                  </div>
                </section>
              </main>
            </>
          )}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;