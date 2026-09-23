import React, { memo } from 'react';
import { getWeather3DComponent } from './WeatherIcons';
import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const ForecastDeck = memo(function ForecastDeck({
  weatherData,
  formatTemp,
  interpretWeatherCode,
  selectedIdx = 0,
  setSelectedIdx,
  theme = 'obsidian'
}) {
  const current = weatherData?.current;
  const daily = weatherData?.daily;

  const isLight = theme === 'light';
  const todayDate = new Date();
  const timeString = todayDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const allDays = (daily?.time || []).slice(0, 7).map((timeStr, idx) => {
    const d = new Date(timeStr);
    const dayNameLong = d.toLocaleDateString('en-US', { weekday: 'long' });
    const dayNameShort = d.toLocaleDateString('en-US', { weekday: 'short' });

    const wCode = idx === 0
      ? (current?.weather_code ?? daily?.weather_code?.[0] ?? 0)
      : (daily?.weather_code?.[idx] ?? 0);

    const condition = interpretWeatherCode ? interpretWeatherCode(wCode) : { label: 'Clear', type: 'sun' };
    const maxT = daily?.temperature_2m_max?.[idx] ?? (current?.temperature_2m ?? 26);
    const rainProb = daily?.precipitation_probability_max?.[idx] ?? 15;

    return {
      idx,
      dayLong: idx === 0 ? todayDate.toLocaleDateString('en-US', { weekday: 'long' }) : dayNameLong,
      dayShort: dayNameShort,
      condition,
      type: condition.type,
      maxT,
      rainProb
    };
  });

  const activeDay = allDays[selectedIdx] || allDays[0] || {
    dayLong: todayDate.toLocaleDateString('en-US', { weekday: 'long' }),
    type: 'sun',
    maxT: 26
  };

  const isTodayActive = selectedIdx === 0;

  const activeTempVal = isTodayActive && current?.temperature_2m !== undefined
    ? (formatTemp ? formatTemp(current.temperature_2m).replace('°', '') : Math.round(current.temperature_2m))
    : (formatTemp ? formatTemp(activeDay.maxT).replace('°', '') : Math.round(activeDay.maxT));

  const apparentTempVal = isTodayActive && current?.apparent_temperature !== undefined
    ? formatTemp(current.apparent_temperature)
    : (formatTemp ? formatTemp(activeDay.maxT + 2) : `${Math.round(activeDay.maxT + 2)}°`);

  const visiblePillars = allDays.slice(1, 6);

  return (
    <div className="w-full flex flex-col md:flex-row items-stretch gap-3 h-full select-none">
      {/* 1. Big Hero Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setSelectedIdx(0)}
        className={`w-full md:w-[210px] xl:w-[230px] 2xl:w-[250px] shrink-0 p-4 2xl:p-5 rounded-[28px] flex flex-col justify-between cursor-pointer relative overflow-hidden transition-all duration-300 min-h-[160px] md:min-h-0 ${
          isLight
            ? 'bg-gradient-to-br from-[#7be1f8] via-[#67d4f1] to-[#4ac6e8] text-slate-950 shadow-[0_12px_28px_rgba(74,198,232,0.3)]'
            : 'bg-gradient-to-br from-[#8fe6fa] via-[#7ae0f8] to-[#5cd2f0] text-zinc-950 shadow-[0_16px_36px_rgba(143,230,250,0.35)]'
        } ${isTodayActive ? 'ring-2 ring-white/90' : 'opacity-95 hover:opacity-100'}`}
      >
        <div className="absolute top-0 inset-x-4 h-[1px] bg-white/40 pointer-events-none" />
        <div>
          <div className="flex items-center justify-between text-xs 2xl:text-sm font-black text-zinc-900">
            <span className="flex items-center gap-1.5 truncate">
              {activeDay.dayLong}
              {!isTodayActive && <RotateCcw className="w-3 h-3 text-zinc-800 animate-spin" />}
            </span>
            <span className="font-mono text-[11px] 2xl:text-xs font-bold shrink-0">
              {isTodayActive ? timeString : 'Forecast'}
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="temp-val text-[44px] md:text-[48px] 2xl:text-[56px] text-zinc-950 leading-none">
              <span>{activeTempVal}</span>
              <span className="temp-deg">°</span>
            </div>

            <div className="transform scale-110 2xl:scale-125 shrink-0">
              {getWeather3DComponent(activeDay.type, 56, theme)}
            </div>
          </div>
        </div>

        <div className="space-y-0.5 text-[11px] 2xl:text-xs font-semibold text-zinc-900/95 pt-2 border-t border-black/15">
          <div className="flex justify-between">
            <span>Real feel:</span>
            <span className="font-bold">{apparentTempVal}</span>
          </div>
          <div className="flex justify-between">
            <span>Humidity:</span>
            <span className="font-bold">{isTodayActive ? (current?.relative_humidity_2m ?? '84') : `${activeDay.rainProb + 25}`}%</span>
          </div>
          <div className="flex justify-between">
            <span>Pressure:</span>
            <span className="font-bold">{current?.surface_pressure ? `${Math.round(current.surface_pressure)}MB` : '986MB'}</span>
          </div>
          <div className="flex justify-between">
            <span>Wind NE:</span>
            <span className="font-bold">{current?.wind_speed_10m ? `${Math.round(current.wind_speed_10m)}km/h` : '3km/h'}</span>
          </div>
        </div>
      </motion.div>

      {/* 2. 5 Monolith Pillars */}
      <div className="flex-1 flex md:grid md:grid-cols-5 gap-2.5 overflow-x-auto no-scrollbar min-h-[140px] md:min-h-0 items-stretch">
        {visiblePillars.map((item) => {
          const isSelected = selectedIdx === item.idx;
          const formattedTempNum = formatTemp ? formatTemp(item.maxT).replace('°', '') : String(Math.round(item.maxT));

          return (
            <div
              key={item.idx}
              onClick={() => setSelectedIdx(item.idx)}
              className={`min-w-[92px] md:min-w-0 flex-1 py-3.5 2xl:py-4 px-2 rounded-[26px] flex flex-col items-center justify-between cursor-pointer select-none transition-colors duration-200 group relative backdrop-blur-xl ${
                isSelected
                  ? isLight
                    ? 'bg-white border-2 border-sky-500 shadow-md'
                    : 'bg-[#181d29] border-2 border-[#7fe3fa]'
                  : isLight
                  ? 'bg-white/85 hover:bg-white border border-slate-200/90 hover:border-slate-300'
                  : 'bg-[#12151e]/90 hover:bg-[#161a24] border border-white/[0.06] hover:border-white/[0.14]'
              }`}
            >
              <div className="absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <span className={`text-xs 2xl:text-sm font-black tracking-wider uppercase pt-0.5 transition-colors ${
                isSelected
                  ? isLight ? 'text-sky-600' : 'text-[#7fe3fa]'
                  : isLight ? 'text-slate-500' : 'text-stone-300'
              }`}>
                {item.dayShort}
              </span>

              <div className="my-auto py-1 transform group-hover:scale-105 transition-transform duration-200">
                {getWeather3DComponent(item.type, 50, theme)}
              </div>

              <div className={`temp-val text-xl 2xl:text-2xl font-black pb-0.5 tracking-tight flex items-start leading-none ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>{formattedTempNum}</span>
                <span className="text-xs font-bold ml-0.5 mt-0.5">°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ForecastDeck;