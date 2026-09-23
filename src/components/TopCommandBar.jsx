import React, { useState } from 'react';
import { Search, Sun, Moon, MapPin, Sparkles, X } from 'lucide-react';

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
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 rounded-2xl flex items-center justify-center border transition-all ${
          isLight
            ? 'bg-sky-100 border-sky-300 text-sky-600 shadow-sm'
            : 'bg-[#7fe3fa]/15 border-[#7fe3fa]/30 text-[#7fe3fa] shadow-[0_0_20px_rgba(127,227,250,0.25)]'
        }`}>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 animate-pulse" />
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