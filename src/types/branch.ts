export interface RestaurantDetails {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}
