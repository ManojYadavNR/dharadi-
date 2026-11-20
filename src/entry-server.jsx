import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import SearchModal from "./components/SearchModal";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import SeoMeta from "./components/SeoMeta";

// Build-time HTML snapshots use the very same React page components as the live app.
// This does not create a backend or change interactive client-side behaviour.
export function renderRoute(path) {
  const page = path === "/shop" ? <Shop /> : path === "/checkout" ? <Checkout /> : <Home />;
  return renderToString(
    <CartProvider>
      <LazyMotion features={domAnimation}>
      <MemoryRouter initialEntries={[path]}>
        <SeoMeta />
        <Header onSearchOpen={() => {}} />
        {page}
        <Footer />
        <CartDrawer />
        <SearchModal isOpen={false} onClose={() => {}} />
        <WhatsAppButton />
      </MemoryRouter>
      </LazyMotion>
    </CartProvider>
  );
}
