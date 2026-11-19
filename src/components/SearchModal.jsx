import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const { addToCart } = useCart();

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full max-w-xl bg-brand-cream rounded-3xl shadow-2xl border border-brand-green/10 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-5 border-b border-brand-green/10">
              <Search size={20} className="text-brand-green shrink-0" />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-brand-dark placeholder:text-brand-muted focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-brand-muted hover:text-brand-green"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto p-3">
              {filtered.length === 0 ? (
                <li className="text-center text-brand-muted py-8 text-sm">
                  No products found.
                </li>
              ) : (
                filtered.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(p);
                        onClose();
                      }}
                      className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white transition-colors text-left"
                    >
                      <img
                        src={p.image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-medium text-brand-dark text-sm">
                          {p.name}
                        </p>
                        <p className="text-brand-green text-sm">₹{p.price}</p>
                      </div>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
