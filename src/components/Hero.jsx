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
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-5 sm:py-10 lg:py-24 w-full">

        {/* Mobile: compact premium hero with a balanced product photograph. */}
        <div className="lg:hidden">
          <AnimateSection immediate>
            <div className="grid min-w-0 grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] items-center gap-3 min-[400px]:gap-4">
              <div className="min-w-0">
                <p className="font-heading text-brand-green text-xs min-[400px]:text-sm italic mb-2">
                  From Soil to Soul
                </p>
                <h1 className="font-heading text-[clamp(1.4rem,5.9vw,2.1rem)] leading-[1.13] tracking-[-0.02em] font-semibold text-brand-dark">
                  Pure Food From Honest Farmers
                </h1>
                <div className="mt-3 h-[2px] w-11 rounded-full bg-brand-gold" aria-hidden="true" />
              </div>
              <div className="min-w-0 relative">
                <div className="aspect-square overflow-hidden rounded-[20px] border border-brand-green/10 shadow-md bg-brand-cream">
                  <img
                    src={feed4}
                    alt="Dharadi farm produce, thoughtfully packaged"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-lg text-xs min-[400px]:text-sm leading-relaxed text-brand-muted">
              Because what you eat shapes how you live. Fresh, thoughtfully sourced food from honest farmers to your home.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <PrimaryButton href="/shop" className="w-full !px-3 !py-3 !rounded-xl !text-xs min-[400px]:!text-sm shadow-sm">
                Shop Now
              </PrimaryButton>
              <a
                href={whatsappOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-0 items-center justify-center rounded-xl border border-brand-green/40 bg-brand-cream/70 px-2.5 py-3 text-center text-xs min-[400px]:text-sm font-medium text-brand-green transition-colors hover:bg-brand-green/10"
              >
                Order on WhatsApp
              </a>
            </div>
            <a
              href="#about"
              className="mt-4 inline-flex items-center gap-1.5 font-heading text-xs min-[400px]:text-sm font-medium text-brand-green underline decoration-brand-gold/70 underline-offset-4 hover:text-brand-dark"
            >
              Discover Our Story <span aria-hidden="true">→</span>
            </a>
          </AnimateSection>
        </div>

        {/* Original desktop composition is intentionally unchanged. */}
        <div className="hidden lg:block">
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
        </div>
      </div>
    </section>
  );
}
