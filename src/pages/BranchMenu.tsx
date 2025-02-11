import React, { useEffect, useState } from 'react';
import { menuService } from '../services/menuService';
import MenuList from '../components/menu/MenuList';
import type { MenuItem } from '../types/menu';

interface BranchMenuProps {
  branchId: string;
}

const BranchMenu = ({ branchId }: BranchMenuProps) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const response = await menuService.getBranchMenu(branchId);
        setItems(response.items);
      } catch (err) {
        setError('Error al cargar el menú. Por favor, intente nuevamente.');
        console.error('Error fetching menu:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, [branchId]);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Menú de la Sucursal
        </h2>
        <MenuList items={items} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default BranchMenu;
