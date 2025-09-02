import { SectionHeader } from "@/components/section-header";
import { SocialProofTestimonials } from "@/components/testimonial-scroll";

export function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Michael Rodriguez",
      role: "Psychiatrist, Harmony Mental Health",
      content: "Medera's AI catches subtle behavioral indicators I might miss during busy clinic days. It's like having a specialized behavioral health consultant in every appointment.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Jennifer Park",
      role: "Clinical Director, WellMind Center",
      content: "Documentation that used to take 30 minutes now takes 5. Our clinicians can see more patients while providing better care. ROI was immediate.",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 3,
      name: "Dr. Robert Thompson",
      role: "Family Medicine, CareFirst Medical",
      content: "As a primary care physician, I'm not a behavioral health specialist. Medera gives me confidence to identify and address mental health concerns early.",
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      id: 4,
      name: "Lisa Martinez",
      role: "Practice Manager, Integrated Health Solutions",
      content: "Implementation was seamless. Within a week, our entire team was using Medera. Patient satisfaction scores have increased by 35%.",
      image: "https://randomuser.me/api/portraits/women/50.jpg"
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      role: "Chief of Psychiatry, Regional Medical Center",
      content: "The accuracy of Medera's assessments rivals our senior clinicians. It's transforming how we approach behavioral health at scale.",
      image: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      id: 6,
      name: "Amanda Foster",
      role: "Nurse Practitioner, Community Health Network",
      content: "Medera helps me provide comprehensive behavioral health screening in primary care settings. It's bridging the gap between physical and mental health.",
      image: "https://randomuser.me/api/portraits/women/29.jpg"
    }
  ];

  return (
    <section
      id="testimonials"
      className="flex flex-col items-center justify-center w-full"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          Trusted by Leading Healthcare Providers
        </h2>
        <p className="text-muted-foreground text-center text-balance font-medium">
          See how Medera is transforming behavioral health assessment and treatment across healthcare organizations
        </p>
      </SectionHeader>
      <SocialProofTestimonials testimonials={testimonials} />
    </section>
  );
}
