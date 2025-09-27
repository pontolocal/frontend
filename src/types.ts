export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
  authorInitials: string; // Continua obrigatório, é o nosso "plano B"
  authorPhotoUrl?: string; // O '?' significa que este campo é OPCIONAL
  productName: string; // Adicionando a resposta da nossa pergunta anterior!
}
export interface StoreReviewsData {
  storeId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { 
    stars5: number;
    stars4: number;
    stars3:number;
    stars2:number;
    stars1:number;
  };
  reviews: Review[]; // Uma lista com as avaliações mais recentes de todos os produtos
}