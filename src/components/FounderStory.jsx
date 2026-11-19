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
    <section id="founder" className="py-9 sm:py-20 lg:py-28 bg-brand-green-light/50 leaf-pattern">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flow-root lg:grid lg:min-w-0 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <AnimateSection className="lg:order-1">
            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80&auto=format&fit=crop" alt="Rural farming in Nayindralli village" loading="lazy" decoding="async" className="lg:hidden float-left w-[37%] max-w-[175px] aspect-[4/5] object-cover rounded-xl mr-4 mb-2 border-2 border-brand-cream shadow-sm" />
            <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="font-heading text-xl min-[375px]:text-2xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark mt-1 sm:mt-3 mb-3 sm:mb-6">
              A Journey From Rural Fields to Healthier Homes
            </h2>
            <div aria-label="Our Journey — swipe horizontally" className="clear-both flex min-w-0 overflow-x-auto snap-x snap-mandatory overscroll-x-contain gap-3 pb-3 pt-2 -mr-5 pr-5 lg:mr-0 lg:pr-0 lg:pt-0 lg:pb-0 lg:block lg:space-y-5 text-brand-muted text-sm sm:text-base leading-relaxed dharadi-swipe-rail">
              <p className="w-[78vw] max-w-[330px] min-w-0 shrink-0 snap-start rounded-xl bg-white/75 border border-brand-green/10 p-4 lg:w-auto lg:max-w-none lg:shrink lg:snap-none lg:rounded-none lg:bg-transparent lg:border-0 lg:p-0">
                Growing up in Nayindralli village, I saw the honesty and effort that
                goes into farming every single day — season after season, crop after
                crop.
              </p>
              <p className="w-[78vw] max-w-[330px] min-w-0 shrink-0 snap-start rounded-xl bg-white/75 border border-brand-green/10 p-4 lg:w-auto lg:max-w-none lg:shrink lg:snap-none lg:rounded-none lg:bg-transparent lg:border-0 lg:p-0">
                I also saw how families in cities struggled to find food they could
                truly trust — products that were fresh, natural, and free from harmful
                chemicals.
              </p>
              <p className="font-medium text-brand-green w-[78vw] max-w-[330px] min-w-0 shrink-0 snap-start rounded-xl bg-white/75 border border-brand-green/10 p-4 lg:w-auto lg:max-w-none lg:shrink lg:snap-none lg:rounded-none lg:bg-transparent lg:border-0 lg:p-0">That&apos;s why Dharadi was created.</p>
              <p className="w-[78vw] max-w-[330px] min-w-0 shrink-0 snap-start rounded-xl bg-white/75 border border-brand-green/10 p-4 lg:w-auto lg:max-w-none lg:shrink lg:snap-none lg:rounded-none lg:bg-transparent lg:border-0 lg:p-0">
                Together with my co-founder, we turned what began as fresh oyster
                mushrooms from our farm into a commitment to bring chemical-free,
                honestly grown products to homes that care about health, purity, and
                authenticity.
              </p>
              <p className="text-brand-dark/90 text-sm w-[78vw] max-w-[330px] min-w-0 shrink-0 snap-start rounded-xl bg-white/75 border border-brand-green/10 p-4 lg:w-auto lg:max-w-none lg:shrink lg:snap-none lg:rounded-none lg:bg-transparent lg:border-0 lg:p-0">
                Rooted in farming tradition — building Dharadi from the soil of
                Chikkaballapur.
              </p>
            </div>
            <div className="clear-both mt-3 sm:mt-10 pt-4 sm:pt-8 border-t border-brand-green/20 grid grid-cols-2 gap-3 sm:gap-6">
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
          <AnimateSection delay={0.1} className="hidden lg:block lg:order-2">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-h-[560px] border-4 border-brand-cream shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80&auto=format&fit=crop"
                alt="Rural farming in Nayindralli village"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimateSection>
        </div>
      </div>
    </section>
  );
}
