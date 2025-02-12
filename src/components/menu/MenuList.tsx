'use client';

import type { MenuItem } from '../../types/menu';
import { Loader2 } from 'lucide-react';

interface MenuListProps {
  items: MenuItem[];
  isLoading: boolean;
  error: string | undefined;
}

const MenuList: React.FC<MenuListProps> = ({ items, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin h-5 w-5 text-primary-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (items.length === 0) {
    return <div>No hay items en el menú.</div>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className="py-2 border-b">
          <div className="flex justify-between">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
