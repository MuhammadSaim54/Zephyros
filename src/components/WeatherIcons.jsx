import React from 'react';

// ============================================================================
// 1. Rain Cloud with Slanted Needles (Pure Solid Fills - Zero ID Collision)
// ============================================================================
export function Rain3DIcon({ size = 52, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`shrink-0 overflow-visible select-none ${className}`}
      fill="none"
    >
      {/* 3D Porcelain & Slate Cloud Body */}
      <g>
        <ellipse cx="50" cy="42" rx="36" ry="18" fill="#94a3b8" />
        <ellipse cx="50" cy="38" rx="35" ry="17" fill="#cbd5e1" />
        <circle cx="28" cy="34" r="16" fill="#e2e8f0" />
        <circle cx="56" cy="24" r="22" fill="#ffffff" />
        <circle cx="76" cy="36" r="15" fill="#f8fafc" />
      </g>

      {/* 2-Tier Slanted Needles */}
      <g stroke="#38bdf8" strokeWidth="3.6" strokeLinecap="round">
        <line x1="26" y1="62" x2="20" y2="74" />
        <line x1="38" y1="62" x2="32" y2="74" />
        <line x1="50" y1="62" x2="44" y2="74" />
        <line x1="62" y1="62" x2="56" y2="74" />
        <line x1="74" y1="62" x2="68" y2="74" />

        <line x1="32" y1="76" x2="26" y2="88" opacity="0.85" />
        <line x1="44" y1="76" x2="38" y2="88" opacity="0.85" />
        <line x1="56" y1="76" x2="50" y2="88" opacity="0.85" />
        <line x1="68" y1="76" x2="62" y2="88" opacity="0.85" />
      </g>
    </svg>
  );
}

// ============================================================================
// 2. White Cloud + Single Yellow Lightning Bolt + Blue Mini Drops
// ============================================================================
export function LightningCloud3D({ size = 52, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`shrink-0 overflow-visible select-none ${className}`}
      fill="none"
    >
      {/* Puffy White Cloud Body */}
      <g>
        <ellipse cx="50" cy="42" rx="36" ry="18" fill="#cbd5e1" />
        <ellipse cx="50" cy="38" rx="35" ry="17" fill="#f1f5f9" />
        <circle cx="28" cy="34" r="16" fill="#ffffff" />
        <circle cx="56" cy="24" r="22" fill="#ffffff" />
        <circle cx="76" cy="36" r="15" fill="#ffffff" />
      </g>

      {/* Central Sharp Glowing Lightning Bolt */}
      <polygon
        points="48,50 38,68 47,68 41,88 62,65 52,65"
        fill="#facc15"
        stroke="#eab308"
        strokeWidth="1.5"
      />

      {/* Blue Mini Raindrops */}
      <circle cx="30" cy="74" r="3.2" fill="#38bdf8" />
      <circle cx="68" cy="74" r="3.2" fill="#38bdf8" />
    </svg>
  );
}

// ============================================================================
// 3. Dark Grey Storm Cloud + Dual Amber Lightning Bolts
// ============================================================================
export function Thunder3DIcon({ size = 52, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`shrink-0 overflow-visible select-none ${className}`}
      fill="none"
    >
      {/* Dark Slate Cloud Body */}
      <g>
        <ellipse cx="50" cy="42" rx="36" ry="18" fill="#1e293b" />
        <ellipse cx="50" cy="38" rx="35" ry="17" fill="#334155" />
        <circle cx="28" cy="34" r="16" fill="#475569" />
        <circle cx="56" cy="24" r="22" fill="#64748b" />
        <circle cx="76" cy="36" r="15" fill="#475569" />
      </g>

      {/* Dual Sharp Bolts */}
      <polygon points="38,50 28,68 37,68 30,86 48,65 40,65" fill="#d97706" />
      <polygon points="58,50 48,68 57,68 50,86 68,65 60,65" fill="#facc15" />
    </svg>
  );
}

// ============================================================================
// 4. Overcast Soft White Cloud with Cyan Core Spark
// ============================================================================
export function Cloud3DIcon({ size = 52, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`shrink-0 overflow-visible select-none ${className}`}
      fill="none"
    >
      {/* Pure White Cloud Base */}
      <g>
        <ellipse cx="50" cy="46" rx="38" ry="20" fill="#cbd5e1" />
        <ellipse cx="50" cy="42" rx="36" ry="19" fill="#f8fafc" />
        <circle cx="28" cy="36" r="17" fill="#ffffff" />
        <circle cx="58" cy="24" r="23" fill="#ffffff" />
        <circle cx="78" cy="39" r="16" fill="#ffffff" />
      </g>

      {/* Cyan Core Indicator Spark at Base */}
      <circle cx="50" cy="56" r="4.5" fill="#7fe3fa" />
    </svg>
  );
}

// ============================================================================
// 5. 3D Radiant Sun with Spikes
// ============================================================================
export function Sun3DIcon({ size = 52, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`shrink-0 overflow-visible select-none ${className}`}
      fill="none"
    >
      {/* 16 Sawtooth Spikes */}
      <g fill="#f59e0b">
        {[...Array(16)].map((_, i) => (
          <polygon
            key={i}
            points="50,4 43,20 57,20"
            transform={`rotate(${i * 22.5} 50 50)`}
          />
        ))}
      </g>

      {/* 3D Sun Core Sphere */}
      <circle cx="50" cy="50" r="32" fill="#fb8500" />
      <circle cx="48" cy="48" r="30" fill="#ffb703" />
      <ellipse cx="40" cy="38" rx="8" ry="5" fill="#fff" opacity="0.6" />
    </svg>
  );
}

export function Snow3DIcon({ size = 52, className = "" }) {
  return <Cloud3DIcon size={size} className={className} />;
}

// ============================================================================
// 6. Cute Hero Animated Cloud Mascot
// ============================================================================
export function DynamicCharacterCloud({ conditionType = 'sun', size = "w-44 h-44" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${size}`}>
      <div className="absolute w-32 h-32 bg-[#7fe3fa]/20 rounded-full blur-[40px] pointer-events-none animate-pulse" />

      <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible drop-shadow-[0_15px_35px_rgba(0,0,0,0.65)]">
        <ellipse cx="60" cy="100" rx="44" ry="8" fill="#000000" opacity="0.35" />

        <g>
          <ellipse cx="60" cy="62" rx="42" ry="26" fill={conditionType === 'thunder' ? '#334155' : '#cbd5e1'} />
          <ellipse cx="60" cy="58" rx="40" ry="25" fill={conditionType === 'thunder' ? '#475569' : '#f8fafc'} />
          <circle cx="38" cy="50" r="22" fill={conditionType === 'thunder' ? '#64748b' : '#ffffff'} />
          <circle cx="70" cy="42" r="26" fill={conditionType === 'thunder' ? '#64748b' : '#ffffff'} />
          <circle cx="88" cy="56" r="18" fill={conditionType === 'thunder' ? '#94a3b8' : '#f1f5f9'} />

          <circle cx="44" cy="65" r="4.5" fill="#fda4af" opacity="0.85" />
          <circle cx="76" cy="65" r="4.5" fill="#fda4af" opacity="0.85" />

          <circle cx="48" cy="56" r="3.2" fill={conditionType === 'thunder' ? '#f8fafc' : '#0f172a'} />
          <circle cx="47" cy="54.5" r="1.1" fill="#ffffff" />
          <circle cx="72" cy="56" r="3.2" fill={conditionType === 'thunder' ? '#f8fafc' : '#0f172a'} />
          <circle cx="71" cy="54.5" r="1.1" fill="#ffffff" />

          <path
            d="M57 63 Q60 67 63 63"
            stroke={conditionType === 'thunder' ? '#f8fafc' : '#0f172a'}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {conditionType === 'thunder' && (
          <polygon
            points="58,72 46,92 56,92 50,110 74,86 64,86"
            fill="#facc15"
            stroke="#eab308"
            strokeWidth="1.5"
            className="drop-shadow-[0_0_12px_rgba(250,204,21,0.9)] animate-pulse"
          />
        )}
        {conditionType === 'rain' && (
          <g stroke="#38bdf8" strokeWidth="4" strokeLinecap="round">
            <line x1="42" y1="84" x2="38" y2="95" />
            <line x1="56" y1="84" x2="52" y2="95" />
            <line x1="70" y1="84" x2="66" y2="95" />
          </g>
        )}
        {conditionType === 'sun' && (
          <circle cx="95" cy="30" r="16" fill="#f59e0b" className="animate-pulse" />
        )}
      </svg>
    </div>
  );
}

// Universal Resolver Helper
export function getWeather3DComponent(type, size = 52, className = "") {
  switch (type) {
    case 'rain':
      return <Rain3DIcon size={size} className={className} />;
    case 'lightning':
      return <LightningCloud3D size={size} className={className} />;
    case 'thunder':
      return <Thunder3DIcon size={size} className={className} />;
    case 'cloud':
    case 'snow':
      return <Cloud3DIcon size={size} className={className} />;
    case 'sun':
    default:
      return <Sun3DIcon size={size} className={className} />;
  }
}