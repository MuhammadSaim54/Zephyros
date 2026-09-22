import React, { useState } from 'react';
import TacticalDock from './components/TacticalDock';
import TopCommandBar from './components/TopCommandBar';
import ForecastDeck from './components/ForecastDeck';
import PrecipitationSpline from './components/PrecipitationSpline';
import GlobalSynopticMap from './components/GlobalSynopticMap';
import {
  getWeather3DComponent,
  DynamicCharacterCloud
} from './components/WeatherIcons';
import { useWeatherData } from './hooks/useWeatherData';
import {
  Activity,
  Compass,
  CloudRain,
  MapPin,
  RotateCcw,
  LayoutDashboard,
  Globe
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('global');
  const [timeFilter, setTimeFilter] = useState('Today');
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  // Mobile Viewport State ('weather' | 'radar' | 'map' | 'cities' | 'telemetry')
  const [mobileViewport, setMobileViewport] = useState('weather');
  const [mobileTab, setMobileTab] = useState('hourly');

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
  const hourly = weatherData?.hourly;

  const handleTabSwitch = (tab) => {
    setTimeFilter(tab);
    if (tab === 'Today') {
      setSelectedDayIdx(0);
      setMobileTab('hourly');
    } else if (tab === 'Tomorrow') {
      setSelectedDayIdx(1);
      setMobileTab('hourly');
    } else if (tab === 'Next 7 days') {
      setSelectedDayIdx(2);
      setMobileTab('weekly');
    }
  };

  const daysList = (daily?.time || []).slice(0, 7).map((timeStr, idx) => {
    const d = new Date(timeStr);
    const dayLabel = idx === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayLong = d.toLocaleDateString('en-US', { weekday: 'long' });
    const code = daily.weather_code?.[idx] ?? (current?.weather_code ?? 0);
    const condition = interpretWeatherCode(code);
    const maxT = daily.temperature_2m_max?.[idx] ?? 26;
    const minT = daily.temperature_2m_min?.[idx] ?? 19;

    return { idx, dayLabel, dayLong, condition, maxT, minT };
  });

  const activeDay = daysList[selectedDayIdx] || daysList[0] || {
    dayLong: 'Today',
    condition: { label: 'Clear Sky', type: 'sun' },
    maxT: 26,
    minT: 19
  };

  const currentTempFormatted = selectedDayIdx === 0 && current?.temperature_2m !== undefined
    ? formatTemp(current.temperature_2m)
    : formatTemp(activeDay.maxT);
  const currentNumeric = currentTempFormatted.replace('°', '');

  return (
    <div className="h-screen w-screen max-h-screen bg-[#000000] text-white flex overflow-hidden font-sans select-none relative">
      {/* 1. Desktop Tactical Left Capsule Dock (>= 1200px) */}
      <div className="hidden xl:flex h-full">
        <TacticalDock
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
      </div>

      {/* 2. Main Workstation Canvas (100vh Locked) */}
      <div className="flex-1 flex flex-col min-w-0 h-full max-h-screen overflow-hidden">
        {/* Top Command Bar */}
        <TopCommandBar
          currentLocation={cityQuery}
          onSearchSubmit={handleCitySearch}
          unit={unit}
          onToggleUnit={toggleUnit}
        />

        {/* ========================================================================= */}
        {/* DESKTOP VIEWPORT: 100vh Rigid Grid (Zero Scroll, No Overflow)             */}
        {/* ========================================================================= */}
        <main className="hidden xl:grid grid-rows-[auto_1fr_1fr] gap-3.5 flex-1 px-6 pb-4 pt-1 max-w-[1600px] w-full mx-auto min-h-0 overflow-hidden">
          {/* Section A: Time Range Tabs */}
          <div className="flex items-center gap-7 text-xs font-bold tracking-wide shrink-0">
            {['Today', 'Tomorrow', 'Next 7 days'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabSwitch(tab)}
                className={`transition-colors cursor-pointer ${
                  timeFilter === tab ? 'text-white' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Row 1: Forecast Horizon (8 cols) + Chance of Rain Spline (4 cols) */}
          <div className="grid grid-cols-12 gap-3.5 items-stretch min-h-0 h-full overflow-hidden">
            <div className="col-span-8 flex items-stretch h-full min-h-0">
              <ForecastDeck
                weatherData={weatherData}
                formatTemp={formatTemp}
                interpretWeatherCode={interpretWeatherCode}
                unit={unit}
                selectedIdx={selectedDayIdx}
                setSelectedIdx={(idx) => {
                  setSelectedDayIdx(idx);
                  if (idx === 0) setTimeFilter('Today');
                  else if (idx === 1) setTimeFilter('Tomorrow');
                  else setTimeFilter('Next 7 days');
                }}
                timeFilter={timeFilter}
              />
            </div>

            <div className="col-span-4 flex items-stretch h-full min-h-0">
              <div className="w-full h-full min-h-0">
                <PrecipitationSpline hourlyData={weatherData?.hourly} className="h-full" />
              </div>
            </div>
          </div>

          {/* Row 2: Global Map (8 cols) + Phase 6 Cities Staged (4 cols) */}
          <div className="grid grid-cols-12 gap-3.5 items-stretch min-h-0 h-full overflow-hidden">
            {/* Phase 5: Global Synoptic Map (8 cols) */}
            <div className="col-span-8 flex items-stretch h-full min-h-0">
              <GlobalSynopticMap onSelectCity={(c) => handleCitySearch(c)} />
            </div>

            {/* Phase 6 Staged Slot: Cities Close to You (4 cols) */}
            <div className="col-span-4 p-4 rounded-[26px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between h-full min-h-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#7fe3fa]" />
                  Phase 6 • Cities Close to You
                </span>
                <span className="text-[10px] font-mono text-[#7fe3fa] bg-[#7fe3fa]/10 px-2 py-0.5 rounded-full border border-[#7fe3fa]/20">
                  READY FOR PHASE 6
                </span>
              </div>
              <div className="border border-dashed border-white/[0.08] rounded-2xl p-4 flex flex-col items-center justify-center text-center my-auto">
                <div className="w-9 h-9 rounded-xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-1 font-mono text-xs font-bold">
                  P6
                </div>
                <h4 className="text-xs font-bold text-stone-200">Regional Weather Grid Staged</h4>
                <p className="text-[10px] text-stone-500 max-w-xs mt-0.5">
                  Ogun, Ibadan, Oshogbo, and Ekiti will mount here in Phase 6.
                </p>
              </div>
              <span className="text-[9px] text-stone-600 font-mono">GRID: 4 COLUMNS</span>
            </div>
          </div>
        </main>

        {/* ========================================================================= */}
        {/* TABLET & MOBILE VIEWPORT (Smooth Scroll + Dynamic Weather Binding)        */}
        {/* ========================================================================= */}
        <main className="xl:hidden flex-1 px-4 sm:px-8 md:px-12 pt-1 pb-28 overflow-y-auto overflow-x-hidden relative max-w-xl md:max-w-2xl mx-auto w-full">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#7fe3fa]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* VIEWPORT: WEATHER */}
          {mobileViewport === 'weather' && (
            <div className="w-full flex flex-col items-center gap-4 py-1">
              <div className="text-center relative z-10 shrink-0">
                <button
                  onClick={() => setSelectedDayIdx(0)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] mb-1 cursor-pointer hover:border-[#7fe3fa]/40 transition-colors"
                >
                  <span className="text-[10px] md:text-xs font-bold text-stone-400 tracking-wider uppercase">
                    {selectedDayIdx === 0 ? 'Live Station Telemetry' : `${activeDay.dayLong} Forecast`}
                  </span>
                  {selectedDayIdx !== 0 && (
                    <RotateCcw className="w-2.5 h-2.5 text-[#7fe3fa]" />
                  )}
                </button>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                  {locationMeta.name}, {locationMeta.country}
                </h1>

                <div className="flex items-center justify-center">
                  <div className="temp-val text-[64px] sm:text-[76px] md:text-[88px] text-white leading-none">
                    <span>{currentNumeric}</span>
                    <span className="temp-deg text-[32px] sm:text-[40px] md:text-[46px]">°</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-bold text-stone-300">
                  {activeDay.condition.label}
                </p>
                <p className="text-[10px] sm:text-xs font-mono text-stone-400">
                  H:{formatTemp(activeDay.maxT)} L:{formatTemp(activeDay.minT || 18)}
                </p>
              </div>

              {/* 3D Mascot */}
              <div className="my-1 flex items-center justify-center shrink-0">
                <DynamicCharacterCloud conditionType={activeDay.condition.type} size="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56" />
              </div>

              {/* Segmented Controls */}
              <div className="w-full bg-[#111317] p-1 rounded-full border border-white/[0.06] flex items-center justify-between shrink-0">
                <button
                  onClick={() => {
                    setMobileTab('hourly');
                    setTimeFilter('Today');
                  }}
                  className={`flex-1 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    mobileTab === 'hourly'
                      ? 'bg-[#1b2332] text-[#7fe3fa] border border-[#7fe3fa]/40 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Hourly Forecast
                </button>
                <button
                  onClick={() => {
                    setMobileTab('weekly');
                    setTimeFilter('Next 7 days');
                  }}
                  className={`flex-1 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    mobileTab === 'weekly'
                      ? 'bg-[#1b2332] text-[#7fe3fa] border border-[#7fe3fa]/40 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Weekly Forecast (7 Days)
                </button>
              </div>

              {/* Dynamic Weather API Hourly / Weekly Strip */}
              {mobileTab === 'hourly' ? (
                <div className="w-full flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
                  {(hourly?.time || []).slice(10, 16).map((timeStr, i) => {
                    const dateObj = new Date(timeStr);
                    const timeFormatted = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true });
                    const wCode = hourly.weather_code?.[10 + i] ?? 0;
                    const condition = interpretWeatherCode(wCode);
                    const tempVal = Math.round(hourly.temperature_2m?.[10 + i] ?? 24);
                    const prob = hourly.precipitation_probability?.[10 + i] ?? ((i + 1) * 12);
                    const isMidSlot = i === 2;

                    return (
                      <div
                        key={i}
                        className={`flex-1 min-w-[70px] py-3 px-1 rounded-2xl flex flex-col items-center justify-between gap-1.5 border ${
                          isMidSlot
                            ? 'bg-[#1b2332] border-[#7fe3fa]/60 shadow-[0_0_15px_rgba(127,227,250,0.18)]'
                            : 'bg-[#111317] border-white/[0.04]'
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${isMidSlot ? 'text-[#7fe3fa]' : 'text-stone-400'}`}>
                          {timeFormatted}
                        </span>
                        <div className="h-10 w-full flex items-center justify-center my-0.5 shrink-0">
                          {getWeather3DComponent(condition.type, 38)}
                        </div>
                        <span className="text-[10px] font-mono text-[#7fe3fa] font-bold">
                          {prob}%
                        </span>
                        <span className="text-xs font-bold text-white">
                          {formatTemp(tempVal)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
                  {daysList.map((d, i) => {
                    const isSelected = selectedDayIdx === d.idx;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDayIdx(d.idx)}
                        className={`flex-1 min-w-[70px] py-3 px-1 rounded-2xl flex flex-col items-center justify-between gap-1.5 border cursor-pointer ${
                          isSelected
                            ? 'bg-[#1b2332] border-[#7fe3fa]/60 shadow-[0_0_15px_rgba(127,227,250,0.18)]'
                            : 'bg-[#111317] border-white/[0.04]'
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${isSelected ? 'text-[#7fe3fa]' : 'text-stone-400'}`}>
                          {d.dayLabel}
                        </span>
                        <div className="h-10 w-full flex items-center justify-center my-0.5 shrink-0">
                          {getWeather3DComponent(d.condition.type, 38)}
                        </div>
                        <span className="text-xs font-bold text-white">
                          {formatTemp(d.maxT)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Live Rain Spline */}
              <div className="w-full shrink-0">
                <PrecipitationSpline hourlyData={hourly} className="h-[200px] md:h-[220px]" />
              </div>

              {/* Mobile Global Map Card */}
              <div className="w-full h-[220px] shrink-0 mt-2">
                <GlobalSynopticMap onSelectCity={(c) => handleCitySearch(c)} />
              </div>
            </div>
          )}

          {/* VIEWPORT: RADAR */}
          {mobileViewport === 'radar' && (
            <div className="w-full space-y-4 pt-4">
              <div className="text-center mb-3">
                <span className="text-[10px] md:text-xs font-bold text-[#7fe3fa] tracking-widest uppercase">Atmospheric Wave</span>
                <h2 className="text-xl md:text-2xl font-extrabold text-white">Precipitation Telemetry</h2>
              </div>
              <PrecipitationSpline hourlyData={hourly} className="h-[260px] md:h-[300px]" />
            </div>
          )}

          {/* VIEWPORT: GLOBAL MAP DIRECT VIEW */}
          {mobileViewport === 'map' && (
            <div className="w-full space-y-4 pt-4">
              <div className="text-center mb-3">
                <span className="text-[10px] md:text-xs font-bold text-[#7fe3fa] tracking-widest uppercase">Worldwide Radar</span>
                <h2 className="text-xl md:text-2xl font-extrabold text-white">Global Synoptic Map</h2>
              </div>
              <div className="w-full h-[320px]">
                <GlobalSynopticMap onSelectCity={(c) => handleCitySearch(c)} />
              </div>
            </div>
          )}

          {/* VIEWPORT: CITIES */}
          {mobileViewport === 'cities' && (
            <div className="w-full space-y-3 pt-4">
              <div className="text-center mb-3">
                <span className="text-[10px] md:text-xs font-bold text-[#7fe3fa] tracking-widest uppercase">Regional Hub</span>
                <h2 className="text-xl md:text-2xl font-extrabold text-white">Cities Close To You</h2>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { name: 'Ogun', cond: 'Cloudy', type: 'cloud', temp: 19 },
                  { name: 'Ibadan', cond: 'Raining', type: 'rain', temp: 26 },
                  { name: 'Oshogbo', cond: 'Snowing', type: 'snow', temp: -2 },
                  { name: 'Ekiti', cond: 'Humid', type: 'sun', temp: 12 },
                ].map((c, i) => (
                  <div key={i} className="p-4.5 rounded-[24px] bg-[#111317] border border-white/[0.05] flex flex-col justify-between h-32">
                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">Nigeria</span>
                      <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400">{c.cond}</span>
                      <div className="w-7 h-7 flex items-center justify-center">
                        {getWeather3DComponent(c.type, 26)}
                      </div>
                      <span className="text-base font-black text-white">{formatTemp(c.temp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEWPORT: SENSORS */}
          {mobileViewport === 'telemetry' && (
            <div className="w-full space-y-4 pt-4">
              <div className="text-center mb-3">
                <span className="text-[10px] md:text-xs font-bold text-[#7fe3fa] tracking-widest uppercase">Telemetry Sensors</span>
                <h2 className="text-xl md:text-2xl font-extrabold text-white">Atmospheric Biometrics</h2>
              </div>
              <div className="p-5 rounded-[28px] bg-[#111317] border border-white/[0.05]">
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Air Quality</span>
                <h3 className="text-base font-extrabold text-white mt-1">3 - Low Health Risk</h3>
                <div className="w-full h-2 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-rose-500 mt-3 mb-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-[28px] bg-[#111317] border border-white/[0.05] flex flex-col justify-between h-32">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">UV Index</span>
                  <div>
                    <span className="text-2xl font-black text-white block">4</span>
                    <span className="text-xs text-stone-400">Moderate</span>
                  </div>
                </div>
                <div className="p-5 rounded-[28px] bg-[#111317] border border-white/[0.05] flex flex-col justify-between h-32">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Sunrise</span>
                  <div>
                    <span className="text-xl font-black text-white block">5:28 AM</span>
                    <span className="text-[10px] text-stone-500 font-mono">Sunset: 7:25 PM</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Tactical Dock */}
          <div className="fixed bottom-4 md:bottom-5 inset-x-4 sm:inset-x-16 md:inset-x-24 z-40 pointer-events-auto">
            <div className="w-full max-w-md mx-auto h-16 rounded-full bg-[#111317]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-around px-4">
              <button
                onClick={() => setMobileViewport('weather')}
                className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                  mobileViewport === 'weather' ? 'text-[#7fe3fa]' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                <Compass className="w-5 h-5 stroke-[2]" />
                <span className="text-[9px] font-bold">Weather</span>
              </button>

              <button
                onClick={() => setMobileViewport('map')}
                className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                  mobileViewport === 'map' ? 'text-[#7fe3fa]' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                <Globe className="w-5 h-5 stroke-[2]" />
                <span className="text-[9px] font-bold">Map</span>
              </button>

              <button
                onClick={() => {
                  setMobileViewport('weather');
                  setSelectedDayIdx(0);
                }}
                className="w-12 h-12 rounded-full bg-[#7fe3fa] text-black flex items-center justify-center shadow-[0_0_22px_rgba(127,227,250,0.65)] transform -translate-y-2 hover:scale-105 transition-transform cursor-pointer"
                title="Live Weather Dashboard"
              >
                <LayoutDashboard className="w-6 h-6 stroke-[2.4]" />
              </button>

              <button
                onClick={() => setMobileViewport('radar')}
                className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                  mobileViewport === 'radar' ? 'text-[#7fe3fa]' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                <CloudRain className="w-5 h-5 stroke-[2]" />
                <span className="text-[9px] font-bold">Radar</span>
              </button>

              <button
                onClick={() => setMobileViewport('cities')}
                className={`flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                  mobileViewport === 'cities' ? 'text-[#7fe3fa]' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                <MapPin className="w-5 h-5 stroke-[2]" />
                <span className="text-[9px] font-bold">Cities</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}