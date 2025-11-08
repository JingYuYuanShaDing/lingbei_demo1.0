document.addEventListener('DOMContentLoaded', function() {
  const loader = document.querySelector('.loader');
  function hideLoader() {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
  setTimeout(hideLoader, 700);
  window.addEventListener('load', function() { setTimeout(hideLoader, 300); });

  const quickLinks = document.querySelectorAll('.quick-link');
  quickLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const el = document.getElementById(targetId);
      if (!el) {
        if (targetId === 'insights') {
          window.scrollTo({ top: document.querySelector('.insights').offsetTop - 70, behavior: 'smooth' });
        }
        return;
      }
      const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  const subscribeBtn = document.querySelector('.footer-subscribe-btn');
  const subscribeInput = document.querySelector('.footer-subscribe-input');
  if (subscribeBtn && subscribeInput) {
    subscribeBtn.addEventListener('click', function() {
      const email = subscribeInput.value.trim();
      if (email && validateEmail(email)) {
        const original = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i>';
        subscribeInput.value = '订阅成功！';
        subscribeInput.disabled = true;
        setTimeout(function() {
          subscribeInput.value = '';
          subscribeInput.disabled = false;
          subscribeBtn.innerHTML = original;
        }, 2400);
      } else if (email) {
        subscribeInput.style.border = '1px solid #ff6b6b';
        setTimeout(function() { subscribeInput.style.border = '0'; }, 1400);
      }
    });
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const canvas = document.getElementById('header-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    const rect = document.querySelector('header.site-header').getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function rnd(min, max) {
    return Math.random() * (max - min) + min;
  }

  function rotateY(p, a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
  }

  function rotateX(p, a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
  }

  function project(p, cx, cy, fov, zOff) {
    const z = p[2] + zOff + 3.6;
    const f = fov / z;
    return { x: cx + p[0] * f, y: cy - p[1] * f, z: z };
  }

  const TETRA = [
    [1,1,1],
    [1,-1,-1],
    [-1,1,-1],
    [-1,-1,1]
  ];

  const OCTA = [
    [1,0,0],
    [-1,0,0],
    [0,1,0],
    [0,-1,0],
    [0,0,1],
    [0,0,-1]
  ];

  function edgesFromVerts(vs) {
    const edges = [];
    for (let i=0;i<vs.length;i++) {
      for (let j=i+1;j<vs.length;j++) {
        edges.push([i,j]);
      }
    }
    return edges;
  }

  const TET_EDGES = edgesFromVerts(TETRA);
  const OCT_EDGES = edgesFromVerts(OCTA);

  class FloatObj {
    constructor(type, fixed, sx, sy) {
      this.type = type;
      this.fixed = !!fixed;
      this.cx = sx || rnd(0.18, 0.82) * window.innerWidth;
      this.cy = sy || rnd(0.18, 0.62) * window.innerHeight;
      this.z = rnd(0.95, 2.3);
      this.size = rnd(28, 86);
      this.angle = rnd(0, Math.PI*2);
      this.spin = rnd(-0.006, 0.006);
      this.vx = rnd(-0.03, 0.03);
      this.vy = rnd(-0.02, 0.02);
      this.life = rnd(7000, 15000);
      this.age = rnd(0, this.life);
      this.baseAlpha = rnd(0.04, 0.26);
    }
    step(dt) {
      this.age += dt;
      if (!this.fixed) {
        this.cx += this.vx * dt * 0.06;
        this.cy += this.vy * dt * 0.06;
        this.angle += this.spin * dt * 0.06;
        if (this.cx < -120 || this.cx > window.innerWidth + 120 || this.cy < -120 || this.cy > window.innerHeight + 120) this.reset();
        if (this.age > this.life) this.reset();
      } else {
        this.angle += this.spin * dt * 0.04;
        this.age = (this.age + dt) % this.life;
      }
    }
    reset() {
      this.cx = rnd(0.12, 0.88) * window.innerWidth;
      this.cy = rnd(0.12, 0.72) * window.innerHeight;
      this.z = rnd(0.95, 2.3);
      this.size = rnd(28, 86);
      this.angle = rnd(0, Math.PI*2);
      this.spin = rnd(-0.006, 0.006);
      this.vx = rnd(-0.03, 0.03);
      this.vy = rnd(-0.02, 0.02);
      this.life = rnd(7000, 15000);
      this.age = 0;
      this.baseAlpha = rnd(0.04, 0.26);
    }
    draw(ctx, fov) {
      const topo = this.type === 'tetra' ? TETRA : OCTA;
      const edges = this.type === 'tetra' ? TET_EDGES : OCT_EDGES;
      const s = (this.size / 120) * (1.0 / this.z);
      const pts = [];
      for (let i=0;i<topo.length;i++) {
        const v = [topo[i][0] * s, topo[i][1] * s, topo[i][2] * s];
        let r = rotateY(v, this.angle + Math.sin(this.age * 0.001) * 0.12);
        r = rotateX(r, this.angle * 0.5);
        const p = project(r, this.cx, this.cy, fov, (this.z - 1.2));
        pts.push(p);
      }
      const progress = Math.max(0, Math.min(1, this.age / this.life));
      const fade = Math.sin(progress * Math.PI);
      const alpha = this.baseAlpha * fade;
      ctx.globalAlpha = Math.min(1, alpha * 1.6);
      ctx.globalCompositeOperation = 'lighter';
      for (let e=0;e<edges.length;e++) {
        const a = pts[edges[e][0]];
        const b = pts[edges[e][1]];
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(0,240,255,${0.95})`);
        grad.addColorStop(1, `rgba(46,230,166,${0.95})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(0.7, 1.4 * (1 / ((a.z + b.z) * 0.8)));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      for (let i=0;i<pts.length;i++) {
        const p = pts[i];
        const r = Math.max(1.4, 5 * (1 / p.z));
        const g = ctx.createRadialGradient(p.x - r/3, p.y - r/3, 0.5, p.x, p.y, r * 1.6);
        g.addColorStop(0, 'rgba(255,255,255,0.95)');
        g.addColorStop(0.2, 'rgba(0,240,255,0.95)');
        g.addColorStop(1, 'rgba(46,230,166,0.06)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  class Rod {
    constructor() {
      this.reset();
    }
    reset() {
      this.x1 = rnd(0, window.innerWidth);
      this.y1 = rnd(window.innerHeight * 0.18, window.innerHeight * 0.72);
      this.x2 = this.x1 + rnd(-140, 140);
      this.y2 = this.y1 + rnd(-140, 140);
      this.life = rnd(2800, 6800);
      this.age = 0;
      this.alpha = rnd(0.06, 0.22);
      this.vx = rnd(-0.02, 0.02);
      this.vy = rnd(-0.01, 0.01);
    }
    step(dt) {
      this.age += dt;
      this.x1 += this.vx * dt * 0.06;
      this.x2 += this.vx * dt * 0.06;
      this.y1 += this.vy * dt * 0.06;
      this.y2 += this.vy * dt * 0.06;
      if (this.age > this.life) this.reset();
    }
    draw(ctx) {
      const t = 1 - Math.min(1, this.age / this.life);
      const grad = ctx.createLinearGradient(this.x1, this.y1, this.x2, this.y2);
      grad.addColorStop(0, `rgba(0,240,255,${this.alpha * t})`);
      grad.addColorStop(1, `rgba(46,230,166,${this.alpha * 0.7 * t})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(this.x1, this.y1);
      ctx.lineTo(this.x2, this.y2);
      ctx.stroke();
    }
  }

  class Dot {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = rnd(0, window.innerWidth);
      this.y = rnd(window.innerHeight * 0.12, window.innerHeight * 0.75);
      this.r = rnd(0.8, 2.6);
      this.alpha = rnd(0.04, 0.22);
      this.vx = rnd(-0.02, 0.02);
      this.vy = rnd(-0.01, 0.01);
    }
    step(dt) {
      this.x += this.vx * dt * 0.06;
      this.y += this.vy * dt * 0.06;
      if (this.x < -20 || this.x > window.innerWidth + 20 || this.y < -60 || this.y > window.innerHeight + 60) {
        this.reset();
      }
    }
    draw(ctx) {
      const g = ctx.createRadialGradient(this.x - this.r/3, this.y - this.r/3, 0.5, this.x, this.y, this.r * 3);
      g.addColorStop(0, 'rgba(255,255,255,0.95)');
      g.addColorStop(0.25, 'rgba(0,240,255,0.85)');
      g.addColorStop(1, 'rgba(0,240,255,0.02)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const floats = [];
  for (let i=0;i<10;i++) {
    const type = i % 2 === 0 ? 'tetra' : 'octa';
    floats.push(new FloatObj(type, false));
  }

  const staticRotators = [];
  staticRotators.push(new FloatObj('octa', true, window.innerWidth * 0.28, window.innerHeight * 0.42));
  staticRotators.push(new FloatObj('tetra', true, window.innerWidth * 0.72, window.innerHeight * 0.42));

  const rods = [];
  for (let i=0;i<12;i++) rods.push(new Rod());

  const dots = [];
  for (let i=0;i<28;i++) dots.push(new Dot());

  let last = performance.now();

  function frame(t) {
    const now = t;
    const dt = now - last;
    last = now;
    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i=0;i<dots.length;i++) {
      dots[i].step(dt);
      dots[i].draw(ctx);
    }

    for (let i=0;i<rods.length;i++) {
      rods[i].step(dt);
      rods[i].draw(ctx);
    }

    for (let i=0;i<floats.length;i++) {
      floats[i].step(dt);
      floats[i].draw(ctx, 260);
    }

    for (let i=0;i<staticRotators.length;i++) {
      staticRotators[i].step(dt);
      staticRotators[i].draw(ctx, 320);
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
});
