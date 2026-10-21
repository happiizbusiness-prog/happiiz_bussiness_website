import React, { useEffect, useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import {
  X,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Loader2
} from 'lucide-react';

export function ContactModal() {
  const { settings, addInquiry } = useBusiness();
  const { isContactModalOpen, closeContactModal, navigate } = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Design & Development',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isContactModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeContactModal();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContactModalOpen, closeContactModal]);

  if (!isContactModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide a valid work email.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setError('Please enter your active phone or WhatsApp number.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please enter a brief note about your requirements.');
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    addInquiry({
      id: `INQ-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service || 'Contact Inquiry',
      budget: 'Direct Consultation',
      message: formData.message,
      timestamp: new Date().toISOString(),
      status: 'new',
      notes: ''
    });
    setSubmitting(false);
    setSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Website Design & Development',
      message: ''
    });
    setSuccess(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeContactModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-orange-50/50 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#0056b3]">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Direct Communication Channel</span>
            </div>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => {
                closeContactModal();
                navigate('contact');
              }}
              className="text-xs text-slate-500 hover:text-[#0056b3] flex items-center gap-1 transition-colors cursor-pointer"
              title="Open standalone page"
            >
              Full Page <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={closeContactModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 id="contact-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Get in Touch with {settings.businessName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              We respond to all verified enterprise inquiries within 4 business hours. Connect via instant form or direct WhatsApp hotline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Contact Cards */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0056b3] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase font-mono">Direct Phone</div>
                    <a href={`tel:${settings.contactNumber}`} className="text-sm font-bold text-slate-900 hover:text-[#0056b3] transition-colors">
                      {settings.contactNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#ff5722] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase font-mono">Executive Email</div>
                    <a href={`mailto:${settings.businessEmail}`} className="text-xs font-bold text-slate-900 hover:text-[#0056b3] transition-colors break-all">
                      {settings.businessEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase font-mono">WhatsApp Hotline</div>
                    <div className="text-xs font-bold text-emerald-700">{settings.whatsappNumber}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase font-mono">Corporate Studio</div>
                    <div className="text-xs font-medium text-slate-700 leading-relaxed">{settings.businessAddress}</div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                  settings.businessName
                )}%2C%20I%20would%20like%20to%20discuss%20a%20new%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open Instant WhatsApp Chat</span>
              </a>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              {success ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Inquiry Sent Successfully!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our senior strategy consultant will reach out via email or phone within 4 business hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {error && (
                    <div className="p-2.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikas Malhotra"
                        className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-500/10 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-500/10 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikas@company.com"
                        className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-500/10 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Interested Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3] transition-colors"
                      >
                        <option value="Website Design & Development">Website Design & Development</option>
                        <option value="Digital Marketing & Ads">Digital Marketing & Ads</option>
                        <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                        <option value="Social Media Marketing">Social Media Marketing</option>
                        <option value="B2B Lead Generation">B2B Lead Generation</option>
                        <option value="Branding & Graphic Design">Branding & Graphic Design</option>
                        <option value="Logo Design Suite">Logo Design Suite</option>
                        <option value="Corporate Visiting Cards">Corporate Visiting Cards</option>
                        <option value="Executive Letterheads">Executive Letterheads</option>
                        <option value="Custom Envelopes">Custom Envelopes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Brief Project Overview *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you want to achieve, timeline, and current challenge..."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-500/10 transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 text-xs font-bold text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, #0056b3 0%, #ff5722 100%)',
                      boxShadow: '0 8px 20px -4px rgba(255, 87, 34, 0.4)'
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-white" />
                        <span>Send Message Directly</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
