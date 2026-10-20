import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { HappiizLogo } from './HappiizLogo';
import { Mail, Phone, MapPin, Settings2, Heart } from 'lucide-react';

export function Footer() {
  const { settings } = useBusiness();
  const {
    navigate,
    openAboutModal,
    openQuoteModal,
    openServicesModal,
    openServiceDetailModal,
    openPortfolioModal,
    openContactModal
  } = useNavigation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 relative overflow-hidden">
      {/* Top subtle gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#0056b3] via-[#0284c7] to-[#ff5722]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand Wordmark & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.businessName}
                  className="h-12 w-auto object-contain rounded bg-white p-1"
                />
              ) : (
                <div className="bg-white p-2.5 rounded-xl shadow-xs inline-flex">
                  <HappiizLogo variant="compact" showTagline={true} />
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {settings.tagline}
            </p>
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={settings.socialUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-[#0077b5] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 group shadow-xs"
                aria-label="LinkedIn"
                title="Follow us on LinkedIn"
              >
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37z" />
                </svg>
              </a>
              <a
                href={settings.socialUrls.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 group shadow-xs"
                aria-label="Instagram"
                title="Follow us on Instagram"
              >
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={settings.socialUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-600 hover:bg-[#1877f2] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 group shadow-xs"
                aria-label="Facebook"
                title="Follow us on Facebook"
              >
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href={settings.socialUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-500 hover:bg-black text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 group shadow-xs"
                aria-label="X (Twitter)"
                title="Follow us on X"
              >
                <svg className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-[#25d366] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 group shadow-xs"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Digital Services */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">Services</div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => openServiceDetailModal('web-development')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => openServiceDetailModal('digital-marketing')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Digital Marketing & Ads
                </button>
              </li>
              <li>
                <button
                  onClick={() => openServiceDetailModal('seo')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Search Engine Optimization
                </button>
              </li>
              <li>
                <button
                  onClick={() => openServiceDetailModal('lead-generation')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Lead Generation Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => openServiceDetailModal('branding-design')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Branding & Visual Identity
                </button>
              </li>
              <li>
                <button
                  onClick={() => openServiceDetailModal('business-cards')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Visiting Cards & Stationery
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">Navigation</div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home Screen
                </button>
              </li>
              <li>
                <button onClick={() => openServicesModal()} className="hover:text-white transition-colors cursor-pointer">
                  All Services
                </button>
              </li>
              <li>
                <button onClick={() => openPortfolioModal()} className="hover:text-white transition-colors cursor-pointer">
                  Portfolio / Our Work
                </button>
              </li>
              <li>
                <button onClick={() => openAboutModal()} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => openContactModal()} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => openQuoteModal()} className="hover:text-white transition-colors text-amber-400 font-medium cursor-pointer">
                  Free Consultation Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Settings */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">Contact & Office</div>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>{settings.businessAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a href={`tel:${settings.contactNumber}`} className="hover:text-white transition-colors">
                  {settings.contactNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a href={`mailto:${settings.businessEmail}`} className="hover:text-white transition-colors">
                  {settings.businessEmail}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => navigate('admin-settings')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
                >
                  <Settings2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Admin Brand Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Bottom Row */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} {settings.businessName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('privacy-policy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigate('terms-and-conditions')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
