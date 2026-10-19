import { useState } from 'react';
import { useBusiness, DEFAULT_BUSINESS_SETTINGS } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { HappiizLogo } from '../components/HappiizLogo';
import {
  Save,
  RotateCcw,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  Palette,
  Phone,
  Mail,
  MapPin,
  Globe,
  Sliders,
  Sparkles
} from 'lucide-react';

export function AdminSettingsPage() {
  const { settings, updateSettings, resetSettings } = useBusiness();
  const { navigate } = useNavigation();

  const [form, setForm] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setForm((prev) => ({ ...prev, logoUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all business branding and contact settings to default?')) {
      resetSettings();
      setForm(DEFAULT_BUSINESS_SETTINGS);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const applyPalette = (primary: string, secondary: string) => {
    setForm((prev) => ({
      ...prev,
      primaryColor: primary,
      secondaryColor: secondary
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      {/* Page Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
          <Sliders className="w-4 h-4" />
          <span>Centralized Control Panel</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Website & Brand Settings
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Update your business identity, primary & secondary brand colors, contact telephone, WhatsApp number, and address in real-time. Changes immediately propagate across the Navbar, Footer, Modals, Forms, and Page Titles.
        </p>
      </div>

      {/* Success Notification Bar */}
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Brand settings successfully saved and applied site-wide!</span>
          </div>
          <button
            onClick={() => navigate('home')}
            className="text-xs text-emerald-900 underline font-bold"
          >
            View Live Site
          </button>
        </div>
      )}

      {/* Main Settings Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
          {/* Section 1: Core Brand Identity */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-4 h-4 text-blue-700" />
              1. Brand Identity & Name
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business / Website Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                This updates Navbar title, copyright, quote modals, and contact headings instantly.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Brand Tagline
              </label>
              <textarea
                rows={2}
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              />
            </div>

            {/* Logo Upload Option */}
            <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Company Logo</span>
                {form.logoUrl && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, logoUrl: '' })}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove Logo (Use Text Logo)
                  </button>
                )}
              </div>

              {form.logoUrl ? (
                <div className="flex items-center gap-4">
                  <img
                    src={form.logoUrl}
                    alt="Logo Preview"
                    className="h-12 w-auto max-w-[140px] object-contain border border-slate-200 rounded p-1 bg-white"
                  />
                  <div className="text-xs text-emerald-700 font-medium">
                    Custom logo active
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    {form.businessName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="text-xs text-slate-500">
                    Currently displaying dynamic typographic mark: <strong className="text-slate-800">{form.businessName}</strong>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <label className="cursor-pointer px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Logo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-[11px] text-slate-400">PNG, SVG or JPG supported</span>
              </div>
            </div>
          </div>

          {/* Section 2: Colors & Theme */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <Palette className="w-4 h-4 text-orange-600" />
              2. Brand Palette & Colors
            </h2>

            {/* Quick Palettes */}
            <div>
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Curated Preset Palettes
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Happiiz Official (Blue & Orange)', p: '#0056b3', s: '#ff5722' },
                  { name: 'Electric Sky & Amber', p: '#0284c7', s: '#f59e0b' },
                  { name: 'Emerald Growth & Royal', p: '#16a34a', s: '#0056b3' },
                  { name: 'Midnight Obsidian Luxury', p: '#0f172a', s: '#ff5722' }
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => applyPalette(item.p, item.s)}
                    className="p-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 text-left text-xs transition-all flex items-center gap-2"
                  >
                    <div className="flex -space-x-1">
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.p }} />
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.s }} />
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Brand Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="w-10 h-10 rounded border border-slate-300 p-0.5 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secondary Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.secondaryColor}
                    onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                    className="w-10 h-10 rounded border border-slate-300 p-0.5 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={form.secondaryColor}
                    onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Channels */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              3. Contact, WhatsApp & Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={form.contactNumber}
                  onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp Number (with country code)
                </label>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  placeholder="+919876543210"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <span className="text-[11px] text-slate-400">Powering the bottom-right floating WhatsApp button.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Business Email
                </label>
                <input
                  type="email"
                  value={form.businessEmail}
                  onChange={(e) => setForm({ ...form, businessEmail: e.target.value })}
                  placeholder="info@happiiz.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Physical Office Address
                </label>
                <input
                  type="text"
                  value={form.businessAddress}
                  onChange={(e) => setForm({ ...form, businessAddress: e.target.value })}
                  placeholder="Level 4, Horizon Tech Park, Sector 62, Noida, NCR, India"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Social Media URLs */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <Globe className="w-4 h-4 text-purple-700" />
              4. Social Media URLs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  value={form.socialUrls.linkedin}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      socialUrls: { ...form.socialUrls, linkedin: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={form.socialUrls.instagram}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      socialUrls: { ...form.socialUrls, instagram: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Facebook URL</label>
                <input
                  type="url"
                  value={form.socialUrls.facebook}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      socialUrls: { ...form.socialUrls, facebook: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Twitter / X URL</label>
                <input
                  type="url"
                  value={form.socialUrls.twitter}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      socialUrls: { ...form.socialUrls, twitter: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Publish Changes</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Preview Card */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Live Theme & Wordmark Preview
            </h2>

            {/* Navbar Preview */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Navbar Brand Lockup
              </span>
              <div className="flex items-center gap-2">
                {form.logoUrl ? (
                  <img
                    src={form.logoUrl}
                    alt="Logo"
                    className="h-8 w-auto object-contain rounded"
                  />
                ) : (
                  <HappiizLogo variant="navbar" />
                )}
              </div>
            </div>

            {/* Primary Action Button Preview */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Primary Button Style
              </span>
              <button
                type="button"
                className="w-full py-2 text-xs font-semibold text-white rounded-lg shadow-xs"
                style={{ backgroundColor: form.primaryColor }}
              >
                Get a Free Quote
              </button>
            </div>

            {/* Secondary Badge Style */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                Secondary Accent Color
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-1 rounded text-xs font-semibold text-white"
                  style={{ backgroundColor: form.secondaryColor }}
                >
                  Featured Milestone
                </span>
              </div>
            </div>

            {/* Contact Details Preview */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs text-[11px] text-slate-600 space-y-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                Active Contact Channels
              </span>
              <div>Phone: <strong className="text-slate-800">{form.contactNumber}</strong></div>
              <div>WhatsApp: <strong className="text-slate-800">{form.whatsappNumber}</strong></div>
              <div className="truncate">Email: <strong className="text-slate-800">{form.businessEmail}</strong></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
