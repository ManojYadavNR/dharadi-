import AnimateSection from "./AnimateSection";
import { PrimaryButton, SecondaryButton } from "./Button";
import { whatsappOrderUrl } from "../utils/whatsapp";
import feed4 from "../assets/feed/feed4.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 lg:pt-28 leaf-pattern overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-brand-cream to-brand-green-light/40" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateSection>
            <p className="font-heading text-brand-green text-lg lg:text-xl italic mb-4">
              From Soil to Soul
            </p>
            <p className="text-brand-muted text-sm mb-6 max-w-md">
              Because what you eat shapes how you live.
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-brand-dark leading-tight mb-6">
              Pure Food From Honest Farmers
            </h1>
            <p className="text-brand-muted text-base lg:text-lg leading-relaxed max-w-xl mb-6">
              At Dharadi, we bring nature&apos;s finest products directly from trusted
              farms to your home — fresh, chemical-free, and crafted for healthier
              living.
            </p>
            <p className="font-heading text-lg sm:text-xl text-brand-green italic leading-relaxed max-w-xl mb-10 border-l-4 border-brand-gold pl-5">
              We are not here to sell food.
              <br />
              We are here to rebuild trust in what people eat.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
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
            <p className="text-xs sm:text-sm text-brand-muted tracking-widest uppercase">
              100% Natural · Farm Fresh · Chemical-Free · Sustainably Sourced
            </p>
          </AnimateSection>

          <AnimateSection delay={0.15} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-brand-green/10 aspect-[4/5] max-h-[600px]">
              <img
                src={feed4}
                alt="Fresh natural produce from Dharadi farms"
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/30 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-2xl px-6 py-4 shadow-md border border-brand-green/10">
              <p className="font-heading text-brand-green text-lg">From Soil to Soul</p>
              <p className="text-brand-muted text-sm mt-1">Premium · Organic · Trusted</p>
            </div>
          </AnimateSection>
        </div>
      </div>
    </section>
  );
}
