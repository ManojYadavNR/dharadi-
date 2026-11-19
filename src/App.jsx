import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import SearchModal from "./components/SearchModal";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <Header onSearchOpen={() => setSearchOpen(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
        <CartDrawer />
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <WhatsAppButton />
      </BrowserRouter>
    </CartProvider>
  );
}
