import React, { useState } from 'react';
import TacticalDock from './components/TacticalDock';
import TopCommandBar from './components/TopCommandBar';
import { useWeatherData } from './hooks/useWeatherData';
import { Layers, Activity, CloudRain, Globe, Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('global');
  const [timeFilter, setTimeFilter] = useState('Today');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Phase 2 Live Weather Hook
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

  // Extract current telemetry values if available
  const current = weatherData?.current;
  const condition = current ? interpretWeatherCode(current.weather_code) : { label: 'Syncing...', type: 'sun' };
  const currentTempFormatted = current ? formatTemp(current.temperature_2m) : '--°';

  return (
    <div className="h-screen w-screen bg-[#000000] text-white flex overflow-hidden font-sans select-none">
      {/* 1. Tactical Capsule Dock */}
      <TacticalDock
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Command Bar with live Search and Unit controls */}
        <TopCommandBar
          currentLocation={cityQuery}
          onSearchSubmit={handleCitySearch}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          unit={unit}
          onToggleUnit={toggleUnit}
        />

        {/* Error Notification Bar (if API fails) */}
        {error && (
          <div className="mx-4 md:mx-7 my-1 py-2 px-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error} - Fallback telemetry active.</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DESKTOP VIEWPORT: 100vh Grid Lock                                         */}
        {/* ========================================================================= */}
        <main className="hidden md:flex flex-1 flex-col justify-between px-7 pb-6 pt-1 max-w-[1600px] w-full mx-auto overflow-hidden">
          {/* Time Navigation Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-xs font-bold tracking-wide">
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

            {/* Live Engine Status Badge */}
            <div className="flex items-center gap-2 text-[10px] font-mono">
              {loading ? (
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Connecting Open-Meteo Satellite...
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Atmospheric Feed: {locationMeta.name} ({currentTempFormatted})
                </span>
              )}
            </div>
          </div>

          {/* Row 1: Staged Slots ready to receive Weather Engine Data */}
          <div className="grid grid-cols-12 gap-4 lg:gap-5 items-stretch">
            {/* Phase 3 Slot */}
            <div className="col-span-8 p-6 rounded-[28px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#7fe3fa]" />
                  Phase 3 • Hero Condition & 7-Day Forecast Horizon
                </span>
                <span className="text-[10px] font-mono text-[#7fe3fa] bg-[#7fe3fa]/10 px-2.5 py-0.5 rounded-full border border-[#7fe3fa]/20">
                  ENGINE ONLINE
                </span>
              </div>
              <div className="border border-dashed border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-center text-center my-2">
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2 font-mono text-sm font-black">
                  {currentTempFormatted}
                </div>
                <h4 className="text-sm font-bold text-stone-200">
                  {locationMeta.name}: {condition.label}
                </h4>
                <p className="text-[11px] text-stone-500 max-w-sm mt-1">
                  Humidity: {current?.relative_humidity_2m ?? '--'}% • Pressure: {current?.surface_pressure ?? '--'} hPa • Wind: {current?.wind_speed_10m ?? '--'} km/h
                </p>
              </div>
              <span className="text-[10px] text-stone-600 font-mono">READY FOR 3D HERO CARDS MOUNTING</span>
            </div>

            {/* Phase 4 Slot */}
            <div className="col-span-4 p-6 rounded-[28px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                  <CloudRain className="w-3.5 h-3.5 text-[#7fe3fa]" />
                  Phase 4 • Chance of Rain
                </span>
                <span className="text-[10px] font-mono text-[#7fe3fa] bg-[#7fe3fa]/10 px-2.5 py-0.5 rounded-full border border-[#7fe3fa]/20">
                  ENGINE ONLINE
                </span>
              </div>
              <div className="border border-dashed border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-center text-center my-2">
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2 font-mono text-xs font-bold">
                  {weatherData?.hourly?.precipitation_probability?.[0] ?? 0}%
                </div>
                <h4 className="text-sm font-bold text-stone-200">Precipitation Telemetry Ready</h4>
                <p className="text-[11px] text-stone-500 max-w-xs mt-1">
                  24-Hour rain probability series loaded cleanly into state.
                </p>
              </div>
              <span className="text-[10px] text-stone-600 font-mono">READY FOR SPLINE CURVE MOUNTING</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-4 lg:gap-5 items-stretch">
            {/* Phase 5 Slot */}
            <div className="col-span-8 p-6 rounded-[28px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#7fe3fa]" />
                  Phase 5 • Global Synoptic Map
                </span>
                <span className="text-[10px] font-mono text-[#7fe3fa] bg-[#7fe3fa]/10 px-2.5 py-0.5 rounded-full border border-[#7fe3fa]/20">
                  COORDINATES MAPPED
                </span>
              </div>
              <div className="border border-dashed border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-center text-center my-2">
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2 font-mono text-xs font-bold">
                  GEO
                </div>
                <h4 className="text-sm font-bold text-stone-200">
                  Target: {locationMeta.latitude.toFixed(2)}°N, {locationMeta.longitude.toFixed(2)}°E
                </h4>
                <p className="text-[11px] text-stone-500 max-w-sm mt-1">
                  Global coordinate system synchronized with geocoding response.
                </p>
              </div>
              <span className="text-[10px] text-stone-600 font-mono">READY FOR WORLD VECTOR MAP</span>
            </div>

            {/* Phase 6 Slot */}
            <div className="col-span-4 p-6 rounded-[28px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#7fe3fa]" />
                  Phase 6 • Cities Close to You
                </span>
                <span className="text-[10px] font-mono text-[#7fe3fa] bg-[#7fe3fa]/10 px-2.5 py-0.5 rounded-full border border-[#7fe3fa]/20">
                  STANDBY
                </span>
              </div>
              <div className="border border-dashed border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-center text-center my-2">
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2 font-mono text-xs font-bold">
                  P6
                </div>
                <h4 className="text-sm font-bold text-stone-200">Regional Matrix Pending</h4>
                <p className="text-[11px] text-stone-500 max-w-xs mt-1">
                  Nearby regional city stations query pipeline established.
                </p>
              </div>
              <span className="text-[10px] text-stone-600 font-mono">READY FOR REGIONAL RADAR</span>
            </div>
          </div>
        </main>

        {/* ========================================================================= */}
        {/* MOBILE VIEWPORT: Live Data Connected                                      */}
        {/* ========================================================================= */}
        <main className="md:hidden flex-1 px-4 pt-2 pb-6 flex flex-col justify-between overflow-y-auto">
          <div className="text-center pt-2">
            <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">Current Station</span>
            <h2 className="text-lg font-extrabold text-white mt-0.5">{locationMeta.name}, {locationMeta.country}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-6xl font-black tracking-tighter text-white">
                {currentTempFormatted}
              </span>
              <span className="text-[11px] font-bold text-[#7fe3fa] px-3 py-0.5 rounded-full bg-[#7fe3fa]/10 border border-[#7fe3fa]/20">
                {condition.label}
              </span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-[30px] bg-[#111317] border border-white/[0.06] p-6 shadow-2xl flex flex-col items-center justify-center text-center my-3 min-h-[220px]">
            <div className="w-12 h-12 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-3 font-mono font-black text-sm">
              LIVE
            </div>
            <h3 className="text-base font-bold text-white">Live Meteorological Telemetry</h3>
            <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
              Humidity: {current?.relative_humidity_2m ?? '--'}% | Wind: {current?.wind_speed_10m ?? '--'} km/h | Pressure: {current?.surface_pressure ?? '--'} hPa
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-[#111317] border border-white/[0.06] p-4 text-center">
            <span className="text-xs font-bold text-stone-400">7-Day Forecast Horizon</span>
            <p className="text-[11px] text-emerald-400 mt-0.5 font-mono">
              {weatherData?.daily?.time?.length ?? 0} Days Telemetry Cached
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}