import { PontoLocalLogo } from "../ui/PontoLocalLogo";
import WhatsAppIcon from "../../assets/images/whatsapp-icon.png";
import EmailIcon from "../../assets/images/email-icon.png";
export const Footer = () => {
  return (
    <footer className="text-white bg-blue-4 flex w-full h-auto p-6  items-center flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
        <div className="w-auto flex gap-4 flex-col ">
          <p className="font-extrabold text-xs">Sobre</p>
          <p className="text-xs break-words sm:max-w-100 w-full">
            Somos uma plataforma feita para conectar consumidores e comerciantes
            locais, valorizando a economia da sua cidade.
          </p>
        </div>

        <div className="w-auto flex gap-4 flex-col">
          <p className="font-extrabold text-xs">Contato</p>
          <div className="flex lg:gap-8 gap-4">
            <img src={EmailIcon} alt="Email" />
            <p className="text-xs">contato@plataformalocal.com</p>
          </div>
          <div className="flex lg:gap-8 gap-4">
            <img src={WhatsAppIcon} alt="WhatsApp" />
            <p className="text-xs ">(21) 99999-9999</p>
          </div>
        </div>
        <div className="flex   justify-center items-start flex-col  gap-4 w-full">
          <p className="flex font-extrabold text-xs">Redes Sociais</p>
          <div className="flex gap-2 justify-between text-xs">
            <a href="https://www.instagram.com" className="hover:underline">
              Instagram
            </a>
            <span>|</span>
            <a href="https://www.facebook.com" className="hover:underline">
              Facebook
            </a>
            <span>|</span>
            <a href="https://www.linkedin.com" className="hover:underline">
              LinkedIn
            </a>
          </div>
          <div className="w-full justify-center items-center flex">
            <PontoLocalLogo />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full text-xs text-grey-3">
        <p>
          © 2025 Plataforma Local. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
