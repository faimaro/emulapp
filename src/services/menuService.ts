import { api } from './api';
import type { MenuResponse } from '../types/menu';

export const menuService = {
  async getBranchMenu(branchId: string): Promise<MenuResponse> {
    return api.get<MenuResponse>(`/branches/${branchId}/menu`);
  },
};
