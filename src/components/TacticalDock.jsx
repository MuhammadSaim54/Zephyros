import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Compass,
  MapPin,
  Layers,
  FileText,
  Bell,
  Settings,
  X
} from 'lucide-react';

const TacticalDock = memo(function TacticalDock({
  activeNav,
  setActiveNav,
  isMobileOpen,
  setIsMobileOpen
}) {
  const navItems = [
    { id: 'global', icon: Globe, label: 'Atmospheric World' },
    { id: 'radar', icon: Compass, label: 'Radar Telemetry' },
    { id: 'locations', icon: MapPin, label: 'Station Matrix' },
    { id: 'layers', icon: Layers, label: 'Satellite Overlays' },
    { id: 'reports', icon: FileText, label: 'Synoptic Reports' },
  ];

  // Premium Kinetic Whirlwind Logo
  const BrandLogo = ({ size = "w-10 h-10" }) => (
    <motion.div
      whileHover={{ scale: 1.08, rotate: 10 }}
      whileTap={{ scale: 0.94 }}
      className={`${size} rounded-2xl bg-[#141822] border border-[#7fe3fa]/30 flex items-center justify-center text-[#7fe3fa] shadow-[0_0_20px_rgba(127,227,250,0.25)] relative overflow-hidden group cursor-pointer`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7fe3fa]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
        <path
          d="M6 8C12 7 24 7 26 8C27 8.5 25 11 20 12C15 13 8 13 8 15C8 16.5 13 17 19 17.5C24 18 25 20.5 22 21.5C18 22.5 10 23 11 25C11.5 26 15 26.5 17 26.5"
          stroke="#7fe3fa"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="21" cy="8" r="1.5" fill="#7fe3fa" className="animate-pulse" />
      </svg>
    </motion.div>
  );

  return (
    <>
      {/* DESKTOP CAPSULE DOCK */}
      <aside className="hidden md:flex w-[78px] my-3.5 ml-3.5 rounded-[32px] bg-[#111317] border border-white/[0.04] h-[calc(100vh-28px)] flex-col items-center justify-between py-6 shrink-0 z-50 select-none shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col items-center gap-1.5">
          <BrandLogo />
          <span className="text-[10px] font-bold text-stone-300 tracking-tight">
            ZephyrOS
          </span>
        </div>

        <nav className="flex flex-col items-center gap-3.5 my-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setActiveNav(item.id)}
                title={item.label}
                className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1b2330] text-[#7fe3fa] border border-[#7fe3fa]/40 shadow-[0_0_16px_rgba(127,227,250,0.2)]'
                    : 'text-stone-500 hover:text-stone-300 hover:bg-white/[0.03]'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[1.8]" />
                {isActive && (
                  <motion.span
                    layoutId="desktopActiveIndicator"
                    className="absolute -left-2.5 w-1 h-4 rounded-r-full bg-[#7fe3fa] shadow-[0_0_10px_#7fe3fa]"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        <div className="flex flex-col items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-9 h-9 rounded-2xl bg-[#161821] flex items-center justify-center text-stone-500 hover:text-stone-200 border border-white/[0.03] transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4 stroke-[1.8]" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 rounded-2xl bg-[#161821] flex items-center justify-center text-stone-500 hover:text-stone-200 border border-white/[0.03] transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4 stroke-[1.8]" />
          </motion.button>
        </div>
      </aside>

      {/* MOBILE DRAWER (Fixed Safe Viewport - Zero Bottom Clipping) */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="md:hidden fixed inset-0 z-[100] flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative z-10 w-64 my-2.5 ml-2.5 rounded-[28px] bg-[#111317] border border-white/[0.08] h-[calc(100dvh-20px)] max-h-[calc(100dvh-20px)] flex flex-col justify-between p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] shrink-0">
                <div className="flex items-center gap-2.5">
                  <BrandLogo size="w-9 h-9" />
                  <span className="text-sm font-bold text-white tracking-tight">ZephyrOS</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.05] text-stone-400 flex items-center justify-center hover:text-white"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Navigation Stack */}
              <nav className="flex flex-col gap-1.5 my-auto py-2 overflow-y-auto no-scrollbar">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setActiveNav(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1b2330] text-[#7fe3fa] border border-[#7fe3fa]/40'
                          : 'text-stone-400 hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-[11px] font-medium text-stone-400">
                  <Settings className="w-3.5 h-3.5" />
                  <span>Telemetry v1.0</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Online</span>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

export default TacticalDock;