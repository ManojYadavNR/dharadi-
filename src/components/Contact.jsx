import { Phone, MapPin } from "lucide-react";
import AnimateSection from "./AnimateSection";

function InstagramIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const items = [
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    content: (
      <>
        <a
          href="tel:+919164873661"
          className="block hover:text-brand-gold transition-colors"
        >
          +91 9164873661
        </a>
        <a
          href="tel:+916362318340"
          className="block hover:text-brand-gold transition-colors mt-1"
        >
          +91 6362318340
        </a>
        <p className="text-brand-muted/80 text-xs mt-3">
          Call or message us on WhatsApp to place your order.
        </p>
      </>
    ),
  },
  {
    icon: MapPin,
    title: "Location",
    content: (
      <p>
        Nayindralli Village,
        <br />
        Chintamani Taluk,
        <br />
        Chikkaballapur District,
        <br />
        Karnataka – 563128
      </p>
    ),
  },
  {
    icon: InstagramIcon,
    title: "Instagram",
    content: (
      <>
        <a
          href="https://instagram.com/dharadi_"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-gold transition-colors font-medium"
        >
          @dharadi_
        </a>
        <p className="text-brand-muted/80 text-xs mt-3">
          Follow us for farm updates, new products, and daily wellness tips.
        </p>
      </>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-9 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center mb-5 sm:mb-14">
          <h2 className="font-heading text-2xl sm:text-4xl font-semibold text-brand-dark">
            Get In Touch
          </h2>
          <p className="text-brand-muted mt-2 sm:mt-3 text-xs sm:text-sm max-w-md mx-auto">
            Reach us by phone, WhatsApp, or Instagram. We&apos;re happy to help with
            orders and delivery across Chintamani, Bengaluru, and Kolar.
          </p>
        </AnimateSection>
        <p className="md:hidden text-xs text-brand-muted mb-3" aria-hidden="true">Swipe to see all contact options →</p>
        <div aria-label="Get in Touch — swipe horizontally" className="flex min-w-0 overflow-x-auto snap-x snap-mandatory overscroll-x-contain gap-3 pb-3 -mr-5 pr-5 md:mr-auto md:pr-0 md:pb-0 md:grid md:grid-cols-3 md:gap-6 max-w-4xl mx-auto dharadi-swipe-rail">
          {items.map(({ icon: Icon, title, content }) => (
            <AnimateSection key={title} className="w-[79vw] max-w-[325px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink">
              <div className="min-w-0 bg-brand-cream rounded-2xl p-4 sm:p-8 border border-brand-green/10 h-full">
                <Icon size={24} className="text-brand-green mb-2 sm:mb-4" strokeWidth={1.5} />
                <h3 className="font-heading text-lg text-brand-dark mb-2 sm:mb-3">{title}</h3>
                <div className="text-brand-muted text-sm leading-relaxed">{content}</div>
              </div>
            </AnimateSection>
          ))}
        </div>
      </div>
    </section>
  );
}
