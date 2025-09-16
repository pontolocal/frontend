import { useState } from "react";
import ChevronDown from "../assets/images/chevron-down.svg";

const faqData = [
  {
    question: "Como faço para comprar um produto?",
    answer: `Para comprar um produto, navegue pelo nosso catálogo, selecione o item desejado e clique em "Adicionar ao Carrinho". Em seguida, vá para o carrinho, revise seus itens e clique em "Finalizar Compra". Você será direcionado para o processo de pagamento onde poderá escolher sua forma de pagamento preferida e inserir suas informações de entrega.`,
  },
  {
    question: "Como funciona o raio de busca?",
    answer: `O raio de busca permite que você encontre produtos e vendedores próximos à sua localização. Você pode ajustar o raio de 1km até 50km nas configurações de busca. Quanto menor o raio, mais próximos serão os resultados. Esta funcionalidade é especialmente útil para produtos que precisam de retirada local ou para reduzir custos de frete.`,
  },

  {
    question: "Como adicionar um produto aos favoritos? ",
    answer: `Para adicionar um produto aos favoritos, clique no ícone de coração (♡)  que aparece na página do produto ou nos 
resultados de busca. O ícone  ficará preenchido (♥) indicando que o produto foi salvo. Você pode  acessar todos os 
seus favoritos clicando no menu "Meus Favoritos" no seu perfil. Isso facilita encontrar produtos que você tem 
interesse em  comprar futurament`,
  },

  {
    question: "Posso alterar meu tipo de conta? ",
    answer: `Sim, você pode alterar seu tipo de conta a qualquer momento. Acesse "Meu Perfil" > "Configurações da Conta" > 
"Tipo de Conta". Você pode  alternar entre conta de Comprador e Vendedor. Se escolher ser vendedor,  será 
necessário fornecer informações adicionais como dados bancários e  documentos de identificação. A mudança é 
processada em até 24 horas.`,
  },

  {
    question: "Como entrar em contato com o vendedor? ",
    answer: `Na página do produto, você encontrará o botão "Falar com o Vendedor" ou  "Enviar Mensagem". Clique nele para 
abrir o chat interno da plataforma.  Você também pode fazer perguntas sobre o produto que ficarão visíveis  para 
outros compradores. Todas as conversas ficam registradas na seção  "Minhas Mensagens" para facilitar o 
acompanhamento`,
  },
];

export const FAQPage = () => {
  // Cria um estado para cada item (todos fechados inicialmente)
  const [openIndexes, setOpenIndexes] = useState(
    Array(faqData.length).fill(false)
  );

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <main className="w-full h-screen flex justify-center items-center bg-blue-0  p-4 flex-col gap-4">
      <h2 className="sm:text-4xl text-3xl font-bold text-center">Central de Ajuda</h2>
      <p className="font-medium text-xs  text-center">
        Encontre respostas para as suas dúvidas mais frequentes{" "}
      </p>
      <div className="bg-white w-full flex flex-col  justify-start items-center max-w-[812px] h-auto max-h-[738px]">
        {faqData.map((key, index) => (
          <div key={index} className="w-full border-b p-4 flex justify-center flex-col">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-xs">{key.question}</h3>
              <span
                className={`transition-transform duration-300 ${
                  openIndexes[index] ? "rotate-180" : ""
                }`}
              >
                <img
                  src={ChevronDown}
                  onClick={() => toggleItem(index)}
                  alt="ChevronDown"
                  className="cursor-pointer"
                />
              </span>
            </div>

            <div
              className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                openIndexes[index] ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="font-medium text-xs">{key.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="max-w-[250px] w-full max-h-[50px] bg-blue-3 hover:bg-blue-2 flex justify-center items-center rounded-10 text-base text-white font-bold p-4">
       Fale Conosco
      </button>
    </main>
  );
};
