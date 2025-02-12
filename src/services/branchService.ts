import type { RestaurantDetails } from '../types/branch';

export const restaurantService = {
  async getRestaurantDetails(restaurantId: string): Promise<RestaurantDetails> {
    const response = await fetch(`/api/restaurants/${restaurantId}`);
    if (!response.ok) {
      throw new Error('Error al cargar los datos del restaurante');
    }
    return response.json();
  },
};
