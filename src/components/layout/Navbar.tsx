import { PontoLocalLogo } from "../ui/PontoLocalLogo";
import { ButtonBlue } from "../ui/ButtonBlue";
import { MenuHamburguer } from "../ui/MenuHamburguer";

export const Navbar = () => {
  return (
    <nav className="flex w-full bg-white fixed items-center justify-between p-6">
      <div className="w-[94px] sm:hidden flex justify-start">
        <MenuHamburguer />
      </div>
      <div className="flex w-full sm:w-auto justify-center sm:justify-start ">
        <PontoLocalLogo />
      </div>
      <div className="w-[94px] sm:w-full flex justify-end gap-4 items-center">
        <ul className="hidden sm:flex justify-center items-center gap-4 font-inter text-[14px] font-semibold">
          <li>Como funciona</li>
          <li>Benefícios</li>
          <li>Contato</li>
        </ul>
        <ButtonBlue />
      </div>
    </nav>
  );
};