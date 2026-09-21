import React from 'react';
import { Sun3DIcon, Rain3DIcon, Cloud3DIcon, Thunder3DIcon } from './WeatherIcons';

export default function WorldMap() {
  const stations = [
    { name: "North America", x: "23%", y: "30%", Icon: Rain3DIcon },
    { name: "Europe", x: "49%", y: "24%", Icon: Sun3DIcon },
    { name: "Asia / Tokyo", x: "78%", y: "32%", Icon: Thunder3DIcon },
    { name: "Africa / Lagos", x: "47%", y: "56%", Icon: Sun3DIcon },
    { name: "South America", x: "32%", y: "68%", Icon: Sun3DIcon },
    { name: "Australia", x: "84%", y: "72%", Icon: Cloud3DIcon },
  ];

  return (
    <div className="relative w-full h-full min-h-[190px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#0a0c10]/60">
      {/* High-Accuracy Vector Geographic World Map */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full object-cover opacity-35 select-none"
        fill="#222733"
      >
        {/* North America */}
        <path d="M120,60 C180,45 240,40 310,75 C340,95 330,135 300,165 C285,180 250,210 230,250 C215,280 210,310 190,300 C175,290 180,260 160,230 C135,190 90,140 105,95 Z" />
        <path d="M280,50 C320,40 345,55 330,85 C305,95 285,75 280,50 Z" />
        {/* Greenland */}
        <path d="M370,30 C420,25 450,45 430,75 C400,95 375,70 370,30 Z" />
        {/* South America */}
        <path d="M260,300 C310,305 340,345 350,380 C360,425 330,470 295,490 C270,500 255,445 260,400 C265,360 250,320 260,300 Z" />
        {/* Europe */}
        <path d="M460,75 C520,65 545,95 530,135 C510,165 480,175 455,160 C440,145 440,105 460,75 Z" />
        <path d="M445,95 C435,90 440,115 450,115 Z" />
        {/* Africa */}
        <path d="M450,185 C520,185 555,230 550,285 C545,340 515,405 480,425 C450,440 435,390 430,345 C425,285 415,225 450,185 Z" />
        {/* Asia */}
        <path d="M545,75 C640,55 770,50 860,100 C915,135 910,210 840,245 C780,275 730,285 660,260 C610,240 575,200 555,150 Z" />
        <path d="M720,275 C750,275 775,310 755,335 C730,340 710,305 720,275 Z" />
        <path d="M840,245 C860,245 870,275 850,295 C830,295 830,265 840,245 Z" />
        {/* Australia */}
        <path d="M770,340 C850,330 890,365 880,415 C870,455 810,465 775,445 C745,425 745,370 770,340 Z" />
      </svg>

      {/* Weather Stations Pinned (Ref Image 18) */}
      {stations.map((st, i) => (
        <div
          key={i}
          style={{ left: st.x, top: st.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center"
        >
          <div className="transform transition-transform duration-200 group-hover:scale-125 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
            <st.Icon className="w-6 h-6 md:w-7 md:h-7" />
          </div>
          <span className="hidden group-hover:block absolute -bottom-5 px-2 py-0.5 rounded-md bg-stone-900 border border-white/10 text-[9px] font-bold text-white whitespace-nowrap shadow-2xl z-30">
            {st.name}
          </span>
        </div>
      ))}
    </div>
  );
}