export interface ReviewAuthor {
  id: string;
  name: string;
  photoUrl?: string;
  initials: string;
}
// Apenas as informações extras que um VENDEDOR tem
export interface SellerInfo {
  salesCount: number;
  storeDescription: string;
  websiteUrl: string;
}

// Um Vendedor é um Usuário E também tem Informações de Vendedor
export type Seller = ReviewAuthor & SellerInfo;



export interface Rating {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  productName: string;
  author: ReviewAuthor;
}
export interface RatingsResponse {
  total: number;
  ratings: Rating[];
}

export interface RatingAverage {
  storeId: string;
  average: number;
  total: number;
  ratingDistribution: { 
    stars5: number;
    stars4: number;
    stars3:number;
    stars2:number;
    stars1:number;
  };
  reviews: Rating[]; // Uma lista com as avaliações mais recentes de todos os produtos
}