import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Droplets, Gauge, Eye, RotateCcw, Compass } from 'lucide-react';
import { getWeather3DComponent } from './WeatherIcons';

const WeatherHero = memo(function WeatherHero({
  locationMeta,
  currentCondition,
  activeTemp,
  windSpeed,
  humidity,
  pressure,
  selectedDayIdx,
  setSelectedDayIdx,
  dayName,
  theme = 'obsidian'
}) {
  const isLight = theme === 'light';
  const humidityNum = parseInt(humidity, 10) || 62;
  const windNum = parseInt(windSpeed, 10) || 12;

  // Weather-dependent internal halo color
  const heroGlow = currentCondition.type === 'thunder'
    ? 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, transparent 70%)'
    : currentCondition.type === 'rain'
    ? 'radial-gradient(circle, rgba(2, 132, 199, 0.35) 0%, transparent 70%)'
    : currentCondition.type === 'snow'
    ? 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)'
    : currentCondition.type === 'cloud'
    ? (isLight ? 'radial-gradient(circle, rgba(148, 163, 184, 0.3) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(100, 116, 139, 0.3) 0%, transparent 70%)')
    : 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)';

  return (
    <div
      className={`relative w-full h-full p-4 sm:p-5 2xl:p-7 rounded-[28px] border flex flex-col justify-between select-none overflow-hidden transition-all duration-300 backdrop-blur-2xl ${
        isLight
          ? 'bg-gradient-to-br from-white/95 via-white/90 to-slate-50/85 border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.05)]'
          : 'bg-gradient-to-br from-[#121622]/95 via-[#0e111a]/95 to-[#090b12]/95 border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)]'
      }`}
    >
      {/* 1. Internal Specular Light Sheen */}
      <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* 2. Weather Condition Volumetric Internal Glow (Strictly Dynamic) */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.32, 0.18] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute -top-12 -right-12 w-72 h-72 rounded-full blur-[70px] pointer-events-none"
        style={{ background: heroGlow }}
      />

      {/* 3. Header Sector */}
      <div className="flex items-start justify-between z-10 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[9px] 2xl:text-[11px] font-mono font-black tracking-widest uppercase border ${
                isLight
                  ? 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm'
                  : 'bg-[#7fe3fa]/10 border-[#7fe3fa]/30 text-[#7fe3fa] shadow-[0_0_12px_rgba(127,227,250,0.2)]'
              }`}
            >
              {selectedDayIdx === 0 ? 'Live Station Anchor' : `${dayName} Outlook`}
            </span>

            {selectedDayIdx !== 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setSelectedDayIdx(0)}
                className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] border-white/[0.08] text-stone-300 hover:text-white'
                }`}
              >
                <RotateCcw className="w-2.5 h-2.5 text-[#7fe3fa] animate-spin" />
                <span>Return to Live</span>
              </motion.button>
            )}
          </div>

          <h2
            className={`text-xl sm:text-2xl 2xl:text-3xl font-black tracking-tight mt-1 transition-colors ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {locationMeta.name}
            <span className="font-semibold opacity-60 text-base sm:text-xl 2xl:text-2xl ml-1">
              , {locationMeta.country}
            </span>
          </h2>

          <p className="text-[10px] sm:text-[11px] font-mono text-stone-400 mt-0.5 flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-[#7fe3fa]" />
            <span>
              {locationMeta.latitude?.toFixed(3)}°N, {locationMeta.longitude?.toFixed(3)}°E
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-300 font-semibold">{currentCondition.label}</span>
          </p>
        </div>

        {/* 3D Kinetic Weather Icon */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
            rotate: currentCondition.type === 'sun' ? [0, 4, -4, 0] : [0, 0, 0]
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 flex items-center justify-center shrink-0"
        >
          <div className="absolute inset-0 bg-[#7fe3fa]/10 rounded-full blur-xl pointer-events-none" />
          {getWeather3DComponent(currentCondition.type, 56, theme)}
        </motion.div>
      </div>

      {/* 4. Fluid Temperature Metric */}
      <div className="my-1 sm:my-2 z-10 flex items-baseline gap-4 flex-wrap shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTemp}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-start"
          >
            <span
              className={`temp-val text-[50px] sm:text-[60px] 2xl:text-[72px] tracking-tighter leading-none font-mono font-black ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {activeTemp}
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] 2xl:text-xs font-mono font-extrabold border shadow-sm ${
                isLight
                  ? 'bg-sky-50 border-sky-300 text-sky-800'
                  : 'bg-[#7fe3fa]/15 border-[#7fe3fa]/40 text-[#7fe3fa] shadow-[0_0_12px_rgba(127,227,250,0.25)]'
              }`}
            >
              {currentCondition.label}
            </span>
            <span className="text-[10px] 2xl:text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Optimal Feed
            </span>
          </div>

          <span className="text-[11px] 2xl:text-xs text-stone-400 font-mono block">
            Feels like {activeTemp} // Synoptic Calibrated Metric
          </span>
        </div>
      </div>

      {/* 5. 4 Micro-Telemetry Gauges with Weather Dynamic Sine Progress */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 2xl:gap-3 z-10 pt-2 border-t border-white/[0.06] shrink-0">
        {/* Wind */}
        <motion.div
          whileHover={{ y: -2 }}
          className={`p-2.5 2xl:p-3 rounded-2xl border transition-all flex flex-col justify-between ${
            isLight
              ? 'bg-slate-50/90 hover:bg-white border-slate-200/90 shadow-sm'
              : 'bg-gradient-to-b from-[#161a24]/90 to-[#10131c]/90 hover:from-[#1b202e] hover:to-[#141824] border-white/[0.05] hover:border-[#7fe3fa]/40 shadow-inner'
          }`}
        >
          <div className="flex items-center justify-between text-stone-400 text-[9px] 2xl:text-[10px] font-mono">
            <span className="uppercase tracking-wider">Wind Velocity</span>
            <Wind className={`w-3 h-3 ${isLight ? 'text-sky-600' : 'text-[#7fe3fa]'}`} />
          </div>
          <span
            className={`text-sm sm:text-base 2xl:text-lg font-black font-mono block mt-0.5 tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {windSpeed}
          </span>
          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(15, windNum * 3))}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-[#7fe3fa] rounded-full"
            />
          </div>
        </motion.div>

        {/* Humidity */}
        <motion.div
          whileHover={{ y: -2 }}
          className={`p-2.5 2xl:p-3 rounded-2xl border transition-all flex flex-col justify-between ${
            isLight
              ? 'bg-slate-50/90 hover:bg-white border-slate-200/90 shadow-sm'
              : 'bg-gradient-to-b from-[#161a24]/90 to-[#10131c]/90 hover:from-[#1b202e] hover:to-[#141824] border-white/[0.05] hover:border-sky-400/40 shadow-inner'
          }`}
        >
          <div className="flex items-center justify-between text-stone-400 text-[9px] 2xl:text-[10px] font-mono">
            <span className="uppercase tracking-wider">Humidity</span>
            <Droplets className="w-3 h-3 text-sky-400" />
          </div>
          <span
            className={`text-sm sm:text-base 2xl:text-lg font-black font-mono block mt-0.5 tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {humidity}
          </span>
          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${humidityNum}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-sky-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Surface Baro */}
        <motion.div
          whileHover={{ y: -2 }}
          className={`p-2.5 2xl:p-3 rounded-2xl border transition-all flex flex-col justify-between ${
            isLight
              ? 'bg-slate-50/90 hover:bg-white border-slate-200/90 shadow-sm'
              : 'bg-gradient-to-b from-[#161a24]/90 to-[#10131c]/90 hover:from-[#1b202e] hover:to-[#141824] border-white/[0.05] hover:border-emerald-400/40 shadow-inner'
          }`}
        >
          <div className="flex items-center justify-between text-stone-400 text-[9px] 2xl:text-[10px] font-mono">
            <span className="uppercase tracking-wider">Surface Baro</span>
            <Gauge className="w-3 h-3 text-emerald-400" />
          </div>
          <span
            className={`text-sm sm:text-base 2xl:text-lg font-black font-mono block mt-0.5 tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {pressure}
          </span>
          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 0.8 }}
              className="h-full bg-emerald-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Optic Depth */}
        <motion.div
          whileHover={{ y: -2 }}
          className={`p-2.5 2xl:p-3 rounded-2xl border transition-all flex flex-col justify-between ${
            isLight
              ? 'bg-slate-50/90 hover:bg-white border-slate-200/90 shadow-sm'
              : 'bg-gradient-to-b from-[#161a24]/90 to-[#10131c]/90 hover:from-[#1b202e] hover:to-[#141824] border-white/[0.05] hover:border-amber-400/40 shadow-inner'
          }`}
        >
          <div className="flex items-center justify-between text-stone-400 text-[9px] 2xl:text-[10px] font-mono">
            <span className="uppercase tracking-wider">Optic Depth</span>
            <Eye className="w-3 h-3 text-amber-400" />
          </div>
          <span
            className={`text-sm sm:text-base 2xl:text-lg font-black font-mono block mt-0.5 tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            10.0 km
          </span>
          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ duration: 0.8 }}
              className="h-full bg-amber-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
});

export default WeatherHero;