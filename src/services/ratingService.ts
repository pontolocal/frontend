import type { Seller, RatingAverage } from '../types/Review';

export async function getSeller(): Promise<Seller> {
  const response = await fetch('/mock-seller.json');
  if (!response.ok) {
    throw new Error('Erro ao buscar dados do vendedor');
  }
  return response.json();
}

export async function getRatingAverage(): Promise<RatingAverage> {
  const response = await fetch('/mock-rating-average.json');
  if (!response.ok) {
    throw new Error('Erro ao buscar avaliações');
  }
  return response.json();
}