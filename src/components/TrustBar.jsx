import { Leaf, Truck, Shield, Users, Award } from "lucide-react";

const items = [
  { icon: Leaf, label: "100% Natural" },
  { icon: Truck, label: "Farm Fresh" },
  { icon: Shield, label: "Chemical-Free" },
  { icon: Users, label: "Direct From Farmers" },
  { icon: Award, label: "Premium Quality" },
];

export default function TrustBar() {
  return (
    <section className="bg-brand-green py-3 sm:py-5">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div aria-label="Dharadi product values — scroll horizontally" className="flex flex-nowrap min-w-0 overflow-x-auto overscroll-x-contain gap-5 sm:gap-10 lg:gap-16 sm:flex-wrap sm:justify-center dharadi-swipe-rail">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex shrink-0 items-center gap-2 text-brand-cream/95"
            >
              <Icon size={18} strokeWidth={1.5} />
              <span className="text-[11px] sm:text-sm font-medium tracking-wide uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
