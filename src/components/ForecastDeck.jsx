import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWeather3DComponent } from './WeatherIcons';
import { RotateCcw } from 'lucide-react';

const ForecastDeck = memo(function ForecastDeck({
  weatherData,
  formatTemp,
  interpretWeatherCode,
  selectedIdx = 0,
  setSelectedIdx,
  timeFilter = 'Today'
}) {
  const current = weatherData?.current;
  const daily = weatherData?.daily;

  const todayDate = new Date();
  const timeString = todayDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Map full 7-day sequence from Open-Meteo
  const allDays = (daily?.time || []).slice(0, 7).map((timeStr, idx) => {
    const d = new Date(timeStr);
    const dayNameLong = d.toLocaleDateString('en-US', { weekday: 'long' });
    const dayNameShort = d.toLocaleDateString('en-US', { weekday: 'short' });
    const wCode = daily.weather_code?.[idx] ?? (current?.weather_code ?? 0);
    const condition = interpretWeatherCode(wCode);
    const maxT = daily.temperature_2m_max?.[idx] ?? 25;
    const rainProb = daily.precipitation_probability_max?.[idx] ?? 15;

    return {
      idx,
      dayLong: idx === 0 ? todayDate.toLocaleDateString('en-US', { weekday: 'long' }) : dayNameLong,
      dayShort: idx === 0 ? 'Today' : dayNameShort,
      condition,
      maxT,
      rainProb
    };
  });

  const activeDay = allDays[selectedIdx] || allDays[0] || {
    dayLong: todayDate.toLocaleDateString('en-US', { weekday: 'long' }),
    condition: { label: 'Clear Sky', type: 'sun' },
    maxT: 26
  };

  const isTodayActive = selectedIdx === 0;

  const activeTempVal = isTodayActive && current?.temperature_2m !== undefined
    ? formatTemp(current.temperature_2m).replace('°', '')
    : formatTemp(activeDay.maxT).replace('°', '');

  const apparentTempVal = isTodayActive && current?.apparent_temperature !== undefined
    ? formatTemp(current.apparent_temperature)
    : formatTemp(activeDay.maxT + 2);

  // If user selected "Next 7 days", show all 6 upcoming days in pillars, otherwise first 5
  const visiblePillars = timeFilter === 'Next 7 days' ? allDays.slice(1, 7) : allDays.slice(1, 6);

  return (
    <div className="w-full flex items-stretch gap-4 h-[240px]">
      {/* 1. Hero Card */}
      <motion.div
        layout
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedIdx(0)}
        title={!isTodayActive ? "Click to return to Today (Live)" : "Live conditions active"}
        className="w-[215px] shrink-0 p-5 rounded-[28px] bg-[#8fe6fa] text-zinc-950 flex flex-col justify-between shadow-[0_15px_35px_rgba(143,230,250,0.25)] select-none transition-all cursor-pointer relative overflow-hidden group"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-800">
            <span className="flex items-center gap-1.5">
              {activeDay.dayLong}
              {!isTodayActive && (
                <RotateCcw className="w-3 h-3 text-zinc-700 opacity-60 group-hover:opacity-100 transition-opacity" />
              )}
            </span>
            <span className="font-mono text-[11px] font-semibold">
              {isTodayActive ? timeString : (
                <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded-full font-bold">
                  RESET
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2.5">
            <div className="temp-val text-[48px] text-zinc-950">
              <span>{activeTempVal}</span>
              <span className="temp-deg">°</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay.condition.type}
                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -5 }}
                transition={{ duration: 0.2 }}
                className="transform scale-110 drop-shadow-md"
              >
                {getWeather3DComponent(activeDay.condition.type, 54)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-0.5 text-[11px] font-semibold text-zinc-900/95 pt-2.5 border-t border-black/10 relative z-10">
          <div className="flex justify-between">
            <span>Real feel:</span>
            <span className="font-bold">{apparentTempVal}</span>
          </div>
          <div className="flex justify-between">
            <span>Humidity:</span>
            <span className="font-bold">{isTodayActive ? (current?.relative_humidity_2m ?? '90') : `${activeDay.rainProb + 30}`}%</span>
          </div>
          <div className="flex justify-between">
            <span>Pressure:</span>
            <span className="font-bold">{current?.surface_pressure ? `${Math.round(current.surface_pressure)}MB` : '1012MB'}</span>
          </div>
          <div className="flex justify-between">
            <span>Wind NE:</span>
            <span className="font-bold">{current?.wind_speed_10m ? `${Math.round(current.wind_speed_10m)}km/h` : '14km/h'}</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Forecast Monolith Capsules */}
      <div className={`flex-1 grid ${visiblePillars.length === 6 ? 'grid-cols-6' : 'grid-cols-5'} gap-3 h-full`}>
        {visiblePillars.map((item) => {
          const isSelected = selectedIdx === item.idx;
          const pillNumeric = formatTemp(item.maxT).replace('°', '');

          return (
            <motion.div
              key={item.idx}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedIdx(item.idx)}
              className={`p-3 rounded-[26px] flex flex-col items-center justify-between transition-all cursor-pointer select-none h-full relative ${
                isSelected
                  ? 'bg-[#191f2c] border border-[#7fe3fa]/70 shadow-[0_0_25px_rgba(127,227,250,0.25)]'
                  : 'bg-[#111317] border border-white/[0.04] hover:bg-[#151820]'
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 w-1.5 h-1.5 rounded-full bg-[#7fe3fa] shadow-[0_0_6px_#7fe3fa]" />
              )}

              <span className={`text-xs font-semibold ${isSelected ? 'text-[#7fe3fa]' : 'text-stone-400'}`}>
                {item.dayShort}
              </span>

              <div className="my-auto transform hover:scale-115 transition-transform drop-shadow-lg">
                {getWeather3DComponent(item.condition.type, 46)}
              </div>

              <div className="temp-val text-base text-white">
                <span>{pillNumeric}</span>
                <span className="temp-deg">°</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

export default ForecastDeck;