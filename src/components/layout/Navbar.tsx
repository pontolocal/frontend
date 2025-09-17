import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import { PontoLocalLogo } from "../ui/PontoLocalLogo"
import { MenuHamburguer } from "../ui/MenuHamburguer"

export const Header = () => { 
  return (
    <header className="flex w-full bg-white fixed items-center justify-between p-6 shadow-sm z-50">
      <div className="w-[94px] sm:hidden flex justify-start">
        <MenuHamburguer />
      </div>
      <div className="flex w-full sm:w-auto justify-center sm:justify-start ">
        <PontoLocalLogo />
      </div>
      <div className="w-auto flex justify-end gap-4 items-center">
        <ul className="hidden sm:flex justify-center items-center gap-4 font-inter text-[14px] font-semibold">
          <li><a href="#how-it-works" className="hover:text-[#728CCC]">Como funciona</a></li>
          <li><a href="#benefits" className="hover:text-[#728CCC]">Benefícios</a></li>
          <li><a href="#contact" className="hover:text-[#728CCC]">Contato</a></li>
        </ul>
        
        <Button component={RouterLink} to="/login" variant="contained" color="primary">
          Entrar
        </Button>
      </div>
    </header>
  )
}