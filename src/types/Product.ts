export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  type: boolean;
  image?: File; // foto pode ser opcional
}
