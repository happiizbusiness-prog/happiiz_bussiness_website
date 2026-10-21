import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { HappiizLogo } from '../components/HappiizLogo';
import { ImageUploadField } from '../components/ImageUploadField';
import { ServiceDetail, PortfolioProject, TestimonialItem, QuoteInquiry } from '../types';
import {
  Save,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  Globe,
  Sliders,
  Sparkles,
  Lock,
  LogOut,
  User,
  Shield,
  MessageCircle,
  Clock,
  Trash2,
  Edit3,
  Plus,
  Eye,
  ExternalLink,
  ChevronRight,
  Zap,
  Star,
  Search,
  Filter,
  Layers,
  KeyRound,
  FileText,
  AlertCircle,
  X,
  PhoneCall
} from 'lucide-react';

export function AdminSettingsPage() {
  const {
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
    refreshInquiries,
    addSampleInquiry,
    updateInquiryStatus,
    deleteInquiry,
    adminUser,
    loginAdmin,
    logoutAdmin,
    updateAdminProfile
  } = useBusiness();

  const {
    navigate,
    openServiceDetailModal,
    openPortfolioModal,
    openAboutModal
  } = useNavigation();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Tab in Dashboard
  const [activeTab, setActiveTab] = useState<
    'inquiries' | 'branding' | 'contact' | 'social' | 'services' | 'portfolio' | 'testimonials' | 'about' | 'admin_profile'
  >('inquiries');

  // Success alert message
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 3500);
  };

  // -------------------------------------------------------------
  // LOGIN HANDLERS
  // -------------------------------------------------------------
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(loginEmail, loginPassword);
    if (!success) {
      setLoginError('Invalid Admin ID or Password. Try admin@happiiz.com and admin123.');
    } else {
      showNotification('Welcome back, Admin!');
    }
  };

  const handleQuickDemoLogin = () => {
    setLoginEmail('admin@happiiz.com');
    setLoginPassword('admin123');
    loginAdmin('admin@happiiz.com', 'admin123');
    showNotification('Welcome back, Admin! (Logged in via One-Tap)');
  };

  // -------------------------------------------------------------
  // FORM STATES FOR SETTINGS
  // -------------------------------------------------------------
  const [brandForm, setBrandForm] = useState({
    businessName: settings.businessName,
    tagline: settings.tagline,
    logoUrl: settings.logoUrl || '',
    primaryColor: settings.primaryColor,
    secondaryColor: settings.secondaryColor,
    heroHeadline: settings.heroHeadline || 'Architecting Digital Dominance & High-ROI Enterprise Systems',
    heroSubheadline: settings.heroSubheadline || 'We build enterprise web platforms, data-driven lead generation funnels, and executive brand stationery for market-leading enterprises.',
    heroImageUrl: settings.heroImageUrl || '/src/assets/images/hero_digital_agency_1792393542382.jpg'
  });

  const [contactForm, setContactForm] = useState({
    contactNumber: settings.contactNumber,
    whatsappNumber: settings.whatsappNumber,
    businessEmail: settings.businessEmail,
    businessAddress: settings.businessAddress
  });

  const [socialForm, setSocialForm] = useState({
    linkedin: settings.socialUrls.linkedin || '',
    instagram: settings.socialUrls.instagram || '',
    facebook: settings.socialUrls.facebook || '',
    twitter: settings.socialUrls.twitter || '',
    whatsapp: settings.socialUrls.whatsapp || `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`,
    youtube: settings.socialUrls.youtube || ''
  });

  const [aboutForm, setAboutForm] = useState({
    aboutMission: settings.aboutMission || 'To empower ambitious enterprises with uncompromising digital craft, data-driven customer acquisition, and timeless branding that delivers measurable revenue growth.',
    aboutVision: settings.aboutVision || 'To be the most trusted strategic growth partner for modern enterprises, renowned for creative precision, technical integrity, and real business outcomes.'
  });

  // Admin Profile form
  const [profileForm, setProfileForm] = useState({
    name: adminUser.name,
    email: adminUser.email,
    newPassword: '',
    confirmPassword: ''
  });
  const [profileError, setProfileError] = useState<string | null>(null);

  // Inquiries filter & search
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'contacted' | 'quoted' | 'closed'>('all');
  const [inquirySearch, setInquirySearch] = useState('');

  // Modals state for View/Add/Edit to guarantee they pop up in front of the user
  const [viewingInquiry, setViewingInquiry] = useState<QuoteInquiry | null>(null);
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceImage, setNewServiceImage] = useState('');
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectImage, setNewProjectImage] = useState('/src/assets/images/portfolio_web_design_1792393542453.jpg');
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Handle Logo Upload file
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBrandForm((prev) => ({ ...prev, logoUrl: reader.result as string }));
          showNotification('Custom logo uploaded! Click Save to apply.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // -------------------------------------------------------------
  // IF NOT LOGGED IN -> RENDER LOGIN SCREEN
  // -------------------------------------------------------------
  if (!adminUser.isLoggedIn) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-blue-50 border border-blue-200 shadow-2xs mb-1">
              <HappiizLogo variant="compact" showTagline={false} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[11px] font-bold text-[#0056b3] border border-blue-200">
              <Shield className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Administrative Sign-In
            </h1>
            <p className="text-xs text-slate-500">
              Access website configuration, inquiries portal, and service management.
            </p>
          </div>

          {loginError && (
            <div className="p-3 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Admin ID / Email Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@happiiz.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-500/10 transition-colors"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-slate-700">
                  Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] text-slate-500 hover:text-[#0056b3] cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-500/10 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-white rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 hover:opacity-95"
              style={{
                background: 'linear-gradient(135deg, #0056b3 0%, #ff5722 100%)'
              }}
            >
              <KeyRound className="w-4 h-4 text-white" />
              <span>Login to Admin Dashboard</span>
            </button>
          </form>

          {/* Quick Demo Login Preset Helper */}
          <div className="pt-3 border-t border-slate-100 text-center space-y-2">
            <div className="text-[11px] text-slate-500">
              Default Credentials: <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">admin@happiiz.com</code> / <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">admin123</code>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 px-3 text-xs font-semibold text-[#0056b3] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors cursor-pointer"
            >
              ⚡ Click Here for One-Tap Quick Demo Login
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('home')}
              className="text-xs text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
            >
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LOGGED-IN ADMIN DASHBOARD
  // -------------------------------------------------------------

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter !== 'all' && inq.status !== inquiryFilter) return false;
    if (inquirySearch.trim()) {
      const q = inquirySearch.toLowerCase();
      return (
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.phone.toLowerCase().includes(q) ||
        inq.service.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const newInquiriesCount = inquiries.filter((q) => q.status === 'new').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Admin Header Bar with Direct Profile Link, View Site, and Logout */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Clickable Admin Profile Card */}
        <div
          onClick={() => {
            setIsProfileModalOpen(true);
            setActiveTab('admin_profile');
            showNotification('Opened Admin Profile & Security Settings.');
          }}
          role="button"
          tabIndex={0}
          className="flex items-center gap-3.5 cursor-pointer group text-left"
          title="Click to view or edit Admin Profile Settings"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0056b3] to-[#ff5722] text-white font-black text-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            {adminUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#0056b3] transition-colors">
                {adminUser.name} · Central Admin Portal
              </h1>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Online & Authorized" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
              <span className="underline decoration-slate-300 group-hover:text-slate-800">{adminUser.email}</span>
              <span>·</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono text-[10px] font-bold">
                ROOT PRIVILEGES
              </span>
              <span>·</span>
              <span className="text-[10px] text-blue-600 font-bold group-hover:underline flex items-center gap-0.5">
                <Lock className="w-3 h-3" />
                Profile Settings
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Profile, View Live Site, Logout */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setIsProfileModalOpen(true);
              setActiveTab('admin_profile');
              showNotification('Switched to Admin Profile Settings.');
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'admin_profile' || isProfileModalOpen
                ? 'bg-[#0056b3] text-white shadow-xs'
                : 'text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200'
            }`}
            title="Update Admin Name, Email, or Password"
          >
            <Lock className="w-3.5 h-3.5 text-blue-500" />
            <span>Profile Settings</span>
          </button>

          <button
            onClick={() => {
              navigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            title="Go to Live Website"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              navigate('home');
              showNotification('Logged out from Admin Portal successfully.');
            }}
            className="px-3.5 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            title="Sign Out immediately and return to website"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Global Success Notification Toast */}
      {saveMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{saveMessage}</span>
          </div>
          <button
            onClick={() => navigate('home')}
            className="text-xs text-[#0056b3] font-bold hover:underline"
          >
            Check Live Website →
          </button>
        </div>
      )}

      {/* Quick Actions Shortcuts Toolbar */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/70 via-white to-orange-50/50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-[#ff5722]" />
          <span>Quick Admin Actions:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('services');
              setIsAddingService(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-[#0056b3] font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('portfolio');
              setIsAddingProject(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 text-emerald-700 font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('testimonials');
              setIsAddingTestimonial(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 text-amber-700 font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Review</span>
          </button>

          <button
            onClick={() => {
              addSampleInquiry();
              setActiveTab('inquiries');
              showNotification('Sample Client Quotation added!');
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0056b3] to-[#ff5722] text-white font-bold transition-all shadow-2xs flex items-center gap-1 hover:opacity-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Simulate Quote Lead</span>
          </button>
        </div>
      </div>

      {/* Top KPI Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('inquiries')}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#0056b3] transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Inquiries & Quotes
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-[#0056b3]">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {inquiries.length}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            {newInquiriesCount > 0 ? (
              <span className="font-bold text-[#ff5722] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                {newInquiriesCount} Needs Attention
              </span>
            ) : (
              <span className="text-emerald-600">All handled</span>
            )}
          </div>
        </div>

        <div
          onClick={() => setActiveTab('services')}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#0056b3] transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Active Services
            </span>
            <div className="p-2 rounded-xl bg-orange-50 text-[#ff5722]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {services.length}
          </div>
          <div className="text-[11px] text-slate-500">Web, Ads, Stationery</div>
        </div>

        <div
          onClick={() => setActiveTab('portfolio')}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#0056b3] transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Portfolio Projects
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {portfolio.length}
          </div>
          <div className="text-[11px] text-slate-500">Live Case Studies</div>
        </div>

        <div
          onClick={() => setActiveTab('testimonials')}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#0056b3] transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Client Feedbacks
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {testimonials.length}
          </div>
          <div className="text-[11px] text-slate-500">5-Star Verified Reviews</div>
        </div>
      </div>

      {/* Main Tabbed Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar Tabs */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-3 shadow-xs space-y-1">
          <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono">
            Dashboard Modules
          </div>

          {[
            { id: 'inquiries', label: 'Quotes & Inquiries', icon: MessageCircle, badge: newInquiriesCount > 0 ? newInquiriesCount : null },
            { id: 'branding', label: 'Name, Logo & Hero', icon: Sparkles },
            { id: 'contact', label: 'Contact, Address & WhatsApp', icon: Phone },
            { id: 'social', label: 'Social Media Channels', icon: Globe },
            { id: 'services', label: 'Services & Deliverables', icon: Layers, count: services.length },
            { id: 'portfolio', label: 'Portfolio & Case Studies', icon: Zap, count: portfolio.length },
            { id: 'testimonials', label: 'Client Feedbacks', icon: Star, count: testimonials.length },
            { id: 'about', label: 'About Us Content', icon: FileText },
            { id: 'admin_profile', label: 'Admin Security Profile', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-3.5 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0056b3] to-[#0284c7] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className="bg-[#ff5722] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full shrink-0 shadow-xs">
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && !tab.badge && (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="lg:col-span-9 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs min-h-[500px]">
          {/* TAB 1: INQUIRIES & QUOTATIONS PORTAL */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Quotation Leads & Client Requests</span>
                    <span className="text-xs font-bold text-[#0056b3] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono">
                      {inquiries.length} Total
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time portal capturing every user submission from "Request Free Quote" and "Contact Us" forms.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => {
                      addSampleInquiry();
                      showNotification('Sample client quotation added! View details below.');
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                    title="Simulate a real client submitting the Free Quote Form"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+ Simulate Client Quote</span>
                  </button>

                  <button
                    onClick={() => {
                      refreshInquiries();
                      showNotification('Refreshed inquiries list.');
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    🔄 Refresh
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {(['all', 'new', 'contacted', 'quoted', 'closed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setInquiryFilter(st)}
                      className={`px-3 py-1 text-xs font-bold rounded-xl capitalize transition-colors cursor-pointer ${
                        inquiryFilter === st
                          ? 'bg-[#0056b3] text-white shadow-xs'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search client, email or phone..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0056b3]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Inquiries Cards List */}
              {filteredInquiries.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-slate-400 shadow-2xs border border-slate-200">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-700">No quotation requests found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    When visitors submit "Request a Free Quote" on the website, their details and instant WhatsApp chat will appear here.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        addSampleInquiry();
                        showNotification('Sample quotation added! Test replying or changing status.');
                      }}
                      className="px-4 py-2 text-xs font-bold text-[#0056b3] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
                      <span>Add Demo Quotation Lead to Test Portal</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredInquiries.map((inq) => {
                    const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                    return (
                      <div
                        key={inq.id}
                        className={`p-5 rounded-2xl border transition-all space-y-3 ${
                          inq.status === 'new'
                            ? 'bg-blue-50/40 border-blue-200 shadow-xs'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{inq.name}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs font-semibold text-[#0056b3] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {inq.service}
                            </span>
                            {inq.budget && (
                              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {inq.budget}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(inq.timestamp || Date.now()).toLocaleDateString()}
                            </span>
                            <select
                              value={inq.status || 'new'}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                              className="text-[11px] font-bold rounded-lg border border-slate-200 bg-white px-2 py-1 text-slate-700 focus:outline-none cursor-pointer"
                            >
                              <option value="new">🟡 New</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="quoted">🟣 Quoted</option>
                              <option value="closed">🟢 Closed</option>
                            </select>

                            <button
                              onClick={() => {
                                deleteInquiry(inq.id);
                                showNotification(`Inquiry from ${inq.name} deleted.`);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Message body */}
                        {inq.message && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-sans">
                            "{inq.message}"
                          </div>
                        )}

                        {/* Direct Action Buttons: View, WhatsApp, Call, Email */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                          <button
                            onClick={() => setViewingInquiry(inq)}
                            className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-[#0056b3] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                            title="View full quote details"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>View Details</span>
                          </button>

                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                                inq.name
                              )}%2C%20thank%20you%20for%20contacting%20${encodeURIComponent(
                                settings.businessName
                              )}%20regarding%20your%20${encodeURIComponent(inq.service)}%20project.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Reply on WhatsApp</span>
                            </a>
                          )}

                          {inq.phone && inq.phone !== 'N/A' && (
                            <a
                              href={`tel:${inq.phone}`}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-500" />
                              <span>Call {inq.phone}</span>
                            </a>
                          )}

                          {inq.email && inq.email.includes('@') && (
                            <a
                              href={`mailto:${inq.email}?subject=Quotation%20Proposal%20from%20${encodeURIComponent(
                                settings.businessName
                              )}&body=Dear%20${encodeURIComponent(inq.name)}%2C%0A%0A`}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                            >
                              <Mail className="w-3.5 h-3.5 text-slate-500" />
                              <span>Email: {inq.email}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BRAND IDENTITY & HERO IMAGE */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Brand Identity & Front-End Hero Customization
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your official company name, marketing tagline, custom logo, and homepage banner image.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSettings(brandForm);
                  showNotification('Business identity and hero section updated successfully!');
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Website / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brandForm.businessName}
                    onChange={(e) => setBrandForm({ ...brandForm, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Appears in header, footer, modals, and meta titles.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Business Tagline
                  </label>
                  <textarea
                    rows={2}
                    value={brandForm.tagline}
                    onChange={(e) => setBrandForm({ ...brandForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3] resize-none"
                  />
                </div>

                {/* Logo Customizer */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#0056b3]" />
                    <span>Company Logo Asset</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs inline-flex items-center justify-center min-w-[160px]">
                      {brandForm.logoUrl ? (
                        <img
                          src={brandForm.logoUrl}
                          alt="Custom Logo Preview"
                          className="h-10 object-contain"
                        />
                      ) : (
                        <HappiizLogo variant="compact" showTagline={false} />
                      )}
                    </div>

                    <div className="space-y-2 flex-1">
                      <input
                        type="url"
                        value={brandForm.logoUrl}
                        onChange={(e) => setBrandForm({ ...brandForm, logoUrl: e.target.value })}
                        placeholder="Paste image URL (https://...)"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                      />
                      <div className="flex items-center gap-3">
                        <label className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-2xs">
                          <Upload className="w-3.5 h-3.5 text-slate-500" />
                          <span>Upload from Computer</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </label>
                        {brandForm.logoUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setBrandForm({ ...brandForm, logoUrl: '' });
                              showNotification('Logo reset to default.');
                            }}
                            className="text-xs text-red-600 hover:underline cursor-pointer"
                          >
                            Reset to Default Vector
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Front-End Homepage Hero Image & Headlines */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#ff5722]" />
                      <span>Homepage Front-End Hero Banner & Headline</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#0056b3] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Live on Homepage
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Hero Primary Headline
                    </label>
                    <input
                      type="text"
                      value={brandForm.heroHeadline}
                      onChange={(e) => setBrandForm({ ...brandForm, heroHeadline: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Hero Subheadline Overview
                    </label>
                    <textarea
                      rows={2}
                      value={brandForm.heroSubheadline}
                      onChange={(e) => setBrandForm({ ...brandForm, heroSubheadline: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3] resize-none"
                    />
                  </div>

                  <div>
                    <ImageUploadField
                      label="Homepage Hero Banner Image (Upload from PC or Paste from Desktop)"
                      value={brandForm.heroImageUrl || ''}
                      onChange={(url) => setBrandForm((prev) => ({ ...prev, heroImageUrl: url }))}
                      recommendedSize="1920 × 1080px (16:9)"
                      aspectRatioClass="aspect-[16/9]"
                      helperText="This image appears directly in the front-end homepage hero banner. You can upload an image from your computer (Upload from PC / Computer), drag and drop, or press Ctrl+V to paste from your desktop."
                      presetSamples={[
                        { name: 'Agency Studio', url: '/src/assets/images/hero_digital_agency_1792393542382.jpg' },
                        { name: 'Engineering Workspace', url: '/src/assets/images/roadmap_code_engineering_1792395847305.jpg' },
                        { name: 'Lead Growth Analytics', url: '/src/assets/images/blog_lead_gen_analytics_1792398293938.jpg' }
                      ]}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Brand & Hero Settings</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: CONTACT, ADDRESS & WHATSAPP */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Contact Information & WhatsApp Chat Settings
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Change your official office address, mobile telephone, email ID, and floating WhatsApp hotline number.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSettings(contactForm);
                  showNotification('Contact and WhatsApp settings updated site-wide!');
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct Phone / Calling Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={contactForm.contactNumber}
                        onChange={(e) => setContactForm({ ...contactForm, contactNumber: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-900">WhatsApp Chat & "Chat with Us" Hotline</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
                        LIVE HOTLINE
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Official WhatsApp Mobile Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={contactForm.whatsappNumber}
                          onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                          placeholder="+919876543210"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-emerald-300 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                        />
                        <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                      </div>
                    </div>

                    {/* Generated Live Chat with Us URL Preview */}
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-2">
                      <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        Generated "Chat with Us" Web Link:
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <code className="text-[11px] font-mono text-emerald-800 break-all select-all">
                          https://wa.me/{contactForm.whatsappNumber.replace(/[^0-9]/g, '')}
                        </code>
                        {contactForm.whatsappNumber.replace(/[^0-9]/g, '') && (
                          <a
                            href={`https://wa.me/${contactForm.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                              settings.businessName
                            )}%2C%20I%20am%20interested%20in%20your%20services.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto cursor-pointer"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Test Live Chat Link</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500 leading-normal">
                      ℹ️ Updating this number updates the floating bottom-right <strong>"Chat with Us"</strong> button, the Homepage WhatsApp chat button, Contact page links, and direct quotation replies.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Executive Corporate Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={contactForm.businessEmail}
                      onChange={(e) => setContactForm({ ...contactForm, businessEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Office / Corporate Studio Physical Address *
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      required
                      value={contactForm.businessAddress}
                      onChange={(e) => setContactForm({ ...contactForm, businessAddress: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3] resize-none"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details & WhatsApp</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: SOCIAL MEDIA CHANNELS */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Official Social Media Channels
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add, edit, remove, or customize brand profile links for Facebook, Twitter (X), WhatsApp, Instagram, LinkedIn, and YouTube.
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSettings({ socialUrls: socialForm });
                  showNotification('Social media channels updated! Live footer icons adjusted.');
                }}
                className="space-y-4"
              >
                {[
                  {
                    key: 'linkedin' as const,
                    label: 'LinkedIn Company Page',
                    defaultUrl: 'https://linkedin.com/company/happiiz-business-solutions',
                    color: 'text-blue-600',
                    desc: 'Corporate profile & B2B networking'
                  },
                  {
                    key: 'instagram' as const,
                    label: 'Instagram Official Profile',
                    defaultUrl: 'https://instagram.com/happiizbusiness',
                    color: 'text-pink-600',
                    desc: 'Creative showcase & brand culture'
                  },
                  {
                    key: 'facebook' as const,
                    label: 'Facebook Brand Page',
                    defaultUrl: 'https://facebook.com/happiizbusiness',
                    color: 'text-blue-700',
                    desc: 'Community & enterprise updates'
                  },
                  {
                    key: 'twitter' as const,
                    label: 'X (Formerly Twitter) Profile',
                    defaultUrl: 'https://x.com/happiizbiz',
                    color: 'text-slate-900',
                    desc: 'Press releases & strategic announcements'
                  },
                  {
                    key: 'whatsapp' as const,
                    label: 'Direct WhatsApp Chat Channel',
                    defaultUrl: `https://wa.me/${contactForm.whatsappNumber.replace(/[^0-9]/g, '')}`,
                    color: 'text-emerald-600',
                    desc: 'Direct consultation & quick inquiry chat'
                  },
                  {
                    key: 'youtube' as const,
                    label: 'YouTube Official Channel',
                    defaultUrl: 'https://youtube.com/@happiizbusiness',
                    color: 'text-red-600',
                    desc: 'Case studies, product demos & webinars'
                  }
                ].map((item) => {
                  const currentValue = socialForm[item.key] || '';
                  const isConfigured = Boolean(currentValue.trim());

                  return (
                    <div
                      key={item.key}
                      className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                        isConfigured ? 'bg-white border-slate-200 shadow-2xs' : 'bg-slate-50/70 border-dashed border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-xs ${item.color}`}>●</span>
                          <span className="font-bold text-xs text-slate-900">{item.label}</span>
                          {isConfigured ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Active in Footer
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                              Disabled / Removed
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {isConfigured ? (
                            <>
                              <a
                                href={currentValue}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-[#0056b3] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Test Link</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => {
                                  setSocialForm({ ...socialForm, [item.key]: '' });
                                  showNotification(`${item.label} link removed.`);
                                }}
                                className="px-2.5 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors cursor-pointer"
                              >
                                Remove Link
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setSocialForm({ ...socialForm, [item.key]: item.defaultUrl });
                                showNotification(`${item.label} link restored.`);
                              }}
                              className="px-2.5 py-1 text-[11px] font-bold text-[#0056b3] hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                            >
                              + Add & Enable Link
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="url"
                          value={currentValue}
                          onChange={(e) => setSocialForm({ ...socialForm, [item.key]: e.target.value })}
                          placeholder={isConfigured ? 'https://...' : 'Link disabled (leave empty or type URL to activate)'}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Social Media Channels</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Services & Deliverables Management
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add new commercial services, edit deliverables, view live cards, or remove services from the catalog.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingService(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 hover:opacity-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* List of Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-[#0056b3] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {srv.categoryLabel}
                        </span>

                        {/* View, Edit, Delete Actions */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openServiceDetailModal(srv.slug)}
                            className="px-2 py-1 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                            title="View Live Service Modal"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span>View</span>
                          </button>

                          <button
                            onClick={() => setEditingService(srv)}
                            className="px-2 py-1 rounded-lg text-slate-500 hover:text-[#0056b3] hover:bg-blue-50 transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => {
                              deleteService(srv.id);
                              showNotification(`Service "${srv.title}" deleted.`);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        {srv.imageUrl ? (
                          <img
                            src={srv.imageUrl}
                            alt={srv.title}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 text-[#0056b3] flex items-center justify-center shrink-0">
                            <Layers className="w-6 h-6" />
                          </div>
                        )}
                        <div className="space-y-1 min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{srv.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {srv.shortDesc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-1 border-t border-slate-100">
                      <span>{srv.deliverables.length} Deliverables verified</span>
                      {srv.imageUrl && <span className="text-emerald-600 font-bold">● Custom Image</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PORTFOLIO & COMMERCIAL IMPACT */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Portfolio & Commercial Impact Metrics
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add new projects, edit demonstrated SEO impact metrics, view live case studies, or delete items.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingProject(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 hover:opacity-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {portfolio.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {proj.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openPortfolioModal(proj.id)}
                            className="px-2 py-1 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                            title="View Live Case Study Modal"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span>View</span>
                          </button>

                          <button
                            onClick={() => setEditingProject(proj)}
                            className="px-2 py-1 rounded-lg text-slate-500 hover:text-[#0056b3] hover:bg-blue-50 transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => {
                              deleteProject(proj.id);
                              showNotification(`Project "${proj.title}" deleted.`);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        {proj.image && (
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                          />
                        )}
                        <div className="space-y-1 min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{proj.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2">{proj.summary}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 bg-slate-50 rounded-xl text-[11px] font-medium text-slate-700 border border-slate-100">
                      ⚡ Impact: <span className="font-bold text-[#ff5722]">{proj.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CLIENT FEEDBACKS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Verified Commercial Feedbacks
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add, edit, or delete customer testimonials displayed in the live testimonial slider.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingTestimonial(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 hover:opacity-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Review</span>
                </button>
              </div>

              {/* Feedbacks Grid */}
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex text-amber-400">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-900">{t.author}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">{t.role}, {t.org}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingTestimonial(t)}
                          className="px-2 py-1 rounded-lg text-slate-500 hover:text-[#0056b3] hover:bg-blue-50 transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                          title="Edit Review"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            deleteTestimonial(t.id);
                            showNotification(`Review from ${t.author} deleted.`);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 italic">"{t.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: ABOUT US CONTENT */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    About Us & Agency Mission Customization
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update your enterprise mission, vision, and core capabilities displayed in the About Us popup and page.
                  </p>
                </div>

                <button
                  onClick={() => openAboutModal()}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  title="View Live About Us Modal"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>View Live About Modal</span>
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSettings(aboutForm);
                  showNotification('About Us content updated successfully!');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Agency Mission Statement *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={aboutForm.aboutMission}
                    onChange={(e) => setAboutForm({ ...aboutForm, aboutMission: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Agency Vision Statement *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={aboutForm.aboutVision}
                    onChange={(e) => setAboutForm({ ...aboutForm, aboutVision: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save About Us Details</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: ADMIN SECURITY & CREDENTIALS */}
          {activeTab === 'admin_profile' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Admin Credentials & Security Profile
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update admin display name, sign-in email address, and administrative password.
                </p>
              </div>

              {profileError && (
                <div className="p-3 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setProfileError(null);

                  if (profileForm.newPassword) {
                    if (profileForm.newPassword !== profileForm.confirmPassword) {
                      setProfileError('New password and confirm password do not match.');
                      return;
                    }
                    if (profileForm.newPassword.length < 4) {
                      setProfileError('Password must be at least 4 characters.');
                      return;
                    }
                  }

                  updateAdminProfile(profileForm.name, profileForm.email, profileForm.newPassword || undefined);
                  setProfileForm((prev) => ({ ...prev, newPassword: '', confirmPassword: '' }));
                  showNotification('Admin credentials updated! Your new login details are active.');
                }}
                className="space-y-4 max-w-lg"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admin Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admin Login Email / ID *
                  </label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900 mb-2">Change Password (Optional)</div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={profileForm.newPassword}
                        onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                        placeholder="Leave blank to keep existing password"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={profileForm.confirmPassword}
                        onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                        placeholder="Re-type new password"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Admin Profile</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE POPUP MODALS FOR VIEWING / EDITING / ADDING */}
      {/* ========================================================================= */}

      {/* 1. VIEW INQUIRY DETAILS MODAL */}
      {viewingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0056b3] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  {viewingInquiry.service}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(viewingInquiry.timestamp || Date.now()).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setViewingInquiry(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400 font-mono">Client Name</div>
                <div className="text-lg font-black text-slate-900">{viewingInquiry.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Phone / WhatsApp</div>
                  <div className="font-bold text-slate-900 mt-0.5">{viewingInquiry.phone}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Email Address</div>
                  <div className="font-bold text-slate-900 mt-0.5 truncate">{viewingInquiry.email}</div>
                </div>
              </div>

              {viewingInquiry.budget && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-800">Budget Range: </span>
                  <span className="font-mono text-emerald-900 font-bold">{viewingInquiry.budget}</span>
                </div>
              )}

              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400 font-mono mb-1">Client Scope & Message</div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans">
                  "{viewingInquiry.message || 'No additional message provided.'}"
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400 font-mono mb-1">Status</div>
                <select
                  value={viewingInquiry.status || 'new'}
                  onChange={(e) => {
                    const nextSt = e.target.value as any;
                    updateInquiryStatus(viewingInquiry.id, nextSt);
                    setViewingInquiry({ ...viewingInquiry, status: nextSt });
                    showNotification(`Inquiry status updated to ${nextSt}.`);
                  }}
                  className="w-full text-xs font-bold rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none"
                >
                  <option value="new">🟡 New Request</option>
                  <option value="contacted">🔵 Contacted Client</option>
                  <option value="quoted">🟣 Quotation Sent</option>
                  <option value="closed">🟢 Project Closed / Won</option>
                </select>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                {viewingInquiry.phone && viewingInquiry.phone !== 'N/A' && (
                  <a
                    href={`https://wa.me/${viewingInquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                      viewingInquiry.name
                    )}%2C%20thank%20you%20for%20contacting%20${encodeURIComponent(settings.businessName)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                )}

                <button
                  onClick={() => {
                    deleteInquiry(viewingInquiry.id);
                    setViewingInquiry(null);
                    showNotification('Inquiry deleted.');
                  }}
                  className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors cursor-pointer"
                >
                  Delete Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ADD NEW SERVICE MODAL */}
      {isAddingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Add New Commercial Service</h3>
              <button onClick={() => setIsAddingService(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formEl = e.currentTarget;
                const title = (formEl.elements.namedItem('title') as HTMLInputElement).value;
                const category = (formEl.elements.namedItem('category') as HTMLSelectElement).value;
                const shortDesc = (formEl.elements.namedItem('shortDesc') as HTMLTextAreaElement).value;
                const overview = (formEl.elements.namedItem('overview') as HTMLTextAreaElement).value;
                const deliverablesRaw = (formEl.elements.namedItem('deliverables') as HTMLInputElement).value;

                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

                const newSrv: ServiceDetail = {
                  id: slug,
                  slug,
                  title,
                  categoryLabel: category === 'web-development' ? 'Web & Tech' : category === 'digital-marketing' ? 'Digital Marketing' : 'Branding & Design',
                  category: category as any,
                  shortDesc,
                  overview,
                  imageUrl: newServiceImage.trim() || undefined,
                  deliverables: deliverablesRaw.split(',').map((d) => d.trim()).filter(Boolean),
                  processSteps: [
                    { step: '01', title: 'Consultation & Discovery', desc: 'Requirements analysis and roadmap planning.' },
                    { step: '02', title: 'Creative Engineering', desc: 'Design systems and clean production.' }
                  ],
                  faqs: [
                    { q: `What is included in ${title}?`, a: 'Full deliverables transfer, dedicated WhatsApp support, and quality assurance.' }
                  ]
                };

                addService(newSrv);
                setIsAddingService(false);
                setNewServiceImage('');
                showNotification(`Service "${title}" added successfully!`);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Service Title *</label>
                  <input name="title" required placeholder="e.g. Next.js SaaS Web Applications" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Category *</label>
                  <select name="category" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300">
                    <option value="web-development">Web & Engineering</option>
                    <option value="digital-marketing">Digital Marketing & Ads</option>
                    <option value="graphic-design">Branding & Stationery</option>
                  </select>
                </div>
              </div>

              {/* Service Feature Image Uploader with PC File Picker & Desktop Paste */}
              <ImageUploadField
                label="Service Cover / Feature Image (Upload from PC or Paste from Desktop)"
                value={newServiceImage}
                onChange={setNewServiceImage}
                recommendedSize="1200 × 800px (16:9)"
                aspectRatioClass="aspect-[16/9]"
                helperText="Upload image from computer, drag & drop, or press Ctrl+V to paste screenshot from clipboard. Displays in service cards and detailed service modal."
                presetSamples={[
                  { name: 'Web Engineering', url: '/src/assets/images/portfolio_web_design_1792393542453.jpg' },
                  { name: 'Digital Growth', url: '/src/assets/images/portfolio_digital_campaign_1792393543250.jpg' },
                  { name: 'Brand & Stationery', url: '/src/assets/images/portfolio_branding_identity_1792393543752.jpg' }
                ]}
              />

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Short Description *</label>
                <textarea name="shortDesc" rows={2} required placeholder="Brief summary displayed on cards..." className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 resize-none" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Detailed Overview *</label>
                <textarea name="overview" rows={3} required placeholder="Detailed methodology and approach..." className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 resize-none" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Deliverables (comma separated) *</label>
                <input name="deliverables" required placeholder="Custom UI/UX, Speed Audit, Technical SEO, Full Ownership" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddingService(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] rounded-xl shadow-md cursor-pointer">
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#0056b3] uppercase tracking-wider">Editing Service</span>
                <h3 className="text-base font-black text-slate-900">{editingService.title}</h3>
              </div>
              <button onClick={() => setEditingService(null)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateService(editingService.id, editingService);
                setEditingService(null);
                showNotification(`Service "${editingService.title}" updated successfully!`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900"
                />
              </div>

              {/* Service Feature Image Uploader with PC File Picker & Desktop Paste */}
              <ImageUploadField
                label="Service Cover / Feature Image (Upload from PC or Paste from Desktop)"
                value={editingService.imageUrl || ''}
                onChange={(url) => setEditingService({ ...editingService, imageUrl: url })}
                recommendedSize="1200 × 800px (16:9)"
                aspectRatioClass="aspect-[16/9]"
                helperText="Upload image from computer, drag & drop, or press Ctrl+V to paste screenshot from clipboard. Displays in service cards and detailed service modal."
                presetSamples={[
                  { name: 'Web Engineering', url: '/src/assets/images/portfolio_web_design_1792393542453.jpg' },
                  { name: 'Digital Growth', url: '/src/assets/images/portfolio_digital_campaign_1792393543250.jpg' },
                  { name: 'Brand & Stationery', url: '/src/assets/images/portfolio_branding_identity_1792393543752.jpg' }
                ]}
              />

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingService.shortDesc}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Overview Description</label>
                <textarea
                  rows={3}
                  value={editingService.overview}
                  onChange={(e) => setEditingService({ ...editingService, overview: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Deliverables (comma separated)</label>
                <input
                  type="text"
                  value={editingService.deliverables.join(', ')}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      deliverables: e.target.value.split(',').map((d) => d.trim()).filter(Boolean)
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setEditingService(null)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md cursor-pointer">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. ADD NEW PROJECT MODAL */}
      {isAddingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Add New Case Study Project</h3>
              <button onClick={() => setIsAddingProject(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formEl = e.currentTarget;
                const title = (formEl.elements.namedItem('p_title') as HTMLInputElement).value;
                const client = (formEl.elements.namedItem('p_client') as HTMLInputElement).value;
                const category = (formEl.elements.namedItem('p_category') as HTMLSelectElement).value;
                const impact = (formEl.elements.namedItem('p_impact') as HTMLInputElement).value;
                const summary = (formEl.elements.namedItem('p_summary') as HTMLTextAreaElement).value;
                const image = (formEl.elements.namedItem('p_image') as HTMLInputElement).value;

                const newProj: PortfolioProject = {
                  id: `proj-${Date.now()}`,
                  title,
                  client,
                  category,
                  image: newProjectImage.trim() || '/src/assets/images/portfolio_web_design_1792393542453.jpg',
                  impact,
                  summary,
                  year: '2026',
                  tags: ['Commercial Showcase'],
                  deliverables: ['Custom Implementation', 'Technical Verification']
                };

                addProject(newProj);
                setIsAddingProject(false);
                setNewProjectImage('/src/assets/images/portfolio_web_design_1792393542453.jpg');
                showNotification(`Project "${title}" added!`);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Project Title *</label>
                  <input name="p_title" required className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Client / Org *</label>
                  <input name="p_client" required className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Category *</label>
                <select name="p_category" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300">
                  <option value="Web Development">Web Development</option>
                  <option value="Branding & Design">Branding & Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Stationery">Stationery & Print</option>
                </select>
              </div>

              {/* Project Showcase Image Uploader with PC File Picker & Desktop Paste */}
              <ImageUploadField
                label="Project Showcase Image (Upload from PC or Paste from Desktop)"
                value={newProjectImage}
                onChange={setNewProjectImage}
                recommendedSize="1200 × 800px (4:3 or 16:9)"
                aspectRatioClass="aspect-[4/3]"
                helperText="Upload case study screenshot from your PC / computer or press Ctrl+V to paste directly from your clipboard."
                presetSamples={[
                  { name: 'Web Showcase', url: '/src/assets/images/portfolio_web_design_1792393542453.jpg' },
                  { name: 'Campaign Showcase', url: '/src/assets/images/portfolio_digital_campaign_1792393543250.jpg' },
                  { name: 'Branding Showcase', url: '/src/assets/images/portfolio_branding_identity_1792393543752.jpg' }
                ]}
              />

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Impact Metric *</label>
                <input name="p_impact" required placeholder="+240% Organic Traffic · Page 1 Google Rank" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Summary *</label>
                <textarea name="p_summary" rows={2} required className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 resize-none" />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddingProject(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] rounded-xl shadow-md cursor-pointer">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Edit Project: {editingProject.title}</h3>
              <button onClick={() => setEditingProject(null)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProject(editingProject.id, editingProject);
                setEditingProject(null);
                showNotification(`Project "${editingProject.title}" updated.`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Title</label>
                <input
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Client</label>
                <input
                  value={editingProject.client}
                  onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300"
                />
              </div>

              {/* Project Showcase Image Uploader with PC File Picker & Desktop Paste */}
              <ImageUploadField
                label="Project Showcase Image (Upload from PC or Paste from Desktop)"
                value={editingProject.image || ''}
                onChange={(url) => setEditingProject({ ...editingProject, image: url })}
                recommendedSize="1200 × 800px (4:3 or 16:9)"
                aspectRatioClass="aspect-[4/3]"
                helperText="Upload case study screenshot from your PC / computer or press Ctrl+V to paste directly from your clipboard."
                presetSamples={[
                  { name: 'Web Showcase', url: '/src/assets/images/portfolio_web_design_1792393542453.jpg' },
                  { name: 'Campaign Showcase', url: '/src/assets/images/portfolio_digital_campaign_1792393543250.jpg' },
                  { name: 'Branding Showcase', url: '/src/assets/images/portfolio_branding_identity_1792393543752.jpg' }
                ]}
              />

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Impact Metric</label>
                <input
                  value={editingProject.impact}
                  onChange={(e) => setEditingProject({ ...editingProject, impact: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Summary</label>
                <textarea
                  rows={2}
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md cursor-pointer">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. ADD TESTIMONIAL MODAL */}
      {isAddingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Add Client Review</h3>
              <button onClick={() => setIsAddingTestimonial(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formEl = e.currentTarget;
                const author = (formEl.elements.namedItem('t_author') as HTMLInputElement).value;
                const role = (formEl.elements.namedItem('t_role') as HTMLInputElement).value;
                const org = (formEl.elements.namedItem('t_org') as HTMLInputElement).value;
                const quote = (formEl.elements.namedItem('t_quote') as HTMLTextAreaElement).value;

                addTestimonial({
                  id: `t-${Date.now()}`,
                  author,
                  role,
                  org,
                  quote,
                  rating: 5
                });
                setIsAddingTestimonial(false);
                showNotification(`Review from ${author} added!`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Author Name *</label>
                <input name="t_author" required className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Role *</label>
                  <input name="t_role" required placeholder="e.g. Managing Director" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Organization *</label>
                  <input name="t_org" required placeholder="e.g. Acme Corp" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Feedback Quote *</label>
                <textarea name="t_quote" rows={3} required className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 resize-none" />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddingTestimonial(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] rounded-xl shadow-md cursor-pointer">
                  Add Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. EDIT TESTIMONIAL MODAL */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Edit Review from {editingTestimonial.author}</h3>
              <button onClick={() => setEditingTestimonial(null)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateTestimonial(editingTestimonial.id, editingTestimonial);
                setEditingTestimonial(null);
                showNotification(`Review updated successfully!`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Author</label>
                <input
                  value={editingTestimonial.author}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Role</label>
                  <input
                    value={editingTestimonial.role}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Org</label>
                  <input
                    value={editingTestimonial.org}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, org: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Feedback Quote</label>
                <textarea
                  rows={3}
                  value={editingTestimonial.quote}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setEditingTestimonial(null)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md cursor-pointer">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. ADMIN PROFILE & SECURITY SETTINGS MODAL */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-[#0056b3]">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Admin Profile & Security</h3>
                  <p className="text-[11px] text-slate-500">Update Administrator Name, Email & Password</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsProfileModalOpen(false);
                  setProfileError(null);
                }}
                className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {profileError && (
              <div className="p-3 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{profileError}</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setProfileError(null);

                if (profileForm.newPassword) {
                  if (profileForm.newPassword !== profileForm.confirmPassword) {
                    setProfileError('New password and confirm password do not match.');
                    return;
                  }
                  if (profileForm.newPassword.length < 4) {
                    setProfileError('Password must be at least 4 characters.');
                    return;
                  }
                }

                updateAdminProfile(profileForm.name, profileForm.email, profileForm.newPassword || undefined);
                setProfileForm((prev) => ({ ...prev, newPassword: '', confirmPassword: '' }));
                setIsProfileModalOpen(false);
                showNotification('Admin Profile updated successfully! Your new credentials are active.');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Admin Full Name *</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Admin Email Address *</label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Change Password (Leave blank to keep current)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={profileForm.newPassword}
                      onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                      placeholder="Min 4 characters"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      value={profileForm.confirmPassword}
                      onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                      placeholder="Repeat new password"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setProfileError(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl cursor-pointer hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
