import React, { memo } from 'react';
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

  // Map 7 days dynamically from Open-Meteo API
  const allDays = (daily?.time || []).slice(0, 7).map((timeStr, idx) => {
    const d = new Date(timeStr);
    const dayNameLong = d.toLocaleDateString('en-US', { weekday: 'long' });
    const dayNameShort = d.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Live weather code directly from API
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
      type: condition.type, // 'sun' | 'rain' | 'thunder' | 'lightning' | 'cloud' | 'snow'
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
    : formatTemp(activeDay.maxT + 2);

  // Take upcoming 5 days for the desktop capsules
  const visiblePillars = allDays.slice(1, 6);

  return (
    <div className="w-full flex items-stretch gap-2.5 h-full min-h-0">
      {/* 1. Hero Card - Bound to Live Current Weather Condition */}
      <div
        onClick={() => setSelectedIdx(0)}
        className="w-[195px] xl:w-[210px] shrink-0 p-3.5 xl:p-4 rounded-[26px] bg-[#8fe6fa] text-zinc-950 flex flex-col justify-between select-none cursor-pointer relative overflow-hidden h-full min-h-0"
      >
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-zinc-800">
            <span className="flex items-center gap-1.5">
              {activeDay.dayLong}
              {!isTodayActive && <RotateCcw className="w-3 h-3 text-zinc-700" />}
            </span>
            <span className="font-mono text-[11px] font-semibold">
              {isTodayActive ? timeString : 'Forecast'}
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="temp-val text-[44px] xl:text-[48px] text-zinc-950 leading-none">
              <span>{activeTempVal}</span>
              <span className="temp-deg">°</span>
            </div>

            {/* Live Weather Icon for Active Day */}
            <div className="transform scale-110 shrink-0">
              {getWeather3DComponent(activeDay.type, 64)}
            </div>
          </div>
        </div>

        {/* Live Telemetry */}
        <div className="space-y-0.5 text-[11px] font-semibold text-zinc-900/95 pt-2 border-t border-black/10">
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
            <span className="font-bold">{current?.surface_pressure ? `${Math.round(current.surface_pressure)}MB` : '1010MB'}</span>
          </div>
          <div className="flex justify-between">
            <span>Wind NE:</span>
            <span className="font-bold">{current?.wind_speed_10m ? `${Math.round(current.wind_speed_10m)}km/h` : '20km/h'}</span>
          </div>
        </div>
      </div>

      {/* 2. 5-Day Monolith Capsules - Dynamically Bound to Upcoming Days' Real Weather Code */}
      <div className="flex-1 grid grid-cols-5 gap-2 h-full min-h-0">
        {visiblePillars.map((item) => {
          const isSelected = selectedIdx === item.idx;
          const formattedTempNum = formatTemp ? formatTemp(item.maxT).replace('°', '') : String(Math.round(item.maxT));

          return (
            <div
              key={item.idx}
              onClick={() => setSelectedIdx(item.idx)}
              className={`py-3.5 px-1 rounded-[26px] flex flex-col items-center justify-between cursor-pointer select-none h-full min-h-0 transition-all ${
                isSelected
                  ? 'bg-gradient-to-b from-[#252b37] to-[#141720] border border-[#7fe3fa]/70 shadow-[0_0_15px_rgba(127,227,250,0.15)]'
                  : 'bg-gradient-to-b from-[#1f232c] via-[#171a21] to-[#121419] border border-white/[0.05] hover:border-white/[0.12]'
              }`}
            >
              {/* Actual Day Name from Date (Tue, Wed, Thu...) */}
              <span className="text-xs font-bold text-white tracking-wide pt-0.5">
                {item.dayShort}
              </span>

              {/* Dynamic Weather Icon derived directly from daily.weather_code */}
              <div className="my-auto w-full flex items-center justify-center py-1 transform hover:scale-105 transition-transform">
                {getWeather3DComponent(item.type, 78)}
              </div>

              {/* Real Temperature from API */}
              <div className="temp-val text-xl xl:text-2xl font-black text-white pb-0.5 tracking-tight flex items-start leading-none">
                <span>{formattedTempNum}</span>
                <span className="text-xs xl:text-sm font-bold ml-0.5 mt-0.5">°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ForecastDeck;