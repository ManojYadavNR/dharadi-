import { useState } from "react";
import AnimateSection from "./AnimateSection";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import { catalogProducts } from "../data/productCatalog";

export default function FeaturedProducts() {
  const [quickView, setQuickView] = useState(null);

  return (
    <section id="products" className="py-9 sm:py-14 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 lg:mb-16">
          <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
            Our Collection
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark mt-3">
            Featured Products
          </h2>
          <p className="text-brand-muted mt-3 sm:mt-4">
            Premium natural products, carefully sourced and delivered fresh to your home.
          </p>
        </AnimateSection>
        <p className="sm:hidden text-xs text-brand-muted mb-3" aria-hidden="true">Swipe to browse products →</p>
        <div aria-label="Featured products — swipe horizontally" className="flex min-w-0 gap-2.5 overflow-x-auto snap-x snap-mandatory overscroll-x-contain pb-3 -mr-5 pr-5 sm:mr-0 sm:pr-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8 dharadi-swipe-rail">
          {catalogProducts.map((product, index) => (
            <AnimateSection key={product.id} delay={index * 0.05} className="w-[calc((100vw-50px)/2)] min-w-0 max-w-[240px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink sm:h-full">
              <ProductCard product={product} onQuickView={setQuickView} />
            </AnimateSection>
          ))}
        </div>
      </div>
      {quickView && (
        <ProductQuickView key={quickView.id} product={quickView} onClose={() => setQuickView(null)} />
      )}
    </section>
  );
}
