import AnimateSection from "./AnimateSection";
import { blogs } from "../data/products";

export default function Blog() {
  const featured = blogs.slice(0, 3);

  return (
    <section id="blog" className="py-20 lg:py-28 bg-brand-green-light/30">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <AnimateSection className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brand-gold text-sm font-medium tracking-widest uppercase">
            Blog
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark mt-3">
            Health Insights From Dharadi
          </h2>
        </AnimateSection>
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((post, i) => (
            <AnimateSection key={post.id} delay={i * 0.08}>
              <article className="group bg-white rounded-2xl overflow-hidden border border-brand-green/10 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg text-brand-dark mb-2 line-clamp-2 group-hover:text-brand-green transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-brand-muted text-sm line-clamp-2">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-brand-green text-sm font-medium">
                    Read more →
                  </span>
                </div>
              </article>
            </AnimateSection>
          ))}
        </div>
      </div>
    </section>
  );
}
