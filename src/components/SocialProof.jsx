import { MapPin } from "lucide-react";

export default function SocialProof() {
  return (
    <section className="bg-white border-y border-brand-green/10 py-6">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
        <p className="text-brand-dark font-medium text-sm sm:text-base">
          Growing naturally with customers across Karnataka
        </p>
        <span className="hidden sm:block w-px h-5 bg-brand-green/20" aria-hidden />
        <p className="flex min-w-0 flex-wrap items-center justify-center sm:justify-start gap-2 text-brand-muted text-sm">
          <MapPin size={16} className="text-brand-green shrink-0" />
          Currently delivering: Chintamani · Bengaluru · Chickballapur
        </p>
      </div>
    </section>
  );
}
