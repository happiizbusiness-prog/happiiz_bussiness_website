import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { HappiizLogo } from '../components/HappiizLogo';
import { ServiceDetail, PortfolioProject, TestimonialItem } from '../types';
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
  AlertCircle
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
    updateInquiryStatus,
    deleteInquiry,
    adminUser,
    loginAdmin,
    logoutAdmin,
    updateAdminProfile
  } = useBusiness();

  const { navigate } = useNavigation();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Tab in Dashboard
  const [activeTab, setActiveTab] = useState<
    'inquiries' | 'branding' | 'contact' | 'social' | 'services' | 'portfolio' | 'testimonials' | 'about' | 'admin_profile'
  >('inquiries');

  // Success alert
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
    }
  };

  const handleQuickDemoLogin = () => {
    setLoginEmail('admin@happiiz.com');
    setLoginPassword('admin123');
    loginAdmin('admin@happiiz.com', 'admin123');
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

  // Inquiries filter & search
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'contacted' | 'quoted' | 'closed'>('all');
  const [inquirySearch, setInquirySearch] = useState('');

  // Editing state for Service
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  // Editing state for Project
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Editing state for Testimonial
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  // Handle Logo Upload file
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBrandForm((prev) => ({ ...prev, logoUrl: reader.result as string }));
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0056b3] to-[#ff5722] text-white font-black text-lg flex items-center justify-center shadow-md">
            {adminUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {adminUser.name} · Central Admin Portal
              </h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Online" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{adminUser.email}</span>
              <span>·</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono text-[10px] font-bold">
                ROOT PRIVILEGES
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('home')}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to log out from the Admin Portal?')) {
                logoutAdmin();
              }
            }}
            className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Global Success Notification */}
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

                <button
                  onClick={refreshInquiries}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
                >
                  🔄 Refresh List
                </button>
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
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-700">No quotation requests found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    When visitors submit quote requests on the live site, their complete details and WhatsApp contact will appear here instantly.
                  </p>
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
                          <div className="flex items-center gap-2">
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
                              className="text-[11px] font-bold rounded-lg border border-slate-200 bg-white px-2 py-1 text-slate-700 focus:outline-none"
                            >
                              <option value="new">🟡 New</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="quoted">🟣 Quoted</option>
                              <option value="closed">🟢 Closed</option>
                            </select>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete inquiry from ${inq.name}?`)) {
                                  deleteInquiry(inq.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
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

                        {/* Direct Communication Buttons */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
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
                              <span>WhatsApp: {inq.phone}</span>
                            </a>
                          )}

                          {inq.phone && (
                            <a
                              href={`tel:${inq.phone}`}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-500" />
                              <span>Call</span>
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
                            onClick={() => setBrandForm({ ...brandForm, logoUrl: '' })}
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
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ff5722]" />
                    <span>Homepage Front-End Hero Banner & Headline</span>
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
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Front-End Hero Image URL
                    </label>
                    <input
                      type="text"
                      value={brandForm.heroImageUrl}
                      onChange={(e) => setBrandForm({ ...brandForm, heroImageUrl: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                    />
                    {brandForm.heroImageUrl && (
                      <div className="mt-2 relative aspect-[21/9] w-full max-w-sm rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shadow-xs">
                        <img
                          src={brandForm.heroImageUrl}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
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

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Floating WhatsApp & Chat Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={contactForm.whatsappNumber}
                        onChange={(e) => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                        placeholder="+919876543210"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                      />
                      <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Controls the floating bottom-right WhatsApp button & direct inquiry chats.</p>
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
                  <span>Save Contact Details</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: SOCIAL MEDIA CHANNELS */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Official Social Media Channels
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update, add, or remove your brand links for LinkedIn, Instagram, Facebook, X (Twitter), and WhatsApp.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSettings({ socialUrls: socialForm });
                  showNotification('Social media channels updated successfully!');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Page URL</label>
                  <input
                    type="url"
                    value={socialForm.linkedin}
                    onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Profile URL</label>
                  <input
                    type="url"
                    value={socialForm.instagram}
                    onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Facebook Page URL</label>
                  <input
                    type="url"
                    value={socialForm.facebook}
                    onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">X / Twitter Handle URL</label>
                  <input
                    type="url"
                    value={socialForm.twitter}
                    onChange={(e) => setSocialForm({ ...socialForm, twitter: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Direct WhatsApp Link</label>
                  <input
                    type="url"
                    value={socialForm.whatsapp}
                    onChange={(e) => setSocialForm({ ...socialForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Social Links</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: SERVICES & PRINTING DETAILS */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Services & Deliverables Management
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add new commercial services, edit deliverables, or remove services from the catalog.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingService(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Add New Service Modal / Form */}
              {isAddingService && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Add New Commercial Service</h3>
                    <button
                      onClick={() => setIsAddingService(false)}
                      className="text-xs text-slate-400 hover:text-slate-700"
                    >
                      Cancel
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
                      showNotification(`Service "${title}" added successfully!`);
                    }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Service Title *</label>
                        <input
                          name="title"
                          required
                          placeholder="e.g. Mobile Application Engineering"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Category *</label>
                        <select
                          name="category"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none"
                        >
                          <option value="web-development">Web & Tech</option>
                          <option value="digital-marketing">Digital Marketing & SEO</option>
                          <option value="graphic-design">Branding, Stationery & Printing</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Short Summary (Marquee / Card)</label>
                      <textarea
                        name="shortDesc"
                        rows={2}
                        required
                        placeholder="Brief 1-2 sentence overview shown in grid cards..."
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Package Overview (Modal Details)</label>
                      <textarea
                        name="overview"
                        rows={2}
                        required
                        placeholder="Detailed commercial scope and benefits..."
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Deliverables (comma separated)</label>
                      <input
                        name="deliverables"
                        placeholder="e.g. Cross-Platform App, Push Notifications, Cloud API, 90-Day SLA"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-white bg-[#0056b3] hover:bg-[#004ea8] rounded-xl cursor-pointer"
                    >
                      Save Service
                    </button>
                  </form>
                </div>
              )}

              {/* Editing Service Form */}
              {editingService && (
                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      Edit Service: <span className="text-[#0056b3]">{editingService.title}</span>
                    </h3>
                    <button
                      onClick={() => setEditingService(null)}
                      className="text-xs text-slate-400 hover:text-slate-700"
                    >
                      Close
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateService(editingService.id, editingService);
                      setEditingService(null);
                      showNotification(`Service updated successfully!`);
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Short Description</label>
                      <textarea
                        rows={2}
                        value={editingService.shortDesc}
                        onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none resize-none"
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
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl cursor-pointer"
                    >
                      Apply Changes Site-Wide
                    </button>
                  </form>
                </div>
              )}

              {/* List of Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#0056b3] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {srv.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingService(srv)}
                            className="p-1 rounded-lg text-slate-400 hover:text-[#0056b3] hover:bg-blue-50 transition-colors"
                            title="Edit Service"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete service "${srv.title}"?`)) {
                                deleteService(srv.id);
                                showNotification(`Service "${srv.title}" deleted.`);
                              }
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">{srv.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {srv.shortDesc}
                      </p>
                    </div>

                    <div className="text-[10px] text-slate-400 font-mono">
                      {srv.deliverables.length} Deliverables verified
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
                    Edit existing showcase samples, demonstrated SEO impact metrics, or add new projects.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingProject(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Add Project Form */}
              {isAddingProject && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Add New Portfolio Case Study</h3>
                    <button onClick={() => setIsAddingProject(false)} className="text-xs text-slate-400">Cancel</button>
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

                      const id = `proj-${Date.now()}`;
                      const newProj: PortfolioProject = {
                        id,
                        title,
                        client,
                        category,
                        image: image || '/src/assets/images/portfolio_web_design_1792393542453.jpg',
                        impact,
                        summary,
                        year: '2026',
                        tags: ['Commercial Showcase'],
                        deliverables: ['Custom Implementation', 'Technical Verification']
                      };

                      addProject(newProj);
                      setIsAddingProject(false);
                      showNotification(`Project "${title}" added!`);
                    }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Project Title *</label>
                        <input name="p_title" required className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Client / Org *</label>
                        <input name="p_client" required className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Category *</label>
                        <select name="p_category" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300">
                          <option value="Web Development">Web Development</option>
                          <option value="Branding & Design">Branding & Design</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Demonstrated Commercial Impact (SEO / Growth Metric) *</label>
                      <input
                        name="p_impact"
                        required
                        placeholder="e.g. +240% Organic Traffic Growth · Page 1 Google Rank · ₹2.4Cr Pipeline"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Project Summary</label>
                      <textarea name="p_summary" rows={2} required className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 resize-none" />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Image URL</label>
                      <input name="p_image" placeholder="/src/assets/images/portfolio_web_design_1792393542453.jpg" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                    </div>

                    <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-[#0056b3] rounded-xl cursor-pointer">
                      Save Project
                    </button>
                  </form>
                </div>
              )}

              {/* Editing Project Form */}
              {editingProject && (
                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Edit Project: {editingProject.title}</h3>
                    <button onClick={() => setEditingProject(null)} className="text-xs text-slate-400">Close</button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateProject(editingProject.id, editingProject);
                      setEditingProject(null);
                      showNotification('Project updated site-wide!');
                    }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    </div>

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
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 resize-none"
                      />
                    </div>

                    <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl cursor-pointer">
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {portfolio.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#0056b3] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {proj.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="p-1 rounded-lg text-slate-400 hover:text-[#0056b3] hover:bg-blue-50"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                                showNotification(`Project deleted.`);
                              }
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{proj.summary}</p>
                    </div>

                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800 truncate">
                      ⚡ {proj.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CLIENT FEEDBACKS & TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Client Feedbacks & Reviews
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage testimonials shown in the homepage feedback marquee.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingTestimonial(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Feedback</span>
                </button>
              </div>

              {/* Add Feedback Form */}
              {isAddingTestimonial && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Add New Client Feedback</h3>
                    <button onClick={() => setIsAddingTestimonial(false)} className="text-xs text-slate-400">Cancel</button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formEl = e.currentTarget;
                      const author = (formEl.elements.namedItem('t_author') as HTMLInputElement).value;
                      const role = (formEl.elements.namedItem('t_role') as HTMLInputElement).value;
                      const org = (formEl.elements.namedItem('t_org') as HTMLInputElement).value;
                      const quote = (formEl.elements.namedItem('t_quote') as HTMLTextAreaElement).value;

                      const newItem: TestimonialItem = {
                        id: `t-${Date.now()}`,
                        author,
                        role,
                        org,
                        quote,
                        rating: 5
                      };

                      addTestimonial(newItem);
                      setIsAddingTestimonial(false);
                      showNotification(`Feedback from ${author} added!`);
                    }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Client Name *</label>
                        <input name="t_author" required className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Role / Designation *</label>
                        <input name="t_role" required placeholder="e.g. Founder & CEO" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Company / Organization *</label>
                        <input name="t_org" required placeholder="e.g. Apex Industrial" className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Feedback Quote *</label>
                      <textarea name="t_quote" rows={3} required className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 resize-none" />
                    </div>

                    <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-[#0056b3] rounded-xl cursor-pointer">
                      Save Feedback
                    </button>
                  </form>
                </div>
              )}

              {/* Editing Feedback Form */}
              {editingTestimonial && (
                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Edit Feedback from {editingTestimonial.author}</h3>
                    <button onClick={() => setEditingTestimonial(null)} className="text-xs text-slate-400">Close</button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateTestimonial(editingTestimonial.id, editingTestimonial);
                      setEditingTestimonial(null);
                      showNotification('Feedback updated site-wide!');
                    }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Author</label>
                        <input
                          value={editingTestimonial.author}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300"
                        />
                      </div>
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

                    <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl cursor-pointer">
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {/* Feedbacks Grid */}
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
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
                          className="p-1 rounded-lg text-slate-400 hover:text-[#0056b3]"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete review from ${t.author}?`)) {
                              deleteTestimonial(t.id);
                              showNotification(`Review deleted.`);
                            }
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-red-600"
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
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  About Us & Agency Mission Customization
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your enterprise mission, vision, and core capabilities displayed in the About Us popup and page.
                </p>
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

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (profileForm.newPassword) {
                    if (profileForm.newPassword !== profileForm.confirmPassword) {
                      alert('New password and confirm password do not match.');
                      return;
                    }
                    if (profileForm.newPassword.length < 4) {
                      alert('Password must be at least 4 characters.');
                      return;
                    }
                  }

                  updateAdminProfile(profileForm.name, profileForm.email, profileForm.newPassword || undefined);
                  setProfileForm((prev) => ({ ...prev, newPassword: '', confirmPassword: '' }));
                  showNotification('Admin credentials updated! Remember your new credentials for next login.');
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
    </div>
  );
}
