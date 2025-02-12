'use client';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Star, Loader2 } from 'lucide-react';
import { menuService } from '../services/menuService';
import type { MenuItem, Restaurant } from '../types/menu';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'desserts', name: 'Desserts' },
];

interface MenuData {
  restaurant: Restaurant;
  menuItems: MenuItem[];
}

const RestaurantMenu = () => {
  const { id: restaurantId } = useParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  const { data, isLoading, error } = useQuery<MenuData, Error>({
    queryKey: ['restaurant-menu', restaurantId, selectedCategory],
    queryFn: async (): Promise<MenuData> => {
      if (!restaurantId) throw new Error('Restaurant ID is required');

      if (selectedCategory === 'all') {
        return menuService.getRestaurantMenu(restaurantId);
      } else {
        const items = await menuService.getMenuItemsByCategory(
          restaurantId,
          selectedCategory
        );
        return {
          menuItems: items,
          restaurant: data?.restaurant ?? ({} as Restaurant), // Fallback to empty object if data is undefined
        };
      }
    },
    enabled: !!restaurantId,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-2">
            Error al cargar el menú: {error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary-500 underline"
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  const { restaurant, menuItems } = data;

  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold">🍝 {restaurant.name}</span>
          </div>
          <button className="relative p-2">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-48">
        <img
          src={restaurant.coverImage || '/placeholder.svg'}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 p-6 flex flex-col justify-end text-white">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <p className="text-sm opacity-90">{restaurant.description}</p>
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="ml-1 text-sm">{restaurant.rating}</span>
            <span className="ml-1 text-sm text-gray-300">
              ({(restaurant.reviews / 1000).toFixed(1)}k reseñas)
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b overflow-x-auto">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="m-4 p-6 bg-red-500 rounded-lg text-white">
        <h3 className="text-xl font-bold mb-1">Hora Feliz</h3>
        <p className="text-sm mb-2">20% de descuento en pasta</p>
        <button className="bg-white text-red-500 px-4 py-2 rounded-md text-sm font-medium">
          Ordenar Ahora
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {selectedCategory === 'all'
              ? 'Platos Populares'
              : categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          {selectedCategory === 'all' && (
            <button className="text-primary-500 text-sm font-medium">
              Ver Todos
            </button>
          )}
        </div>

        <div className="space-y-4">
          {menuItems.map((item: MenuItem) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-4 border rounded-lg"
            >
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    {item.isVegetarian && (
                      <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded mt-1">
                        Veggie
                      </span>
                    )}
                  </div>
                  <span className="font-semibold">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => setCartCount((prev) => prev + 1)}
                  className="mt-2 px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
