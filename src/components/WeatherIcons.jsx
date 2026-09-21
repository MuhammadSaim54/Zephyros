import React from 'react';

// 1. 3D Radiance Gloss Sun (Hero & Forecast)
export function Sun3DIcon({ className = "w-11 h-11" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <defs>
        <radialGradient id="sunSphere" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#fff5b8" />
          <stop offset="25%" stopColor="#ffb703" />
          <stop offset="75%" stopColor="#fb8500" />
          <stop offset="100%" stopColor="#d9480f" />
        </radialGradient>
        <filter id="sunRayGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="sunDrop">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#fb8500" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* 3D Sun Rays with soft round caps */}
      <g stroke="#ffb703" strokeWidth="5.5" strokeLinecap="round" filter="url(#sunRayGlow)">
        <line x1="50" y1="8" x2="50" y2="18" />
        <line x1="50" y1="82" x2="50" y2="92" />
        <line x1="8" y1="50" x2="18" y2="50" />
        <line x1="82" y1="50" x2="92" y2="50" />
        <line x1="20.3" y1="20.3" x2="27.4" y2="27.4" />
        <line x1="72.6" y1="72.6" x2="79.7" y2="79.7" />
        <line x1="20.3" y1="79.7" x2="27.4" y2="72.6" />
        <line x1="72.6" y1="27.4" x2="79.7" y2="20.3" />
      </g>
      {/* Glowing 3D Sphere */}
      <circle cx="50" cy="50" r="23" fill="url(#sunSphere)" filter="url(#sunDrop)" />
      <circle cx="43" cy="41" r="5" fill="#ffffff" opacity="0.45" filter="blur(1px)" />
    </svg>
  );
}

// 2. 3D Puffy Rain Cloud with Multi-Tier Teal Drops (Reference Image)
export function Rain3DIcon({ className = "w-11 h-11" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <defs>
        <linearGradient id="cloudGrad" x1="20%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <filter id="puffyShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>
      {/* 3D Puffy Cloud Body */}
      <g filter="url(#puffyShadow)">
        <ellipse cx="50" cy="46" rx="28" ry="17" fill="url(#cloudGrad)" />
        <circle cx="36" cy="41" r="14" fill="url(#cloudGrad)" />
        <circle cx="56" cy="35" r="17" fill="url(#cloudGrad)" />
        <circle cx="68" cy="43" r="11" fill="url(#cloudGrad)" />
      </g>
      {/* Realistic Cyan Droplets with Staggered Grid */}
      <g stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round">
        <line x1="33" y1="68" x2="30" y2="76" />
        <line x1="43" y1="68" x2="40" y2="76" />
        <line x1="53" y1="68" x2="50" y2="76" />
        <line x1="63" y1="68" x2="60" y2="76" />
        
        <line x1="38" y1="78" x2="35" y2="86" opacity="0.8" />
        <line x1="48" y1="78" x2="45" y2="86" opacity="0.8" />
        <line x1="58" y1="78" x2="55" y2="86" opacity="0.8" />
      </g>
    </svg>
  );
}

// 3. 3D Dark Storm Cloud with Sun Peek & Dual Golden Lightning Bolts
export function Thunder3DIcon({ className = "w-11 h-11" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <defs>
        <linearGradient id="stormDarkGrad" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="40%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff066" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="boltGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#facc15" floodOpacity="0.9" />
        </filter>
      </defs>
      {/* Sun Peeking from Behind the Storm */}
      <circle cx="68" cy="28" r="12" fill="#f59e0b" />
      <g stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
        <line x1="68" y1="10" x2="68" y2="14" />
        <line x1="82" y1="20" x2="79" y2="23" />
        <line x1="86" y1="34" x2="82" y2="34" />
      </g>

      {/* Volumetric Dark Cloud */}
      <g filter="drop-shadow(0 6px 6px rgba(0,0,0,0.5))">
        <ellipse cx="48" cy="46" rx="28" ry="16" fill="url(#stormDarkGrad)" />
        <circle cx="34" cy="41" r="14" fill="url(#stormDarkGrad)" />
        <circle cx="53" cy="35" r="17" fill="url(#stormDarkGrad)" />
        <circle cx="67" cy="43" r="11" fill="url(#stormDarkGrad)" />
      </g>

      {/* Dual Sharp 3D Lightning Bolts (Ref Image 18) */}
      <g filter="url(#boltGlow)">
        <polygon points="42,56 32,71 40,71 35,85 50,67 43,67" fill="url(#lightningGrad)" />
        <polygon points="58,58 50,71 56,71 52,83 65,68 59,68" fill="url(#lightningGrad)" />
      </g>
    </svg>
  );
}

// 4. 3D Overcast Porcelain Cloud
export function Cloud3DIcon({ className = "w-11 h-11" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <defs>
        <linearGradient id="pureWhiteCloud" x1="15%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0 6px 6px rgba(0,0,0,0.4))">
        <ellipse cx="50" cy="50" rx="30" ry="18" fill="url(#pureWhiteCloud)" />
        <circle cx="35" cy="44" r="15" fill="url(#pureWhiteCloud)" />
        <circle cx="56" cy="36" r="19" fill="url(#pureWhiteCloud)" />
        <circle cx="70" cy="47" r="13" fill="url(#pureWhiteCloud)" />
      </g>
    </svg>
  );
}

// 5. 3D Snow Frost Cloud
export function Snow3DIcon({ className = "w-11 h-11" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <defs>
        <linearGradient id="snowCloudGrad" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0 5px 6px rgba(0,0,0,0.35))">
        <ellipse cx="50" cy="44" rx="28" ry="16" fill="url(#snowCloudGrad)" />
        <circle cx="36" cy="39" r="14" fill="url(#snowCloudGrad)" />
        <circle cx="55" cy="33" r="17" fill="url(#snowCloudGrad)" />
        <circle cx="68" cy="41" r="12" fill="url(#snowCloudGrad)" />
      </g>
      {/* 3D Cyan Glowing Snow Crystals */}
      <circle cx="36" cy="68" r="3.2" fill="#e0f2fe" filter="drop-shadow(0 0 3px #38bdf8)" />
      <circle cx="50" cy="72" r="3.2" fill="#e0f2fe" filter="drop-shadow(0 0 3px #38bdf8)" />
      <circle cx="64" cy="68" r="3.2" fill="#e0f2fe" filter="drop-shadow(0 0 3px #38bdf8)" />
      <circle cx="43" cy="80" r="2.8" fill="#e0f2fe" filter="drop-shadow(0 0 3px #38bdf8)" />
      <circle cx="57" cy="80" r="2.8" fill="#e0f2fe" filter="drop-shadow(0 0 3px #38bdf8)" />
    </svg>
  );
}

// 6. 3D Glass Blue Humidity Teardrop Balloon (Image 18 Ekiti card)
export function WaterDrop3DIcon({ className = "w-11 h-11" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <defs>
        <radialGradient id="dropSphere" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="35%" stopColor="#06b6d4" />
          <stop offset="85%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>
      </defs>
      <path
        d="M50 16 C50 16, 26 48, 26 66 C26 79.25 36.75 90 50 90 C63.25 90 74 79.25 74 66 C74 48 50 16 50 16 Z"
        fill="url(#dropSphere)"
        filter="drop-shadow(0 6px 12px rgba(6,182,212,0.45))"
      />
      <ellipse cx="42" cy="52" rx="6" ry="12" transform="rotate(-25 42 52)" fill="#ffffff" opacity="0.45" />
    </svg>
  );
}