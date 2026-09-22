import React, { memo } from 'react';
import { getWeather3DComponent } from './WeatherIcons';

// Pins strictly calibrated to Natural Earth 2:1 aspect ratio projection
const MAP_PINS = [
  // 1. North America (US East / NY area) - Snow Cloud
  { id: 'na-snow', x: 23.5, y: 35.0, type: 'snow', isSun: false },
  // 2. Europe / North African Rim - Glowing Golden Solar Orb
  { id: 'eu-sun', x: 48.5, y: 28.0, isSun: true },
  // 3. Central Africa - Dark Thunderstorm Cloud
  { id: 'af-thunder', x: 51.5, y: 58.0, type: 'thunder', isSun: false },
  // 4. Middle East / Arabia - Soft Overcast Cloud
  { id: 'me-cloud', x: 60.5, y: 38.0, type: 'cloud', isSun: false },
  // 5. South America (Brazil) - Glowing Golden Solar Orb
  { id: 'sa-sun', x: 33.0, y: 68.0, isSun: true },
  // 6. Australia / Oceania - Rain Cloud
  { id: 'oc-rain', x: 82.5, y: 70.0, type: 'rain', isSun: false },
  // 7. North East Asia / Japan - Rain Cloud
  { id: 'ea-rain', x: 81.5, y: 30.0, type: 'rain', isSun: false }
];

const GlobalSynopticMap = memo(function GlobalSynopticMap({ onSelectCity }) {
  return (
    <div className="w-full h-full p-4 rounded-[26px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between select-none relative overflow-hidden group">
      {/* 1. Header (Clean, Zero Grids) */}
      <div className="flex items-center justify-between z-10 shrink-0 mb-1">
        <span className="text-xs lg:text-sm font-bold text-stone-200 tracking-wide">
          Global Map
        </span>
      </div>

      {/* 2. World Map Stage (Natural Aspect Ratio Preserved) */}
      <div className="relative flex-1 w-full min-h-0 overflow-hidden rounded-2xl bg-[#090b0e] flex items-center justify-center">
        {/* Aspect-Ratio Preserved World Map (object-cover prevents distortion while eliminating blank letterboxing) */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
          alt="Global World Map"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 filter brightness-0 invert pointer-events-none select-none transition-opacity duration-300"
        />

        {/* Soft Contrast Edges (Vignette) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090b0e]/70 via-transparent to-[#090b0e]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090b0e]/70 via-transparent to-[#090b0e]/70 pointer-events-none" />

        {/* Ambient Depth Glow on Key Hubs (Reference Image 12) */}
        <div className="absolute top-[26%] left-[47%] w-36 h-28 bg-amber-500/10 rounded-full blur-[45px] pointer-events-none" />
        <div className="absolute bottom-[24%] left-[31%] w-32 h-24 bg-amber-500/10 rounded-full blur-[45px] pointer-events-none" />

        {/* 3. Reference Image Weather Pins & Glowing Solar Orbs */}
        {MAP_PINS.map((pin) => (
          <div
            key={pin.id}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onClick={() => onSelectCity && onSelectCity(pin.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/pin"
          >
            {pin.isSun ? (
              /* Glowing Amber Solar Station (Reference Image 12) */
              <div className="relative flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-amber-500/30 animate-ping absolute pointer-events-none" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 border border-amber-200/90 shadow-[0_0_14px_#f59e0b] group-hover/pin:scale-125 transition-transform" />
              </div>
            ) : (
              /* 3D Realistic Weather Pin (Reference Image 12) */
              <div className="transform group-hover/pin:scale-130 transition-transform drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                {getWeather3DComponent(pin.type, 22)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default GlobalSynopticMap;