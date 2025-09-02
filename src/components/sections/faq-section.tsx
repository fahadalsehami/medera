import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/section-header";

export function FAQSection() {
  const faqSection = {
    title: "Frequently Asked Questions",
    description: "Everything you need to know about Medera's behavioral health AI platform",
    items: [
      {
        id: 1,
        question: "How does Medera integrate with our existing EHR?",
        answer: "Medera seamlessly integrates with Epic, Athenahealth, Tebra, and other major EHR systems through secure APIs. Setup takes less than 30 minutes with our guided integration process."
      },
      {
        id: 2, 
        question: "Is Medera HIPAA compliant?",
        answer: "Yes, Medera is fully HIPAA compliant and SOC 2 Type II certified. We use enterprise-grade encryption and follow strict security protocols to protect patient data."
      },
      {
        id: 3,
        question: "How accurate is the AI in detecting behavioral health conditions?",
        answer: "Our AI models achieve 94% accuracy in identifying behavioral health indicators, validated against clinical diagnoses. The system continuously learns and improves from clinician feedback."
      },
      {
        id: 4,
        question: "Can clinicians override AI recommendations?",
        answer: "Absolutely. Medera is designed to augment clinical decision-making, not replace it. Clinicians have full control to modify, accept, or reject any AI-generated recommendations."
      },
      {
        id: 5,
        question: "What training is required for our staff?",
        answer: "Most clinicians are productive within 15 minutes. We provide comprehensive onboarding, video tutorials, and 24/7 support to ensure smooth adoption."
      },
      {
        id: 6,
        question: "How much time does Medera save per patient?",
        answer: "On average, clinicians save 15-20 minutes per behavioral health assessment, with automated documentation and treatment planning reducing administrative burden by up to 70%."
      }
    ]
  };

  return (
    <section
      id="faq"
      className="flex flex-col items-center justify-center gap-10 pb-10 w-full relative"
    >
      <SectionHeader>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
          {faqSection.title}
        </h2>
        <p className="text-muted-foreground text-center text-balance font-medium">
          {faqSection.description}
        </p>
      </SectionHeader>

      <div className="max-w-3xl w-full mx-auto px-10">
        <Accordion
          type="single"
          collapsible
          className="w-full border-b-0 grid gap-2"
        >
          {faqSection.items.map((faq, index) => (
            <AccordionItem
              key={index}
              value={index.toString()}
              className="border-0 grid gap-2"
            >
              <AccordionTrigger className="border bg-accent border-border rounded-lg px-4 py-3.5 cursor-pointer no-underline hover:no-underline data-[state=open]:ring data-[state=open]:ring-primary/20">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-3 border text-primary rounded-lg bg-accent">
                <p className="text-primary font-medium leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
