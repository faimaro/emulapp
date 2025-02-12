'use client';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Menu,
  ShoppingCart,
  MapPin,
  Star,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { restaurantService } from '../services/branchService';
import type { RestaurantDetails } from '../types/branch';

const RestaurantLanding = () => {
  const { id: restaurantId } = useParams<{ id: string }>();

  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery<RestaurantDetails, Error>({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => {
      if (!restaurantId) throw new Error('Restaurant ID is required');
      return restaurantService.getRestaurantDetails(restaurantId);
    },
    enabled: !!restaurantId,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error al cargar el restaurante</p>
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

  if (isLoading || !restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-80">
        <img
          src={restaurant.coverImage || '/placeholder.svg'}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 p-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block mb-4">
              <span className="text-white text-2xl">🍽️</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {restaurant.name}
            </h1>
            <p className="text-white/90">{restaurant.description}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-4">
        <button
          onClick={() =>
            (window.location.href = `/restaurant/${restaurantId}/menu`)
          }
          className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border hover:border-primary-500 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Menu className="w-6 h-6 text-primary-500" />
            <span className="font-medium">Ver la Carta</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() =>
            (window.location.href = `/restaurant/${restaurantId}/order`)
          }
          className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border hover:border-primary-500 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-6 h-6 text-primary-500" />
            <span className="font-medium">Pedir Online</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() =>
            window.open(
              `https://maps.google.com/?q=${restaurant.location.coordinates.lat},${restaurant.location.coordinates.lng}`
            )
          }
          className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border hover:border-primary-500 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-primary-500" />
            <span className="font-medium">¿Cómo llegar?</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() =>
            (window.location.href = `/restaurant/${restaurantId}/review`)
          }
          className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border hover:border-primary-500 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-primary-500" />
            <span className="font-medium">Agregar una Reseña</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() =>
            (window.location.href = `/restaurant/${restaurantId}/order`)
          }
          className="w-full py-4 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
        >
          Ordenar Ahora
        </button>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 p-6 border-t mt-6">
        {restaurant.socialMedia.instagram && (
          <a
            href={restaurant.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-500 transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>
        )}
        {restaurant.socialMedia.facebook && (
          <a
            href={restaurant.socialMedia.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-500 transition-colors"
          >
            <Facebook className="w-6 h-6" />
          </a>
        )}
        {restaurant.socialMedia.twitter && (
          <a
            href={restaurant.socialMedia.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-500 transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </a>
        )}
      </div>
    </div>
  );
};

export default RestaurantLanding;
