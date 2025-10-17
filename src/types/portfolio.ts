export interface PortfolioProject {
  tag: "CASE STUDY" | "SNAPSHOT" | "AI PROJECT" | "OPERATIONS" | "PROTOTYPE" | "GEN AI";
  title: string;
  category: string;
  description: string;
  image: string;
  tags?: string[];
  link?: string;
  slug?: string;
  fullDescription?: string;
  features?: string[];
  technicalHighlights?: {
    title: string;
    description: string;
  }[];
  results?: string[];
  keyFeatures?: string[];
  technologies?: string[];
  gallery?: string[];
}

export interface FeaturedItem {
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}
