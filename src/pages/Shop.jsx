import { useState } from "react";
import AnimateSection from "../components/AnimateSection";
import ProductCard from "../components/ProductCard";
import ProductQuickView from "../components/ProductQuickView";
import { products } from "../data/products";

export default function Shop() {
  const [quickView, setQuickView] = useState(null);

  return (
    <main className="pt-28 lg:pt-32 pb-20 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
            Shop
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-brand-dark mt-3">
            Our Natural Collection
          </h1>
          <p className="text-brand-muted mt-4">
            Premium products from honest farmers, delivered to your door.
          </p>
        </AnimateSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
    </main>
  );
}
