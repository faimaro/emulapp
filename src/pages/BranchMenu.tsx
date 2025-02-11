'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { menuService } from '../services/menuService';
import MenuList from '../components/menu/MenuList';
import type { MenuItem } from '../types/menu';

const BranchMenu = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchMenu = async () => {
      if (!branchId) return;
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

  if (!branchId) {
    return <div className="text-error">Branch ID not provided</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-base-100 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Menú de la Sucursal {branchId}
        </h2>
        <MenuList items={items} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default BranchMenu;
