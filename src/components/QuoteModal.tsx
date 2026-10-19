import { useState, useEffect } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { X, CheckCircle2, Loader2, Send, ShieldCheck } from 'lucide-react';

export function QuoteModal() {
  const { settings } = useBusiness();
  const { isQuoteModalOpen, closeQuoteModal, quoteDefaultService } = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: quoteDefaultService || 'Website Design & Development',
    budget: '₹25,000 - ₹50,000',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  // Sync default service when modal opens
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please enter a valid phone or WhatsApp number.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please provide a brief description of your project requirements.');
      return;
    }

    setStatus('submitting');

    // Architecture ready for Firebase Firestore insertion:
    // When real Firebase credentials are provided in phase 2, this dispatches to firestore.collection('inquiries').add(...)
    try {
      // Simulate real cloud asynchronous storage with local backup
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newId = `HPS-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryId(newId);

      const savedInquiries = JSON.parse(localStorage.getItem('happiiz_inquiries') || '[]');
      savedInquiries.push({
        id: newId,
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('happiiz_inquiries', JSON.stringify(savedInquiries));

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please reach out via WhatsApp or email directly.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Website Design & Development',
      budget: '₹25,000 - ₹50,000',
      message: ''
    });
    setStatus('idle');
    closeQuoteModal();
  };

  if (!isQuoteModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeQuoteModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/60 to-orange-50/40 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0056b3]">
              <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse" />
              <span>Free Consultation & Estimate</span>
            </div>
            <h2 id="quote-modal-title" className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              Request a Free Project Consultation & Itemized Quote
            </h2>
          </div>
          <button
            onClick={closeQuoteModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Inquiry Received Successfully!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our digital strategy team at{' '}
                <strong className="text-slate-900">{settings.businessName}</strong> has logged your project details under Reference ID:{' '}
                <span className="font-mono font-semibold text-blue-700">{inquiryId}</span>.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  What happens next?
                </div>
                <div>1. Our lead architect will review your project scope within 4 business hours.</div>
                <div>2. We will send an itemized scope and initial quote to <strong className="text-slate-800">{formData.email}</strong>.</div>
                <div>3. For urgent discussions, ping us directly on WhatsApp at <strong className="text-slate-800">{settings.contactNumber}</strong>.</div>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Interested Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estimated Budget Range
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['₹15k - ₹30k', '₹30k - ₹75k', '₹75k - ₹2L+'].map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setFormData({ ...formData, budget: tier })}
                      className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-colors ${
                        formData.budget === tier
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Details & Goals <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your business, what you need (e.g. 5-page business site, rebrand, or lead generation campaign), and your preferred launch timeline..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-60 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Proposal Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit Project Inquiry
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                We respect your confidentiality. NDA available upon request. No spam guarantee.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
