import AnimateSection from "./AnimateSection";

const founders = [
  {
    name: "Manoj Yadav N R",
    role: "Founder",
  },
  {
    name: "Abhilash N S",
    role: "Co-Founder",
  },
];

export default function FounderStory() {
  return (
    <section id="founder" className="py-20 lg:py-28 bg-brand-green-light/50 leaf-pattern">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimateSection className="order-2 lg:order-1">
            <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark mt-3 mb-6">
              A Journey From Rural Fields to Healthier Homes
            </h2>
            <div className="space-y-5 text-brand-muted leading-relaxed">
              <p>
                Growing up in Nayindralli village, I saw the honesty and effort that
                goes into farming every single day — season after season, crop after
                crop.
              </p>
              <p>
                I also saw how families in cities struggled to find food they could
                truly trust — products that were fresh, natural, and free from harmful
                chemicals.
              </p>
              <p className="font-medium text-brand-green">That&apos;s why Dharadi was created.</p>
              <p>
                Together with my co-founder, we turned what began as fresh oyster
                mushrooms from our farm into a commitment to bring chemical-free,
                honestly grown products to homes that care about health, purity, and
                authenticity.
              </p>
              <p className="text-brand-dark/90 text-sm">
                Rooted in farming tradition — building Dharadi from the soil of
                Chikkaballapur.
              </p>
            </div>
            <div className="mt-10 pt-8 border-t border-brand-green/20 grid sm:grid-cols-2 gap-6">
              {founders.map((founder) => (
                <blockquote key={founder.name}>
                  <p className="font-heading text-lg text-brand-dark italic">
                    {founder.name}
                  </p>
                  <p className="text-brand-muted text-sm mt-1">{founder.role}, Dharadi</p>
                </blockquote>
              ))}
            </div>
          </AnimateSection>
          <AnimateSection delay={0.1} className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-h-[560px] border-4 border-brand-cream shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80&auto=format&fit=crop"
                alt="Rural farming in Nayindralli village"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimateSection>
        </div>
      </div>
    </section>
  );
}
