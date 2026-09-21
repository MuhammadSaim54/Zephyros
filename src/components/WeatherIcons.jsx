import React from 'react';

// 1. Animated 3D Cute Sun
export function Sun3DIcon({ size = 56, className = "" }) {
  return (
    <div style={{ width: size, height: size }} className={`relative flex items-center justify-center select-none shrink-0 ${className}`}>
      <div className="absolute inset-2 bg-amber-400/20 rounded-full blur-md pointer-events-none animate-pulse" />
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_8px_16px_rgba(245,158,11,0.35)]">
        {/* Soft Animated Golden Clay Rays */}
        <g stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" opacity="0.95">
          <line x1="50" y1="8" x2="50" y2="18" />
          <line x1="50" y1="82" x2="50" y2="92" />
          <line x1="8" y1="50" x2="18" y2="50" />
          <line x1="82" y1="50" x2="92" y2="50" />
          <line x1="20" y1="20" x2="27" y2="27" />
          <line x1="73" y1="73" x2="80" y2="80" />
          <line x1="20" y1="80" x2="27" y2="73" />
          <line x1="73" y1="27" x2="80" y2="20" />
        </g>
        {/* 3D Sun Sphere */}
        <circle cx="50" cy="50" r="24" fill="#fb8500" />
        <circle cx="48" cy="48" r="22" fill="#ffb703" />
        {/* Cute Face */}
        <circle cx="43" cy="47" r="2.8" fill="#1e293b" />
        <circle cx="42" cy="45.5" r="1" fill="#ffffff" />
        <circle cx="57" cy="47" r="2.8" fill="#1e293b" />
        <circle cx="56" cy="45.5" r="1" fill="#ffffff" />
        <circle cx="39" cy="52" r="3" fill="#f43f5e" opacity="0.6" />
        <circle cx="61" cy="52" r="3" fill="#f43f5e" opacity="0.6" />
        <path d="M47 52 Q50 56 53 52" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

// 2. Animated 3D Cute Rain Cloud
export function Rain3DIcon({ size = 56, className = "" }) {
  return (
    <div style={{ width: size, height: size }} className={`relative flex items-center justify-center select-none shrink-0 ${className}`}>
      <div className="absolute inset-2 bg-cyan-400/20 rounded-full blur-md pointer-events-none animate-pulse" />
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
        {/* Fluffy Porcelain Cloud */}
        <ellipse cx="50" cy="46" rx="30" ry="17" fill="#94a3b8" />
        <ellipse cx="50" cy="42" rx="29" ry="16" fill="#f8fafc" />
        <circle cx="34" cy="38" r="15" fill="#ffffff" />
        <circle cx="58" cy="30" r="19" fill="#ffffff" />
        <circle cx="72" cy="40" r="13" fill="#f1f5f9" />
        {/* Cute Face */}
        <circle cx="44" cy="42" r="2.6" fill="#1e293b" />
        <circle cx="43" cy="40.8" r="0.9" fill="#ffffff" />
        <circle cx="60" cy="42" r="2.6" fill="#1e293b" />
        <circle cx="59" cy="40.8" r="0.9" fill="#ffffff" />
        <circle cx="39" cy="47" r="3.2" fill="#fda4af" opacity="0.8" />
        <circle cx="65" cy="47" r="3.2" fill="#fda4af" opacity="0.8" />
        <path d="M49 47 Q52 50 55 47" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Cyan Animated Rain Drops */}
        <g stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round">
          <line x1="33" y1="64" x2="29" y2="73" />
          <line x1="45" y1="64" x2="41" y2="73" />
          <line x1="57" y1="64" x2="53" y2="73" />
          <line x1="69" y1="64" x2="65" y2="73" />
          <line x1="39" y1="75" x2="35" y2="84" opacity="0.8" />
          <line x1="51" y1="75" x2="47" y2="84" opacity="0.8" />
          <line x1="63" y1="75" x2="59" y2="84" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

// 3. Animated 3D Thunderstorm Cloud with Glowing Lightning
export function Thunder3DIcon({ size = 56, className = "" }) {
  return (
    <div style={{ width: size, height: size }} className={`relative flex items-center justify-center select-none shrink-0 ${className}`}>
      <div className="absolute inset-1 bg-amber-400/25 rounded-full blur-md pointer-events-none animate-pulse" />
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]">
        {/* Sun peeking from back */}
        <circle cx="69" cy="25" r="13" fill="#f59e0b" />
        <circle cx="67" cy="23" r="11" fill="#ffb703" />
        {/* Storm Cloud */}
        <ellipse cx="48" cy="46" rx="29" ry="17" fill="#334155" />
        <circle cx="33" cy="40" r="14" fill="#475569" />
        <circle cx="55" cy="33" r="17" fill="#64748b" />
        <circle cx="69" cy="43" r="11" fill="#94a3b8" />
        {/* Cheeks & Eyes */}
        <circle cx="43" cy="42" r="2.5" fill="#f8fafc" />
        <circle cx="58" cy="42" r="2.5" fill="#f8fafc" />
        <circle cx="39" cy="47" r="3" fill="#fb7185" opacity="0.7" />
        <circle cx="62" cy="47" r="3" fill="#fb7185" opacity="0.7" />
        <path d="M48 47 Q51 51 54 47" stroke="#f8fafc" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Dual Sharp Golden Lightning Bolts */}
        <polygon points="41,56 31,71 39,71 34,85 49,67 42,67" fill="#facc15" stroke="#eab308" strokeWidth="1" />
        <polygon points="59,58 50,71 57,71 52,83 65,68 59,68" fill="#facc15" stroke="#eab308" strokeWidth="1" opacity="0.9" />
      </svg>
    </div>
  );
}

// 4. Animated 3D Overcast Cloud
export function Cloud3DIcon({ size = 56, className = "" }) {
  return (
    <div style={{ width: size, height: size }} className={`relative flex items-center justify-center select-none shrink-0 ${className}`}>
      <div className="absolute inset-2 bg-slate-300/15 rounded-full blur-md pointer-events-none" />
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]">
        <ellipse cx="50" cy="54" rx="32" ry="18" fill="#cbd5e1" />
        <ellipse cx="50" cy="50" rx="31" ry="17" fill="#f8fafc" />
        <circle cx="33" cy="44" r="15" fill="#ffffff" />
        <circle cx="56" cy="35" r="20" fill="#ffffff" />
        <circle cx="72" cy="46" r="14" fill="#f1f5f9" />
        {/* Cheerful Expression */}
        <circle cx="44" cy="47" r="2.8" fill="#1e293b" />
        <circle cx="43" cy="45.5" r="1" fill="#ffffff" />
        <circle cx="61" cy="47" r="2.8" fill="#1e293b" />
        <circle cx="60" cy="45.5" r="1" fill="#ffffff" />
        <circle cx="38" cy="52" r="3.5" fill="#fda4af" opacity="0.8" />
        <circle cx="67" cy="52" r="3.5" fill="#fda4af" opacity="0.8" />
        <path d="M50 52 Q53 56 56 52" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

// 5. Animated 3D Snow Cloud with Cyan Frost
export function Snow3DIcon({ size = 56, className = "" }) {
  return (
    <div style={{ width: size, height: size }} className={`relative flex items-center justify-center select-none shrink-0 ${className}`}>
      <div className="absolute inset-2 bg-[#7fe3fa]/20 rounded-full blur-md pointer-events-none animate-pulse" />
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]">
        <ellipse cx="50" cy="46" rx="29" ry="17" fill="#94a3b8" />
        <circle cx="35" cy="40" r="14" fill="#cbd5e1" />
        <circle cx="56" cy="33" r="18" fill="#ffffff" />
        <circle cx="70" cy="42" r="12" fill="#f8fafc" />
        {/* Face */}
        <circle cx="44" cy="41" r="2.5" fill="#1e293b" />
        <circle cx="58" cy="41" r="2.5" fill="#1e293b" />
        <circle cx="39" cy="46" r="3" fill="#38bdf8" opacity="0.5" />
        <circle cx="63" cy="46" r="3" fill="#38bdf8" opacity="0.5" />
        <path d="M49 46 Q51 49 53 46" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Glowing Frost Spheres */}
        <circle cx="36" cy="67" r="3.5" fill="#7fe3fa" />
        <circle cx="50" cy="71" r="3.5" fill="#7fe3fa" />
        <circle cx="64" cy="67" r="3.5" fill="#7fe3fa" />
        <circle cx="43" cy="80" r="3" fill="#7fe3fa" />
        <circle cx="57" cy="80" r="3" fill="#7fe3fa" />
      </svg>
    </div>
  );
}

// 6. Big Hero Mobile Animated Cloud Character (Adapts to Live Weather)
export function DynamicCharacterCloud({ conditionType = 'sun', size = "w-44 h-44" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${size}`}>
      {/* Background Soft Atmospheric Aura */}
      <div className="absolute w-32 h-32 bg-[#7fe3fa]/20 rounded-full blur-[40px] pointer-events-none animate-pulse" />

      <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible drop-shadow-[0_15px_35px_rgba(0,0,0,0.65)]">
        <ellipse cx="60" cy="100" rx="44" ry="8" fill="#000000" opacity="0.35" />

        {/* 3D Porcelain White Cloud Base */}
        <g className="transition-transform duration-500">
          <ellipse cx="60" cy="62" rx="42" ry="26" fill={conditionType === 'thunder' ? '#334155' : '#cbd5e1'} />
          <ellipse cx="60" cy="58" rx="40" ry="25" fill={conditionType === 'thunder' ? '#475569' : '#f8fafc'} />
          <circle cx="38" cy="50" r="22" fill={conditionType === 'thunder' ? '#64748b' : '#ffffff'} />
          <circle cx="70" cy="42" r="26" fill={conditionType === 'thunder' ? '#64748b' : '#ffffff'} />
          <circle cx="88" cy="56" r="18" fill={conditionType === 'thunder' ? '#94a3b8' : '#f1f5f9'} />

          {/* Cute Rosy Cheeks */}
          <circle cx="44" cy="65" r="4.5" fill="#fda4af" opacity="0.85" />
          <circle cx="76" cy="65" r="4.5" fill="#fda4af" opacity="0.85" />

          {/* Expressive Glossy Black Eyes */}
          <circle cx="48" cy="56" r="3.2" fill={conditionType === 'thunder' ? '#f8fafc' : '#0f172a'} />
          <circle cx="47" cy="54.5" r="1.1" fill="#ffffff" />
          <circle cx="72" cy="56" r="3.2" fill={conditionType === 'thunder' ? '#f8fafc' : '#0f172a'} />
          <circle cx="71" cy="54.5" r="1.1" fill="#ffffff" />

          {/* Smiling Mouth */}
          <path
            d="M57 63 Q60 67 63 63"
            stroke={conditionType === 'thunder' ? '#f8fafc' : '#0f172a'}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Dynamic Condition Attachments */}
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
        {conditionType === 'snow' && (
          <g fill="#7fe3fa">
            <circle cx="44" cy="90" r="4" />
            <circle cx="60" cy="92" r="4" />
            <circle cx="74" cy="88" r="4" />
          </g>
        )}
        {conditionType === 'sun' && (
          <circle cx="95" cy="30" r="16" fill="#f59e0b" className="animate-pulse" />
        )}
      </svg>
    </div>
  );
}

// 7. Universal Resolver
export function getWeather3DComponent(type, size = 56, className = "") {
  switch (type) {
    case 'rain':
      return <Rain3DIcon size={size} className={className} />;
    case 'thunder':
      return <Thunder3DIcon size={size} className={className} />;
    case 'cloud':
      return <Cloud3DIcon size={size} className={className} />;
    case 'snow':
      return <Snow3DIcon size={size} className={className} />;
    case 'sun':
    default:
      return <Sun3DIcon size={size} className={className} />;
  }
}