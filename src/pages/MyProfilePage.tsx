import Usericon from "../assets/images/user-outline-icon.svg";
import TrashIcon from "../assets/images/trash-icon.svg";
import UserIconSt2 from "../assets/images/user-outline-icon-st-2.svg";
import EditIcon from "../assets/images/edit-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeleteModal } from "../components/modal/DeleteModal";
import { useGetUser } from "../hooks/useGetUser";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useAuth } from "../api/AuthContext";
import { useGlobal } from "../hooks/useGlobal";

export const MyProfile = () => {
  // const {setUserId} = useGlobal()
  const {themeMode} = useGlobal()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, fetchGetUser } = useGetUser(
    `/auth/get/${localStorage.getItem("userId")}`
  );
  const { fetchDeleteUser } = useDeleteUser(
    `/auth/delete/${localStorage.getItem("userId")}`
  );

  const {logout} = useAuth()

  const handleDelete = () => {
    console.log("Ação: Usuário deletado!");
    fetchDeleteUser();
    navigate("/");
    setDeleteModalOpen(false);
    setTimeout(() => {
      logout();
    }, 4000);
  };

  useEffect(() => {
    fetchGetUser();
  }, []);

  return (
    <main className="w-full min-h-full flex items-center justify-center px-4 py-32">
      <div className={`w-full lg:max-w-[1210px] rounded-41 p-10 flex flex-col gap-8 items-start h-auto ${themeMode === "light" ? "bg-white" : "bg-blue-4"}`}>
        <div className="w-full flex flex-col lg:flex-row lg:items-start items-center justify-between gap-4">
          <div className="flex items-center justify-center lg:items-start w-full lg:w-auto">
            <div className="flex flex-col  items-center text-center gap-2 h-auto">
              <div className="w-[140px] h-[140px] bg-blue-6 rounded-full flex justify-center relative items-center =">
                <img
                  src={Usericon}
                  alt="Usericon"
                  className="w-2/3 h-2/3 object-contain"
                />
                <div className="absolute right-0 bottom-2 rounded-full shadow-md bg-white w-[30px] h-[30px] flex justify-center items-center hover:bg-blue-6 cursor-pointer">
                  <img
                    src={EditIcon}
                    alt="EditIcon"
                    className="w-2/3 h-2/3 object-contain"
                  />
                </div>
              </div>
              <p className="text-xs font-bold opacity-50">
                Clique no ícone para alterar a foto
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 order-2 lg:order-1 w-full min-w-82 lg:w-auto">
            <p className="font-semibold">{user?.name}</p>
            <p className="font-semibold">
              ***.***.{user?.document.slice(8, 14)}
            </p>
            <div className="flex gap-2 flex-col lg:flex-row">
              <p className="font-semibold">
                Sobre:{" "}
                <span className="font-normal">
                  {user?.bio || "sem descrição"}
                </span>
              </p>
            </div>
            <p className="font-semibold">{user?.whatsapp}</p>
          </div>
          <Link to="/edit-profile">
            <button className="order-1 lg:order-2  lg:w-auto lg:max-w-[208px] text-xs lg:text-base px-4 py-2 border border-gray-4 rounded-[10px] flex justify-center items-center cursor-pointer gap-4 hover:bg-blue-6  transition-colors">
              <div className="bg-blue-6 w-[48px] h-[48px] hidden lg:flex justify-center items-center rounded-full">
                <img
                  src={UserIconSt2}
                  alt="UserIconSt2"
                  className="lg:flex hidden w-2/3 h-2/3 object-contain"
                />
              </div>
              <span className="font-semibold">Editar Perfil</span>
            </button>
          </Link>
        </div>
        <span className="w-full h-[1px] bg-gray-5"></span>
        <div className="self-start flex gap-2 flex-col">
          <p className="font-semibold">
            CEP: <span className="font-normal">{user?.zipCode}</span>
          </p>
          <div className="flex lg:flex-row gap-2 flex-col">
            <p className="font-semibold">
              Endereço:{" "}
              <span className="font-normal">{user?.addressComplement}</span>
            </p>
            <div className="flex gap-2">
              <p className="font-semibold">{user?.city} - </p>
              <p className="font-semibold">{user?.state}</p>
            </div>
          </div>
        </div>
        <span className="w-full h-[1px] bg-gray-5"></span>
        <button
          className="font-semibold  rounded-10 bg-red-3 w-full   p-2 lg:max-w-[231px] lg:h-[80px] flex justify-center items-center cursor-pointer hover:bg-red-4 transition-colors gap-2"
          onClick={() => setDeleteModalOpen(true)}
        >
          <div className="w-[48px] h-[48px] bg-red-4 rounded-full flex justify-center items-center">
            <img src={TrashIcon} alt="TrashIcon" />
          </div>
          <span className="text-black!">Deletar Perfil</span>
        </button>
      </div>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </main>
  );
};
