import { Check } from "lucide-react";
import ProductPurchase from "./ProductPurchase";

export default function ProductCard({ product, onQuickView }) {
  return (
    <article className="group min-w-0 bg-white sm:bg-brand-cream rounded-xl sm:rounded-2xl border border-brand-green/15 overflow-hidden transition-all duration-300 sm:hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
      <button
        type="button"
        onClick={() => onQuickView(product)}
        aria-label={`View details for ${product.name}`}
        className="relative w-full aspect-[5/4] sm:aspect-square overflow-hidden bg-white cursor-pointer"
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
      <div className="p-2.5 min-w-0 sm:p-6 lg:p-7 flex flex-col flex-1">
        <h3 className="font-heading text-[13px] min-[400px]:text-sm sm:text-xl leading-snug font-semibold text-brand-dark mb-1 sm:mb-2 break-words">{product.name}</h3>
        <p className="text-brand-muted text-[11px] sm:text-sm leading-snug sm:leading-relaxed mb-2 sm:mb-4 sm:flex-1">
          {product.shortDesc}
        </p>
        <ul className="space-y-1 sm:space-y-1.5 mb-2.5 sm:mb-5">
          {product.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-1 sm:gap-2 text-[10px] leading-tight sm:text-sm text-brand-dark/80">
              <Check size={12} className="text-brand-green shrink-0 mt-0.5 sm:w-[14px] sm:h-[14px]" />
              {benefit}
            </li>
          ))}
        </ul>
        <ProductPurchase product={product} compact />
      </div>
    </article>
  );
}
