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
        <p className="text-brand-muted/80 text-[9px] sm:text-xs mt-2 sm:mt-3">
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
    <section id="contact" className="dharadi-ref-contact py-12 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center mb-9 sm:mb-14">
          <h2 className="font-heading text-2xl sm:text-4xl font-semibold text-brand-dark">
            Get In Touch
          </h2>
          <p className="text-brand-muted mt-2 sm:mt-3 text-xs sm:text-sm max-w-md mx-auto">
            Reach us by phone, WhatsApp, or Instagram. We&apos;re happy to help with
            orders and delivery across India.
          </p>
        </AnimateSection>
        <div className="grid min-w-0 grid-cols-3 gap-2.5 sm:gap-6 max-w-4xl mx-auto">
          {items.map(({ icon: Icon, title, content }) => (
            <AnimateSection key={title} className="min-w-0">
              <div className="min-w-0 bg-brand-cream rounded-xl sm:rounded-2xl p-2.5 sm:p-8 border border-brand-green/10 h-full">
                <Icon size={18} className="text-brand-green mb-2 sm:mb-4" strokeWidth={1.5} />
                <h3 className="font-heading text-[11px] leading-snug sm:text-lg text-brand-dark mb-2 sm:mb-3">{title}</h3>
                <div className="text-brand-muted text-[9px] sm:text-sm leading-relaxed break-words">{content}</div>
              </div>
            </AnimateSection>
          ))}
        </div>
      </div>
    </section>
  );
}
