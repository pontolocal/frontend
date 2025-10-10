import React, { useState, useEffect } from 'react';
import StoreReviews from '../components/layout/RateContainer';
import type { RatingAverage } from '../types/Review'; // Importe o tipo dos dados
import type { Seller } from '../types/Review';
import type { RatingsResponse } from '../types/Review';
import MerchantProfile from '../components/layout/MerchantProfile';
import { getSeller, getRatingAverage } from '../services/ratingService';

const ProductPage: React.FC = () => {
  const [sellerData, setSellerData] = useState<Seller | null>(null);
  const [ratingAverage, setRatingAverage] = useState<RatingAverage | null>(null);
  const [error, setError] = useState<string | null>(null); // Estado para guardar erros

  useEffect(() => {
    const loadPageData = async () => {
      try {
        console.log("Iniciando busca de dados via services...");
        // 2. Chama as funções da API em paralelo
        const [seller, ratings] = await Promise.all([
          getSeller(),
          getRatingAverage()
        ]);
        setSellerData(seller);
        setRatingAverage(ratings);
        console.log("Dados carregados com sucesso!");
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      }
    };
    loadPageData();
  }, []);

  // Renderização condicional para loading e erro
  if (error) {
    return <div className="flex justify-center items-center h-screen"><p>{error}</p></div>;
  }

  if (!sellerData || !ratingAverage) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando...</p></div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-[100rem] mx-auto">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Loja do comerciante
          </h2>
          <MerchantProfile data={sellerData} />
        </section>

        <div className="border-t border-gray-200 my-8"></div>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Avaliações da loja
          </h2>
          {<StoreReviews data={ratingAverage} />}
        </section>
      </div>
    </div>
  );
}
export default ProductPage;