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
    <section className="py-12 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center mb-12 lg:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark">
            What Our Customers Say
          </h2>
        </AnimateSection>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, i) => (
            <AnimateSection key={review.author} delay={i * 0.08}>
              <article className="bg-brand-cream rounded-3xl p-5 sm:p-8 lg:p-10 border border-brand-green/10 h-full flex flex-col text-center">
                <Quote
                  size={32}
                  className="text-brand-gold/50 mx-auto mb-5"
                  strokeWidth={1}
                />
                <p className="font-heading text-lg text-brand-dark italic leading-relaxed mb-6 flex-1">
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
