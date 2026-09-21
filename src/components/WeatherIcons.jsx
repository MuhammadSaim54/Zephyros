import React from 'react';

// 1. 3D Golden Sun
export function Sun3DIcon({ size = 56, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 overflow-visible ${className}`} fill="none">
      {/* Sun Rays */}
      <g stroke="#f59e0b" strokeWidth="6" strokeLinecap="round">
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
      <circle cx="50" cy="50" r="23" fill="#fb8500" />
      <circle cx="47" cy="47" r="20" fill="#ffb703" />
      <circle cx="42" cy="40" r="5" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

// 2. 3D Porcelain Rain Cloud
export function Rain3DIcon({ size = 56, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 overflow-visible ${className}`} fill="none">
      {/* Cloud Shadows & Body */}
      <ellipse cx="50" cy="46" rx="28" ry="16" fill="#94a3b8" />
      <ellipse cx="50" cy="43" rx="27" ry="15" fill="#cbd5e1" />
      <circle cx="36" cy="38" r="14" fill="#e2e8f0" />
      <circle cx="57" cy="31" r="17" fill="#ffffff" />
      <circle cx="70" cy="41" r="11" fill="#f8fafc" />

      {/* Drops */}
      <g stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round">
        <line x1="33" y1="65" x2="29" y2="74" />
        <line x1="44" y1="65" x2="40" y2="74" />
        <line x1="55" y1="65" x2="51" y2="74" />
        <line x1="66" y1="65" x2="62" y2="74" />
        <line x1="38" y1="76" x2="34" y2="85" opacity="0.8" />
        <line x1="49" y1="76" x2="45" y2="85" opacity="0.8" />
        <line x1="60" y1="76" x2="56" y2="85" opacity="0.8" />
      </g>
    </svg>
  );
}

// 3. 3D Thunder & Lightning Cloud
export function Thunder3DIcon({ size = 56, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 overflow-visible ${className}`} fill="none">
      {/* Sun Behind */}
      <circle cx="68" cy="26" r="12" fill="#f59e0b" />
      {/* Dark Cloud */}
      <ellipse cx="48" cy="45" rx="28" ry="16" fill="#334155" />
      <circle cx="34" cy="39" r="14" fill="#475569" />
      <circle cx="54" cy="33" r="17" fill="#64748b" />
      <circle cx="68" cy="42" r="11" fill="#94a3b8" />
      {/* Dual Lightning Bolts */}
      <polygon points="41,54 31,69 39,69 34,83 49,65 42,65" fill="#facc15" stroke="#eab308" strokeWidth="1" />
      <polygon points="58,56 49,69 56,69 51,81 64,66 58,66" fill="#facc15" stroke="#eab308" strokeWidth="1" />
    </svg>
  );
}

// 4. 3D Pure White Overcast Cloud
export function Cloud3DIcon({ size = 56, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 overflow-visible ${className}`} fill="none">
      <ellipse cx="50" cy="52" rx="31" ry="18" fill="#cbd5e1" />
      <ellipse cx="50" cy="49" rx="30" ry="17" fill="#e2e8f0" />
      <circle cx="34" cy="43" r="15" fill="#f1f5f9" />
      <circle cx="56" cy="34" r="19" fill="#ffffff" />
      <circle cx="71" cy="45" r="13" fill="#ffffff" />
    </svg>
  );
}

// 5. 3D Snow Frost Cloud
export function Snow3DIcon({ size = 56, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 overflow-visible ${className}`} fill="none">
      <ellipse cx="50" cy="45" rx="28" ry="16" fill="#94a3b8" />
      <circle cx="35" cy="39" r="14" fill="#cbd5e1" />
      <circle cx="55" cy="33" r="17" fill="#f8fafc" />
      <circle cx="68" cy="41" r="12" fill="#ffffff" />
      {/* Cyan Snow Crystals */}
      <circle cx="36" cy="66" r="3.5" fill="#7fe3fa" />
      <circle cx="50" cy="70" r="3.5" fill="#7fe3fa" />
      <circle cx="64" cy="66" r="3.5" fill="#7fe3fa" />
      <circle cx="43" cy="79" r="3" fill="#7fe3fa" />
      <circle cx="57" cy="79" r="3" fill="#7fe3fa" />
    </svg>
  );
}

// Universal Resolver
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