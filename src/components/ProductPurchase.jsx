import { useState } from "react";
import { useCart } from "../context/CartContext";
import { variantProduct } from "../data/productCatalog";
import { whatsappOrderUrl } from "../utils/whatsapp";

export default function ProductPurchase({ product, onAdded, compact = false }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(product.defaultSize);
  const selected = product.variants.find((variant) => variant.size === size);
  const price = selected?.discountedPrice ?? null;
  const actualPrice = selected?.actualPrice ?? null;
  const cartProduct = variantProduct(product, size);
  const orderMessage = encodeURIComponent(
    `Hello Dharadi! I'm interested in ${product.name} (${size}). ` +
      (price === null
        ? "Please confirm the price, availability and delivery."
        : `Discounted selling price: ₹${price} per pack. Please confirm the quantity, availability and delivery.`)
  );

  return (
    <div className="min-w-0">
      <label className="block min-w-0 text-[10px] sm:text-xs font-medium text-brand-dark">
        Pack size
        <select
          aria-label={`Pack size for ${product.name}`}
          value={size}
          onChange={(event) => setSize(event.target.value)}
          className="mt-1 block w-full min-w-0 h-9 sm:h-auto rounded-lg sm:rounded-xl border border-brand-green/25 bg-white px-2 sm:px-3 py-1 sm:py-2 text-[11px] sm:text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green/30"
        >
          {product.variants.map((variant) => (
            <option key={variant.size} value={variant.size}>{variant.size}</option>
          ))}
        </select>
      </label>
      <div className="mt-2 sm:mt-3 flex flex-wrap items-baseline justify-between gap-1">
        {price !== null ? (
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-semibold text-brand-green text-sm sm:text-lg">₹{price}<span className="text-[10px] sm:text-xs font-normal text-brand-muted"> / pack</span></span>
            {actualPrice !== null && actualPrice > price && (
              <del aria-label={`Original price ₹${actualPrice}`} className="text-xs sm:text-sm text-brand-muted">₹{actualPrice}</del>
            )}
          </div>
        ) : (
          <span className="text-xs sm:text-sm font-medium text-brand-green">Price to be confirmed</span>
        )}
      </div>
      <div className={`mt-2 flex gap-1.5 sm:gap-2 ${compact ? "flex-col" : "flex-col sm:flex-row"}`}>
        {cartProduct && (
          <button
            type="button"
            onClick={() => {
              addToCart(cartProduct, 1);
              onAdded?.();
            }}
            className="min-w-0 flex-1 px-2.5 sm:px-4 py-2.5 rounded-lg sm:rounded-xl bg-brand-green text-brand-cream text-[11px] sm:text-sm font-semibold hover:bg-brand-gold hover:text-brand-dark transition-colors"
          >
            Add to Cart
          </button>
        )}
        <a
          href={whatsappOrderUrl(orderMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 inline-flex items-center justify-center text-center px-1.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#25D366] text-white text-[10px] sm:text-sm font-medium hover:bg-[#1da851] transition-colors"
        >
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
