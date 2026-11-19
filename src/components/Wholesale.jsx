import AnimateSection from "./AnimateSection";
import { SecondaryButton } from "./Button";
import { whatsappOrderUrl } from "../utils/whatsapp";

export default function Wholesale() {
  return (
    <section id="partner" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="bg-brand-cream rounded-3xl p-10 lg:p-16 border border-brand-green/10 text-center max-w-4xl mx-auto">
          <AnimateSection>
            <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
              Partnership
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark mt-3 mb-6">
              Partner With Dharadi
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              Join our growing network of retailers, distributors, and
              health-conscious businesses.
            </p>
            <p className="text-brand-muted leading-relaxed mb-10">
              Bring premium natural products to your customers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={whatsappOrderUrl(
                  encodeURIComponent(
                    "Hello Dharadi! I'm interested in becoming a distributor/retail partner."
                  )
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-brand-green text-brand-cream font-medium text-sm hover:bg-brand-gold hover:text-brand-dark transition-all"
              >
                Become a Distributor
              </a>
              <SecondaryButton href="#contact">Contact Us</SecondaryButton>
            </div>
          </AnimateSection>
        </div>
      </div>
    </section>
  );
}
