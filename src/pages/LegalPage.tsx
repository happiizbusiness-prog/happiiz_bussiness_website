import { useBusiness } from '../context/BusinessContext';
import { useNavigation } from '../context/NavigationContext';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const { settings } = useBusiness();
  const { navigate } = useNavigation();

  const isPrivacy = type === 'privacy';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <div>
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
          <ShieldCheck className="w-4 h-4" />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Service'}
        </h1>
        <p className="text-xs text-slate-500">
          Effective Date: January 1, 2026 · Last Updated: March 2026
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
              <p>
                At <strong>{settings.businessName}</strong>, we collect information you provide directly to us when requesting a project quotation, scheduling a discovery call, or submitting an inquiry via our contact channels. This includes your name, business email, telephone number, and project specifications.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. How We Utilize Your Data</h2>
              <p>
                Your information is used exclusively to evaluate project feasibility, prepare itemized proposals, formulate non-disclosure agreements, and facilitate direct communication with our technical and creative teams. We do not sell or rent customer data to third-party data brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Confidentiality & Non-Disclosure (NDA)</h2>
              <p>
                All proprietary concepts, unreleased business ideas, and trade secrets submitted to {settings.businessName} are safeguarded under strict internal confidentiality standards. Formal bilateral NDAs are furnished prior to deep architectural or technical handoffs upon request.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Contacting Our Data Officer</h2>
              <p>
                If you have inquiries regarding our data handling procedures or wish to request data deletion, contact us at{' '}
                <a href={`mailto:${settings.businessEmail}`} className="text-blue-700 underline font-medium">
                  {settings.businessEmail}
                </a>{' '}
                or visit our registered offices at {settings.businessAddress}.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Scope of Engagement & Deliverables</h2>
              <p>
                All web design, digital marketing campaigns, lead generation systems, and branding stationery engagements undertaken by <strong>{settings.businessName}</strong> are governed by an agreed statement of work (SOW) specifying milestone delivery schedules, revision rounds, and sign-off criteria.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Intellectual Property & Copyright Assignment</h2>
              <p>
                Upon receipt of full contract payment, full commercial copyright and ownership rights for final delivered vector assets, codebase repositories, custom illustrations, and stationery files are transferred entirely to the client without ongoing licensing fees.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Third-Party Services & Hosting</h2>
              <p>
                Third-party subscriptions (e.g. domain registrars, cloud infrastructure on AWS/Vercel/Google Cloud, Google Ads spend, Meta Ads budgets) are direct client obligations. {settings.businessName} assists with architecture, setup, and optimization.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Warranties & Post-Launch Support</h2>
              <p>
                We stand behind our code. Standard web development projects include 90 days of priority defect resolution and Core Web Vitals maintenance following commercial launch.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
