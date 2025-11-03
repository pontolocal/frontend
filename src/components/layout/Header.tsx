import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import { PontoLocalLogo } from "../ui/PontoLocalLogo"
import { MenuHamburguer } from "../ui/MenuHamburguer"
import { useGlobal } from '../../hooks/useGlobal'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { themeMode } = useGlobal()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="flex w-full bg-white fixed items-center justify-between p-4 md:p-6 shadow-sm z-50">
      
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <RouterLink to="/" className="hidden sm:block">
          <PontoLocalLogo />
        </RouterLink>
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden p-2"
          aria-label="Abrir menu"
        >
          <MenuHamburguer />
        </button>
      </Box>

      <Box sx={{ display: { xs: 'flex', sm: 'none' }, flex: 1, justifyContent: 'center' }}>
        <RouterLink to="/">
          <PontoLocalLogo />
        </RouterLink>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3 }}>
        <nav className="hidden sm:flex items-center gap-6">
          <a href="#how-it-works" className="font-semibold hover:text-[#728CCC]">Como funciona</a>
          <a href="#benefits" className="font-semibold hover:text-[#728CCC]">Benefícios</a>
          <a href="#contact" className="font-semibold hover:text-[#728CCC]">Contato</a>
        </nav>
        
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>
      </Box>

      {/* --- Painel do Menu Mobile --- */}
      <div className={`fixed top-0 left-0 w-full h-screen ${themeMode === "light" ? "bg-white" : "bg-blue-3"} z-[60] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col items-center justify-center`}>
        <button onClick={toggleMobileMenu} aria-label="Fechar menu" className="absolute top-6 right-6">
          <CloseIcon sx={{ fontSize: 30 }} />
        </button>
        <ul className="flex flex-col items-center gap-8 text-2xl" onClick={toggleMobileMenu}>
          <li><a href="#how-it-works">Como funciona</a></li>
          <li><a href="#benefits">Benefícios</a></li>
          <li><a href="#contact">Contato</a></li>
        </ul>
        <Button component={RouterLink} to="/login" variant="contained" color="primary" sx={{ mt: '3rem', fontSize: '1.25rem', py: '12px', px: '32px' }} onClick={toggleMobileMenu}>
          Entrar
        </Button>
      </div>
    </header>
  )
}