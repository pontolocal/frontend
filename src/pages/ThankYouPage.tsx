import CheckIcon from "../assets/images/check-circle-icon.svg";
export const ThankYouPage = () => {
  return (
    <>
      <main className="w-full h-screen flex justify-center items-center bg-blue-0 flex-1 p-4">
        <div className="max-w-[667px] max-h-[455px] h-full w-full flex flex-col justify-center items-center p-2 bg-white gap-8">
          <img src={CheckIcon} alt="CheckIcon" />
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-3xl text-center max-ss:text-base  font-bold">
              Obrigado por avaliar o produto
            </p>
            <p className="text-lg font-bold text-center opacity-60 max-ss:text-sm ">
              Espero que esteja gostando da experiência
            </p>
          </div>
          <p className="text-2xl font-bold text-center opacity-60 max-ss:text-base ">
            Quer continuar explorando os produtos
          </p>
          <div className="w-full flex justify-center items-center gap-4 max-ss:flex-col flex-row ">
            <button className="max-w-[250px] w-full max-h-[50px] bg-blue-3 hover:bg-blue-2 flex justify-center items-center rounded-10 text-base text-white font-bold p-4">
              Começar a vender
            </button>
            <button className="max-w-[250px] w-full max-h-[50px] bg-white hover:bg-blue-2 flex justify-center items-center hover:text-white rounded-10 text-base text-blue-3 border-2 border-blue-3 font-bold p-4">
              Começar a vender
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
