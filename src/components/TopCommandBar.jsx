import React, { useState } from 'react';
import { Search, Sun, Moon, MapPin, X } from 'lucide-react';

export default function TopCommandBar({
  currentLocation,
  onSearchSubmit,
  unit,
  onToggleUnit,
  theme = 'obsidian',
  onToggleTheme
}) {
  const [query, setQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const isLight = theme === 'light';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query.trim());
      setQuery('');
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <header className="w-full px-3.5 sm:px-6 2xl:px-8 py-2.5 2xl:py-3.5 flex items-center justify-between gap-3 z-30 select-none">
      {/* Brand Logo (Ultra-Premium 3D Fluid Tornado / Vortex Motif) */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 rounded-2xl flex items-center justify-center border transition-all relative overflow-hidden ${
          isLight
            ? 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 border-sky-300 text-sky-700 shadow-sm'
            : 'bg-gradient-to-br from-[#0c1424] via-[#101b30] to-[#060911] border-[#7fe3fa]/50 text-[#7fe3fa] shadow-[0_0_30px_rgba(127,227,250,0.4)]'
        }`}>
          <div className="absolute inset-0 bg-[#7fe3fa]/15 animate-pulse pointer-events-none" />
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none" className="transform hover:scale-110 transition-transform duration-300">
            <defs>
              <linearGradient id="proVortex" x1="6" y1="4" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#7fe3fa" />
                <stop offset="75%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <filter id="glowFX" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Organic Fluid Swirling Tornado Rings */}
            <path
              d="M 6,8 C 18,4 30,10 27,15 C 24,20 10,16 10,21 C 10,26 26,23 23,28 C 21,32 14,30 14,30"
              stroke="url(#proVortex)"
              strokeWidth="3.6"
              strokeLinecap="round"
              filter="url(#glowFX)"
            />
            <path
              d="M 12,5 C 22,3 32,8 28,12"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M 16,24 C 20,25 24,24 22,27"
              stroke="#7fe3fa"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        </div>
        <div>
          <h1 className={`text-base sm:text-lg 2xl:text-2xl font-black tracking-wider font-mono uppercase transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Zephyr<span className={isLight ? 'text-sky-600' : 'text-[#7fe3fa]'}>OS</span>
          </h1>
          <p className={`text-[9px] sm:text-[10px] 2xl:text-xs font-mono flex items-center gap-1 ${
            isLight ? 'text-slate-500' : 'text-stone-400'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            ATMOSPHERIC COCKPIT
          </p>
        </div>
      </div>

      {/* Desktop Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 max-w-sm xl:max-w-md 2xl:max-w-lg mx-auto relative hidden md:block"
      >
        <Search className="w-4 h-4 2xl:w-5 2xl:h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city, coordinates, or hub..."
          className={`w-full pl-11 pr-4 py-2 2xl:py-2.5 rounded-full text-xs 2xl:text-sm font-mono outline-none transition-all ${
            isLight
              ? 'bg-white border border-slate-300 text-slate-800 placeholder-slate-400 shadow-sm focus:border-sky-500'
              : 'bg-[#11141a] border border-white/[0.08] text-white placeholder-stone-500 focus:border-[#7fe3fa]/60 focus:bg-[#161a22]'
          }`}
        />
      </form>

      {/* Controls Block */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Mobile Search Button Trigger */}
        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className={`md:hidden w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
            isLight
              ? 'bg-white border-slate-300 text-slate-700'
              : 'bg-[#11141a] border-white/[0.08] text-stone-300'
          }`}
          title="Search City"
        >
          {isMobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
        </button>

        {/* Location Pill */}
        <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-full border text-xs 2xl:text-sm font-mono ${
          isLight ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-[#11141a] border-white/[0.06] text-stone-300'
        }`}>
          <MapPin className={`w-3.5 h-3.5 2xl:w-4 2xl:h-4 ${isLight ? 'text-sky-600' : 'text-[#7fe3fa]'}`} />
          <span className="max-w-[130px] xl:max-w-[170px] truncate font-bold">
            {currentLocation || 'Locating...'}
          </span>
        </div>

        {/* Unit Toggle */}
        <button
          type="button"
          onClick={onToggleUnit}
          className={`px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-full border text-xs 2xl:text-sm font-mono font-bold transition-all cursor-pointer ${
            isLight
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-sm'
              : 'bg-[#11141a] hover:bg-[#161a22] border-white/[0.08] text-white'
          }`}
        >
          <span className={unit === 'celsius' ? (isLight ? 'text-sky-600' : 'text-[#7fe3fa]') : 'text-stone-400'}>°C</span>
          <span className="text-stone-400 mx-1">/</span>
          <span className={unit === 'fahrenheit' ? (isLight ? 'text-sky-600' : 'text-[#7fe3fa]') : 'text-stone-400'}>°F</span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className={`w-8 h-8 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            isLight
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-amber-500 shadow-sm'
              : 'bg-[#11141a] hover:bg-[#161a22] border-white/[0.08] text-[#7fe3fa]'
          }`}
        >
          {isLight ? <Sun className="w-4 h-4 2xl:w-5 2xl:h-5" /> : <Moon className="w-4 h-4 2xl:w-5 2xl:h-5" />}
        </button>
      </div>

      {/* Mobile Expanding Search Drawer */}
      {isMobileSearchOpen && (
        <form
          onSubmit={handleSubmit}
          className="absolute top-14 inset-x-3.5 p-2 rounded-2xl bg-[#11141a] border border-[#7fe3fa]/40 shadow-2xl flex items-center gap-2 z-50 md:hidden animate-in fade-in slide-in-from-top-2"
        >
          <Search className="w-4 h-4 text-[#7fe3fa] shrink-0 ml-2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type city (e.g. London, Tokyo)..."
            className="flex-1 bg-transparent text-white text-xs font-mono outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-[#7fe3fa] text-black font-bold font-mono text-xs rounded-xl"
          >
            Go
          </button>
        </form>
      )}
    </header>
  );
}