import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton } from "./Button";
import { useCart } from "../context/CartContext";
import { whatsappOrderUrl } from "../utils/whatsapp";

export default function ProductQuickView({ product, onClose }) {
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-brand-cream rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-brand-green/10"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-brand-dark hover:bg-brand-gold transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="grid sm:grid-cols-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 sm:h-full object-cover rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none"
            />
            <div className="p-8">
              <h3 className="font-heading text-2xl text-brand-dark mb-2">
                {product.name}
              </h3>
              <p className="text-brand-green font-semibold text-xl mb-4">
                ₹{product.price}
              </p>
              <p className="text-brand-muted text-sm mb-5">{product.shortDesc}</p>
              <ul className="space-y-2 mb-6">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-brand-green" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                <a
                  href={whatsappOrderUrl(
                    encodeURIComponent(
                      `Hello Dharadi! I'd like to order: ${product.name} (₹${product.price}).`
                    )
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#1da851] transition-colors"
                >
                  Order on WhatsApp
                </a>
                <PrimaryButton
                  className="w-full"
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                >
                  Add to Cart
                </PrimaryButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
