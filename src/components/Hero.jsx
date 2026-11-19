import AnimateSection from "./AnimateSection";
import { PrimaryButton, SecondaryButton } from "./Button";
import { whatsappOrderUrl } from "../utils/whatsapp";
import feed4 from "../assets/feed/feed4.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center pt-20 sm:pt-24 lg:pt-28 lg:min-h-[100svh] leaf-pattern overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-brand-cream to-brand-green-light/40" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-6 sm:py-10 lg:py-24 w-full">
        <div className="grid min-w-0 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:grid-cols-2 gap-3 sm:gap-8 lg:gap-16 items-center">
          <AnimateSection immediate className="min-w-0">
            <p className="font-heading text-brand-green text-xs sm:text-base lg:text-xl italic mb-2 lg:mb-4">
              From Soil to Soul
            </p>
            <p className="hidden lg:block text-brand-muted text-sm mb-6 max-w-md">
              Because what you eat shapes how you live.
            </p>
            <h1 className="font-heading text-[clamp(1.2rem,5.5vw,1.6rem)] leading-[1.15] sm:text-4xl lg:text-6xl xl:text-7xl font-semibold text-brand-dark lg:leading-tight mb-2 lg:mb-6 break-words">
              Pure Food From Honest Farmers
            </h1>
            <p className="hidden lg:block text-brand-muted text-base lg:text-lg leading-relaxed max-w-xl mb-6">
              At Dharadi, we bring nature&apos;s finest products directly from trusted
              farms to your home — fresh, chemical-free, and crafted for healthier
              living.
            </p>
            <p className="hidden lg:block font-heading text-lg sm:text-xl text-brand-green italic leading-relaxed max-w-xl mb-10 border-l-4 border-brand-gold pl-5">
              We are not here to sell food.
              <br />
              We are here to rebuild trust in what people eat.
            </p>
            <div className="hidden lg:flex flex-wrap gap-3 sm:gap-4 mb-10">
              <a
                href={whatsappOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-[#25D366] text-white font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[#1da851] shadow-md"
              >
                Order on WhatsApp
              </a>
              <PrimaryButton href="/shop">Shop Now</PrimaryButton>
              <SecondaryButton href="#about">Explore Our Story</SecondaryButton>
            </div>
            <p className="hidden lg:block text-xs sm:text-sm text-brand-muted tracking-wider sm:tracking-widest uppercase leading-relaxed">
              100% Natural · Farm Fresh · Chemical-Free · Sustainably Sourced
            </p>
          </AnimateSection>

          <AnimateSection immediate delay={0.15} className="relative min-w-0">
            <div className="relative w-full min-w-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-brand-green/10 aspect-[3/4] sm:aspect-[4/5] max-h-[600px]">
              <img
                src={feed4}
                alt="Fresh natural produce from Dharadi farms"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/30 to-transparent" />
            </div>
            <div className="hidden lg:block absolute -bottom-4 -left-8 bg-white rounded-2xl px-6 py-4 shadow-md border border-brand-green/10">
              <p className="font-heading text-brand-green text-lg">From Soil to Soul</p>
              <p className="text-brand-muted text-sm mt-1">Premium · Organic · Trusted</p>
            </div>
          </AnimateSection>
        </div>
        <div className="lg:hidden mt-3 space-y-1.5 text-[11px] min-[375px]:text-xs leading-relaxed text-brand-muted">
          <p>Because what you eat shapes how you live.</p>
          <p>At Dharadi, we bring nature&apos;s finest products directly from trusted farms to your home — fresh, chemical-free, and crafted for healthier living.</p>
          <p className="font-heading font-medium text-brand-green">We are not here to sell food. We are here to rebuild trust in what people eat.</p>
          <p className="text-[10px] min-[375px]:text-[11px]">100% Natural · Farm Fresh · Chemical-Free · Sustainably Sourced</p>
        </div>
        <div className="lg:hidden flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
          <a
            href={whatsappOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 flex-1 sm:flex-none text-center inline-flex items-center justify-center px-3 sm:px-6 py-3 rounded-xl bg-[#25D366] text-white font-medium text-xs sm:text-sm shadow-sm"
          >
            Order on WhatsApp
          </a>
          <PrimaryButton href="/shop" className="min-w-0 flex-1 sm:flex-none !px-3 sm:!px-6 !py-3 !rounded-xl !text-xs sm:!text-sm">
            Shop Now
          </PrimaryButton>
          <SecondaryButton href="#about" className="hidden sm:inline-flex !px-4 !py-3 !text-sm">
            Explore Our Story
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
