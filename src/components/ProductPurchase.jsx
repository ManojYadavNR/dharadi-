import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { variantProduct } from "../data/productCatalog";
import { whatsappOrderUrl } from "../utils/whatsapp";

const MAX_UNITS = 99;

export default function ProductPurchase({ product, onAdded, compact = false }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(product.defaultSize);
  const [quantity, setQuantity] = useState(1);
  const selected = product.variants.find((variant) => variant.size === size);
  const price = selected?.price ?? null;
  const cartProduct = variantProduct(product, size);
  const orderMessage = encodeURIComponent(
    `Hello Dharadi! I'd like to order ${quantity} unit${quantity === 1 ? "" : "s"} of ${product.name} (${size}). ` +
      (price === null
        ? "Please confirm the price, availability and delivery."
        : `Listed total: ₹${price * quantity}. Please confirm availability and delivery.`)
  );

  return (
    <div className="min-w-0">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <label className="min-w-0 block text-xs font-medium text-brand-dark">
          Pack size
          <select
            aria-label={`Pack size for ${product.name}`}
            value={size}
            onChange={(event) => setSize(event.target.value)}
            className="mt-1 block w-full min-w-0 rounded-lg sm:rounded-xl border border-brand-green/25 bg-white px-2 sm:px-3 py-2 text-xs sm:text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green/30"
          >
            {product.variants.map((variant) => (
              <option key={variant.size} value={variant.size}>{variant.size}</option>
            ))}
          </select>
        </label>
        <div className="min-w-0">
          <span className="block text-xs font-medium text-brand-dark">Units</span>
          <div className="mt-1 flex w-full min-w-0 items-center justify-between rounded-lg sm:rounded-xl border border-brand-green/25 bg-white">
            <button
              type="button"
              aria-label={`Decrease units of ${product.name}`}
              disabled={quantity === 1}
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="shrink-0 p-2 text-brand-green disabled:opacity-35"
            >
              <Minus size={14} />
            </button>
            <output aria-label={`Units of ${product.name}`} className="min-w-0 text-center text-xs sm:text-sm font-medium tabular-nums">{quantity}</output>
            <button
              type="button"
              aria-label={`Increase units of ${product.name}`}
              disabled={quantity === MAX_UNITS}
              onClick={() => setQuantity((value) => Math.min(MAX_UNITS, value + 1))}
              className="shrink-0 p-2 text-brand-green disabled:opacity-35"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 sm:mt-3 flex flex-wrap items-baseline justify-between gap-1">
        {price !== null ? (
          <>
            <span className="font-semibold text-brand-green text-base sm:text-lg">₹{price} <span className="text-xs font-normal text-brand-muted">/ pack</span></span>
            {quantity > 1 && <span className="text-xs font-medium text-brand-muted">Total ₹{price * quantity}</span>}
          </>
        ) : (
          <span className="text-xs sm:text-sm font-medium text-brand-green">Price on request</span>
        )}
      </div>
      <div className={`mt-2.5 flex gap-2 ${compact ? "flex-col" : "flex-col sm:flex-row"}`}>
        <a
          href={whatsappOrderUrl(orderMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 inline-flex items-center justify-center text-center px-2.5 sm:px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-medium hover:bg-[#1da851] transition-colors"
        >
          {price === null ? "Ask on WhatsApp" : "Order on WhatsApp"}
        </a>
        {cartProduct ? (
          <button
            type="button"
            onClick={() => {
              addToCart(cartProduct, quantity);
              onAdded?.();
            }}
            className="min-w-0 flex-1 px-2.5 sm:px-4 py-2.5 rounded-xl bg-brand-green text-brand-cream text-xs sm:text-sm font-medium hover:bg-brand-gold hover:text-brand-dark transition-colors"
          >
            Add to Cart
          </button>
        ) : (
          <span className="flex-1 text-center text-[11px] sm:text-xs text-brand-muted self-center">
            Confirm this pack&apos;s price on WhatsApp
          </span>
        )}
      </div>
    </div>
  );
}
