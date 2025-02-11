import React from 'react';
import type { MenuItem } from '../../types/menu';

interface MenuListProps {
  items: MenuItem[];
  isLoading: boolean;
  error?: string;
}

const MenuList = ({ items, isLoading, error }: MenuListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-md p-4 text-error-700">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay elementos en el menú disponibles.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
        >
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <span className="text-primary-600 font-medium">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{item.category}</span>
              {!item.available && (
                <span className="text-sm text-error-600">No disponible</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
