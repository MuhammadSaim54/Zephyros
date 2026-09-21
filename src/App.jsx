import React, { useState } from 'react';
import TacticalDock from './components/TacticalDock';
import TopCommandBar from './components/TopCommandBar';
import { Layers, Activity, CloudRain, Globe } from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('global');
  const [currentLocation, setCurrentLocation] = useState('Lagos, Nigeria');
  const [timeFilter, setTimeFilter] = useState('Today');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-[#000000] text-white flex overflow-hidden font-sans select-none">
      <TacticalDock
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopCommandBar
          currentLocation={currentLocation}
          onSearchSubmit={(loc) => setCurrentLocation(loc)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* DESKTOP VIEWPORT */}
        <main className="hidden md:flex flex-1 flex-col justify-between px-7 pb-6 pt-1 max-w-[1600px] w-full mx-auto overflow-hidden">
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

          {/* Row 1 */}
          <div className="grid grid-cols-12 gap-4 lg:gap-5 items-stretch">
            <div className="col-span-8 p-6 rounded-[28px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#7fe3fa]" />
                  Phase 3 • Hero Condition & 7-Day Forecast Horizon
                </span>
                <span className="text-[10px] font-mono text-[#7fe3fa] bg-[#7fe3fa]/10 px-2.5 py-0.5 rounded-full border border-[#7fe3fa]/20">
                  READY FOR PHASE 3
                </span>
              </div>
              <div className="border border-dashed border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-center text-center my-2">
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2">
                  <span className="font-mono text-xs font-bold">P3</span>
                </div>
                <h4 className="text-sm font-bold text-stone-200">Interactive 7-Day Strip Staged</h4>
                <p className="text-[11px] text-stone-500 max-w-sm mt-1">
                  Active day #7FE3FA card, live real-feel telemetry, and weekly forecast capsules will mount here in Phase 3.
                </p>
              </div>
              <span className="text-[10px] text-stone-600 font-mono">GRID: 8 COLUMNS</span>
            </div>

            <div className="col-span-4 p-6 rounded-[28px] bg-[#111317] border border-white/[0.04] flex flex-col justify-between min-h-[220px]">
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
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2">
                  <span className="font-mono text-xs font-bold">P4</span>
                </div>
                <h4 className="text-sm font-bold text-stone-200">Precipitation Spline Staged</h4>
                <p className="text-[11px] text-stone-500 max-w-xs mt-1">
                  Area gradient wave, 72mm/h telemetry tag, and intensity axis will mount here in Phase 4.
                </p>
              </div>
              <span className="text-[10px] text-stone-600 font-mono">GRID: 4 COLUMNS</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-4 lg:gap-5 items-stretch">
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
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2">
                  <span className="font-mono text-xs font-bold">P5</span>
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
                <div className="w-10 h-10 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-2">
                  <span className="font-mono text-xs font-bold">P6</span>
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

        {/* MOBILE VIEWPORT */}
        <main className="md:hidden flex-1 px-4 pt-2 pb-6 flex flex-col justify-between overflow-y-auto">
          <div className="text-center pt-2">
            <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">Current Station</span>
            <h2 className="text-lg font-extrabold text-white mt-0.5">{currentLocation}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-6xl font-black tracking-tighter text-white">26°</span>
              <span className="text-[11px] font-bold text-[#7fe3fa] px-3 py-0.5 rounded-full bg-[#7fe3fa]/10 border border-[#7fe3fa]/20">
                Phase 1 Active
              </span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-[30px] bg-[#111317] border border-white/[0.06] p-6 shadow-2xl flex flex-col items-center justify-center text-center my-3 min-h-[220px]">
            <div className="w-12 h-12 rounded-2xl bg-[#7fe3fa]/10 border border-[#7fe3fa]/20 flex items-center justify-center text-[#7fe3fa] mb-3">
              <span className="font-mono text-sm font-bold">Z1</span>
            </div>
            <h3 className="text-base font-bold text-white">Master Shell Online</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
              Theme color matched to bright sky blue (#7FE3FA). Drawer accessible via top-left button.
            </p>
          </div>

          <div className="w-full rounded-[24px] bg-[#111317] border border-white/[0.06] p-4 text-center">
            <span className="text-xs font-bold text-stone-400">Weekly Forecast Horizon</span>
            <p className="text-[11px] text-stone-600 mt-0.5 font-mono">Staged for Phase 3</p>
          </div>
        </main>
      </div>
    </div>
  );
}