import { X, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    total,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/40 z-[90] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-cream z-[95] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-brand-green/10">
              <h2 className="font-heading text-2xl text-brand-dark">Your Cart</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-brand-green/10 text-brand-green"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="text-brand-muted text-center py-12">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover border border-brand-green/10"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-brand-dark text-sm truncate">
                          {item.name}
                        </h3>
                        <p className="text-brand-green font-semibold mt-1">
                          ₹{item.price}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 rounded-lg border border-brand-green/20 text-brand-green"
                            aria-label="Decrease"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 rounded-lg border border-brand-green/20 text-brand-green"
                            aria-label="Increase"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-1 text-brand-muted hover:text-red-600"
                            aria-label="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="p-6 border-t border-brand-green/10 space-y-4">
                <div className="flex justify-between text-brand-dark font-medium">
                  <span>Total</span>
                  <span className="font-heading text-xl">₹{total}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3.5 rounded-2xl bg-brand-green text-brand-cream font-medium hover:bg-brand-gold hover:text-brand-dark transition-all"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
