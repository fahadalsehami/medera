import { SectionHeader } from "@/components/section-header";
import { Feature as FeatureComponent } from "@/components/ui/feature-slideshow";

export function FeatureSection() {
  const featureSection = {
    title: "Intelligent. Integrated. Immediate.",
    description: "Discover how Medera transforms behavioral health assessment and treatment in four automated steps",
    items: [
      {
        id: 1,
        title: "AI-Powered Assessment",
        content: "Our AI analyzes patient conversations and clinical notes in real-time, identifying behavioral health indicators with clinical-grade accuracy.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Smart Documentation",
        content: "Automatically generates comprehensive clinical documentation, including treatment plans and progress notes that meet regulatory standards.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Instant Treatment Plans",
        content: "Creates evidence-based treatment recommendations tailored to each patient's unique needs and clinical history.",
        image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "Seamless Integration",
        content: "Works directly with Epic, Athenahealth, and other major EHR systems for frictionless workflow integration.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop"
      }
    ]
  };

  return (
    <section
      id="features"
      className="flex flex-col items-center justify-center gap-5 w-full relative"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          {featureSection.title}
        </h2>
        <p className="text-muted-foreground text-center text-balance font-medium">
          {featureSection.description}
        </p>
      </SectionHeader>
      <div className="w-full h-full lg:h-[450px] flex items-center justify-center">
        <FeatureComponent
          collapseDelay={5000}
          linePosition="bottom"
          featureItems={featureSection.items}
          lineColor="bg-secondary"
        />
      </div>
    </section>
  );
}
