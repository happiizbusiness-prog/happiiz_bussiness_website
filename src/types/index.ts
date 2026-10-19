export interface BusinessSettings {
  businessName: string;
  tagline: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  contactNumber: string;
  whatsappNumber: string;
  businessEmail: string;
  businessAddress: string;
  socialUrls: {
    linkedin: string;
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
  favicon?: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  category: 'web-development' | 'digital-marketing' | 'graphic-design';
  categoryLabel: string;
  title: string;
  shortDesc: string;
  overview: string;
  benefits: string[];
  deliverables: string[];
  processSteps: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  featuredTech: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'Web Development' | 'Digital Marketing' | 'Branding & Design' | 'Stationery';
  image: string;
  summary: string;
  impact: string;
  tags: string[];
  year: string;
  deliverables: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  image?: string;
  content: string[];
  tags: string[];
}

export interface GeneratedBusinessName {
  id: string;
  name: string;
  style: string;
  concept: string;
  suggestedDomain: string;
}
