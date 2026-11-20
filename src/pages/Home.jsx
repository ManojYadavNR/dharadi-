import Hero from "../components/Hero";
import SocialProof from "../components/SocialProof";
import TrustBar from "../components/TrustBar";
import About from "../components/About";
import FounderStory from "../components/FounderStory";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChoose from "../components/WhyChoose";
import Process from "../components/Process";
import BrandIntention from "../components/BrandIntention";
import ProductBenefits from "../components/ProductBenefits";
import Testimonials from "../components/Testimonials";
import Wholesale from "../components/Wholesale";
import Instagram from "../components/Instagram";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <FeaturedProducts />
      <SocialProof />
      <TrustBar />
      <WhyChoose />
      <Process />
      <About />
      <FounderStory />
      <BrandIntention />
      <ProductBenefits />
      <Testimonials />
      <Wholesale />
      <Instagram />
      <Contact />
    </main>
  );
}
