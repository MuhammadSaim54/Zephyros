import React, { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AtmosphericFXEngine = memo(function AtmosphericFXEngine({ conditionType = 'sun', theme = 'obsidian' }) {
  const canvasRef = useRef(null);
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // PARTICLE POOLS GENERATION (WEATHER DRIVEN)
    // -------------------------------------------------------------
    const particles = [];

    // 1. CLOUD: Volumetric Rolling Fog Puffs
    if (conditionType === 'cloud') {
      const puffCount = 18;
      for (let i = 0; i < puffCount; i++) {
        particles.push({
          x: Math.random() * (width + 400) - 200,
          y: Math.random() * (height * 0.75),
          radius: Math.random() * 180 + 140, // Large cloudy puffs
          speedX: Math.random() * 0.45 + 0.15, // Slow realistic wind drift
          opacity: Math.random() * 0.18 + 0.12,
          pulse: Math.random() * Math.PI * 2
        });
      }
    } 
    // 2. RAIN / THUNDER / SNOW / SUN PARTICLES
    else {
      const count = conditionType === 'rain' ? 120 : conditionType === 'thunder' ? 160 : conditionType === 'snow' ? 70 : 45;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 28 + 12,
          speed: conditionType === 'snow' ? Math.random() * 1.5 + 0.8 : Math.random() * 14 + 18,
          radius: Math.random() * 3.5 + 1.2,
          opacity: Math.random() * 0.6 + 0.3,
          drift: Math.random() * 2 - 1,
          angle: conditionType === 'snow' ? Math.random() * Math.PI * 2 : Math.PI / 7
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------
      // A. CLOUD ANIMATION (Rolling Stratus Fog & Soft Vapour Clouds)
      // -----------------------------------------------------------
      if (conditionType === 'cloud') {
        for (let p of particles) {
          p.pulse += 0.008;
          const currentRadius = p.radius + Math.sin(p.pulse) * 15;
          const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.04;

          const grad = ctx.createRadialGradient(p.x, p.y, currentRadius * 0.1, p.x, p.y, currentRadius);
          
          if (isLight) {
            grad.addColorStop(0, `rgba(148, 163, 184, ${currentOpacity * 1.2})`);
            grad.addColorStop(0.5, `rgba(203, 213, 225, ${currentOpacity * 0.7})`);
            grad.addColorStop(1, 'rgba(241, 245, 249, 0)');
          } else {
            grad.addColorStop(0, `rgba(71, 85, 105, ${currentOpacity * 1.3})`);
            grad.addColorStop(0.55, `rgba(30, 41, 59, ${currentOpacity * 0.7})`);
            grad.addColorStop(1, 'rgba(9, 11, 15, 0)');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();

          // Move clouds horizontally with slight altitude sway
          p.x += p.speedX;
          p.y += Math.sin(p.pulse) * 0.15;

          // Wrap around edge
          if (p.x - currentRadius > width) {
            p.x = -currentRadius;
            p.y = Math.random() * (height * 0.75);
          }
        }
      }

      // -----------------------------------------------------------
      // B. RAIN & THUNDER ANIMATION
      // -----------------------------------------------------------
      else if (conditionType === 'rain' || conditionType === 'thunder') {
        ctx.lineWidth = conditionType === 'thunder' ? 1.8 : 1.4;
        ctx.lineCap = 'round';

        for (let p of particles) {
          ctx.strokeStyle = isLight
            ? `rgba(2, 132, 199, ${p.opacity * 0.8})`
            : `rgba(127, 227, 250, ${p.opacity})`;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - Math.tan(p.angle) * p.length, p.y + p.length);
          ctx.stroke();

          p.y += p.speed;
          p.x -= Math.tan(p.angle) * p.speed * 0.3;

          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        }
      }

      // -----------------------------------------------------------
      // C. SNOW ANIMATION
      // -----------------------------------------------------------
      else if (conditionType === 'snow') {
        for (let p of particles) {
          ctx.fillStyle = isLight
            ? `rgba(14, 165, 233, ${p.opacity * 0.9})`
            : `rgba(255, 255, 255, ${p.opacity})`;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          p.y += p.speed;
          p.x += Math.sin(p.angle) * 1.2;
          p.angle += 0.02;

          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        }
      }

      // -----------------------------------------------------------
      // D. SUNNY PHOTON DUST
      // -----------------------------------------------------------
      else if (conditionType === 'sun') {
        for (let p of particles) {
          ctx.fillStyle = isLight
            ? `rgba(245, 158, 11, ${p.opacity * 0.6})`
            : `rgba(253, 224, 71, ${p.opacity * 0.75})`;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          p.y += Math.sin(p.angle) * 0.5;
          p.x += Math.cos(p.angle) * 0.6;
          p.angle += 0.015;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [conditionType, theme, isLight]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Volumetric Atmosphere Overlays */}
      {conditionType === 'thunder' && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: isLight ? [0.45, 0.7, 0.45] : [0.35, 0.6, 0.35],
              x: [-40, 40, -40]
            }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -top-40 left-1/5 w-[900px] h-[650px] rounded-full blur-[130px]"
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, rgba(59, 130, 246, 0.35) 50%, transparent 80%)'
            }}
          />
          <motion.div
            animate={{ opacity: [0, 0, 0.9, 0.05, 0.95, 0, 0.35, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              times: [0, 0.65, 0.67, 0.69, 0.72, 0.75, 0.78, 1],
              ease: 'linear'
            }}
            className="absolute inset-0 bg-gradient-to-b from-[#7fe3fa]/30 via-[#c084fc]/20 to-transparent mix-blend-screen"
          />
        </>
      )}

      {conditionType === 'rain' && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: isLight ? [0.5, 0.75, 0.5] : [0.35, 0.55, 0.35]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute -top-32 inset-x-10 h-[500px] rounded-full blur-[130px]"
          style={{
            background: isLight
              ? 'radial-gradient(circle, rgba(14, 165, 233, 0.45) 0%, rgba(3, 105, 161, 0.25) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(2, 132, 199, 0.45) 0%, rgba(30, 58, 138, 0.3) 60%, transparent 100%)'
          }}
        />
      )}

      {conditionType === 'sun' && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.18, 1],
              opacity: isLight ? [0.45, 0.65, 0.45] : [0.4, 0.6, 0.4]
            }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            className="absolute -top-24 right-1/4 w-[850px] h-[650px] rounded-full blur-[130px]"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(249, 115, 22, 0.3) 60%, transparent 100%)'
                : 'radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(234, 88, 12, 0.28) 60%, transparent 100%)'
            }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
            className="absolute -top-40 right-1/4 w-[750px] h-[750px] rounded-full border border-amber-400/25 border-dashed"
          />
        </>
      )}

      {/* CLOUD OVERCAST SKY MESH (Heavy Layered Mist Effect) */}
      {conditionType === 'cloud' && (
        <>
          <motion.div
            animate={{ x: [-50, 50, -50], opacity: isLight ? [0.55, 0.8, 0.55] : [0.4, 0.65, 0.4] }}
            transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
            className="absolute -top-28 inset-x-0 h-[480px] rounded-full blur-[120px]"
            style={{
              background: isLight
                ? 'radial-gradient(ellipse at 50% 20%, rgba(148, 163, 184, 0.7) 0%, rgba(203, 213, 225, 0.45) 55%, transparent 80%)'
                : 'radial-gradient(ellipse at 50% 20%, rgba(71, 85, 105, 0.65) 0%, rgba(30, 41, 59, 0.45) 55%, transparent 80%)'
            }}
          />
          <motion.div
            animate={{ x: [40, -40, 40], opacity: isLight ? [0.35, 0.55, 0.35] : [0.25, 0.45, 0.25] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
            className="absolute top-1/3 -left-20 w-[700px] h-[450px] rounded-full blur-[130px]"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(148, 163, 184, 0.5) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(51, 65, 85, 0.6) 0%, transparent 70%)'
            }}
          />
        </>
      )}

      {/* 2. Interactive Kinetic Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Geometric Ambient Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, #0284c7 1px, transparent 1px)'
            : 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
});

export default AtmosphericFXEngine;