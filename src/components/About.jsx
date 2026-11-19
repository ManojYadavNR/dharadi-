import AnimateSection from "./AnimateSection";
import feed3 from "../assets/feed/feed3.jpg";

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimateSection>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-h-[520px] border border-brand-green/10 shadow-md">
              <img
                src={feed3}
                alt="Sustainable farming at Dharadi"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimateSection>
          <AnimateSection delay={0.1}>
            <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
              About Dharadi
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark mt-3 mb-6">
              Rooted in Nature. Built on Trust.
            </h2>
            <div className="space-y-5 text-brand-muted leading-relaxed">
              <p>
                Dharadi was born from a simple belief — food should nourish, heal,
                and support life naturally.
              </p>
              <p>
                Built by Manoj Yadav N R and Abhilash N S from Nayindralli village,
                Dharadi bridges the gap between honest farmers and conscious consumers
                by delivering premium natural products without harmful chemicals or
                unnecessary processing.
              </p>
              <p>
                Our mission is to make clean, trustworthy food accessible to every
                home while supporting sustainable farming practices.
              </p>
            </div>
            <a
              href="#founder"
              className="inline-block mt-8 text-brand-green font-medium hover:text-brand-gold transition-colors border-b border-brand-green/30 pb-0.5"
            >
              Read our story →
            </a>
          </AnimateSection>
        </div>
      </div>
    </section>
  );
}
