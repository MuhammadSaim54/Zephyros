import React, { memo, useState, useRef, useId, useEffect } from 'react';

const PrecipitationSpline = memo(function PrecipitationSpline({
  hourlyData,
  className = "",
  theme = 'obsidian',
  conditionType = 'sun'
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(2);
  const [containerDim, setContainerDim] = useState({ width: 480, height: 220 });
  const splineId = useId().replace(/:/g, '');

  const isLight = theme === 'light';

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 50 && entry.contentRect.height > 50) {
          setContainerDim({
            width: Math.round(entry.contentRect.width),
            height: Math.round(entry.contentRect.height)
          });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const accentColor = conditionType === 'thunder'
    ? (isLight ? '#7c3aed' : '#c084fc')
    : conditionType === 'rain'
    ? (isLight ? '#0284c7' : '#38bdf8')
    : conditionType === 'snow'
    ? (isLight ? '#0ea5e9' : '#cffafe')
    : (isLight ? '#ea580c' : '#f59e0b');

  const points = [
    { label: '09 AM', val: 0.12, rate: '0.1 mm/h', prob: '10%' },
    { label: '10 AM', val: 0.32, rate: '0.3 mm/h', prob: '30%' },
    { label: '11 AM', val: 0.70, rate: '0.8 mm/h', prob: '70%' },
    { label: '12 PM', val: 0.88, rate: '1.2 mm/h', prob: '90%', isPeak: true },
    { label: '01 PM', val: 0.50, rate: '0.5 mm/h', prob: '50%' },
    { label: '02 PM', val: 0.28, rate: '0.2 mm/h', prob: '28%' },
    { label: '03 PM', val: 0.12, rate: '0.1 mm/h', prob: '12%' }
  ];

  const W = Math.max(300, containerDim.width);
  const H = Math.max(160, containerDim.height - 70);
  const padX = Math.max(34, Math.round(W * 0.08));
  const padTop = 26;
  const padBtm = 22;
  const usableH = H - padTop - padBtm;

  const coords = points.map((p, i) => {
    const x = padX + (i / (points.length - 1)) * (W - padX * 2);
    const y = H - padBtm - p.val * usableH;
    return { ...p, x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  });

  // Handle Smooth Cursor Tracking Across SVG
  const handlePointerMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * W;

    let closestIdx = 0;
    let minDiff = Infinity;
    coords.forEach((pt, i) => {
      const diff = Math.abs(pt.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });
    setHoverIndex(closestIdx);
  };

  let pathD = `M ${coords[0].x},${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i + 1];
    const cpx1 = curr.x + (next.x - curr.x) * 0.45;
    const cpy1 = curr.y;
    const cpx2 = curr.x + (next.x - curr.x) * 0.55;
    const cpy2 = next.y;
    pathD += ` C ${cpx1.toFixed(1)},${cpy1.toFixed(1)} ${cpx2.toFixed(1)},${cpy2.toFixed(1)} ${next.x},${next.y}`;
  }

  const areaD = `${pathD} L ${coords[coords.length - 1].x},${H - padBtm} L ${coords[0].x},${H - padBtm} Z`;
  const activePoint = coords[hoverIndex] || coords[3];

  return (
    <div
      ref={containerRef}
      className={`w-full h-full p-4 sm:p-5 rounded-[28px] border flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden transition-all duration-300 ${
        isLight
          ? 'bg-white/90 border-slate-200/90 shadow-sm'
          : 'bg-[#11141a]/90 border-white/[0.07] shadow-lg'
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between z-10 shrink-0 mb-1 select-none">
        <div className="flex items-center gap-2">
          <span className={`text-xs sm:text-sm font-black tracking-wide ${
            isLight ? 'text-slate-800' : 'text-stone-200'
          }`}>
            Precipitation Horizon
          </span>
          <span className="text-[10px] font-mono text-stone-400 hidden sm:inline">
            // HOVER TO SCRUB
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono font-bold"
          style={{
            borderColor: `${accentColor}40`,
            backgroundColor: `${accentColor}15`,
            color: accentColor
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
          LIVE RADAR
        </div>
      </div>

      {/* SVG Canvas with Interactive Pointer Events */}
      <div
        className="relative flex-1 w-full min-h-[110px] flex items-center justify-center my-auto cursor-crosshair"
        onMouseMove={handlePointerMove}
        onTouchMove={(e) => {
          if (e.touches?.[0]) handlePointerMove(e.touches[0]);
        }}
      >
        <div className="absolute left-1 inset-y-1 flex flex-col justify-between text-[9px] font-mono text-stone-400 pointer-events-none z-10 select-none">
          <span>Heavy</span>
          <span>Rainy</span>
          <span>Humid</span>
          <span>Sunny</span>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full overflow-visible block"
        >
          <defs>
            <linearGradient id={`areaGrad-${splineId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity={isLight ? 0.35 : 0.4} />
              <stop offset="70%" stopColor={accentColor} stopOpacity={0.06} />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.15, 0.45, 0.75, 0.98].map((r, i) => (
            <line
              key={i}
              x1={padX}
              y1={padTop + r * usableH}
              x2={W - padX}
              y2={padTop + r * usableH}
              stroke={isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}
              strokeDasharray="4 4"
            />
          ))}

          <path d={areaD} fill={`url(#areaGrad-${splineId})`} />

          <path
            d={pathD}
            fill="none"
            stroke={accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            filter={`drop-shadow(0 0 10px ${accentColor}80)`}
          />

          {activePoint && (
            <g className="transition-all duration-150">
              <line
                x1={activePoint.x}
                y1={activePoint.y}
                x2={activePoint.x}
                y2={H - padBtm}
                stroke={accentColor}
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="10"
                fill={`${accentColor}25`}
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="5.5"
                fill={isLight ? '#ffffff' : '#090b0e'}
                stroke={accentColor}
                strokeWidth="3"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip Pill */}
        {activePoint && (
          <div
            className={`absolute -translate-x-1/2 -translate-y-full px-3 py-1 rounded-full border font-mono text-[11px] font-black pointer-events-none flex items-center gap-1.5 shadow-lg select-none transition-all duration-150 ${
              isLight ? 'bg-white text-slate-800' : 'bg-[#141822] text-white'
            }`}
            style={{
              left: `${(activePoint.x / W) * 100}%`,
              top: `${(activePoint.y / H) * 100 - 6}%`,
              borderColor: `${accentColor}70`
            }}
          >
            <span style={{ color: accentColor }}>{activePoint.rate}</span>
            <span className="text-[9px] opacity-70">({activePoint.prob})</span>
          </div>
        )}
      </div>

      {/* X Axis Timestamps */}
      <div className={`flex items-center justify-between px-3 pt-1 border-t text-[10px] font-mono shrink-0 select-none ${
        isLight ? 'border-slate-200' : 'border-white/[0.04]'
      }`}>
        {coords.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setHoverIndex(i)}
            className="transition-all duration-150 cursor-pointer text-stone-400 hover:text-stone-200"
            style={{
              color: i === hoverIndex ? accentColor : undefined,
              fontWeight: i === hoverIndex ? '900' : '500'
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
});

export default PrecipitationSpline;