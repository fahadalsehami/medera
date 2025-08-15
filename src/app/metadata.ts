import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Medera",
    "AI",
    "Agent",
    "Therapy",
    "Mental Health",
    "Wellness",
    "Self-Care",
    "Meditation",
    "Mindfulness",
    "Mental Wellness",
    "Emotional Wellbeing",
  ],
  authors: [
    {
      name: "Medera AI",
      url: "https://medera.ai",
    },
  ],
  creator: "Medera AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@mederaaa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
