import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/#founder" },
  { label: "Products", href: "/#products" },
  { label: "Partner With Us", href: "/#partner" },
  { label: "Contact", href: "/#contact" },
];

export default function Header({ onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, setIsOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const headerBg = scrolled
    ? "bg-brand-cream/95 backdrop-blur-md shadow-sm border-b border-brand-green/10"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-1 h-20 lg:h-24">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <Logo size="md" />
            <span className="hidden sm:block font-heading text-xl lg:text-2xl font-semibold text-brand-green tracking-wide">
              DHARADI
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-4 2xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-brand-dark/80 hover:text-brand-green transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2 xl:gap-3">
            <button
              type="button"
              onClick={onSearchOpen}
              className="p-2.5 rounded-xl text-brand-green hover:bg-brand-green/10 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-xl text-brand-green hover:bg-brand-green/10 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-brand-gold text-brand-dark text-xs font-semibold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <a
              href="/shop"
              className="hidden md:inline-flex items-center px-6 py-2.5 rounded-2xl bg-brand-green text-brand-cream text-sm font-medium hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
            >
              Shop Now
            </a>
            <button
              type="button"
              className="xl:hidden p-2.5 rounded-xl text-brand-green"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav id="mobile-navigation" className="xl:hidden pb-6 flex flex-col gap-1 border-t border-brand-green/10 pt-4 max-h-[calc(100dvh-5rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-2 text-brand-dark font-medium hover:text-brand-green transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex justify-center px-6 py-3 rounded-2xl bg-brand-green text-brand-cream text-sm font-medium"
            >
              Shop Now
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
