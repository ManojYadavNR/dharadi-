import { Check } from "lucide-react";
import ProductPurchase from "./ProductPurchase";

export default function ProductCard({ product, onQuickView }) {
  return (
    <article className="group min-w-0 bg-brand-cream rounded-2xl border border-brand-green/15 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-row sm:flex-col h-full">
      <button
        type="button"
        onClick={() => onQuickView(product)}
        aria-label={`View details for ${product.name}`}
        className="relative w-[35%] shrink-0 sm:w-full sm:aspect-square overflow-hidden bg-white cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/products/fresh-oyster-mushrooms.jpg";
          }}
        />
      </button>
      <div className="p-3 min-w-0 sm:p-6 lg:p-7 flex flex-col flex-1">
        <h3 className="font-heading text-base sm:text-xl text-brand-dark mb-1 sm:mb-2 break-words">{product.name}</h3>
        <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none sm:flex-1">
          {product.shortDesc}
        </p>
        <ul className="hidden sm:block space-y-1.5 mb-5">
          {product.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-sm text-brand-dark/80">
              <Check size={14} className="text-brand-green shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
        <ProductPurchase product={product} compact />
      </div>
    </article>
  );
}
