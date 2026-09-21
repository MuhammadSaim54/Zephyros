import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TacticalDock from './components/TacticalDock';
import TopCommandBar from './components/TopCommandBar';
import ForecastDeck from './components/ForecastDeck';
import { getWeather3DComponent } from './components/WeatherIcons';
import { useWeatherData } from './hooks/useWeatherData';
import { Activity, CloudRain, Globe, Wind, Droplets, Gauge, Sparkles } from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('global');
  const [timeFilter, setTimeFilter] = useState('Today');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Mobile selected forecast day index (0 = Today, 1 = Day 2, etc.)
  const [mobileSelectedIdx, setMobileSelectedIdx] = useState(0);

  const {
    locationMeta,
    cityQuery,
    weatherData,
    loading,
    error,
    unit,
    formatTemp,
    toggleUnit,
    handleCitySearch,
    interpretWeatherCode
  } = useWeatherData('Lagos, Nigeria');

  const current = weatherData?.current;
  const daily = weatherData?.daily;

  // Build full daily array from real API data
  const daysList = (daily?.time || []).slice(0, 6).map((timeStr, idx) => {
    const d = new Date(timeStr);
    const dayLabel = idx === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayLong = d.toLocaleDateString('en-US', { weekday: 'long' });
    const code = daily.weather_code?.[idx] ?? (current?.weather_code ?? 0);
    const condition = interpretWeatherCode(code);
    const maxT = daily.temperature_2m_max?.[idx] ?? 26;

    return {
      idx,
      dayLabel,
      dayLong,
      condition,
      maxT
    };
  });

  // Active display data for mobile based on user tap
  const activeMobileDay = daysList[mobileSelectedIdx] || daysList[0] || {
    dayLong: 'Today',
    condition: { label: 'Partly Cloudy', type: 'cloud' },
    maxT: 26
  };

  const currentTempFormatted = mobileSelectedIdx === 0 && current?.temperature_2m !== undefined
    ? formatTemp(current.temperature_2m)
    : formatTemp(activeMobileDay.maxT);
  const currentNumeric = currentTempFormatted.replace('°', '');

  return (
    <div className="h-screen w-screen bg-[#000000] text-white flex overflow-hidden font-sans select-none relative">
      {/* 1. Tactical Capsule Navigation Dock */}
      <TacticalDock
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopCommandBar
          currentLocation={cityQuery}
          onSearchSubmit={handleCitySearch}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          unit={unit}
          onToggleUnit={toggleUnit}
        />

        {/* ========================================================================= */}
        {/* DESKTOP VIEWPORT                                                          */}
        {/* ========================================================================= */}
        <main className="hidden md:flex flex-1 flex-col justify-between px-7 pb-6 pt-2 max-w-[1600px] w-full mx-auto overflow-hidden">
          {/* Section A: Time Range Tabs */}
          <div className="flex items-center gap-7 text-xs font-bold tracking-wide mb-3">
            {['Today', 'Tomorrow', 'Next 7 days'].map((tab) => (
              <button
                key={tab}
                onClick={() => setTimeFilter(tab)}
                className={`transition-colors cursor-pointer ${
                  timeFilter === tab ? 'text-white' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Row 1: Interactive Forecast Deck + Chance of Rain */}
          <div className="grid grid-cols-12 gap-5 items-stretch mb-5">
            <div className="col-span-8 flex items-stretch">
              <ForecastDeck
                weatherData={weatherData}
                formatTemp={formatTemp}
                interpretWeatherCode={interpretWeatherCode}
                unit={unit}
              />
            </div>

            <div className="col-span-4 p-6 rounded-[28px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between min-h-[240px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                  <CloudRain className="w-3.5 h-3.5 text-[#7fe3fa]" />
                  Phase 4 • Chance of Rain
                </span>
                <span className="text-[10px] font-mono text-[#7fe3fa] bg-[#7fe3fa]/10 px-2.5 py-0.5 rounded-full border border-[#7fe3fa]/20">
                  READY FOR PHASE 4
                </span>
              </div>
              <div className="border border-dashed border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-center text-center my-2">
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2 font-mono text-xs font-bold">
                  P4
                </div>
                <h4 className="text-sm font-bold text-stone-200">Precipitation Spline Staged</h4>
                <p className="text-[11px] text-stone-500 max-w-xs mt-1">
                  Area gradient wave, 72mm/h telemetry tag, and intensity axis will mount here in Phase 4.
                </p>
              </div>
              <span className="text-[10px] text-stone-600 font-mono">GRID: 4 COLUMNS</span>
            </div>
          </div>

          {/* Row 2: World Map + Regional Hub */}
          <div className="grid grid-cols-12 gap-5 items-stretch flex-1">
            <div className="col-span-8 p-6 rounded-[28px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#7fe3fa]" />
                  Phase 5 • Global Synoptic Map
                </span>
                <span className="text-[10px] font-mono text-[#7fe3fa] bg-[#7fe3fa]/10 px-2.5 py-0.5 rounded-full border border-[#7fe3fa]/20">
                  READY FOR PHASE 5
                </span>
              </div>
              <div className="border border-dashed border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-center text-center my-2">
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2 font-mono text-xs font-bold">
                  P5
                </div>
                <h4 className="text-sm font-bold text-stone-200">Synoptic World Map Staged</h4>
                <p className="text-[11px] text-stone-500 max-w-sm mt-1">
                  Authentic vector continent geometry and interactive telemetry stations will mount here in Phase 5.
                </p>
              </div>
              <span className="text-[10px] text-stone-600 font-mono">GRID: 8 COLUMNS</span>
            </div>

            <div className="col-span-4 p-6 rounded-[28px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#7fe3fa]" />
                  Phase 6 • Cities Close to You
                </span>
                <span className="text-[10px] font-mono text-[#7fe3fa] bg-[#7fe3fa]/10 px-2.5 py-0.5 rounded-full border border-[#7fe3fa]/20">
                  READY FOR PHASE 6
                </span>
              </div>
              <div className="border border-dashed border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-center text-center my-2">
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2 font-mono text-xs font-bold">
                  P6
                </div>
                <h4 className="text-sm font-bold text-stone-200">Regional Weather Grid Staged</h4>
                <p className="text-[11px] text-stone-500 max-w-xs mt-1">
                  Ogun, Ibadan, Oshogbo, and Ekiti weather telemetry cards will mount here in Phase 6.
                </p>
              </div>
              <span className="text-[10px] text-stone-600 font-mono">GRID: 4 COLUMNS</span>
            </div>
          </div>
        </main>

        {/* ========================================================================= */}
        {/* MOBILE VIEWPORT: High-End Cinematic Monolith (Image 4 Inspired)           */}
        {/* ========================================================================= */}
        <main className="md:hidden flex-1 px-4 pt-1 pb-6 flex flex-col justify-between overflow-y-auto relative">
          {/* Dynamic Ambient Glow Behind Hero Card */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#7fe3fa]/15 rounded-full blur-[90px] pointer-events-none" />

          {/* Header & Main Live Reading */}
          <div className="text-center pt-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-1">
              <Sparkles className="w-3 h-3 text-[#7fe3fa]" />
              <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">
                {mobileSelectedIdx === 0 ? 'Live Telemetry' : `${activeMobileDay.dayLong} Forecast`}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white mt-0.5">{locationMeta.name}, {locationMeta.country}</h2>
            
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="temp-val text-6xl text-white">
                <span>{currentNumeric}</span>
                <span className="temp-deg">°</span>
              </div>
              <span className="text-[11px] font-bold text-[#7fe3fa] px-3 py-0.5 rounded-full bg-[#7fe3fa]/10 border border-[#7fe3fa]/20">
                {activeMobileDay.condition.label}
              </span>
            </div>
          </div>

          {/* High-End Tactile 3D Weather Glass Deck (Image 4 Style) */}
          <motion.div
            layout
            className="relative mx-auto w-full max-w-sm rounded-[34px] bg-gradient-to-b from-[#171c26] via-[#10131a] to-[#0a0c10] border border-white/[0.09] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between my-3 min-h-[255px] overflow-hidden"
          >
            {/* Top Atmospheric Micro Beam */}
            <div className="absolute top-0 inset-x-10 h-[1.5px] bg-gradient-to-r from-transparent via-[#7fe3fa]/60 to-transparent" />

            {/* Central Animated Weather Artifact */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMobileDay.condition.type}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -10 }}
                transition={{ duration: 0.25 }}
                className="my-3 w-full flex items-center justify-center drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
              >
                {getWeather3DComponent(activeMobileDay.condition.type, 96)}
              </motion.div>
            </AnimatePresence>

            {/* Frosted Biometric Telemetry Matrix */}
            <div className="w-full grid grid-cols-3 gap-2.5 pt-4 border-t border-white/[0.07] text-center">
              <div className="p-2.5 rounded-2xl bg-white/[0.025] border border-white/[0.04]">
                <Wind className="w-4 h-4 text-stone-400 mx-auto" />
                <span className="text-[9px] text-stone-400 block mt-1">Wind</span>
                <span className="text-xs font-bold text-white">
                  {current?.wind_speed_10m ? `${Math.round(current.wind_speed_10m)} km/h` : '14 km/h'}
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/[0.025] border border-white/[0.04]">
                <Droplets className="w-4 h-4 text-[#7fe3fa] mx-auto" />
                <span className="text-[9px] text-stone-400 block mt-1">Humidity</span>
                <span className="text-xs font-bold text-white">
                  {mobileSelectedIdx === 0 ? (current?.relative_humidity_2m ?? '90') : '65'}%
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/[0.025] border border-white/[0.04]">
                <Gauge className="w-4 h-4 text-amber-400 mx-auto" />
                <span className="text-[9px] text-stone-400 block mt-1">Pressure</span>
                <span className="text-xs font-bold text-white">
                  {current?.surface_pressure ? `${Math.round(current.surface_pressure)} hPa` : '1012 hPa'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Tap-to-Inspect 5-Day Mini Deck */}
          <div className="w-full rounded-[28px] bg-[#111317] border border-white/[0.06] p-3.5">
            <div className="flex items-center justify-between text-xs font-bold px-1 mb-2.5">
              <span className="text-stone-300">Upcoming Forecast</span>
              <span className="text-[#7fe3fa] text-[10px] font-mono tracking-wider">TAP TO INSPECT</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {daysList.slice(1, 6).map((item) => {
                const isSelected = mobileSelectedIdx === item.idx;
                const formattedPillTemp = formatTemp(item.maxT).replace('°', '');

                return (
                  <button
                    key={item.idx}
                    onClick={() => setMobileSelectedIdx(item.idx)}
                    className={`py-2.5 px-1 rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1a202c] border border-[#7fe3fa]/60 shadow-[0_0_15px_rgba(127,227,250,0.2)]'
                        : 'bg-white/[0.02] border border-white/[0.02]'
                    }`}
                  >
                    <span className={`text-[10px] font-semibold ${isSelected ? 'text-[#7fe3fa]' : 'text-stone-400'}`}>
                      {item.dayLabel}
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center">
                      {getWeather3DComponent(item.condition.type, 32)}
                    </div>
                    <div className="temp-val text-xs text-white">
                      <span>{formattedPillTemp}</span>
                      <span className="temp-deg">°</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}