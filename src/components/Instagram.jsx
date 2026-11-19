function InstagramIcon({ size = 20, className = "" }) {
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
import AnimateSection from "./AnimateSection";
import packet1 from "../assets/packet/packet1.jpg";
import packet2 from "../assets/packet/packet2.jpg";
import packet3 from "../assets/packet/packet3.jpg";
import packet4 from "../assets/packet/packet4.jpg";
import packet5 from "../assets/feed/feed2.jpg";
import packet6 from "../assets/feed/feed3.jpg";

const images = [
  packet1,
  packet2,
  packet3,
  packet4,
  packet5,
  packet6,
];

export default function Instagram() {
  return (
    <section className="py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark">
            Follow Our Journey
          </h2>
          <a
            href="https://instagram.com/dharadi_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-brand-green font-medium hover:text-brand-gold transition-colors"
          >
            <InstagramIcon size={20} />
            @dharadi_
          </a>
          <p className="text-brand-muted text-sm mt-2">
            Fresh updates from our farms, products, and community.
          </p>
        </AnimateSection>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {images.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com/dharadi_"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square rounded-2xl overflow-hidden group"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
