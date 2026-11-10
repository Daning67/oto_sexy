// Canvas Fire Embers, Sparkles, and Hearts Particle Engine

export class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.interactiveParticles = [];
    this.width = (canvas.width = window.innerWidth);
    this.height = (canvas.height = window.innerHeight);
    this.isOverdrive = false;
    this.maxBaseParticles = 75;

    this.init();
    this.bindEvents();
    this.loop();
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.maxBaseParticles; i++) {
      this.particles.push(this.createEmber());
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.35) {
        this.addSpark(e.clientX, e.clientY);
      }
    });
  }

  createEmber() {
    const types = ['ember', 'ember', 'ember', 'spark', 'heart'];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
      x: Math.random() * this.width,
      y: this.height + Math.random() * 80,
      size: Math.random() * (type === 'heart' ? 14 : 4) + 2,
      speedY: Math.random() * 1.8 + 0.6,
      speedX: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.7 + 0.3,
      fadeSpeed: Math.random() * 0.005 + 0.002,
      type: type,
      hue: Math.floor(Math.random() * 35) + 340, // 340 to 375 (crimson, red, deep pink)
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.05 + 0.02
    };
  }

  addSpark(x, y) {
    this.interactiveParticles.push({
      x,
      y,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4 - 1.5,
      opacity: 1,
      fadeSpeed: 0.035,
      type: 'spark',
      color: `rgba(${255}, ${Math.floor(Math.random() * 80 + 30)}, ${Math.floor(Math.random() * 80 + 20)}`
    });
  }

  burst(x, y, count = 30, type = 'heart') {
    const symbols = ['💋', '❤️', '🔥', '✨', '🌹'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.interactiveParticles.push({
        x,
        y,
        size: Math.random() * 16 + 14,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 2,
        opacity: 1,
        fadeSpeed: 0.02,
        type: 'emoji',
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.1
      });
    }
  }

  setOverdrive(active) {
    this.isOverdrive = active;
    if (active) {
      for (let i = 0; i < 60; i++) {
        this.particles.push(this.createEmber());
      }
    } else {
      if (this.particles.length > this.maxBaseParticles) {
        this.particles.length = this.maxBaseParticles;
      }
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const speedMult = this.isOverdrive ? 2.5 : 1.0;

    // Base glowing embers
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y -= p.speedY * speedMult;
      p.wobble += p.wobbleSpeed;
      p.x += Math.sin(p.wobble) * 0.9 + p.speedX;
      p.opacity -= p.fadeSpeed;

      if (p.y < -30 || p.opacity <= 0) {
        this.particles[i] = this.createEmber();
        continue;
      }

      this.ctx.save();
      if (p.type === 'heart') {
        this.ctx.font = `${p.size}px serif`;
        this.ctx.globalAlpha = p.opacity * 0.65;
        this.ctx.fillText('❤️', p.x, p.y);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${p.hue}, 95%, 55%, ${p.opacity})`;
        this.ctx.shadowBlur = this.isOverdrive ? 20 : 10;
        this.ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    // Interactive particles (sparks, bursts, emojis)
    for (let i = this.interactiveParticles.length - 1; i >= 0; i--) {
      const ip = this.interactiveParticles[i];
      ip.x += ip.speedX;
      ip.y += ip.speedY;
      ip.speedY += 0.15; // Gravity
      ip.opacity -= ip.fadeSpeed;

      if (ip.opacity <= 0 || ip.y > this.height + 50) {
        this.interactiveParticles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, ip.opacity);

      if (ip.type === 'emoji') {
        this.ctx.font = `${ip.size}px "Outfit", sans-serif`;
        this.ctx.fillText(ip.symbol, ip.x, ip.y);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(ip.x, ip.y, ip.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `${ip.color}, ${ip.opacity})`;
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = '#ff1744';
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}
