import AnimateSection from "./AnimateSection";
import { Truck } from "lucide-react";

const areas = ["Chintamani", "Bengaluru", "Chikkaballapur"];

export default function DeliveryAreas() {
  return (
    <section className="py-16 lg:py-20 bg-brand-green-light/40">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center max-w-2xl mx-auto">
          <Truck size={28} className="text-brand-green mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-dark mb-3">
            Currently Delivering In
          </h2>
          <p className="text-brand-muted text-sm mb-8">
            Fresh natural products delivered with care across Karnataka.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {areas.map((area) => (
              <span
                key={area}
                className="px-6 py-3 rounded-2xl bg-white border border-brand-green/15 text-brand-dark font-medium text-sm shadow-sm"
              >
                {area}
              </span>
            ))}
          </div>
          <p className="text-brand-muted text-xs mt-8">
            Expanding to more regions soon. Order via WhatsApp for delivery confirmation.
          </p>
        </AnimateSection>
      </div>
    </section>
  );
}
