import {
  Leaf,
  Tractor,
  Gem,
  Eye,
  Sprout,
  Heart,
} from "lucide-react";
import AnimateSection from "./AnimateSection";

const cards = [
  {
    icon: Leaf,
    title: "100% Natural",
    desc: "No harmful chemicals, no shortcuts.",
  },
  {
    icon: Tractor,
    title: "Direct From Farmers",
    desc: "Freshly sourced from trusted farms.",
  },
  {
    icon: Gem,
    title: "Premium Quality",
    desc: "Every product is carefully selected and processed.",
  },
  {
    icon: Eye,
    title: "Transparent Sourcing",
    desc: "Know where your food comes from.",
  },
  {
    icon: Sprout,
    title: "Sustainable Practices",
    desc: "Supporting better farming for a better future.",
  },
  {
    icon: Heart,
    title: "Health First",
    desc: "Designed for conscious living.",
  },
];

export default function WhyChoose() {
  return (
    <section className="dharadi-ref-why py-9 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center max-w-2xl mx-auto mb-5 sm:mb-14 lg:mb-16">
          <h2 className="font-heading text-2xl min-[375px]:text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark">
            Why Families Trust Dharadi
          </h2>
        </AnimateSection>
        <div className="trust-grid grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <AnimateSection key={card.title} delay={i * 0.05} className="trust-item min-w-0">
              <div className="trust-card bg-brand-cream rounded-2xl p-4 sm:p-8 border border-brand-green/10 hover:border-brand-green/25 sm:hover:-translate-y-1 transition-all duration-300 h-full block">
                <card.icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-brand-green mb-3 sm:mb-5"
                />
                <div className="min-w-0"><h3 className="font-heading text-lg sm:text-xl text-brand-dark mb-1 sm:mb-2">
                  {card.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {card.desc}
                </p></div>
              </div>
            </AnimateSection>
          ))}
        </div>
      </div>
    </section>
  );
}
