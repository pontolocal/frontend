import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import { Box } from '@mui/material'
import { Home } from "./pages/Home"
import  LandingPage  from "./pages/LandingPage"
import { Header } from "./components/layout/Header"
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NotFoundPage from './pages/NotFoundPage'
import { Footer } from "./components/layout/Footer"
import { ThankYouPage } from "./pages/ThankYouPage"
import { FAQPage } from "./pages/FAQPage"

// Layout para páginas públicas (com Header e Footer)
const PublicLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
      </main>
    <Footer />
  </>
)

// Layout para páginas de autenticação (com fundo gradiente)
const AuthLayout = () => (
  <Box 
      className="min-h-screen w-full flex flex-col items-center justify-center p-4" 
      sx={{ background: 'linear-gradient(to bottom, #C3D2FD 0%, #728CCC 65%)' }}
  >
    <Outlet />
  </Box>
)

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Grupo de Rotas Públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>

        {/* Grupo de Rotas de Autenticação */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Rota "Pega-Tudo" para página não encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}