import AnimateSection from "./AnimateSection";
import feed3 from "../assets/feed/feed3.jpg";

export default function About() {
  return (
    <section id="about" className="py-9 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flow-root lg:grid lg:min-w-0 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <AnimateSection className="float-left w-[36%] min-w-0 mr-4 mb-2 lg:float-none lg:w-auto lg:mr-0 lg:mb-0">
            <div className="relative rounded-xl sm:rounded-3xl overflow-hidden aspect-[4/5] max-h-[520px] border border-brand-green/10 shadow-md">
              <img
                src={feed3}
                alt="Sustainable farming at Dharadi"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimateSection>
          <AnimateSection delay={0.1}>
            <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
              About Dharadi
            </span>
            <h2 className="font-heading text-xl min-[375px]:text-2xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark mt-1 sm:mt-3 mb-3 sm:mb-6">
              Rooted in Nature. Built on Trust.
            </h2>
            <div className="space-y-3 sm:space-y-5 text-brand-muted text-sm sm:text-base leading-relaxed">
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
              className="inline-block mt-4 sm:mt-8 text-brand-green font-medium hover:text-brand-gold transition-colors border-b border-brand-green/30 pb-0.5"
            >
              Read our story →
            </a>
          </AnimateSection>
        </div>
      </div>
    </section>
  );
}
