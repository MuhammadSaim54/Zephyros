import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Sun, Moon, Menu, Thermometer } from 'lucide-react';

const TopCommandBar = memo(function TopCommandBar({
  currentLocation = "Lagos, Nigeria",
  onSearchSubmit,
  onOpenMobileSidebar,
  unit = "C",
  onToggleUnit
}) {
  const [searchVal, setSearchVal] = useState("");
  const [isNightMode, setIsNightMode] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim() && onSearchSubmit) {
      onSearchSubmit(searchVal.trim());
      setSearchVal("");
    }
  };

  return (
    <header className="w-full py-3 md:py-4 px-3.5 md:px-7 flex items-center justify-between gap-2.5 md:gap-4 select-none z-40 bg-transparent shrink-0">
      {/* Left: Mobile Drawer Trigger + Search Bar */}
      <div className="flex items-center gap-2 flex-1 max-w-full sm:max-w-xs md:max-w-[420px]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onOpenMobileSidebar}
          className="md:hidden w-8 h-8 rounded-full bg-[#111317] border border-white/[0.06] flex items-center justify-center text-stone-300 hover:text-white shrink-0 cursor-pointer shadow-sm"
          title="Open Menu"
        >
          <Menu className="w-4 h-4 stroke-[1.8]" />
        </motion.button>

        <form onSubmit={handleSubmit} className="flex-1 relative">
          <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 md:py-2.5 rounded-full bg-[#111317] border border-white/[0.04] text-xs font-semibold text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-[#7fe3fa]/50 transition-all shadow-inner"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
        {/* Location Capsule (Desktop only) */}
        <div className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#111317] border border-white/[0.04] text-stone-200 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="truncate max-w-[120px] lg:max-w-none">{currentLocation}</span>
        </div>

        {/* Temperature Unit Switcher Capsule (°C / °F) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleUnit}
          className="px-2.5 md:px-3 py-1.5 md:py-2 rounded-full bg-[#111317] border border-white/[0.04] text-stone-200 hover:text-white text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-all hover:border-[#7fe3fa]/40"
          title="Switch Temperature Unit"
        >
          <Thermometer className="w-3.5 h-3.5 text-[#7fe3fa]" />
          <span>°{unit}</span>
        </motion.button>

        {/* Day / Night Slider Capsule */}
        <div className="flex items-center bg-[#111317] border border-white/[0.04] rounded-full p-1 gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsNightMode(false)}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              !isNightMode ? 'bg-[#212530] text-amber-300' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <Sun className="w-3 h-3 stroke-[2]" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsNightMode(true)}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isNightMode ? 'bg-[#7fe3fa] text-black shadow-[0_0_12px_rgba(127,227,250,0.5)]' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <Moon className="w-3.5 h-3.5 stroke-[2.2]" />
          </motion.button>
        </div>

        {/* Profile Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-white/10 shadow-sm shrink-0 cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Operator"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </header>
  );
});

export default TopCommandBar;