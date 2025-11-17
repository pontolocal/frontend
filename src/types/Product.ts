export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  type?: boolean;
  image?: File; 
  categoryId?: number;
  categoryName: string;
  userId?: number;
  userName: string;
  userCity?: string;
  userState?: string;
  userZipCode?: string;
  whatsapp? : string;
}
