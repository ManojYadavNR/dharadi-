import { useState } from "react";
import AnimateSection from "./AnimateSection";
import { products } from "../data/products";

export default function ProductBenefits() {
  const [active, setActive] = useState(0);
  const product = products[active];

  return (
    <section className="py-9 sm:py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center max-w-2xl mx-auto mb-5 sm:mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark">
            Product Benefits
          </h2>
          <p className="text-brand-muted mt-3">
            Explore what makes each Dharadi product special.
          </p>
        </AnimateSection>
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-10 items-center">
          <div className="flex min-w-0 flex-nowrap overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap gap-2 sm:gap-3 dharadi-swipe-rail">
            {products.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                className={`max-w-full shrink-0 px-3 sm:px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  active === i
                    ? "bg-brand-green text-brand-cream"
                    : "bg-white text-brand-dark border border-brand-green/20 hover:border-brand-green"
                }`}
              >
                {p.name.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>
          <AnimateSection key={product.id}>
            <div className="min-w-0 flow-root bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-brand-green/10 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="float-left w-[36%] h-36 object-cover rounded-xl mr-3 mb-2 sm:float-none sm:w-full sm:h-48 sm:rounded-2xl sm:mr-0 sm:mb-6"
              />
              <h3 className="font-heading text-lg sm:text-2xl text-brand-dark mb-2 sm:mb-3">
                {product.name}
              </h3>
              <p className="text-brand-muted text-sm sm:text-base mb-4 sm:mb-6">{product.shortDesc}</p>
              <ul className="clear-both grid grid-cols-3 gap-2 sm:gap-4">
                {product.benefits.map((b) => (
                  <li
                    key={b}
                    className="bg-brand-cream rounded-xl p-2 sm:p-4 text-center text-xs sm:text-sm font-medium text-brand-dark border border-brand-green/10"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateSection>
        </div>
      </div>
    </section>
  );
}
