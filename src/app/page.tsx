import { CompanyShowcase } from "@/components/sections/company-showcase";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FeatureSection } from "@/components/sections/feature-section";
import { FooterSection } from "@/components/sections/footer-section";
import { GrowthSection } from "@/components/sections/growth-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ProcessSection } from "@/components/sections/process-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <CompanyShowcase />
      <ProcessSection />
      <QuoteSection />
      <FeatureSection />
      <GrowthSection />
      <PricingSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
