import AnimateSection from "./AnimateSection";
import { Truck } from "lucide-react";

export default function DeliveryAreas() {
  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-brand-green-light/40">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center max-w-2xl mx-auto">
          <Truck size={28} className="text-brand-green mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-brand-dark mb-3">
            Delivery Across India
          </h2>
          <p className="text-brand-muted text-sm mb-4 sm:mb-8">
            Order Dharadi products from anywhere in India.
          </p>
          <p className="text-brand-muted text-xs mt-2 sm:mt-4">
            Contact us on WhatsApp to confirm delivery availability, shipping charges, and timelines for your PIN code.
          </p>
        </AnimateSection>
      </div>
    </section>
  );
}
