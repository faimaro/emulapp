export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isVegetarian?: boolean
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

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  coverImage: string;
}
