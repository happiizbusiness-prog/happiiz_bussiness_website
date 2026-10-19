import { BusinessProvider } from './context/BusinessContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
// Modals
import { AboutModal } from './components/AboutModal';
import { QuoteModal } from './components/QuoteModal';
import { ServicesModal } from './components/ServicesModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { PortfolioModal } from './components/PortfolioModal';
import { BlogModal } from './components/BlogModal';
import { ContactModal } from './components/ContactModal';
import { RoadmapModal } from './components/RoadmapModal';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BusinessNameGeneratorPage } from './pages/BusinessNameGeneratorPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { LegalPage } from './pages/LegalPage';

function AppContent() {
  const { currentPath } = useNavigation();

  // Route resolution
  const renderPage = () => {
    // 1. Home
    if (currentPath === 'home' || currentPath === '' || currentPath === '/') {
      return <HomePage />;
    }

    // 2. Services Overview
    if (currentPath === 'services') {
      return <ServicesPage />;
    }

    // 3. Sub-services detail (e.g. services/web-development, services/seo, etc.)
    if (currentPath.startsWith('services/')) {
      const slug = currentPath.replace('services/', '');
      return <ServiceDetailPage slug={slug} />;
    }

    // 4. Portfolio
    if (currentPath === 'portfolio') {
      return <PortfolioPage />;
    }

    // 5. About Us Standalone Page
    if (currentPath === 'about') {
      return <AboutPage />;
    }

    // 6. Contact Us
    if (currentPath === 'contact') {
      return <ContactPage />;
    }

    // 7. Interactive Business Name Generator Tool
    if (currentPath === 'tools/business-name-generator') {
      return <BusinessNameGeneratorPage />;
    }

    // 8. Blog List
    if (currentPath === 'blog') {
      return <BlogListPage />;
    }

    // 9. Blog Detail
    if (currentPath.startsWith('blog/')) {
      const slug = currentPath.replace('blog/', '');
      return <BlogDetailPage slug={slug} />;
    }

    // 10. Admin Settings Panel
    if (currentPath === 'admin-settings') {
      return <AdminSettingsPage />;
    }

    // 11. Legal Pages
    if (currentPath === 'privacy-policy') {
      return <LegalPage type="privacy" />;
    }
    if (currentPath === 'terms-and-conditions') {
      return <LegalPage type="terms" />;
    }

    // Fallback to Home
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Agency Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <AboutModal />
      <QuoteModal />
      <ServicesModal />
      <ServiceDetailModal />
      <PortfolioModal />
      <BlogModal />
      <ContactModal />
      <RoadmapModal />

      {/* Floating Dynamic WhatsApp Support Button */}
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <BusinessProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </BusinessProvider>
  );
}
