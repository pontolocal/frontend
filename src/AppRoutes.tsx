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
// import PaginaDeTeste from "./pages/PaginaDeTesteModal";
import MiniDrawerOverlay from "./components/layout/MiniDrawerOverlay";
import { PageReview } from "./pages/ReviewPage";
import RegisterProduct from "./pages/RegisterProductPage";
import { Dashboard } from "./pages/Dashboard/index";
import { MyProfile } from "./pages/MyProfilePage";
import UpdateProduct from "./pages/UpdateProductPage";
import StoreDetail from "./pages/StoreDetail";
import EditProfile from "./pages/EditProfile";
import { Notifications } from "@mui/icons-material";
import { AuthProvider } from "./api/AuthContext";
import { PrivateRoute } from "./api/PrivateRoute";
import { useGlobal } from "./hooks/useGlobal";

// Layout para páginas públicas (com Header e Footer)

const LoggedLayout = () => {
  const {themeMode} = useGlobal()
  return (
    <>
    <MiniDrawerOverlay />
    <main className={`pt-16 pl-16 max-md:pl-0 ${themeMode === "light" ? "bg-blue-1 text-black" : "bg-blue-8 text-white!"}`}>
      <Outlet />
    </main>
    <Footer />
  </>
  )
}

const NonLoggedLayout = () => (
  <>
    <Header />
    <main className="pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);

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
    <AuthProvider>
      <Router>
        <Routes>
          {/* Grupo de Rotas de Autenticação */}
          <Route element={<NonLoggedLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          <Route element={<LoggedLayout />}>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <PrivateRoute>
                  <ProductDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              }
            />
            <Route
              path="/stores"
              element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              }
            />
            <Route
              path="/:categoryName"
              element={
                <PrivateRoute>
                  <Explore />
                </PrivateRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route
              path="/thankyou"
              element={
                <PrivateRoute>
                  <ThankYouPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/faq"
              element={
                <PrivateRoute>
                  <FAQPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/stores/:id"
              element={
                <PrivateRoute>
                  <StoreDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/review-page"
              element={
                <PrivateRoute>
                  <PageReview />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/welcome"
              element={
                <PrivateRoute>
                  <Welcome />
                </PrivateRoute>
              }
            />
            <Route
              path="/register-product"
              element={
                <PrivateRoute>
                  <RegisterProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-product/:id"
              element={
                <PrivateRoute>
                  <UpdateProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Grupo de Rotas Públicas */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* ROTA DE TESTE*/}
          {/* <Route path="/teste-modal" element={<PaginaDeTeste />} /> */}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
