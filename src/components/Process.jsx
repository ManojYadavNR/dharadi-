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
    <section className="py-20 lg:py-28 bg-brand-green-light/40">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
          <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
            Our Process
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark mt-3">
            From Farm to Your Family
          </h2>
        </AnimateSection>
        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-brand-green/20" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <AnimateSection key={step.num} delay={i * 0.08} className="relative">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green text-brand-cream font-heading text-xl mb-5 relative z-10 mx-auto lg:mx-0">
                    {step.num}
                  </div>
                  <h3 className="font-heading text-lg text-brand-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </AnimateSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
