import { Check } from "lucide-react";
import { PrimaryButton } from "./Button";
import { useCart } from "../context/CartContext";
import { whatsappOrderUrl } from "../utils/whatsapp";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();

  const whatsappProductMessage = encodeURIComponent(
    `Hello Dharadi! I'd like to order: ${product.name} (₹${product.price}). Please confirm availability and delivery.`
  );

  return (
    <article className="group bg-brand-cream rounded-2xl border border-brand-green/15 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
      <button
        type="button"
        onClick={() => onQuickView(product)}
        className="relative aspect-square overflow-hidden bg-white cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/products/fresh-oyster-mushrooms.jpg";
          }}
        />
      </button>
      <div className="p-6 lg:p-7 flex flex-col flex-1">
        <h3 className="font-heading text-xl text-brand-dark mb-2">{product.name}</h3>
        <p className="text-brand-muted text-sm leading-relaxed mb-4 flex-1">
          {product.shortDesc}
        </p>
        <ul className="space-y-1.5 mb-5">
          {product.benefits.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-brand-dark/80">
              <Check size={14} className="text-brand-green shrink-0" />
              {b}
            </li>
          ))}
        </ul>
        <p className="text-brand-green font-semibold text-lg mb-4">₹{product.price}</p>
        <div className="flex flex-col gap-2">
          <a
            href={whatsappOrderUrl(whatsappProductMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#1da851] transition-colors"
          >
            Order on WhatsApp
          </a>
          <PrimaryButton className="w-full" onClick={() => addToCart(product)}>
            Add to Cart
          </PrimaryButton>
        </div>
      </div>
    </article>
  );
}
