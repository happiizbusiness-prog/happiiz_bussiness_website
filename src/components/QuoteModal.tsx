import React, { useEffect, useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import {
  X,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Loader2
} from 'lucide-react';

export function QuoteModal() {
  const { settings, addInquiry } = useBusiness();
  const { isQuoteModalOpen, closeQuoteModal, quoteDefaultService } = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: quoteDefaultService || 'Website Design & Development',
    budget: '₹30k - ₹75k',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [inquiryId, setInquiryId] = useState<string>('');

  // Update default service when opened with a specific one
  useEffect(() => {
    if (quoteDefaultService) {
      setFormData((prev) => ({ ...prev, service: quoteDefaultService }));
    }
  }, [quoteDefaultService]);

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isQuoteModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuoteModal();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isQuoteModalOpen, closeQuoteModal]);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 850));

    const generatedId = `HPZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryId(generatedId);

    addInquiry({
      id: generatedId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      budget: formData.budget,
      message: formData.message,
      timestamp: new Date().toISOString(),
      status: 'new',
      notes: ''
    });

    setStatus('success');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Website Design & Development',
      budget: '₹30k - ₹75k',
      message: ''
    });
    setStatus('idle');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeQuoteModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-orange-50/50 sticky top-0 z-20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#0056b3]">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>Free Consultation & Estimate</span>
            </div>
            <h2 id="quote-modal-title" className="text-base sm:text-lg font-black text-slate-900 leading-snug mt-1">
              Request a Free Project Consultation & Itemized Quote
            </h2>
          </div>
          <button
            onClick={closeQuoteModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4">
          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Inquiry Received Successfully!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our digital strategy team at{' '}
                <strong className="text-slate-900">{settings.businessName}</strong> has logged your project details under Reference ID:{' '}
                <span className="font-mono font-bold text-[#0056b3]">{inquiryId}</span>.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 max-w-md mx-auto text-left space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  What happens next?
                </div>
                <div>1. Our lead architect will review your project scope within 4 business hours.</div>
                <div>2. You will receive an itemized proposal with clear milestone pricing and delivery schedule.</div>
                <div>3. A private WhatsApp channel can be created for real-time collaboration.</div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={closeQuoteModal}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0056b3] to-[#ff5722] hover:opacity-95 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Back to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>⚡ Guaranteed 4-Hour Response Time</span>
                <span className="font-bold text-[#0056b3]">Direct WhatsApp: {settings.whatsappNumber}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Name <span className="text-[#ff5722]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-500/10 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Email Address <span className="text-[#ff5722]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-500/10 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-[#ff5722]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-500/10 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Interested Service <span className="text-[#ff5722]">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0056b3] transition-colors"
                  >
                    <option value="Website Design & Development">Website Design & Development</option>
                    <option value="E-commerce Website">E-commerce Website</option>
                    <option value="Digital Marketing & Ads">Digital Marketing & Ads</option>
                    <option value="SEO Services">Search Engine Optimization (SEO)</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Lead Generation System">B2B & Local Lead Generation</option>
                    <option value="Branding & Logo Design">Branding & Logo Design</option>
                    <option value="Visiting Card & Stationery">Visiting Card & Stationery</option>
                    <option value="Letterhead & Envelope Design">Letterhead & Envelope Design</option>
                    <option value="Custom Web Application">Custom Web Application</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Estimated Budget Range
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['₹15k - ₹30k', '₹30k - ₹75k', '₹75k - ₹2L+'].map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setFormData({ ...formData, budget: tier })}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        formData.budget === tier
                          ? 'border-[#0056b3] bg-gradient-to-r from-[#0056b3] to-[#ff5722] text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Project Details & Goals <span className="text-[#ff5722]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your business, what you need (e.g. 5-page business site, rebrand, or lead generation campaign), and your preferred launch timeline..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0056b3] focus:ring-2 focus:ring-blue-500/10 transition-colors resize-none"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 text-xs font-bold text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #0056b3 0%, #ff5722 100%)',
                    boxShadow: '0 8px 20px -4px rgba(255, 87, 34, 0.4)'
                  }}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Proposal Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span>Submit Project Inquiry</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-500 text-center">
                We respect your confidentiality. NDA available upon request. No spam guarantee.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
