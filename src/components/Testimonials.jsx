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
    <section className="dharadi-ref-testimonials py-9 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center mb-9 sm:mb-12 lg:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark">
            What Our Customers Say
          </h2>
        </AnimateSection>
        <div aria-label="Customer reviews — swipe horizontally" className="flex min-w-0 overflow-x-auto snap-x snap-mandatory gap-2.5 sm:gap-6 lg:gap-8 pb-2 dharadi-swipe-rail">
          {reviews.map((review, i) => (
            <AnimateSection key={review.author} delay={i * 0.08} className="dharadi-ref-review-item min-w-0 flex-[0_0_calc((100%-1.25rem)/3)] sm:flex-[0_0_calc((100%-3rem)/3)] lg:flex-[0_0_calc((100%-4rem)/3)] snap-start">
              <article className="bg-brand-cream rounded-xl sm:rounded-3xl p-2.5 sm:p-8 lg:p-10 border border-brand-green/10 h-full flex flex-col text-center">
                <Quote
                  size={20}
                  className="text-brand-gold/50 mx-auto mb-2 sm:mb-5"
                  strokeWidth={1}
                />
                <p className="font-heading text-[10px] sm:text-lg text-brand-dark italic leading-relaxed mb-3 sm:mb-6 flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-brand-green text-[10px] sm:text-base font-medium">{review.author}</p>
                <p className="text-brand-muted text-[9px] sm:text-sm">{review.location}</p>
              </article>
            </AnimateSection>
          ))}
        </div>
      </div>
    </section>
  );
}
