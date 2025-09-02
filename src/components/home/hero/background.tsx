'use client';

import React, { useRef, useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
};

type Comet = {
  x: number;
  y: number;
  radius: number;
  speed: { x: number; y: number };
  alpha: number;
  length: number;
};

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const reduced = typeof window !== 'undefined' && prefersReducedMotion();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adaptive settings
    const NUM_STARS = reduced ? 50 : 200;
    const FPS = reduced ? 15 : 60;

    let stars: Star[] = [];
    const comets: Comet[] = [];
    let animationFrameId = 0;
    let lastTime = performance.now();
    let cometInterval: number | undefined;

    const isVisible = () => {
      if (!canvas) return false;
      const rect = canvas.getBoundingClientRect();
      return rect.bottom >= 0 && rect.top <= window.innerHeight;
    };

    const createComet = () => {
      if (reduced) return;
      comets.push({
        x: Math.random() * canvas.width,
        y: 0,
        radius: Math.random() * 2 + 1,
        speed: { x: (Math.random() - 0.5) * 10, y: Math.random() * 5 + 5 },
        alpha: 1,
        length: Math.random() * 100 + 50,
      });
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < NUM_STARS; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.3 + 0.1,
        });
      }
    };

    if (!reduced) {
      cometInterval = window.setInterval(
        createComet,
        Math.random() * 10000 + 5000,
      );
    }

    const animate = (time: number) => {
      // Pause when tab hidden or canvas offscreen
      if (document.hidden || !isVisible()) {
        animationFrameId = requestAnimationFrame(animate);
        lastTime = time;
        return;
      }

      const elapsed = time - lastTime;
      if (elapsed < 1000 / FPS) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const objectColor = isDarkMode ? '255, 255, 255' : '0, 0, 0';

      // Draw stars (keep updates cheap)
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.y -= star.speed;
        if (star.y < 0) {
          star.x = Math.random() * canvas.width;
          star.y = canvas.height;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${objectColor}, ${star.alpha})`;
        ctx.fill();
      }

      // Draw comets (skip if reduced)
      if (!reduced) {
        for (let i = comets.length - 1; i >= 0; i--) {
          const comet = comets[i];
          comet.x += comet.speed.x;
          comet.y += comet.speed.y;
          comet.alpha -= 0.01;
          if (comet.alpha <= 0) {
            comets.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.moveTo(comet.x, comet.y);
          ctx.lineTo(
            comet.x - comet.speed.x * (comet.length / 10),
            comet.y - comet.speed.y * (comet.length / 10),
          );
          ctx.strokeStyle = `rgba(${objectColor}, ${comet.alpha})`;
          ctx.lineWidth = comet.radius;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(comet.x, comet.y, comet.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${objectColor}, ${comet.alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (cometInterval) clearInterval(cometInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default Starfield;
