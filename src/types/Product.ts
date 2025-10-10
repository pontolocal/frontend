export interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: File; // foto pode ser opcional
}
export interface FetchedProduct extends Product{
  id: number;
}