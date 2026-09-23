import React, { useState } from 'react';
import TopCommandBar from './components/TopCommandBar';
import WeatherHero from './components/WeatherHero';
import ForecastDeck from './components/ForecastDeck';
import PrecipitationSpline from './components/PrecipitationSpline';
import RegionalCitiesGrid from './components/RegionalCitiesGrid';
import AtmosphericFXEngine from './components/AtmosphericFXEngine';
import { useWeatherData } from './hooks/useWeatherData';

export default function App() {
  const [theme, setTheme] = useState('obsidian');
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const {
    locationMeta,
    cityQuery,
    weatherData,
    unit,
    formatTemp,
    toggleUnit,
    handleCitySearch,
    interpretWeatherCode
  } = useWeatherData('Kot Radha Kishan, Pakistan');

  const current = weatherData?.current;
  const daily = weatherData?.daily;
  const hourly = weatherData?.hourly;

  const activeTimeStr = daily?.time?.[selectedDayIdx];
  const activeDate = activeTimeStr ? new Date(activeTimeStr) : new Date();
  const dayName = selectedDayIdx === 0 ? 'Today' : activeDate.toLocaleDateString('en-US', { weekday: 'long' });

  const activeWeatherCode = selectedDayIdx === 0
    ? (current?.weather_code ?? 0)
    : (daily?.weather_code?.[selectedDayIdx] ?? 0);
  const activeCondition = interpretWeatherCode ? interpretWeatherCode(activeWeatherCode) : { label: 'Clear Sky', type: 'sun' };

  const activeTemp = selectedDayIdx === 0
    ? (current?.temperature_2m !== undefined ? formatTemp(current.temperature_2m) : '--°')
    : (daily?.temperature_2m_max?.[selectedDayIdx] !== undefined ? formatTemp(Math.round(daily.temperature_2m_max[selectedDayIdx])) : '--°');

  const windSpeed = current?.wind_speed_10m !== undefined ? `${Math.round(current.wind_speed_10m)} km/h` : '5 km/h';
  const humidity = current?.relative_humidity_2m !== undefined ? `${Math.round(current.relative_humidity_2m)}%` : '60%';
  const pressure = current?.surface_pressure !== undefined ? `${Math.round(current.surface_pressure)} hPa` : '986 hPa';

  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen xl:h-screen w-screen xl:max-h-screen overflow-x-hidden overflow-y-auto xl:overflow-hidden flex flex-col font-sans select-none relative transition-colors duration-400 ${
      isLight ? 'bg-[#edf2f7] text-slate-900' : 'bg-[#06070a] text-white'
    }`}>
      
      {/* 1. Cinematic Weather-Reactive Dynamic Engine */}
      <AtmosphericFXEngine conditionType={activeCondition.type} theme={theme} />

      {/* 2. Top Command Bar */}
      <TopCommandBar
        currentLocation={cityQuery}
        onSearchSubmit={handleCitySearch}
        unit={unit}
        onToggleUnit={toggleUnit}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'obsidian' ? 'light' : 'obsidian')}
      />

      {/* 3. Master Cockpit Layout (Clean Flow on Mobile, Proportional on 2150px) */}
      <main className="flex-1 w-full px-3 sm:px-5 2xl:px-8 pb-4 pt-0 flex flex-col xl:grid xl:grid-rows-[1.25fr_1fr] gap-3.5 2xl:gap-4 z-10">
        
        {/* ROW 1: Hero Telemetry + Rain Spline Curve */}
        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-3.5 2xl:gap-4 min-h-0">
          <div className="xl:col-span-8 min-h-[260px] md:min-h-0 h-full">
            <WeatherHero
              locationMeta={locationMeta}
              currentCondition={activeCondition}
              activeTemp={activeTemp}
              windSpeed={windSpeed}
              humidity={humidity}
              pressure={pressure}
              selectedDayIdx={selectedDayIdx}
              setSelectedDayIdx={setSelectedDayIdx}
              dayName={dayName}
              theme={theme}
            />
          </div>

          <div className="xl:col-span-4 min-h-[230px] md:min-h-0 h-full">
            <PrecipitationSpline
              hourlyData={hourly}
              className="h-full"
              theme={theme}
              conditionType={activeCondition.type}
            />
          </div>
        </div>

        {/* ROW 2: Forecast Deck (Hero + 5 Pillars) + Regional Cities Grid */}
        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-3.5 2xl:gap-4 min-h-0">
          
          {/* Forecast Deck */}
          <div className="xl:col-span-8 min-h-[310px] md:min-h-0 h-full">
            <ForecastDeck
              weatherData={weatherData}
              formatTemp={formatTemp}
              interpretWeatherCode={interpretWeatherCode}
              selectedIdx={selectedDayIdx}
              setSelectedIdx={setSelectedDayIdx}
              theme={theme}
            />
          </div>

          {/* Regional Cities Grid */}
          <div className="xl:col-span-4 min-h-[220px] md:min-h-0 h-full">
            <RegionalCitiesGrid
              locationMeta={locationMeta}
              onSelectCity={(target) => handleCitySearch(target)}
              formatTemp={formatTemp}
              theme={theme}
            />
          </div>
        </div>

      </main>
    </div>
  );
}