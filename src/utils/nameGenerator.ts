import { GeneratedBusinessName } from '../types';

interface GenerateOptions {
  category: string;
  industry: string;
  keywords: string;
  language: 'English' | 'Hindi / Indian' | 'Global / Latin';
  brandStyle: 'Modern & Sleek' | 'Tech & Innovation' | 'Luxury & Premium' | 'Catchy & Memorable' | 'Minimalist';
  targetAudience: string;
}

export function generateBusinessNames(options: GenerateOptions): GeneratedBusinessName[] {
  const { category, industry, keywords, language, brandStyle } = options;

  // Clean and extract primary keyword
  const rawKeywords = keywords
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
  const primaryKw = rawKeywords[0] || industry || category || 'Growth';
  const cleanKw = primaryKw.replace(/[^a-zA-Z0-9]/g, '');
  const capitalizedKw = cleanKw.charAt(0).toUpperCase() + cleanKw.slice(1).toLowerCase();

  // Root banks based on style and language
  const modernPrefixes = ['Omni', 'Velo', 'Aura', 'Nova', 'Pulse', 'Sync', 'Apex', 'Meta', 'Zenith', 'Next', 'Prime', 'Hyper'];
  const modernSuffixes = ['Labs', 'Solutions', 'Flow', 'Grid', 'Works', 'Hub', 'Craft', 'Matrix', 'Dynamics', 'Logic', 'Scale', 'Sync'];

  const techPrefixes = ['Cyber', 'Algo', 'Byte', 'Neural', 'Cloud', 'Data', 'Nexus', 'Synapse', 'Quant', 'Vortex', 'Krypton', 'Vector'];
  const techSuffixes = ['Tech', 'AI', 'Stack', 'Nodes', 'Engine', 'Systems', 'OS', 'Digital', 'Logic', 'Platform', 'Scale'];

  const luxuryPrefixes = ['Maison', 'Aura', 'Veritas', 'Valen', 'Regal', 'Sterling', 'Noble', 'Lumina', 'Arcadia', 'Soleil', 'Elysian'];
  const luxurySuffixes = ['Consulting', 'Partners', 'Atelier', 'Advisory', 'Group', 'Associates', 'Holdings', 'Heritage', 'Collective'];

  const catchyPrefixes = ['Happy', 'Zippy', 'Go', 'Buzz', 'Spark', 'Snap', 'Bright', 'Loop', 'Peak', 'Swift', 'Pop', 'Click'];
  const catchySuffixes = ['Box', 'Hive', 'Rocket', 'Nest', 'Spot', 'Club', 'Point', 'Zone', 'Blink', 'Vibe'];

  const hindiPrefixes = ['Shubh', 'Aarambh', 'Pratham', 'Uday', 'Anant', 'Utkarsh', 'Yug', 'Nav', 'Vikas', 'Samriddhi', 'Daksha', 'Tejas'];
  const hindiSuffixes = ['Kriti', 'Setu', 'Shilp', 'Tech', 'Mitra', 'Sutra', 'Shala', 'Sanchar', 'Vyapar', 'Seva'];

  let chosenPrefixes = modernPrefixes;
  let chosenSuffixes = modernSuffixes;

  if (language === 'Hindi / Indian') {
    chosenPrefixes = hindiPrefixes;
    chosenSuffixes = hindiSuffixes;
  } else if (brandStyle === 'Tech & Innovation') {
    chosenPrefixes = techPrefixes;
    chosenSuffixes = techSuffixes;
  } else if (brandStyle === 'Luxury & Premium') {
    chosenPrefixes = luxuryPrefixes;
    chosenSuffixes = luxurySuffixes;
  } else if (brandStyle === 'Catchy & Memorable') {
    chosenPrefixes = catchyPrefixes;
    chosenSuffixes = catchySuffixes;
  }

  // Shuffle helpers
  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const shuffledPrefixes = shuffle(chosenPrefixes);
  const shuffledSuffixes = shuffle(chosenSuffixes);

  const results: GeneratedBusinessName[] = [];
  const generatedNames = new Set<string>();

  const concepts = [
    'Compounds authority and industry clarity',
    'Short, punchy, and ideal for digital app branding',
    'Timeless corporate structure suited for B2B expansion',
    'Vibrant market positioning with high memorability',
    'Modern phonetics optimized for international recall',
    'Clean, memorable brand identity primed for trademarking'
  ];

  // Helper to add unique name
  const addCandidate = (name: string, styleTag: string) => {
    if (generatedNames.has(name) || results.length >= 8) return;
    generatedNames.add(name);

    // Formulate suggested domain
    const cleanDomain = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const tld = language === 'Hindi / Indian' ? '.in' : (cleanDomain.length > 8 ? '.co' : '.com');
    const concept = concepts[results.length % concepts.length];

    results.push({
      id: `name-${Date.now()}-${results.length}`,
      name,
      style: styleTag,
      concept,
      suggestedDomain: `${cleanDomain}${tld}`
    });
  };

  // 1. Compound: Keyword + Suffix
  for (let i = 0; i < 3; i++) {
    const s = shuffledSuffixes[i % shuffledSuffixes.length];
    addCandidate(`${capitalizedKw} ${s}`, brandStyle);
  }

  // 2. Prefix + Keyword
  for (let i = 0; i < 3; i++) {
    const p = shuffledPrefixes[i % shuffledPrefixes.length];
    addCandidate(`${p}${capitalizedKw}`, 'Compound & Modern');
  }

  // 3. Portmanteau blending
  if (capitalizedKw.length >= 4) {
    const root = capitalizedKw.slice(0, 4);
    addCandidate(`${root}ify`, 'Dynamic Verb Brand');
    addCandidate(`${root}io`, 'Tech Minimalist');
    addCandidate(`${root}ex`, 'Abstract Corporate');
  }

  // 4. Two-word high-impact pairings
  addCandidate(`${shuffledPrefixes[0]} ${shuffledSuffixes[0]}`, 'Prestige Identity');
  addCandidate(`${capitalizedKw} ${shuffledSuffixes[1]}`, 'Category Leader');

  return results;
}
