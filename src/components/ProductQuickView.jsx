import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductPurchase from "./ProductPurchase";

export default function ProductQuickView({ product, onClose }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
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
          className="relative bg-brand-cream rounded-3xl max-w-2xl w-full min-w-0 max-h-[90dvh] overflow-y-auto shadow-2xl border border-brand-green/10"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-white/90 text-brand-dark hover:bg-brand-gold transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="grid sm:grid-cols-2">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="w-full h-40 sm:h-full object-cover rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none"
            />
            <div className="p-4 sm:p-8 min-w-0">
              <h3 className="font-heading text-xl sm:text-2xl text-brand-dark mb-2">
                {product.name}
              </h3>
              <p className="text-brand-muted text-sm mb-3 sm:mb-5">{product.shortDesc}</p>
              <ul className="hidden sm:block space-y-2 mb-6">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-brand-green shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <ProductPurchase product={product} onAdded={onClose} />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
