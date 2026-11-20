import AnimateSection from "./AnimateSection";
import { PrimaryButton, SecondaryButton } from "./Button";
import { whatsappOrderUrl } from "../utils/whatsapp";
import feed4 from "../assets/feed/feed4.jpg";

// One source of truth for both mobile and desktop homepage hero content.
const HERO_COPY = {
  tagline: "From Soil to Soul",
  belief: "Because what you eat shapes how you live.",
  headline: "Pure Food From Honest Farmers",
  description:
    "At Dharadi, we bring nature's finest products directly from trusted farms to your home — fresh, chemical-free, and crafted for healthier living.",
  missionLead: "We are not here to sell food.",
  missionPromise: "We are here to rebuild trust in what people eat.",
  values: "100% Natural · Farm Fresh · Chemical-Free · Sustainably Sourced",
  badge: "Premium · Organic · Trusted",
  whatsapp: "Order on WhatsApp",
  shop: "Shop Now",
  story: "Explore Our Story",
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center pt-20 sm:pt-24 lg:pt-28 lg:min-h-[100svh] leaf-pattern overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-brand-cream to-brand-green-light/40" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-5 sm:py-10 lg:py-24 w-full">

        {/* The same content and three actions as desktop; only responsive layout differs. */}
        <div className="lg:hidden">
          <AnimateSection immediate>
            <div className="grid min-w-0 grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] items-center gap-3 min-[400px]:gap-4">
              <div className="min-w-0">
                <p className="font-heading text-brand-green text-xs min-[400px]:text-sm italic mb-2">
                  {HERO_COPY.tagline}
                </p>
                <h1 className="font-heading text-[clamp(1.3rem,5.7vw,2rem)] leading-[1.12] tracking-[-0.02em] font-semibold text-brand-dark">
                  {HERO_COPY.headline}
                </h1>
              </div>
              <div className="min-w-0 relative">
                <div className="aspect-square overflow-hidden rounded-[18px] border border-brand-green/10 shadow-md bg-brand-cream">
                  <img
                    src={feed4}
                    alt="Fresh natural produce from Dharadi farms"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green/15 to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-3 left-2 right-2 bg-white/95 rounded-lg px-2 py-1 shadow-sm border border-brand-green/10 text-center">
                  <p className="font-heading text-[9px] leading-tight text-brand-green">{HERO_COPY.tagline}</p>
                  <p className="text-[8px] leading-tight text-brand-muted mt-0.5">{HERO_COPY.badge}</p>
                </div>
              </div>
            </div>
            <p className="mt-6 text-[11px] min-[400px]:text-xs leading-relaxed text-brand-muted">
              {HERO_COPY.belief}
            </p>
            <p className="mt-2.5 text-xs min-[400px]:text-[13px] leading-relaxed text-brand-muted">
              {HERO_COPY.description}
            </p>
            <p className="mt-3.5 pl-3 border-l-[3px] border-brand-gold font-heading text-[12px] min-[400px]:text-sm italic leading-relaxed text-brand-green">
              {HERO_COPY.missionLead}
              <br />
              {HERO_COPY.missionPromise}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <a
                href={whatsappOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-xl bg-[#25D366] px-2.5 py-2.5 text-center text-xs min-[400px]:text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1da851]"
              >
                {HERO_COPY.whatsapp}
              </a>
              <PrimaryButton
                href="/shop"
                className="min-h-11 w-full !px-2.5 !py-2.5 !rounded-xl !text-xs min-[400px]:!text-sm"
              >
                {HERO_COPY.shop}
              </PrimaryButton>
              <SecondaryButton
                href="#about"
                className="col-span-2 min-h-11 w-full !px-3 !py-2 !rounded-xl !text-xs min-[400px]:!text-sm"
              >
                {HERO_COPY.story}
              </SecondaryButton>
            </div>
            <p className="mt-4 text-[9px] min-[400px]:text-[10px] tracking-wide uppercase leading-relaxed text-brand-muted">
              {HERO_COPY.values}
            </p>
          </AnimateSection>
        </div>

        {/* Original desktop composition is intentionally unchanged. */}
        <div className="hidden lg:block">
        <div className="grid min-w-0 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:grid-cols-2 gap-3 sm:gap-8 lg:gap-16 items-center">
          <AnimateSection immediate className="min-w-0">
            <p className="font-heading text-brand-green text-xs sm:text-base lg:text-xl italic mb-2 lg:mb-4">
              {HERO_COPY.tagline}
            </p>
            <p className="hidden lg:block text-brand-muted text-sm mb-6 max-w-md">
              {HERO_COPY.belief}
            </p>
            <h1 className="font-heading text-[clamp(1.2rem,5.5vw,1.6rem)] leading-[1.15] sm:text-4xl lg:text-6xl xl:text-7xl font-semibold text-brand-dark lg:leading-tight mb-2 lg:mb-6 break-words">
              {HERO_COPY.headline}
            </h1>
            <p className="hidden lg:block text-brand-muted text-base lg:text-lg leading-relaxed max-w-xl mb-6">
              {HERO_COPY.description}
            </p>
            <p className="hidden lg:block font-heading text-lg sm:text-xl text-brand-green italic leading-relaxed max-w-xl mb-10 border-l-4 border-brand-gold pl-5">
              {HERO_COPY.missionLead}
              <br />
              {HERO_COPY.missionPromise}
            </p>
            <div className="hidden lg:flex flex-wrap gap-3 sm:gap-4 mb-10">
              <a
                href={whatsappOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-[#25D366] text-white font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[#1da851] shadow-md"
              >
                {HERO_COPY.whatsapp}
              </a>
              <PrimaryButton href="/shop">{HERO_COPY.shop}</PrimaryButton>
              <SecondaryButton href="#about">{HERO_COPY.story}</SecondaryButton>
            </div>
            <p className="hidden lg:block text-xs sm:text-sm text-brand-muted tracking-wider sm:tracking-widest uppercase leading-relaxed">
              {HERO_COPY.values}
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
              <p className="font-heading text-brand-green text-lg">{HERO_COPY.tagline}</p>
              <p className="text-brand-muted text-sm mt-1">{HERO_COPY.badge}</p>
            </div>
          </AnimateSection>
        </div>
        </div>
      </div>
    </section>
  );
}
