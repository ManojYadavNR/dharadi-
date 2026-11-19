import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import SearchModal from "./components/SearchModal";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import SeoMeta from "./components/SeoMeta";

const Shop = lazy(() => import("./pages/Shop"));
const Checkout = lazy(() => import("./pages/Checkout"));

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <SeoMeta />
        <Header onSearchOpen={() => setSearchOpen(true)} />
        <Suspense fallback={<main className="min-h-screen bg-brand-cream" aria-label="Loading page" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Suspense>
        <Footer />
        <CartDrawer />
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <WhatsAppButton />
      </BrowserRouter>
    </CartProvider>
  );
}
