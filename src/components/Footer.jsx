import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";
import Logo from "./Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/#about" },
  { label: "Our Story", href: "/#founder" },
  { label: "Partner With Us", href: "/#partner" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-green text-brand-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid min-w-0 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8 mb-10 sm:mb-14">
          <div className="lg:col-span-1">
            <Logo size="lg" variant="onDark" className="mb-5" />
            <h3 className="font-heading text-2xl tracking-wide mb-1">DHARADI</h3>
            <p className="text-brand-gold text-sm tracking-widest uppercase mb-4">
              From Soil to Soul
            </p>
            <p className="text-brand-cream/75 text-sm leading-relaxed">
              Pure Food. Honest Farming. Healthier Living.
            </p>
            <p className="text-brand-cream/60 text-xs mt-4">
              Orders: +91 9164873661 · @dharadi_
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm tracking-widest uppercase mb-5 text-brand-gold">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/#") ? (
                    <a
                      href={link.href}
                      className="text-brand-cream/80 text-sm hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-brand-cream/80 text-sm hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <Newsletter />
          </div>
        </div>
        <div className="pt-8 border-t border-brand-cream/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-sm text-brand-cream/60">
          <p>© {new Date().getFullYear()} Dharadi. All rights reserved.</p>
          <p>Nayindralli Village, Chikkaballapur, Karnataka</p>
        </div>
      </div>
    </footer>
  );
}
