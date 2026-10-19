interface HappiizLogoProps {
  className?: string;
  variant?: 'compact' | 'stacked' | 'emblem-only' | 'navbar';
  showTagline?: boolean;
}

export function HappiizLogo({
  className = '',
  variant = 'compact',
  showTagline = false
}: HappiizLogoProps) {
  // SVG of the uploaded Happiiz circular insignia
  const Emblem = ({ size = 42 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        {/* Outer Circle Gradient: Royal Blue to Radiant Orange */}
        <linearGradient id="ringGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0062e3" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#ff5722" />
        </linearGradient>

        {/* Hand Gradient */}
        <linearGradient id="handGrad" x1="40" y1="110" x2="140" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#00439c" />
        </linearGradient>

        {/* Leaf Gradient */}
        <linearGradient id="leafGrad" x1="100" y1="120" x2="150" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>

        {/* Growth Arrow Gradient */}
        <linearGradient id="arrowGrad" x1="80" y1="120" x2="145" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ff5722" />
        </linearGradient>

        {/* Shadow */}
        <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" floodColor="#000" />
        </filter>
      </defs>

      {/* Outer Ring with circular gap accents like the original logo */}
      <circle
        cx="100"
        cy="100"
        r="92"
        stroke="url(#ringGrad)"
        strokeWidth="9"
        fill="#ffffff"
        filter="url(#subtleGlow)"
      />

      {/* Decorative inner curved swoop */}
      <path
        d="M 28 85 A 76 76 0 0 1 140 32"
        stroke="#0062e3"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M 168 115 A 74 74 0 0 1 60 168"
        stroke="#ff5722"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Ascending Growth Arrow */}
      <path
        d="M 85 125 C 100 105 120 78 138 52"
        stroke="url(#arrowGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow Head */}
      <path
        d="M 132 40 L 152 48 L 142 68 Z"
        fill="#ff5722"
      />

      {/* Caring Cradling Blue Hand at bottom */}
      <path
        d="M 45 105 C 55 125 75 148 115 145 C 132 143 148 130 152 118 C 145 125 130 134 114 135 C 80 136 62 115 55 98 Z"
        fill="url(#handGrad)"
      />

      {/* Fresh Green Sprouting Leaf */}
      <path
        d="M 108 126 C 122 126 148 118 152 90 C 134 94 116 108 108 126 Z"
        fill="url(#leafGrad)"
      />
      <path
        d="M 112 124 Q 130 110 148 94"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      {/* Figure 1 (Left - Blue) */}
      <circle cx="78" cy="80" r="10" fill="#0284c7" />
      <path
        d="M 68 115 C 68 98 75 92 88 92 C 82 102 75 110 68 115 Z"
        fill="#0284c7"
      />

      {/* Figure 2 (Middle - Orange) */}
      <circle cx="98" cy="68" r="10" fill="#f97316" />
      <path
        d="M 86 112 C 86 90 94 80 108 80 C 100 94 92 104 86 112 Z"
        fill="#f97316"
      />

      {/* Figure 3 (Right - Royal Blue) */}
      <circle cx="120" cy="56" r="10.5" fill="#004ea8" />
      <path
        d="M 106 105 C 108 80 118 68 132 68 C 124 82 115 95 106 105 Z"
        fill="#004ea8"
      />
    </svg>
  );

  // If emblem only requested
  if (variant === 'emblem-only') {
    return <Emblem size={48} />;
  }

  // Navbar compact layout
  if (variant === 'navbar') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <Emblem size={40} />
        <div className="flex flex-col">
          <div className="flex items-baseline font-display font-extrabold text-xl leading-none tracking-tight">
            <span className="text-[#0056b3]">Happ</span>
            <span className="text-[#ff5722]">iiz</span>
          </div>
          <span className="text-[9px] font-bold tracking-[0.16em] text-[#0b3b75] uppercase mt-0.5">
            BUSINESS SOLUTIONS
          </span>
        </div>
      </div>
    );
  }

  // Stacked variant (for hero, about, or footer highlights)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <Emblem size={84} />
        <div className="mt-3 flex items-baseline font-display font-black text-3xl sm:text-4xl leading-none tracking-tight">
          <span className="text-[#0056b3]">Happ</span>
          <span className="text-[#ff5722]">iiz</span>
        </div>
        <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#0b3b75] uppercase mt-1">
          BUSINESS SOLUTIONS
        </span>
        {showTagline && (
          <div className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span className="h-[1.5px] w-4 bg-[#ff5722]" />
            <span>Your Business Our Priority</span>
            <span className="h-[1.5px] w-4 bg-[#ff5722]" />
          </div>
        )}
      </div>
    );
  }

  // Default compact variant
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Emblem size={46} />
      <div className="flex flex-col">
        <div className="flex items-baseline font-display font-extrabold text-2xl leading-none tracking-tight">
          <span className="text-[#0056b3]">Happ</span>
          <span className="text-[#ff5722]">iiz</span>
        </div>
        <span className="text-[10px] font-black tracking-[0.18em] text-[#0b3b75] uppercase mt-0.5">
          BUSINESS SOLUTIONS
        </span>
        {showTagline && (
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 mt-0.5">
            <span className="h-[1px] w-3 bg-[#ff5722]" />
            <span>Your Business Our Priority</span>
            <span className="h-[1px] w-3 bg-[#ff5722]" />
          </div>
        )}
      </div>
    </div>
  );
}
