import { ServiceDetail } from '../types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    category: 'web-development',
    categoryLabel: 'Website Development',
    title: 'Website Design & Development',
    shortDesc: 'Custom, blazing-fast, mobile-first websites tailored for enterprise conversion, high SEO rankings, and seamless UX.',
    overview: 'We architect and build bespoke digital experiences ranging from sleek corporate web portals to complex web applications. Every build is optimized for 95+ Google Lighthouse scores, intuitive user journeys, and robust conversion pipelines.',
    benefits: [
      'Engineered for maximum speed and sub-second page loads',
      'Fluid, responsive layouts adapted perfectly to mobile, tablet, and ultra-wide screens',
      'Built-in technical SEO architecture and Schema.org markup',
      'Intuitive CMS integration allowing effortless content updates',
      'Enterprise-grade security, SSL, and automated backups'
    ],
    deliverables: [
      'Custom Responsive UI/UX Design Prototypes',
      'Modern Frontend & Backend Architecture (React, Next.js, Node/PHP/WordPress)',
      'CMS Admin Dashboard & Training Guide',
      'Technical SEO & Core Web Vitals Optimization',
      'Domain & Cloud Hosting Deployment Assistance',
      'Post-Launch 90-Day Priority Support'
    ],
    processSteps: [
      { step: '01', title: 'Discovery & Architecture', desc: 'Understanding your user personas, conversion goals, and technical requirements.' },
      { step: '02', title: 'Wireframing & Prototyping', desc: 'Crafting high-fidelity UI designs and interactive mockups for your feedback.' },
      { step: '03', title: 'Clean Development', desc: 'Coding responsive, modular, and accessible components following strict clean-code principles.' },
      { step: '04', title: 'Performance & QA Testing', desc: 'Rigorous cross-device testing, speed audits, security checks, and form validation.' },
      { step: '05', title: 'Deployment & Training', desc: 'Live launch on optimized cloud servers, DNS setup, and complete client handoff.' }
    ],
    faqs: [
      { q: 'How long does a standard business website take to build?', a: 'A standard custom corporate website typically takes between 2 to 4 weeks depending on the number of pages, custom features, and asset readiness.' },
      { q: 'Will my website work smoothly on mobile phones and tablets?', a: 'Yes, 100%. We employ mobile-first design principles so the experience is as seamless on an iPhone or Android phone as it is on a 4K desktop monitor.' },
      { q: 'Do you provide domain and cloud hosting setup assistance?', a: 'Absolutely. We assist in selecting, registering, and configuring secure cloud hosting (AWS, Cloudflare, Vercel, Hostinger) along with professional business emails.' }
    ],
    featuredTech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'WordPress / Headless CMS', 'Cloudflare']
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    category: 'digital-marketing',
    categoryLabel: 'Digital Marketing',
    title: 'Digital Marketing & Growth Strategy',
    shortDesc: 'Data-driven omnichannel campaigns, Google Ads, Meta Ads, and performance funnels designed to maximize ROI.',
    overview: 'Turn online traffic into measurable revenue. We build multi-channel acquisition funnels combining precision targeting, persuasive copy, and conversion rate optimization to scale your pipeline systematically.',
    benefits: [
      'Lower Customer Acquisition Cost (CAC) through hyper-targeted audience modeling',
      'Transparent real-time campaign dashboards and weekly ROI reports',
      'Full-funnel attribution tracking from first click to closed sale',
      'Continuous A/B testing of ad creatives, hooks, and landing pages',
      'Dedicated marketing strategist with industry expertise'
    ],
    deliverables: [
      'Comprehensive Digital Marketing Audit & Competitor Analysis',
      'Google Ads (Search, Display, Performance Max, Remarketing)',
      'Meta Ads (Facebook & Instagram Lead Generation & Sales)',
      'High-Converting Landing Page Optimization',
      'Analytics Setup (GA4, Google Tag Manager, Pixel Tracking)',
      'Bi-Weekly Strategy Reviews and Growth Roadmaps'
    ],
    processSteps: [
      { step: '01', title: 'Market & Competitor Audit', desc: 'Analyzing existing traffic, customer economics, and rival advertising plays.' },
      { step: '02', title: 'Funnel & Creative Blueprint', desc: 'Formulating hooks, ad creative angles, and optimized landing paths.' },
      { step: '03', title: 'Campaign Launch & Tracking', desc: 'Implementing pixel telemetry, server-side tracking, and multi-variant ads.' },
      { step: '04', title: 'Optimization & Scaling', desc: 'Pruning underperforming segments and allocating budget to high-ROI channels.' }
    ],
    faqs: [
      { q: 'How soon can we expect results from paid digital marketing?', a: 'Paid campaigns (Google Ads, Meta Ads) start generating qualified clicks and initial leads within 48 to 72 hours of campaign activation.' },
      { q: 'Who owns the ad accounts and creative assets?', a: 'You retain 100% ownership of your Google Ads, Facebook Ads Manager, and all created creative assets.' }
    ],
    featuredTech: ['Google Ads', 'Meta Ads Manager', 'GA4', 'Tag Manager', 'LinkedIn Ads', 'Semrush']
  },
  {
    id: 'seo',
    slug: 'seo',
    category: 'digital-marketing',
    categoryLabel: 'Search Engine Optimization',
    title: 'Search Engine Optimization (SEO)',
    shortDesc: 'Dominating organic search results with technical SEO audits, high-intent keyword clustering, and authoritative backlinks.',
    overview: 'Sustainable organic growth that compounds month over month. Our SEO framework addresses on-page semantics, technical Core Web Vitals, local Google Business Profile visibility, and authority building to keep your brand at the top of Google.',
    benefits: [
      'Consistent organic search traffic that doesn’t vanish when ad spend stops',
      'Local pack 3-pack dominance for regional service businesses',
      'Fixes for crawl errors, slow render speeds, and broken internal linking',
      'High-intent keyword rankings that attract buyers, not just casual browsers',
      'Authoritative, white-hat link acquisition and digital PR'
    ],
    deliverables: [
      'Complete Technical SEO Audit & Remediation Checklist',
      'Keyword Research & Search Intent Mapping Document',
      'On-Page Optimization (Metadata, Headers, Schema Markup, Content)',
      'Google Business Profile (GBP) Optimization for Local Reach',
      'Quality White-Hat Backlink Strategy',
      'Monthly Ranking & Organic Revenue Performance Reports'
    ],
    processSteps: [
      { step: '01', title: 'Technical Crawl & Audit', desc: 'Exposing indexation hurdles, schema defects, and speed bottlenecks.' },
      { step: '02', title: 'Keyword Intent Mapping', desc: 'Targeting commercial and transactional terms your target buyers search for.' },
      { step: '03', title: 'On-Page Architecture', desc: 'Restructuring content, metadata, internal links, and structured data.' },
      { step: '04', title: 'Authority & Backlinks', desc: 'Building high-reputation domain mentions through quality PR and citations.' }
    ],
    faqs: [
      { q: 'How long does SEO take to produce measurable rank improvements?', a: 'Technical and local SEO often yield noticeable improvements within 30 to 60 days, while competitive high-volume keywords usually require 3 to 6 months of steady authority building.' },
      { q: 'Do you practice safe, white-hat SEO techniques?', a: 'Yes, strictly. We follow Google Search Essentials and Webmaster Guidelines to guarantee long-term algorithmic safety.' }
    ],
    featuredTech: ['Ahrefs', 'Semrush', 'Google Search Console', 'Screaming Frog', 'Schema.org']
  },
  {
    id: 'social-media',
    slug: 'social-media',
    category: 'digital-marketing',
    categoryLabel: 'Social Media Marketing',
    title: 'Social Media Marketing & Management',
    shortDesc: 'Strategic social media content, viral reels, community engagement, and brand storytelling across Instagram, LinkedIn, and Facebook.',
    overview: 'Elevate your brand authority and maintain consistent, professional social presence. We handle creative concepting, visual design, copywriting, publishing calendars, and community engagement.',
    benefits: [
      'Consistent, cohesive brand aesthetic across all social touchpoints',
      'High-retention visual assets (carousels, short-form video concepts, infographics)',
      'Active follower interaction and direct message lead qualification',
      'Hashtag architecture and trend-leveraged organic reach',
      'Cross-platform brand credibility'
    ],
    deliverables: [
      'Monthly Content Strategy & Editorial Calendar',
      'Bespoke Graphic Creatives, Carousels & Video Thumbnails',
      'Engaging Captions, Hashtags & Call-to-Actions',
      'Scheduled Publishing & Community Monitoring',
      'Monthly Audience Growth & Engagement Analytics'
    ],
    processSteps: [
      { step: '01', title: 'Brand Tone & Pillar Definition', desc: 'Establishing visual guidelines, voice, and key content pillars.' },
      { step: '02', title: 'Monthly Calendar Production', desc: 'Batch-producing high-impact visual posts, carousels, and copy.' },
      { step: '03', title: 'Approval & Scheduling', desc: 'Presenting drafts for your review before scheduling at peak audience times.' },
      { step: '04', title: 'Community & Growth Analytics', desc: 'Tracking comments, shares, inbound inquiries, and profile visits.' }
    ],
    faqs: [
      { q: 'Which social platforms are best for my business?', a: 'For B2B services, LinkedIn and Twitter/X deliver the highest enterprise trust. For retail, hospitality, real estate, and lifestyle, Instagram and Facebook drive tremendous visual resonance.' }
    ],
    featuredTech: ['Figma', 'Adobe Creative Cloud', 'Meta Business Suite', 'Buffer', 'Canva Pro']
  },
  {
    id: 'lead-generation',
    slug: 'lead-generation',
    category: 'digital-marketing',
    categoryLabel: 'Lead Generation',
    title: 'B2B & Local Lead Generation Systems',
    shortDesc: 'Automated inbound and outbound client acquisition pipelines that deliver qualified sales appointments directly to your calendar.',
    overview: 'Stop cold chasing. We implement automated lead capture machines featuring high-converting lead magnets, landing pages, qualification forms, and instant CRM/WhatsApp alerts.',
    benefits: [
      'Predictable flow of verified prospect inquiries every week',
      'Pre-qualification questionnaires filtering out tire-kickers',
      'Automated instant email and WhatsApp notifications to your sales team',
      'Seamless CRM integration (HubSpot, Zoho, Google Sheets, WhatsApp API)',
      'Optimized cost-per-lead (CPL) benchmarks'
    ],
    deliverables: [
      'Target Prospect ICP (Ideal Customer Profile) Blueprint',
      'Lead Magnet / Value Offer Creation',
      'High-Conversion Dedicated Landing Page',
      'Form & CRM Pipeline Automation',
      'Lead Tracking Dashboard & Lead Verification System'
    ],
    processSteps: [
      { step: '01', title: 'Offer & Lead Magnet Structuring', desc: 'Crafting an irresistible value proposition prospects eagerly exchange contact info for.' },
      { step: '02', title: 'Dedicated Funnel Build', desc: 'Building clean, distraction-free landing pages with immediate trust proof.' },
      { step: '03', title: 'Targeted Traffic Activation', desc: 'Directing buyer-intent searchers and curated demographic audiences.' },
      { step: '04', title: 'Lead Delivery & Nurturing', desc: 'Instant dispatching of lead details to your WhatsApp and inbox for rapid close.' }
    ],
    faqs: [
      { q: 'How are leads verified for quality?', a: 'We implement multi-step qualification questions (budget range, timeline, business size) so only serious buyers reach your sales desk.' }
    ],
    featuredTech: ['CRM Integrations', 'WhatsApp Cloud API', 'Zapier / Webhooks', 'Google Ads', 'Custom Landing Pages']
  },
  {
    id: 'branding-design',
    slug: 'branding-design',
    category: 'graphic-design',
    categoryLabel: 'Branding & Design',
    title: 'Branding & Visual Identity Design',
    shortDesc: 'Memorable brand systems including logo design, color palettes, typography guidelines, and complete corporate stationery.',
    overview: 'A distinctive brand transforms your business from a commodity into a trusted market leader. We create timeless visual identities that communicate authority, premium quality, and emotional resonance across digital and physical print formats.',
    benefits: [
      'Unifies your market presence with cohesive visual discipline',
      'Creates instant recognition and commanding industry credibility',
      'Complete brand guideline document for consistent team execution',
      'Vector master assets ready for print, billboards, signage, and digital screens',
      'Full commercial copyright transfer upon project completion'
    ],
    deliverables: [
      'Primary, Secondary, and Iconographic Logo Variations',
      'Comprehensive Brand Guidelines (Color Hex/CMYK/Pantone, Typography Hierarchy)',
      'Social Media Kit (Avatars, Covers, Post Templates)',
      'Print-Ready Stationery Kit (Business Cards, Letterheads, Envelopes)',
      'Master Vector Formats (AI, EPS, SVG, High-Res PNG, PDF)'
    ],
    processSteps: [
      { step: '01', title: 'Brand Discovery & Moodboards', desc: 'Defining brand archetype, emotional positioning, and competitor differentiation.' },
      { step: '02', title: 'Identity Concepts', desc: 'Presenting 3 distinct visual directions with real-world mockups.' },
      { step: '03', title: 'Refinement & Polish', desc: 'Perfecting chosen concept geometry, spacing, typography, and color harmony.' },
      { step: '04', title: 'Asset Package Hand-off', desc: 'Exporting comprehensive print and web bundles with full usage documentation.' }
    ],
    faqs: [
      { q: 'Do we get full copyrights to the finalized designs?', a: 'Yes, 100%. Upon project completion, full copyright and intellectual property rights are officially transferred to you.' }
    ],
    featuredTech: ['Adobe Illustrator', 'Figma', 'Adobe Photoshop', 'Pantone Matching System']
  },
  {
    id: 'logo-design',
    slug: 'logo-design',
    category: 'graphic-design',
    categoryLabel: 'Graphic Design',
    title: 'Logo Design & Brand Mark Creation',
    shortDesc: 'Distinctive, scalable, and timeless logos designed from scratch to reflect your business essence and inspire consumer confidence.',
    overview: 'Your logo is the cornerstone of your brand identity. We craft bespoke emblems, wordmarks, and combination marks that look stunning whether stamped on a business card or displayed on a giant architectural building facade.',
    benefits: [
      'Original, handcrafted concepts created by senior visual designers',
      'Geometric precision and golden ratio alignment',
      'Versatile scalability: looks crisp from 16px favicons to billboard sizes',
      'Multiple format delivery: Dark mode, light mode, monochrome, and transparent',
      'Trademark-friendly original artwork'
    ],
    deliverables: [
      '3 to 5 Initial Creative Concepts',
      'Vector Files: AI, SVG, EPS, PDF',
      'Raster Files: Ultra High-Res Transparent PNG, JPG',
      'App Icon, Favicon & Social Profile Formats',
      'Color Palette Specifications & Font License Recommendations'
    ],
    processSteps: [
      { step: '01', title: 'Creative Briefing', desc: 'Understanding your company story, target market, and stylistic preferences.' },
      { step: '02', title: 'Concept Exploration', desc: 'Drafting original vector concepts across wordmarks, emblems, and abstract marks.' },
      { step: '03', title: 'Client Review & Iteration', desc: 'Collaborating closely to refine your favorite direction to perfection.' },
      { step: '04', title: 'Master Production Export', desc: 'Delivering all production files packaged systematically in organized folders.' }
    ],
    faqs: [
      { q: 'How many revisions are included in the logo design package?', a: 'We provide unlimited revisions on the selected design concept until you are completely satisfied with the result.' }
    ],
    featuredTech: ['Adobe Illustrator', 'Vector Math', 'Figma']
  },
  {
    id: 'business-cards',
    slug: 'business-cards',
    category: 'graphic-design',
    categoryLabel: 'Stationery Design',
    title: 'Visiting & Business Card Design',
    shortDesc: 'Luxury, executive business cards featuring modern minimalist layouts, tactile paper finishes, QR codes, and print-ready files.',
    overview: 'Make an indelible first impression during in-person executive meetings. We design premium standard, square, vertical, and die-cut business cards with specifications for spot UV, foil stamping, embossing, and NFC/QR code integrations.',
    benefits: [
      'Elevates executive presence in corporate meetings and trade conferences',
      'Precision typography ensuring maximum readability at small dimensions',
      'Smart QR code integration connecting instantly to vCard, WhatsApp, or website',
      'Prepared with bleed, trim lines, and CMYK color profiles ready for any printer',
      'Multiple employee card variations generated easily'
    ],
    deliverables: [
      'Single & Double-Sided Design Layouts',
      'Standard (3.5" x 2") or Custom International Dimensions',
      'Print-Ready 300+ DPI PDF with Bleed & Crop Marks',
      'Interactive QR Code Graphic linked to digital contact card',
      'Editable Source Files (AI / EPS)'
    ],
    processSteps: [
      { step: '01', title: 'Layout & Typography Composition', desc: 'Balancing logo presence, contact details, and breathing room.' },
      { step: '02', title: 'Finish & Texture Specification', desc: 'Adding spot gloss, matte lamination, or foil accents.' },
      { step: '03', title: 'QR Code Generation', desc: 'Encoding contact vCards or portfolio destinations.' },
      { step: '04', title: 'Print-Ready Export', desc: 'Delivering flawless prepress files formatted for commercial offset or digital printing.' }
    ],
    faqs: [
      { q: 'Can you generate cards for multiple team members?', a: 'Yes! We create a standardized corporate template and generate print files for all executive and sales team members.' }
    ],
    featuredTech: ['Adobe InDesign', 'Adobe Illustrator', 'Pre-Press CMYK']
  },
  {
    id: 'letterhead-design',
    slug: 'letterhead-design',
    category: 'graphic-design',
    categoryLabel: 'Stationery Design',
    title: 'Corporate Letterhead Design',
    shortDesc: 'Professional, elegant letterheads formatted for official corporate correspondence, invoices, proposals, and MS Word templates.',
    overview: 'Official documentation demands elegance and authority. We craft corporate letterheads with disciplined margins, subtle watermark elements, and complete Microsoft Word and Google Docs editable templates.',
    benefits: [
      'Brings uniform corporate professionalism to contracts, tenders, and proposals',
      'Includes both print-ready PDF and editable Microsoft Word / Google Docs templates',
      'Clean header and footer architecture leaving ample room for body correspondence',
      'Compliant with international A4 and US Letter standards',
      'Crisp high-resolution digital outputs for email PDFs'
    ],
    deliverables: [
      'Print-Ready Vector PDF (A4 and US Letter)',
      'Editable Microsoft Word (.docx) Template with locked headers',
      'Google Docs Ready Template',
      'High-Resolution Digital Letterhead for PDF Invoicing'
    ],
    processSteps: [
      { step: '01', title: 'Grid & Header Alignment', desc: 'Placing corporate identifiers, tax registration, and official contacts.' },
      { step: '02', title: 'Template Standardization', desc: 'Locking margins and default paragraph styles in MS Word/Docs.' },
      { step: '03', title: 'Export & Quality Check', desc: 'Verifying legibility in both printed and screen PDF formats.' }
    ],
    faqs: [
      { q: 'Will I be able to type my letters directly in Microsoft Word?', a: 'Yes! We deliver an editable .docx template with the header and footer secured so you can easily type and save letters.' }
    ],
    featuredTech: ['Adobe InDesign', 'Microsoft Word Template (.docx)', 'Google Docs Format']
  },
  {
    id: 'envelope-design',
    slug: 'envelope-design',
    category: 'graphic-design',
    categoryLabel: 'Stationery Design',
    title: 'Corporate Envelope & Folder Design',
    shortDesc: 'Branded envelopes in #10, DL, and C4 formats, tailored for direct mail, client proposals, and executive correspondence.',
    overview: 'Complete your corporate brand stationery with bespoke envelope designs. We design for standard commercial sizes with custom flap styling, security tints, and precise post office mailing compliance.',
    benefits: [
      'Reinforces prestige the moment your mail lands on an executive’s desk',
      'Proper postal clearance zones and return address positioning',
      'Cohesive styling harmonized with your business cards and letterhead',
      'Specs for window and non-window envelope layouts',
      'Commercial print templates with dielines included'
    ],
    deliverables: [
      'DL Size Envelope Design (Standard Business)',
      'C4 / A4 Document Envelope Design',
      '#10 Commercial Envelope Design',
      'Print-Ready Files with Die-Cut Lines and Bleed',
      'Mockup Previews for Vendor Printing'
    ],
    processSteps: [
      { step: '01', title: 'Dieline & Size Selection', desc: 'Matching the exact envelope template of your preferred commercial printer.' },
      { step: '02', title: 'Visual Balancing', desc: 'Harmonizing brand mark, return address, and stamp/meter clearance.' },
      { step: '03', title: 'Final Prepress Hand-off', desc: 'Delivering CMYK vector artwork with trim, fold, and glue-line indicators.' }
    ],
    faqs: [
      { q: 'Can my local printer use your files directly?', a: 'Yes, our files follow standard prepress conventions with crop marks, bleed, and CMYK color profiles that any commercial printer accepts.' }
    ],
    featuredTech: ['Adobe Illustrator', 'Dieline CAD Mapping', 'CMYK Pre-Press']
  }
];
