import Usericon from "../assets/images/user-outline-icon.svg";
import TrashIcon from "../assets/images/trash-icon.svg";
import UserIconSt2 from "../assets/images/user-outline-icon-st-2.svg";
import EditIcon from "../assets/images/edit-icon.svg"
export const MyProfile = () => {
  return (
    <main className="w-full min-h-screen flex items-start justify-center bg-blue-100 p-4">
      <div className="w-full lg:max-w-[1210px] bg-white rounded-41 p-10 flex flex-col gap-8 items-start h-auto">
        <div className="w-full flex flex-col lg:flex-row lg:items-start items-center justify-between gap-4">
          <div className="flex items-center justify-center lg:items-start w-full lg:w-auto">
            <div className="flex flex-col  items-center text-center gap-2 h-auto">
              <div className="w-[140px] h-[140px] bg-blue-6 rounded-full flex justify-center relative items-center =">
                <img
                  src={Usericon}
                  alt="Usericon"
                  className="w-2/3 h-2/3 object-contain"
                />
                <div className="absolute right-0 bottom-2 rounded-full shadow-md bg-white w-[30px] h-[30px] flex justify-center items-center hover:bg-blue-6 cursor-pointer"><img src={EditIcon} alt="EditIcon" className="w-2/3 h-2/3 object-contain" /></div>
              </div>
              <p className="text-xs font-bold text-black/40">
                Clique no ícone para alterar a foto
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 order-2 lg:order-1 w-full lg:w-auto">
            <p className="font-semibold">João Pedro da Silva</p>
            <p className="font-semibold">***.***.000-00</p>
            <div className="flex gap-2 flex-col lg:flex-row">
              <p className="font-semibold">
                Sobre:{" "}
                <span className="font-normal">
                  Sou um engenheiro que sonha em ter uma casa própria.
                </span>
              </p>
            </div>
            <p className="font-semibold">(54) 99999-9999</p>
          </div>
          <button className="order-1 lg:order-2  lg:w-auto lg:max-w-[208px] text-xs lg:text-base px-4 py-2 border border-gray-4 rounded-[10px] flex justify-center items-center cursor-pointer gap-4 hover:bg-blue-6  transition-colors">
            <div className="bg-blue-6 w-[48px] h-[48px] hidden lg:flex justify-center items-center rounded-full"><img src={UserIconSt2} alt="UserIconSt2" className="lg:flex hidden w-2/3 h-2/3 object-contain" /></div>
            <span className="font-semibold">Editar Perfil</span>
          </button>
        </div>
        <span className="w-full h-[1px] bg-gray-5"></span>
        <div className="self-start flex gap-2 flex-col">
          <p className="font-semibold">
            CEP: <span className="font-normal">46.454-805</span>
          </p>
          <div className="flex lg:flex-row gap-2 flex-col">
            <p className="font-semibold">
              Endereço:<span className="font-normal">
                Rua da Esquina ao lado da Farmacia, 120.
              </span>
            </p>
            <div className="flex gap-2">
              <p className="font-semibold">SP</p>
              <p className="font-semibold">Queimados</p>
            </div>
          </div>
        </div>
        <span className="w-full h-[1px] bg-gray-5"></span>
        <button className="font-semibold  rounded-10 bg-red-3 w-full   p-2 lg:max-w-[231px] lg:h-[80px] flex justify-center items-center cursor-pointer hover:bg-red-4 transition-colors gap-2">
          <div className="w-[48px] h-[48px] bg-red-4 rounded-full flex justify-center items-center">
            <img src={TrashIcon} alt="TrashIcon" />
          </div>
          <span>Deletar Perfil</span>
        </button>
      </div>
    </main>
  );
};
