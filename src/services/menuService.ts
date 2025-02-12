import type { MenuItem, Restaurant } from '../types/menu';

interface MenuResponse {
  restaurant: Restaurant;
  menuItems: MenuItem[];
}

export const menuService = {
  async getRestaurantMenu(restaurantId: string): Promise<MenuResponse> {
    try {
      const response = await fetch(`/api/restaurants/${restaurantId}/menu`);
      if (!response.ok) {
        throw new Error('Error al cargar el menú');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching menu:', error);
      throw error;
    }
  },

  async getMenuItemsByCategory(
    restaurantId: string,
    category: string
  ): Promise<MenuItem[]> {
    try {
      const response = await fetch(
        `/api/restaurants/${restaurantId}/menu?category=${category}`
      );
      if (!response.ok) {
        throw new Error('Error al cargar los items del menú');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  },
};
