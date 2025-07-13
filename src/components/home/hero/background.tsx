"use client"

import React, { useRef, useEffect, useState } from 'react';

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
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const canvas = canvasRef.current;
    if (!canvas) return () => observer.disconnect();

    const ctx = canvas.getContext('2d');
    if (!ctx) return () => observer.disconnect();

    let stars: Star[] = [];
    const comets: Comet[] = [];
    const numStars = 200;

    const createComet = () => {
      comets.push({
        x: Math.random() * canvas.width,
        y: 0,
        radius: Math.random() * 2 + 1,
        speed: {
          x: (Math.random() - 0.5) * 10,
          y: Math.random() * 5 + 5,
        },
        alpha: 1,
        length: Math.random() * 100 + 50,
      });
    };

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.3 + 0.1,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create comets at random intervals (e.g., every 5-15 seconds)
    const cometInterval = setInterval(createComet, Math.random() * 10000 + 5000);

    let animationFrameId: number;

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const objectColor = isDarkMode ? '255, 255, 255' : '0, 0, 0';

      // Draw stars
      stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.x = Math.random() * canvas.width;
          star.y = canvas.height;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${objectColor}, ${star.alpha})`;
        ctx.fill();
      });

      // Draw comets and their tails
      comets.forEach((comet, index) => {
        comet.x += comet.speed.x;
        comet.y += comet.speed.y;
        comet.alpha -= 0.01; // Fade out

        // Remove comet if it's faded or off-screen
        if (comet.alpha <= 0) {
          comets.splice(index, 1);
          return;
        }

        // Draw tail
        const gradient = ctx.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - comet.speed.x * (comet.length / 10),
          comet.y - comet.speed.y * (comet.length / 10)
        );
        gradient.addColorStop(0, `rgba(${objectColor}, ${comet.alpha})`);
        gradient.addColorStop(1, `rgba(${objectColor}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = comet.radius;
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - comet.speed.x * (comet.length / 10), comet.y - comet.speed.y * (comet.length / 10));
        ctx.stroke();

        // Draw head
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, comet.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${objectColor}, ${comet.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(cometInterval);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default Starfield;