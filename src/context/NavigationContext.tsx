import React, { createContext, useContext, useState, useEffect } from 'react';

export type RoutePath =
  | 'home'
  | 'services'
  | 'services/web-development'
  | 'services/digital-marketing'
  | 'services/seo'
  | 'services/social-media'
  | 'services/lead-generation'
  | 'services/branding-design'
  | 'services/logo-design'
  | 'services/business-cards'
  | 'services/letterhead-design'
  | 'services/envelope-design'
  | 'portfolio'
  | 'about'
  | 'contact'
  | 'tools/business-name-generator'
  | 'blog'
  | 'admin-settings'
  | 'privacy-policy'
  | 'terms-and-conditions'
  | string;

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean; scrollToTop?: boolean }) => void;
  // About Modal
  isAboutModalOpen: boolean;
  openAboutModal: () => void;
  closeAboutModal: () => void;
  // Quote Modal
  isQuoteModalOpen: boolean;
  quoteDefaultService: string;
  openQuoteModal: (serviceName?: string) => void;
  closeQuoteModal: () => void;
  // Services Modals
  isServicesModalOpen: boolean;
  openServicesModal: () => void;
  closeServicesModal: () => void;
  selectedServiceSlug: string | null;
  openServiceDetailModal: (slug: string) => void;
  closeServiceDetailModal: () => void;
  // Portfolio Modal
  isPortfolioModalOpen: boolean;
  selectedProjectId: string | null;
  openPortfolioModal: (projectId?: string) => void;
  closePortfolioModal: () => void;
  // Blog Modal
  isBlogModalOpen: boolean;
  selectedBlogSlug: string | null;
  openBlogModal: (slug?: string) => void;
  closeBlogModal: () => void;
  // Contact Modal
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
  // 7-Step Roadmap Modal (Opens full delivery roadmap in popup without cluttering mobile home screen)
  isRoadmapModalOpen: boolean;
  openRoadmapModal: () => void;
  closeRoadmapModal: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const getInitialPath = (): string => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.replace(/^#\/?/, '');
    return hash || 'home';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  // Modal States
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteDefaultService, setQuoteDefaultService] = useState('Website Design & Development');

  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);

  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const target = hash || 'home';
      setCurrentPath(target);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string, options: { replace?: boolean; scrollToTop?: boolean } = {}) => {
    const cleanPath = path.replace(/^#\/?/, '') || 'home';
    setCurrentPath(cleanPath);
    window.location.hash = `#/${cleanPath}`;

    if (options.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // About Modal
  const openAboutModal = () => setIsAboutModalOpen(true);
  const closeAboutModal = () => setIsAboutModalOpen(false);

  // Quote Modal
  const openQuoteModal = (serviceName?: string) => {
    if (serviceName) setQuoteDefaultService(serviceName);
    setIsQuoteModalOpen(true);
  };
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  // Services Modals
  const openServicesModal = () => setIsServicesModalOpen(true);
  const closeServicesModal = () => setIsServicesModalOpen(false);

  const openServiceDetailModal = (slug: string) => {
    setSelectedServiceSlug(slug);
    setIsServicesModalOpen(false);
  };
  const closeServiceDetailModal = () => setSelectedServiceSlug(null);

  // Portfolio Modal
  const openPortfolioModal = (projectId?: string) => {
    if (projectId) setSelectedProjectId(projectId);
    setIsPortfolioModalOpen(true);
  };
  const closePortfolioModal = () => {
    setIsPortfolioModalOpen(false);
    setSelectedProjectId(null);
  };

  // Blog Modal
  const openBlogModal = (slug?: string) => {
    if (slug) setSelectedBlogSlug(slug);
    setIsBlogModalOpen(true);
  };
  const closeBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedBlogSlug(null);
  };

  // Contact Modal
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  // Roadmap Modal
  const openRoadmapModal = () => setIsRoadmapModalOpen(true);
  const closeRoadmapModal = () => setIsRoadmapModalOpen(false);

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        navigate,
        isAboutModalOpen,
        openAboutModal,
        closeAboutModal,
        isQuoteModalOpen,
        quoteDefaultService,
        openQuoteModal,
        closeQuoteModal,
        isServicesModalOpen,
        openServicesModal,
        closeServicesModal,
        selectedServiceSlug,
        openServiceDetailModal,
        closeServiceDetailModal,
        isPortfolioModalOpen,
        selectedProjectId,
        openPortfolioModal,
        closePortfolioModal,
        isBlogModalOpen,
        selectedBlogSlug,
        openBlogModal,
        closeBlogModal,
        isContactModalOpen,
        openContactModal,
        closeContactModal,
        isRoadmapModalOpen,
        openRoadmapModal,
        closeRoadmapModal,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
