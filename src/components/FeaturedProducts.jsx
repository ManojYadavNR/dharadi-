import { useState } from "react";
import AnimateSection from "./AnimateSection";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import { products } from "../data/products";

export default function FeaturedProducts() {
  const [quickView, setQuickView] = useState(null);

  return (
    <section id="products" className="py-12 sm:py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
            Our Collection
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark mt-3">
            Featured Products
          </h2>
          <p className="text-brand-muted mt-4">
            Premium natural products, carefully sourced and delivered fresh to your home.
          </p>
        </AnimateSection>
        <div className="grid min-w-0 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {products.map((product, i) => (
            <AnimateSection key={product.id} delay={i * 0.05}>
              <ProductCard product={product} onQuickView={setQuickView} />
            </AnimateSection>
          ))}
        </div>
      </div>
      {quickView && (
        <ProductQuickView product={quickView} onClose={() => setQuickView(null)} />
      )}
    </section>
  );
}
