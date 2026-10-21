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
  heroHeadline?: string;
  heroSubheadline?: string;
  heroImageUrl?: string;
  aboutMission?: string;
  aboutVision?: string;
  socialUrls: {
    linkedin: string;
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
    whatsapp?: string;
  };
  favicon?: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  category: 'web-development' | 'digital-marketing' | 'graphic-design' | string;
  categoryLabel: string;
  title: string;
  shortDesc: string;
  overview: string;
  imageUrl?: string;
  benefits?: string[];
  deliverables: string[];
  processSteps: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  featuredTech?: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'Web Development' | 'Digital Marketing' | 'Branding & Design' | 'Stationery' | string;
  image: string;
  summary: string;
  impact: string;
  tags: string[];
  year: string;
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  org: string;
  rating: number;
}

export interface QuoteInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
  message: string;
  timestamp?: string;
  date?: string;
  status?: 'new' | 'contacted' | 'quoted' | 'closed';
  notes?: string;
}

export interface AdminUser {
  name: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
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
