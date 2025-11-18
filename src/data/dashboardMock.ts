import httpClient from "../api/axiosConfig";

export type Status = "confirmado" | "pendente" | "cancelado";
export type Disponibilidade = "disponivel" | "indisponivel" | "cancelado";

const produtoThumb = "/src/assets/images/morango.png";

/* ---- Helpers de distribuição ---- */
const statusFromIndex = (i: number): Status => {
  const m = i % 8;
  if (m === 0 || m === 4) return "confirmado";
  if (m === 2 || m === 6) return "cancelado";
  return "pendente";
};

const disponibilidadeFromIndex = (i: number): Disponibilidade => {
  // Regra: 0,3 -> disponível | 2 -> cancelado | demais -> indisponível
  const m = i % 6;
  if (m === 0 || m === 3) return "disponivel";
  if (m === 2) return "cancelado";
  return "indisponivel";
};

/* ---- Dados ---- */
export const buildNegociações = () =>
  Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    date: "15/01/2024",
    store: "Loja do Fulano de Tal",
    product: "Morango do amor",
    status: statusFromIndex(i),
    imageUrl: produtoThumb,
  }));

export const buildVendas = () =>
  Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    order: "#7866573",
    client: "Pedro Antunes Cavalcante",
    date: "15/01/2024",
    product: "Morango do amor",
    status: statusFromIndex(i),
    imageUrl: produtoThumb,
  }));

export const buildAnuncios = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await httpClient({
      url: `/products/user/${userId}`,
      method: "get",
    });
    const products = response.data;
    console.log(products)
    return products;
  } catch (error) {
    console.error("Erro no get de produtos:", error);
    throw error;
  }
};
// Array.from({ length: 15 }, (_, i) => ({
//   id: i + 1,
//   title: "Morango do amor",
//   desc: "Um doce, suculento e coberto com uma camada crocante de açúcar caramelizado. Uma paixão à primeira mordida...",
//   disponibilidade: disponibilidadeFromIndex(i),
//   imageUrl: produtoThumb,
// }));

export const avaliacoesMock = [
  {
    initials: "MS",
    name: "Maria Silva",
    stars: 5,
    ago: "há 2 dias",
    text: "Produto excelente! A qualidade superou minhas expectativas. Chegou rapidamente e muito bem embalado. Recomendo!",
  },
  {
    initials: "JS",
    name: "João Santos",
    stars: 4,
    ago: "há 1 semana",
    text: "Muito bom produto, atendeu perfeitamente às minhas necessidades. O atendimento da loja também foi excelente.",
  },
  {
    initials: "AC",
    name: "Ana Costa",
    stars: 5,
    ago: "há 2 semanas",
    text: "Adorei! Produto de ótima qualidade e preço justo. Já é a segunda vez que compro nesta loja.",
  },
  {
    initials: "PR",
    name: "Paula Rodrigues",
    stars: 5,
    ago: "há 3 dias",
    text: "Ótimo custo-benefício. Superou o que eu esperava e o suporte foi muito atencioso.",
  },
  {
    initials: "GL",
    name: "Gustavo Lima",
    stars: 3,
    ago: "há 5 dias",
    text: "Produto bom, mas a entrega demorou um pouco além do previsto. No geral, satisfeito.",
  },
  {
    initials: "CF",
    name: "Carla Ferreira",
    stars: 4,
    ago: "há 3 semanas",
    text: "Qualidade muito boa e fácil de usar. Só achei a embalagem simples.",
  },
  {
    initials: "TL",
    name: "Tiago Lopes",
    stars: 5,
    ago: "há 1 mês",
    text: "Excelente experiência! Funcionou perfeitamente e a loja foi super ágil.",
  },
  {
    initials: "RB",
    name: "Renata Barros",
    stars: 4,
    ago: "há 2 meses",
    text: "Gostei bastante. Atendeu ao que eu precisava e o preço é justo.",
  },
];
