import type { FeaturedItem, SocialLink } from "@/types/portfolio";

export const aboutText = {
  hero: {
    year: "2025",
    title: "Portfolio",
    subtitle: "Feed ↓",
  },
  focus: [
    "Brand Experience",
    "Product Design",
    "AI & Automation",
    "Creative Operations",
    "Innovation & Strategy",
    "Prototyping",
    "Digital Transformation",
  ],
  biography: [
    "With more than a decade of experience in technology and business, I have specialized in integrating artificial intelligence, automation, and design to create innovative solutions that drive measurable results for companies across various sectors.",
    "As a Product Generalist, I work at the intersection of development, design, and strategy, using emerging technologies to create experiences that are both functional and engaging.",
    "My approach combines strategic thinking with practical execution, allowing me to translate complex concepts into products and services that solve real problems and create tangible value for users and stakeholders.",
    "My work philosophy is centered on the idea that the best technology is the one that becomes invisible, allowing people to focus on what really matters: creating, connecting, and thriving in an increasingly digital world.",
    "Beyond my professional work, I'm building TheBrandXP.com, an online collection of the world's best branded product experiences, and I run an independent practice focused on AI-powered automation and innovative digital solutions.",
  ],
  contact: {
    email: "contato.thiagosalvador@gmail.com",
    location: "São Paulo, Brazil",
    phone: "Available upon request",
  },
};

export const featuredItems: FeaturedItem[] = [
  {
    title: "AI Innovation",
    description: "Specialized in creating AI-powered solutions that transform business operations, from automated content generation to intelligent data analysis and predictive systems.",
    image: "https://via.placeholder.com/800x600/6366f1/ffffff?text=AI+Innovation",
  },
  {
    title: "Creative Operations",
    description: "Led major campaigns for brands like Nubank, Walmart, McDonald's, and Vivo, combining creative excellence with operational efficiency to deliver award-winning results.",
    image: "https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Creative+Ops",
  },
  {
    title: "Product Strategy",
    description: "Expert in product generalism, bridging the gap between technical implementation and business strategy to create solutions that drive real value and user engagement.",
    image: "https://via.placeholder.com/800x600/0ea5e9/ffffff?text=Product+Strategy",
  },
  {
    title: "Rapid Prototyping",
    description: "Proficient in quickly validating ideas through functional prototypes, using no-code platforms and AI tools to accelerate innovation cycles and reduce time-to-market.",
    image: "https://via.placeholder.com/800x600/10b981/ffffff?text=Prototyping",
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/salvadorthiago/",
    label: "LinkedIn",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/salvador_thiago/",
    label: "Instagram",
  },
  {
    platform: "Twitter",
    url: "https://x.com/bettercallsalva",
    label: "Twitter",
  },
];
