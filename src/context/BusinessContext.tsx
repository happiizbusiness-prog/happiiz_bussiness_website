import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessSettings,
  ServiceDetail,
  PortfolioProject,
  TestimonialItem,
  QuoteInquiry,
  AdminUser
} from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    quote: 'The web engineering and speed audit completely transformed our commercial customer acquisition pipeline. Our organic conversion rate doubled within 6 weeks of release.',
    author: 'Vikramaditya Oberoi',
    role: 'Managing Director',
    org: 'Apex Industrial Infrastructure',
    rating: 5
  },
  {
    id: 't-2',
    quote: 'From our embossed visiting cards to corporate letterheads and presentation folders, the brand identity designed by the team gave us immediate authority in high-stakes investor meetings.',
    author: 'Priya Sundaram',
    role: 'Chief Operating Officer',
    org: 'Aura Advisory Partners',
    rating: 5
  },
  {
    id: 't-3',
    quote: 'Our Google search rankings moved from page 4 to page 1 for key commercial terms in Delhi NCR. The technical SEO audit and page speed fixes made an undeniable difference.',
    author: 'Rohan Mehra',
    role: 'Head of Growth',
    org: 'Metro Clinics Network',
    rating: 5
  },
  {
    id: 't-4',
    quote: 'Their lead generation funnel delivered verified B2B appointments right into our CRM calendar. The WhatsApp alert integration kept our sales reps closing deals in record time.',
    author: 'Ananya Deshmukh',
    role: 'VP Sales',
    org: 'Nexus Logistics Solutions',
    rating: 5
  },
  {
    id: 't-5',
    quote: 'The brand stationery, envelopes, and website exceeded our executive board expectations. Fast communication, zero delays, and immaculate design standards.',
    author: 'Sameer Singhania',
    role: 'Founder',
    org: 'Singhania Capital Advisors',
    rating: 5
  }
];

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  businessName: 'HAPPIIZ BUSINESS SOLUTIONS',
  tagline: 'Your Business Our Priority — Accelerating Enterprise Growth with Cutting-Edge Web Engineering, Performance Marketing & Brand Craft',
  logoUrl: '',
  primaryColor: '#0056b3',
  secondaryColor: '#ff5722',
  contactNumber: '+91 98765 43210',
  whatsappNumber: '+919876543210',
  businessEmail: 'happiizbusiness@gmail.com',
  businessAddress: 'Suite 402, Level 4, Innov8 Executive Tower, Sector 62, Noida, NCR, India',
  heroHeadline: 'Architecting Digital Dominance & High-ROI Enterprise Systems',
  heroSubheadline: 'We build enterprise web platforms, data-driven lead generation funnels, and executive brand stationery for market-leading enterprises.',
  heroImageUrl: '/src/assets/images/hero_digital_agency_1792393542382.jpg',
  aboutMission: 'To empower ambitious enterprises with uncompromising digital craft, data-driven customer acquisition, and timeless branding that delivers measurable revenue growth.',
  aboutVision: 'To be the most trusted strategic growth partner for modern enterprises, renowned for creative precision, technical integrity, and real business outcomes.',
  socialUrls: {
    linkedin: 'https://linkedin.com/company/happiiz-business-solutions',
    instagram: 'https://instagram.com/happiizbusiness',
    facebook: 'https://facebook.com/happiizbusiness',
    twitter: 'https://x.com/happiizbiz',
    whatsapp: 'https://wa.me/919876543210',
    youtube: 'https://youtube.com/@happiizbusiness'
  },
  favicon: ''
};

const DEFAULT_ADMIN: AdminUser = {
  name: 'Master Admin',
  email: 'admin@happiiz.com',
  password: 'admin123',
  isLoggedIn: false
};

const SETTINGS_KEY = 'happiiz_business_settings_v2';
const SERVICES_KEY = 'happiiz_services_data_v2';
const PORTFOLIO_KEY = 'happiiz_portfolio_data_v2';
const TESTIMONIALS_KEY = 'happiiz_testimonials_data_v2';
const ADMIN_KEY = 'happiiz_admin_profile_v2';

interface BusinessContextType {
  settings: BusinessSettings;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;
  resetSettings: () => void;

  // Services
  services: ServiceDetail[];
  addService: (service: ServiceDetail) => void;
  updateService: (id: string, updated: Partial<ServiceDetail>) => void;
  deleteService: (id: string) => void;

  // Portfolio
  portfolio: PortfolioProject[];
  addProject: (project: PortfolioProject) => void;
  updateProject: (id: string, updated: Partial<PortfolioProject>) => void;
  deleteProject: (id: string) => void;

  // Testimonials
  testimonials: TestimonialItem[];
  addTestimonial: (item: TestimonialItem) => void;
  updateTestimonial: (id: string, updated: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Inquiries / Quotes
  inquiries: QuoteInquiry[];
  refreshInquiries: () => void;
  addInquiry: (inquiry: QuoteInquiry) => void;
  addSampleInquiry: () => void;
  updateInquiryStatus: (id: string, status: 'new' | 'contacted' | 'quoted' | 'closed') => void;
  deleteInquiry: (id: string) => void;

  // Admin Auth & Profile
  adminUser: AdminUser;
  loginAdmin: (email: string, password: string) => boolean;
  logoutAdmin: () => void;
  updateAdminProfile: (name: string, email: string, password?: string) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  // Settings State
  const [settings, setSettings] = useState<BusinessSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        return { ...DEFAULT_BUSINESS_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_BUSINESS_SETTINGS;
  });

  // Services State
  const [services, setServices] = useState<ServiceDetail[]>(() => {
    try {
      const saved = localStorage.getItem(SERVICES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return SERVICES_DATA;
  });

  // Portfolio State
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem(PORTFOLIO_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return PORTFOLIO_PROJECTS;
  });

  // Testimonials State
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(TESTIMONIALS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TESTIMONIALS;
  });

  // Admin User Profile & Session
  const [adminUser, setAdminUser] = useState<AdminUser>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_ADMIN, ...parsed };
      }
    } catch {}
    return DEFAULT_ADMIN;
  });

  // Quotes & Inquiries State
  const [inquiries, setInquiries] = useState<QuoteInquiry[]>([]);

  const loadAllInquiries = () => {
    try {
      const rawQuotes = JSON.parse(localStorage.getItem('happiiz_quotes') || '[]');
      const rawInquiries = JSON.parse(localStorage.getItem('happiiz_inquiries') || '[]');

      const combined: QuoteInquiry[] = [
        ...rawQuotes.map((q: any) => ({
          id: q.id || `Q-${Date.now()}`,
          name: q.name || 'Anonymous Client',
          email: q.email || 'N/A',
          phone: q.phone || 'N/A',
          service: q.service || 'General Quote',
          budget: q.budget || 'Custom',
          message: q.message || '',
          timestamp: q.date || q.timestamp || new Date().toISOString(),
          status: q.status || 'new',
          notes: q.notes || ''
        })),
        ...rawInquiries.map((inq: any) => ({
          id: inq.id || `INQ-${Date.now()}`,
          name: inq.name || 'Anonymous Client',
          email: inq.email || 'N/A',
          phone: inq.phone || 'N/A',
          service: inq.service || 'Contact Inquiry',
          budget: inq.budget || 'Standard',
          message: inq.message || '',
          timestamp: inq.timestamp || inq.date || new Date().toISOString(),
          status: inq.status || 'new',
          notes: inq.notes || ''
        }))
      ];

      // Sort by newest first
      combined.sort((a, b) => {
        const timeA = new Date(a.timestamp || 0).getTime();
        const timeB = new Date(b.timestamp || 0).getTime();
        return timeB - timeA;
      });

      setInquiries(combined);
    } catch {
      setInquiries([]);
    }
  };

  useEffect(() => {
    loadAllInquiries();
  }, []);

  // Save Settings
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Save Services
  useEffect(() => {
    try {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
    } catch {}
  }, [services]);

  // Save Portfolio
  useEffect(() => {
    try {
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
    } catch {}
  }, [portfolio]);

  // Save Testimonials
  useEffect(() => {
    try {
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
    } catch {}
  }, [testimonials]);

  // Save Admin
  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_KEY, JSON.stringify(adminUser));
    } catch {}
  }, [adminUser]);

  // Actions
  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_BUSINESS_SETTINGS);
    setServices(SERVICES_DATA);
    setPortfolio(PORTFOLIO_PROJECTS);
    setTestimonials(INITIAL_TESTIMONIALS);
  };

  // Services CRUD
  const addService = (newSrv: ServiceDetail) => {
    setServices((prev) => [newSrv, ...prev]);
  };

  const updateService = (id: string, updated: Partial<ServiceDetail>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id || s.slug === id ? { ...s, ...updated } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id && s.slug !== id));
  };

  // Portfolio CRUD
  const addProject = (proj: PortfolioProject) => {
    setPortfolio((prev) => [proj, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<PortfolioProject>) => {
    setPortfolio((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProject = (id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
  };

  // Testimonials CRUD
  const addTestimonial = (item: TestimonialItem) => {
    setTestimonials((prev) => [item, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Inquiries Actions
  const addInquiry = (inquiry: QuoteInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
    try {
      const rawQuotes = JSON.parse(localStorage.getItem('happiiz_quotes') || '[]');
      rawQuotes.unshift(inquiry);
      localStorage.setItem('happiiz_quotes', JSON.stringify(rawQuotes));
    } catch {}
  };

  const addSampleInquiry = () => {
    const sample: QuoteInquiry = {
      id: `HPZ-${Math.floor(100000 + Math.random() * 900000)}`,
      name: 'Reliance Infotech Solutions',
      email: 'projects@relianceinfotech.in',
      phone: '+91 98200 12345',
      service: 'Website Design & Development',
      budget: '₹75,000 - ₹1,50,000',
      message: 'Looking for complete corporate website revamp with 7-step roadmap implementation, speed optimization, and lead generation funnels.',
      timestamp: new Date().toISOString(),
      status: 'new',
      notes: ''
    };
    addInquiry(sample);
  };

  const updateInquiryStatus = (id: string, status: 'new' | 'contacted' | 'quoted' | 'closed') => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );

    // Also persist to raw storage
    try {
      const rawQuotes = JSON.parse(localStorage.getItem('happiiz_quotes') || '[]');
      const updatedQuotes = rawQuotes.map((q: any) =>
        q.id === id ? { ...q, status } : q
      );
      localStorage.setItem('happiiz_quotes', JSON.stringify(updatedQuotes));

      const rawInquiries = JSON.parse(localStorage.getItem('happiiz_inquiries') || '[]');
      const updatedInquiries = rawInquiries.map((inq: any) =>
        inq.id === id ? { ...inq, status } : inq
      );
      localStorage.setItem('happiiz_inquiries', JSON.stringify(updatedInquiries));
    } catch {}
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    try {
      const rawQuotes = JSON.parse(localStorage.getItem('happiiz_quotes') || '[]');
      const filteredQuotes = rawQuotes.filter((q: any) => q.id !== id);
      localStorage.setItem('happiiz_quotes', JSON.stringify(filteredQuotes));

      const rawInquiries = JSON.parse(localStorage.getItem('happiiz_inquiries') || '[]');
      const filteredInquiries = rawInquiries.filter((inq: any) => inq.id !== id);
      localStorage.setItem('happiiz_inquiries', JSON.stringify(filteredInquiries));
    } catch {}
  };

  // Admin Auth
  const loginAdmin = (emailInput: string, passwordInput: string): boolean => {
    const trimmedEmail = emailInput.trim().toLowerCase();
    const currentEmail = adminUser.email.trim().toLowerCase();

    // Allow login if matches email or username 'admin'
    if (
      (trimmedEmail === currentEmail || trimmedEmail === 'admin') &&
      passwordInput === adminUser.password
    ) {
      setAdminUser((prev) => ({ ...prev, isLoggedIn: true }));
      loadAllInquiries();
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser((prev) => ({ ...prev, isLoggedIn: false }));
  };

  const updateAdminProfile = (name: string, email: string, password?: string) => {
    setAdminUser((prev) => ({
      ...prev,
      name: name.trim() || prev.name,
      email: email.trim().toLowerCase() || prev.email,
      ...(password && password.trim().length >= 4 ? { password: password.trim() } : {})
    }));
  };

  return (
    <BusinessContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        services,
        addService,
        updateService,
        deleteService,
        portfolio,
        addProject,
        updateProject,
        deleteProject,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        inquiries,
        refreshInquiries: loadAllInquiries,
        addInquiry,
        addSampleInquiry,
        updateInquiryStatus,
        deleteInquiry,
        adminUser,
        loginAdmin,
        logoutAdmin,
        updateAdminProfile
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness(): BusinessContextType {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
