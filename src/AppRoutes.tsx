import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LandingPage } from "./pages/LandingPage";
import { Header } from "./components/layout/Header";
// import MiniDrawerOverlay from "./components/layout/MiniDrawerOverlay";
// import { ThemeProvider } from "@mui/material/styles";
// import theme from "./components/layout/theme";
import { Footer } from "./components/layout/Footer";
import { ThankYouPage } from "./pages/ThankYouPage";
import { FAQPage } from "./pages/FAQPage";

export default function AppRoutes() {
  return (
    <Router>
      <Header />
    
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>

      <Footer />
    </Router>
  );
}
