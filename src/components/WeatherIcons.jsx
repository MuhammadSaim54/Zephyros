import React from 'react';

export function getWeather3DComponent(type = 'sun', size = 32, theme = 'obsidian') {
  const isLight = theme === 'light';

  // 1. CLEAR SUN
  if (type === 'sun') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        className="overflow-visible select-none transition-transform duration-300 drop-shadow-[0_8px_20px_rgba(245,158,11,0.45)]"
      >
        <defs>
          <radialGradient id={`sunGrad-${size}`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="28%" stopColor="#fde047" />
            <stop offset="68%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
        </defs>
        {/* Kinetic Corona Rays */}
        <g stroke="#f59e0b" strokeWidth="4.5" strokeLinecap="round" opacity="0.9">
          <line x1="50" y1="6" x2="50" y2="18" />
          <line x1="50" y1="82" x2="50" y2="94" />
          <line x1="6" y1="50" x2="18" y2="50" />
          <line x1="82" y1="50" x2="94" y2="50" />
          <line x1="18" y1="18" x2="27" y2="27" />
          <line x1="73" y1="73" x2="82" y2="82" />
          <line x1="18" y1="82" x2="27" y2="73" />
          <line x1="73" y1="27" x2="82" y2="18" />
        </g>
        <circle cx="50" cy="50" r="26" fill={`url(#sunGrad-${size})`} />
        <ellipse cx="42" cy="40" rx="9" ry="5.5" transform="rotate(-30 42 40)" fill="#ffffff" opacity="0.65" />
      </svg>
    );
  }

  // 2. CLOUDY (Guaranteed Contrast on Light & Dark)
  if (type === 'cloud') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        className="overflow-visible select-none drop-shadow-[0_8px_18px_rgba(100,116,139,0.35)]"
      >
        <defs>
          <linearGradient id={`cloudBody-${size}-${theme}`} x1="20" y1="15" x2="75" y2="65">
            <stop offset="0%" stopColor={isLight ? '#cbd5e1' : '#ffffff'} />
            <stop offset="55%" stopColor={isLight ? '#94a3b8' : '#e2e8f0'} />
            <stop offset="100%" stopColor={isLight ? '#64748b' : '#94a3b8'} />
          </linearGradient>
        </defs>
        <path
          d="M 32,60 L 70,60 C 78.8,60 86,52.8 86,44 C 86,35.5 79.4,28.6 71,28.1 C 69.5,17.8 60.7,10 50,10 C 40.5,10 32.5,16.2 29.8,25 C 21.6,26.2 15.3,33.3 15.3,42 C 15.3,51.9 22.8,60 32,60 Z"
          fill={`url(#cloudBody-${size}-${theme})`}
          stroke={isLight ? 'rgba(71,85,105,0.3)' : 'rgba(255,255,255,0.2)'}
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  // 3. RAIN SHOWERS
  if (type === 'rain') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        className="overflow-visible select-none drop-shadow-[0_10px_22px_rgba(56,189,248,0.4)]"
      >
        <defs>
          <linearGradient id={`rainCloud-${size}-${theme}`} x1="20" y1="15" x2="75" y2="65">
            <stop offset="0%" stopColor={isLight ? '#cbd5e1' : '#ffffff'} />
            <stop offset="70%" stopColor={isLight ? '#94a3b8' : '#cbd5e1'} />
            <stop offset="100%" stopColor={isLight ? '#64748b' : '#64748b'} />
          </linearGradient>
        </defs>
        <path
          d="M 32,56 L 70,56 C 78.8,56 86,48.8 86,40 C 86,31.5 79.4,24.6 71,24.1 C 69.5,13.8 60.7,6 50,6 C 40.5,6 32.5,12.2 29.8,21 C 21.6,22.2 15.3,29.3 15.3,38 C 15.3,47.9 22.8,56 32,56 Z"
          fill={`url(#rainCloud-${size}-${theme})`}
        />
        <line x1="32" y1="64" x2="26" y2="80" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="48" y1="64" x2="42" y2="80" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="64" y1="64" x2="58" y2="80" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 4. THUNDERSTORM
  if (type === 'thunder') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        className="overflow-visible select-none drop-shadow-[0_10px_25px_rgba(147,51,234,0.5)]"
      >
        <path
          d="M 32,54 L 70,54 C 78.8,54 86,46.8 86,38 C 86,29.5 79.4,22.6 71,22.1 C 69.5,11.8 60.7,4 50,4 C 40.5,4 32.5,10.2 29.8,19 C 21.6,20.2 15.3,27.3 15.3,36 C 15.3,45.9 22.8,54 32,54 Z"
          fill="#475569"
        />
        <polygon points="52,48 38,68 49,68 44,92 64,66 52,66" fill="#fde047" stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    );
  }

  // DEFAULT
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="26" fill="#f59e0b" />
    </svg>
  );
}