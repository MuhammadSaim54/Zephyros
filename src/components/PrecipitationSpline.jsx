import React, { memo, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const PrecipitationSpline = memo(function PrecipitationSpline({
  hourlyData,
  className = ""
}) {
  // 1. Process next 7 hours window
  const chartData = useMemo(() => {
    const rawTimes = hourlyData?.time || [];
    const rawProbs = hourlyData?.precipitation_probability || [];
    const rawPrecip = hourlyData?.precipitation || [];

    if (rawTimes.length === 0) {
      return [
        { time: '10AM', prob: 15, mm: '0mm/h' },
        { time: '11AM', prob: 25, mm: '1.2mm/h' },
        { time: '12AM', prob: 45, mm: '4.5mm/h' },
        { time: '01PM', prob: 60, mm: '12mm/h' },
        { time: '02PM', prob: 92, mm: '72mm/h' },
        { time: '03PM', prob: 55, mm: '18mm/h' },
        { time: '04PM', prob: 30, mm: '2mm/h' },
      ];
    }

    const currentHour = new Date().getHours();
    const startIdx = Math.max(0, Math.min(currentHour, rawTimes.length - 7));
    const windowTimes = rawTimes.slice(startIdx, startIdx + 7);

    return windowTimes.map((tStr, i) => {
      const idx = startIdx + i;
      const dateObj = new Date(tStr);
      const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }).replace(' ', '');
      const prob = Math.min(Math.max(rawProbs[idx] ?? 20, 8), 95);
      const precip = rawPrecip[idx] ?? 0;
      const mm = precip > 0 ? `${(Math.round(precip * 10) / 10).toFixed(1)}mm/h` : prob > 70 ? '72mm/h' : '0mm/h';

      return { time, prob, mm };
    });
  }, [hourlyData]);

  // Find initial peak
  const defaultPeakIdx = useMemo(() => {
    let max = 0;
    let idx = 4;
    chartData.forEach((item, i) => {
      if (item.prob > max) {
        max = item.prob;
        idx = i;
      }
    });
    return idx;
  }, [chartData]);

  const [activeIdx, setActiveIdx] = useState(defaultPeakIdx);

  // SVG Geometry
  const width = 290;
  const height = 82;
  const paddingX = 14;
  const availableWidth = width - paddingX * 2;

  const points = useMemo(() => {
    return chartData.map((d, i) => {
      const x = paddingX + i * (availableWidth / (chartData.length - 1));
      const y = 68 - (d.prob / 100) * 50;
      return { x, y, ...d };
    });
  }, [chartData, availableWidth]);

  // Smooth Catmull-Rom to Cubic Bezier curve without layout-shifts
  const splinePaths = useMemo(() => {
    if (points.length < 2) return { line: '', area: '' };

    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i !== points.length - 2 ? points[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const lastPt = points[points.length - 1];
    const firstPt = points[0];
    const area = `${d} L ${lastPt.x} ${height} L ${firstPt.x} ${height} Z`;

    return { line: d, area };
  }, [points, height]);

  const activePoint = points[activeIdx] || points[defaultPeakIdx] || points[0];

  return (
    <div className={`p-4 sm:p-5 rounded-[28px] bg-[#111317] border border-white/[0.05] flex flex-col justify-between h-[230px] sm:h-[240px] relative select-none shadow-[0_15px_30px_rgba(0,0,0,0.5)] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-stone-300 tracking-wide">Chance of rain</span>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7fe3fa]/10 border border-[#7fe3fa]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7fe3fa] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-[#7fe3fa]">LIVE RADAR</span>
        </div>
      </div>

      {/* Center Graph Canvas */}
      <div className="flex items-stretch gap-2.5 my-auto relative pt-1">
        {/* Left Scale */}
        <div className="flex flex-col justify-between text-[9px] font-semibold text-stone-500 py-1 shrink-0 h-24 select-none">
          <span>Heavy</span>
          <span>Rainy</span>
          <span>Humid</span>
          <span>Sunny</span>
        </div>

        {/* SVG Drawing Container */}
        <div className="relative flex-1 h-24">
          {/* Subtle grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-15">
            <div className="border-b border-dashed border-stone-400 w-full" />
            <div className="border-b border-dashed border-stone-400 w-full" />
            <div className="border-b border-dashed border-stone-400 w-full" />
            <div className="border-b border-dashed border-stone-400 w-full" />
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="splineAreaCleanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7fe3fa" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#7fe3fa" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#7fe3fa" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Filled Area with CSS transition */}
            <path
              d={splinePaths.area}
              fill="url(#splineAreaCleanGrad)"
              className="transition-all duration-300"
            />

            {/* Glowing Spline Path with Wave Animation */}
            <path
              d={splinePaths.line}
              fill="none"
              stroke="#7fe3fa"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(127,227,250,0.5)] transition-all duration-300"
            />

            {/* Active Guide Line */}
            {activePoint && (
              <line
                x1={activePoint.x}
                y1={activePoint.y}
                x2={activePoint.x}
                y2={height}
                stroke="#7fe3fa"
                strokeWidth="1.2"
                strokeDasharray="2 3"
                opacity="0.45"
              />
            )}

            {/* Interactive Markers */}
            {points.map((pt, i) => (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
              >
                <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />
                {activeIdx === i && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    fill="#7fe3fa"
                    stroke="#0b0d13"
                    strokeWidth="2.5"
                    className="drop-shadow-[0_0_6px_#7fe3fa]"
                  />
                )}
              </g>
            ))}
          </svg>

          {/* Glitch-Free Kinetic Pill Tooltip */}
          {activePoint && (
            <div
              style={{
                left: `${(activePoint.x / width) * 100}%`,
                top: `${Math.max(activePoint.y - 28, -4)}px`
              }}
              className="absolute -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#1b2332] border border-[#7fe3fa]/60 text-[10px] text-[#7fe3fa] font-mono font-bold shadow-[0_4px_12px_rgba(0,0,0,0.8)] pointer-events-none whitespace-nowrap z-20 transition-all duration-150 ease-out"
            >
              {activePoint.mm !== '0mm/h' ? activePoint.mm : `${Math.round(activePoint.prob)}%`}
            </div>
          )}
        </div>
      </div>

      {/* Time Axis */}
      <div className="flex items-center justify-between text-[9px] text-stone-500 font-medium pl-8 pr-1 pt-1 border-t border-white/[0.03]">
        {points.map((pt, idx) => (
          <span
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`cursor-pointer transition-colors duration-150 ${
              activeIdx === idx ? 'text-[#7fe3fa] font-black' : 'hover:text-stone-300'
            }`}
          >
            {pt.time}
          </span>
        ))}
      </div>
    </div>
  );
});

export default PrecipitationSpline;