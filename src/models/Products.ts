export interface ProductType {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  storeName: string;
  categoryName: string;
  rating?: number;
  is_active: boolean;
}
