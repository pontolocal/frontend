export interface ProductType {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  user_id: number;
  category_id?: number;
  is_active: boolean;
}
