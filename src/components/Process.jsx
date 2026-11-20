import AnimateSection from "./AnimateSection";

const steps = [
  {
    num: "01",
    title: "Careful Cultivation",
    desc: "Products are grown using responsible natural methods.",
  },
  {
    num: "02",
    title: "Thoughtful Harvesting",
    desc: "Harvested at peak freshness.",
  },
  {
    num: "03",
    title: "Hygienic Processing",
    desc: "Minimal processing to retain purity.",
  },
  {
    num: "04",
    title: "Premium Packaging",
    desc: "Packed securely for freshness.",
  },
  {
    num: "05",
    title: "Delivered With Care",
    desc: "Straight to your doorstep.",
  },
];

export default function Process() {
  return (
    <section className="dharadi-ref-process py-12 sm:py-20 lg:py-28 bg-brand-green-light/40">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center max-w-2xl mx-auto mb-9 sm:mb-14 lg:mb-20">
          <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
            Our Process
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark mt-3">
            From Farm to Your Family
          </h2>
        </AnimateSection>
        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-brand-green/20" />
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-5 lg:gap-4">
            {steps.map((step, i) => (
              <AnimateSection key={step.num} delay={i * 0.08} className="relative min-w-0 text-center">
                <div className="flex flex-col items-center text-center">
                  <div className="inline-flex shrink-0 items-center justify-center w-10 h-10 lg:w-16 lg:h-16 mb-3 lg:mb-5 rounded-full bg-brand-green text-brand-cream font-heading text-base lg:text-xl lg:mb-5 relative z-10">
                    {step.num}
                  </div>
                  <div className="min-w-0"><h3 className="font-heading text-base lg:text-lg text-brand-dark mb-1 lg:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p></div>
                </div>
              </AnimateSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
