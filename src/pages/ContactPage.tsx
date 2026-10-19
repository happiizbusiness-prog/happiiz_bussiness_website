import { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';

export function ContactPage() {
  const { settings } = useBusiness();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Design & Development',
    budget: '₹25,000 - ₹50,000',
    description: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid business email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please provide a valid phone or WhatsApp number.');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage('Please describe your project objectives and requirements.');
      return;
    }

    setStatus('submitting');

    try {
      // Simulate real asynchronous submission / preparing for Firebase
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newId = `HPS-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryId(newId);

      const saved = JSON.parse(localStorage.getItem('happiiz_inquiries') || '[]');
      saved.push({
        id: newId,
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('happiiz_inquiries', JSON.stringify(saved));

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Failed to submit inquiry. Please connect directly via WhatsApp or telephone.');
    }
  };

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
    settings.businessName
  )}%2C%20I%20would%20like%20to%20discuss%20a%20new%20project.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
          <span>Get In Touch</span>
          <span aria-hidden="true">·</span>
          <span>Fast Turnaround</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          Let’s Discuss Your Next Strategic Initiative
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have an upcoming web project, marketing campaign, or corporate rebrand? Fill out the brief below or reach out via phone, email, or direct WhatsApp.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Direct Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-slate-900">
              Agency Contact Information
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Office Location</div>
                  <div className="mt-0.5 text-slate-600 leading-relaxed">{settings.businessAddress}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Telephone / Mobile</div>
                  <a
                    href={`tel:${settings.contactNumber}`}
                    className="mt-0.5 text-blue-700 hover:underline block font-medium"
                  >
                    {settings.contactNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Official Inquiries</div>
                  <a
                    href={`mailto:${settings.businessEmail}`}
                    className="mt-0.5 text-blue-700 hover:underline block font-medium"
                  >
                    {settings.businessEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Operating Hours</div>
                  <div className="mt-0.5 text-slate-600">Monday – Saturday: 9:30 AM – 6:30 PM IST</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* SLA & Security Trust Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict Confidentiality & 4-Hour Response Guarantee</span>
            </div>
            <p className="leading-relaxed">
              Every inquiry received by {settings.businessName} is treated with strict non-disclosure security. We never share client contact credentials with external third-party advertisers.
            </p>
          </div>
        </div>

        {/* Right: Working Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {status === 'success' ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Project Brief Submitted!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your project brief has been logged under Reference ID{' '}
                <span className="font-mono font-semibold text-blue-700">{inquiryId}</span>. A senior strategist from {settings.businessName} will contact you within 4 business hours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      service: 'Website Design & Development',
                      budget: '₹25,000 - ₹50,000',
                      description: ''
                    });
                  }}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Submit Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Send Us a Detailed Message</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fill in the fields below. Required fields are marked with an asterisk (*).
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Amit Verma"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    placeholder="amit@company.com"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Interested Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Website Design & Development">Website Design & Development</option>
                    <option value="E-commerce Website">E-commerce Website</option>
                    <option value="Digital Marketing & Ads">Digital Marketing & Paid Ads</option>
                    <option value="SEO Services">Search Engine Optimization (SEO)</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Lead Generation System">B2B Lead Generation Pipeline</option>
                    <option value="Logo & Brand Identity">Logo & Brand Identity</option>
                    <option value="Visiting Card & Stationery">Visiting Cards, Letterheads & Envelopes</option>
                    <option value="Custom Web Application">Custom Web Application</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Budget Range (Optional)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['< ₹25,000', '₹25k - ₹50k', '₹50k - ₹1.5L', '₹1.5L+ Enterprise'].map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setFormData({ ...formData, budget: tier })}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors ${
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
                  Project Description & Specifications <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about your company, current challenges, what you wish to create, and target launch dates..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-60 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Project Details...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inbound Project Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
