import { Quote } from "lucide-react";
import AnimateSection from "./AnimateSection";

const reviews = [
  {
    text: "Freshest mushrooms I've purchased locally.",
    author: "Priya S.",
    location: "Bengaluru",
  },
  {
    text: "The moringa powder quality is excellent.",
    author: "Rahul K.",
    location: "Chintamani",
  },
  {
    text: "Clean packaging and genuine natural products.",
    author: "Shwetha M.",
    location: "chickballapur",
  },
];

export default function Testimonials() {
  return (
    <section className="py-9 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center mb-5 sm:mb-12 lg:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark">
            What Our Customers Say
          </h2>
        </AnimateSection>
        <p className="md:hidden text-xs text-brand-muted mb-3" aria-hidden="true">Swipe to read every review →</p>
        <div aria-label="Customer reviews — swipe horizontally" className="flex min-w-0 overflow-x-auto snap-x snap-mandatory overscroll-x-contain gap-3 pb-3 -mr-5 pr-5 md:mr-0 md:pr-0 md:pb-0 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 dharadi-swipe-rail">
          {reviews.map((review, i) => (
            <AnimateSection key={review.author} delay={i * 0.08} className="w-[75vw] max-w-[310px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink">
              <article className="bg-brand-cream rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-brand-green/10 h-full flex flex-col text-left sm:text-center">
                <Quote
                  size={32}
                  className="text-brand-gold/50 mb-2 sm:mx-auto sm:mb-5"
                  strokeWidth={1}
                />
                <p className="font-heading text-base sm:text-lg text-brand-dark italic leading-relaxed mb-3 sm:mb-6 flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-brand-green font-medium">{review.author}</p>
                <p className="text-brand-muted text-sm">{review.location}</p>
              </article>
            </AnimateSection>
          ))}
        </div>
      </div>
    </section>
  );
}
