export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  merchantId: string;
}

export interface MenuResponse {
  items: MenuItem[];
  branch: Branch;
}
