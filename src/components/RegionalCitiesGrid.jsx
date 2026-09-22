import React, { memo, useState, useEffect } from 'react';
import { getWeather3DComponent } from './WeatherIcons';
import { ChevronRight, X, MapPin, Wind, Droplets, Thermometer, Loader2 } from 'lucide-react';

// Specialized Humid 3D Water Droplet
function HumidWaterDrop3D({ size = 30, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`shrink-0 overflow-visible select-none ${className}`}
      fill="none"
    >
      <defs>
        <radialGradient id="dropGlowGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#cffafe" />
          <stop offset="35%" stopColor="#38bdf8" />
          <stop offset="75%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>
      </defs>
      <path
        d="M 50,14 C 50,14 18,52 18,70 C 18,87.6 32.4,94 50,94 C 67.6,94 82,87.6 82,70 Z"
        fill="url(#dropGlowGrad)"
        filter="drop-shadow(0 6px 12px rgba(2,132,199,0.5))"
      />
      <ellipse cx="38" cy="48" rx="8" ry="14" transform="rotate(-25 38 48)" fill="#ffffff" opacity="0.65" />
      <circle cx="62" cy="74" r="5" fill="#ffffff" opacity="0.3" />
    </svg>
  );
}

// Map WMO code to friendly condition & icon
function getConditionMeta(code) {
  if (code === 0) return { label: 'Clear Sky', type: 'sun' };
  if ([1, 2].includes(code)) return { label: 'Partly Cloudy', type: 'sun' };
  if (code === 3) return { label: 'Cloudy', type: 'cloud' };
  if ([45, 48].includes(code)) return { label: 'Foggy', type: 'cloud' };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { label: 'Raining', type: 'rain' };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snowing', type: 'snow' };
  if ([95, 96, 99].includes(code)) return { label: 'Thunder', type: 'thunder' };
  return { label: 'Humid', type: 'humid' };
}

const RegionalCitiesGrid = memo(function RegionalCitiesGrid({
  locationMeta,
  onSelectCity,
  formatTemp
}) {
  const [nearbyCities, setNearbyCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lat = locationMeta?.latitude;
  const lon = locationMeta?.longitude;
  const currentCity = locationMeta?.name || 'City';
  const country = locationMeta?.country || '';

  useEffect(() => {
    if (!lat || !lon) return;

    let isMounted = true;
    setLoading(true);

    async function fetchDynamicNearbyStations() {
      try {
        // 1. Generate 6 radial surrounding coordinates (approx 25km - 60km offsets)
        const offsets = [
          { dLat: 0.28, dLon: 0.18 },
          { dLat: -0.25, dLon: 0.32 },
          { dLat: 0.35, dLon: -0.28 },
          { dLat: -0.32, dLon: -0.22 },
          { dLat: 0.48, dLon: 0.05 },
          { dLat: -0.15, dLon: 0.45 },
        ];

        // 2. Reverse geocode offsets concurrently via BigDataCloud / Open-Meteo reverse geocoding
        const namePromises = offsets.map(async (off) => {
          const targetLat = (lat + off.dLat).toFixed(4);
          const targetLon = (lon + off.dLon).toFixed(4);
          try {
            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${targetLat}&longitude=${targetLon}&localityLanguage=en`
            );
            const geoData = await geoRes.json();
            const cityName =
              geoData.locality ||
              geoData.city ||
              geoData.principalSubdivision ||
              `Station ${Math.abs(off.dLat * 100).toFixed(0)}`;
            return {
              lat: targetLat,
              lon: targetLon,
              city: cityName,
              country: geoData.countryName || country
            };
          } catch {
            return {
              lat: targetLat,
              lon: targetLon,
              city: `Sub-Region ${Math.abs(off.dLon * 10).toFixed(0)}`,
              country
            };
          }
        });

        const rawStations = await Promise.all(namePromises);

        // Filter duplicates and exclude the active searched city itself
        const uniqueStations = [];
        const seenNames = new Set([currentCity.toLowerCase()]);
        for (const st of rawStations) {
          const lower = st.city.toLowerCase();
          if (!seenNames.has(lower) && st.city.trim().length > 1) {
            seenNames.add(lower);
            uniqueStations.push(st);
          }
          if (uniqueStations.length >= 6) break;
        }

        // 3. Concurrently fetch real live Open-Meteo telemetry for all discovered nearby stations
        const weatherPromises = uniqueStations.map(async (st) => {
          try {
            const wRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${st.lat}&longitude=${st.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
            );
            const wData = await wRes.json();
            const curr = wData.current || {};
            const cond = getConditionMeta(curr.weather_code ?? 0);

            return {
              ...st,
              temp: Math.round(curr.temperature_2m ?? 24),
              condition: cond.label,
              iconType: cond.type,
              wind: `${Math.round(curr.wind_speed_10m ?? 12)} km/h`,
              humidity: `${curr.relative_humidity_2m ?? 65}%`
            };
          } catch {
            return {
              ...st,
              temp: 24,
              condition: 'Partly Cloudy',
              iconType: 'sun',
              wind: '12 km/h',
              humidity: '65%'
            };
          }
        });

        const resolvedCities = await Promise.all(weatherPromises);

        if (isMounted) {
          setNearbyCities(resolvedCities);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load nearby stations:', err);
        if (isMounted) setLoading(false);
      }
    }

    fetchDynamicNearbyStations();

    return () => {
      isMounted = false;
    };
  }, [lat, lon, currentCity, country]);

  const fourVisible = nearbyCities.slice(0, 4);

  return (
    <>
      <div className="w-full h-full p-4 rounded-[26px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between select-none relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between z-10 shrink-0 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs lg:text-sm font-bold text-stone-200 tracking-wide">
              Cities close to you
            </span>
            {loading && (
              <Loader2 className="w-3.5 h-3.5 text-[#7fe3fa] animate-spin" />
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-[11px] font-semibold text-[#7fe3fa] hover:text-[#a5edfc] inline-flex items-center gap-0.5 cursor-pointer transition-colors"
          >
            See more
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* 2x2 Dynamic Cities Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2.5 flex-1 min-h-0">
          {loading && fourVisible.length === 0 ? (
            // Skeleton while fetching true nearby coordinates
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-3.5 rounded-[22px] bg-[#161a22]/60 border border-white/[0.03] animate-pulse flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="w-12 h-2.5 bg-white/[0.05] rounded-full" />
                  <div className="w-20 h-4 bg-white/[0.08] rounded-full" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-14 h-3 bg-white/[0.05] rounded-full" />
                  <div className="w-8 h-6 bg-white/[0.08] rounded-md" />
                </div>
              </div>
            ))
          ) : (
            fourVisible.map((c, i) => {
              const displayTemp = formatTemp ? formatTemp(c.temp) : `${c.temp}°`;
              const tempNum = displayTemp.replace('°', '');

              return (
                <div
                  key={i}
                  onClick={() => onSelectCity && onSelectCity(`${c.city}, ${c.country}`)}
                  className="p-3.5 rounded-[22px] bg-gradient-to-b from-[#1b1f28] to-[#12151b] border border-white/[0.05] hover:border-[#7fe3fa]/40 hover:bg-[#1f2430] flex flex-col justify-between cursor-pointer transition-all duration-200 group/card shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 pr-1">
                      <span className="text-[10px] font-bold text-stone-400 block tracking-tight truncate">
                        {c.country}
                      </span>
                      <h4 className="text-sm font-black text-white tracking-tight mt-0.5 group-hover/card:text-[#7fe3fa] transition-colors truncate">
                        {c.city}
                      </h4>
                    </div>

                    <div className="w-8 h-8 flex items-center justify-center shrink-0 group-hover/card:scale-115 transition-transform duration-200">
                      {c.iconType === 'humid' ? (
                        <HumidWaterDrop3D size={28} />
                      ) : (
                        getWeather3DComponent(c.iconType, 28)
                      )}
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-1">
                    <span className="text-[11px] font-medium text-stone-400 truncate">
                      {c.condition}
                    </span>

                    <div className="temp-val text-xl font-black text-white flex items-start leading-none tracking-tight shrink-0">
                      <span>{tempNum}</span>
                      <span className="text-xs font-bold ml-0.2 mt-0.5">°</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PREMIUM OBSIDIAN MODAL DIALOG ("See more" Viewport)                       */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#111317] border border-[#7fe3fa]/30 rounded-[32px] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(127,227,250,0.15)] flex flex-col gap-5 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Cyan Ambient Glow */}
            <div className="absolute top-0 right-1/4 w-72 h-28 bg-[#7fe3fa]/10 rounded-full blur-[60px] pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/30 flex items-center justify-center text-[#7fe3fa]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight">
                    Active Regional Stations
                  </h3>
                  <p className="text-xs text-stone-400">
                    Showing nearby live hubs within 60km of{' '}
                    <span className="text-[#7fe3fa] font-semibold">{currentCity}, {country}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Extended Cities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar z-10">
              {nearbyCities.map((cityItem, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectCity && onSelectCity(`${cityItem.city}, ${cityItem.country}`);
                    setIsModalOpen(false);
                  }}
                  className="p-4 rounded-[22px] bg-[#161a22] hover:bg-[#1d232e] border border-white/[0.06] hover:border-[#7fe3fa]/50 transition-all cursor-pointer group flex flex-col justify-between gap-3 shadow-sm hover:shadow-[0_0_20px_rgba(127,227,250,0.12)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 pr-1">
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block truncate">
                        {cityItem.country}
                      </span>
                      <h4 className="text-base font-extrabold text-white group-hover:text-[#7fe3fa] transition-colors mt-0.5 truncate">
                        {cityItem.city}
                      </h4>
                    </div>
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {cityItem.iconType === 'humid' ? (
                        <HumidWaterDrop3D size={32} />
                      ) : (
                        getWeather3DComponent(cityItem.iconType, 32)
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/[0.04] pt-2">
                    <div className="flex flex-col gap-0.5 text-[10px] text-stone-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Wind className="w-3 h-3 text-[#7fe3fa]" /> {cityItem.wind}
                      </span>
                      <span className="flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-sky-400" /> {cityItem.humidity}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-white">
                      {formatTemp ? formatTemp(cityItem.temp) : `${cityItem.temp}°`}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between text-xs text-stone-400 z-10">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Thermometer className="w-3.5 h-3.5 text-[#7fe3fa]" /> Click any card to switch main station telemetry
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-full bg-[#7fe3fa] text-black font-bold text-xs hover:bg-[#a5edfc] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default RegionalCitiesGrid;