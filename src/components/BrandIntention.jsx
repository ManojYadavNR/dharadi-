import AnimateSection from "./AnimateSection";

export default function BrandIntention() {
  return (
    <section className="dharadi-ref-intention py-12 sm:py-24 lg:py-32 bg-brand-green relative overflow-hidden">
      <div className="absolute inset-0 leaf-pattern opacity-30" />
      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <AnimateSection>
          <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
            Our Philosophy
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-cream mt-3 mb-5 sm:mb-8">
            Our Intention
          </h2>
          <div className="space-y-5 sm:space-y-6 text-brand-cream/90 text-xs sm:text-base lg:text-lg leading-relaxed">
            <p>
              At Dharadi, we believe healthy living begins with honest food.
            </p>
            <p>
              Our intention is to make natural products like fresh mushrooms,
              moringa powder, and cold-pressed oils easily accessible so every
              family can make healthier choices without compromise.
            </p>
            <p className="font-heading text-lg sm:text-2xl lg:text-3xl text-brand-cream italic pt-4">
              We are not here to sell food.
            </p>
            <p className="font-heading text-2xl lg:text-3xl text-brand-gold">
              We are here to rebuild trust in what people eat.
            </p>
          </div>
        </AnimateSection>
      </div>
    </section>
  );
}
