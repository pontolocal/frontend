import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Box } from "@mui/material";
import { Home } from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import { Header } from "./components/layout/Header";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Footer } from "./components/layout/Footer";
import { ThankYouPage } from "./pages/ThankYouPage";
import { FAQPage } from "./pages/FAQPage";
import Explore from "./pages/Explore";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";
import Welcome from "./pages/Welcome";
import PaginaDeTeste from "./pages/PaginaDeTesteModal";
import MiniDrawerOverlay from "./components/layout/MiniDrawerOverlay";
import ProductReviewsPage from "./pages/ProductReviewPage";
import { PageReview } from "./pages/ReviewPage";
import RegisterProduct from "./pages/RegisterProductPage";

// Layout para páginas públicas (com Header e Footer)
const LoggedLayout = () => (
  <>
    <MiniDrawerOverlay />
    <main className="pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);

const NonLoggedLayout = () => (
  <>
    <Header />
    <main className="pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);

const Logged = () => (
  <>
    <MiniDrawerOverlay />
    <main className="pt-16">
      <Outlet />
    </main>
  </>
)

// Layout para páginas de autenticação (com fundo gradiente)
const AuthLayout = () => (
  <Box
    className="min-h-screen w-full flex flex-col items-center justify-center p-4"
    sx={{ background: "linear-gradient(to bottom, #C3D2FD 0%, #728CCC 65%)" }}
  >
    <Outlet />
  </Box>
);

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Grupo de Rotas de Autenticação */}
        <Route element={<NonLoggedLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<LoggedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products" element={<Explore />} />
          <Route path="/stores" element={<Explore />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/review" element={<ProductReviewsPage/>}/>
          <Route path="/review-page" element={<PageReview/>}/>
        </Route>

        {/* Grupo de Rotas Públicas */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/*Novo Grupo De Rotas Logadas */}
        <Route element={<Logged />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/register-product" element={<RegisterProduct/>} />
          {/* Outras rotas da área logada virão aqui, como /dashboard, /profile, etc. */}
        </Route>

        {/* ROTA DE TESTE*/}
        <Route path="/teste-modal" element={<PaginaDeTeste />} />

        {/* Rota "Pega-Tudo" para página não encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
