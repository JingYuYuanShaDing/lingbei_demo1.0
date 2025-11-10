const images = Array.from(document.querySelectorAll('.panel-img'));
const preloader = document.getElementById('preloader');
const percentEl = document.querySelector('.loader-percent');
const heroTitle = document.querySelector('.hero-title');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
const scrollBar = document.getElementById('scroll-progress');
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let loaded = 0;
let particles = [];
function loadImages(){
  if(images.length === 0){
    finishLoad();
    return;
  }
  images.forEach(el=>{
    const src = el.getAttribute('data-bg');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function(){
      loaded++;
      el.style.backgroundImage = "linear-gradient(180deg, rgba(8,12,18,0.2), rgba(0,0,0,0.45)), url('" + src + "')";
      el.classList.add('img-ready');
      updatePercent();
    };
    img.onerror = function(){
      loaded++;
      setFallback(el);
      updatePercent();
    };
    img.src = src;
  });
}
function setFallback(el){
  if(el.classList.contains('relics-img')){
    el.style.backgroundImage = "linear-gradient(180deg, rgba(8,12,18,0.2), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=9f5b7d4c6a2f8b3e1d4a7c6b8e9a2c3d')";
    el.classList.add('img-ready');
    return;
  }
  if(el.classList.contains('history-img')){
    el.style.backgroundImage = "linear-gradient(180deg, rgba(8,12,18,0.2), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d5e6f7a8b9c0d')";
    el.classList.add('img-ready');
    return;
  }
  if(el.classList.contains('poetry-img')){
    el.style.backgroundImage = "linear-gradient(180deg, rgba(8,12,18,0.2), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1526312426976-3d61a2c3a6f7?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4b2f6d7a8c9e0f1a2b3c4d5e6f7a8b9c')";
    el.classList.add('img-ready');
    return;
  }
  el.style.backgroundImage = "linear-gradient(180deg, rgba(8,12,18,0.2), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=5d3d7a3c6c8a4a5b6c7e8d9f0a')";
  el.classList.add('img-ready');
}
function updatePercent(){
  const p = Math.round((loaded / images.length) * 100);
  percentEl.textContent = p + '%';
  if(loaded === images.length){
    setTimeout(finishLoad, 350);
  }
}
function finishLoad(){
  preloader.classList.add('done');
  setTimeout(function(){
    preloader.style.display = 'none';
  }, 600);
}
function initObserver(){
  const io = new IntersectionObserver(function(entries){
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.18});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
function bindPanelTilt(){
  document.querySelectorAll('.panel').forEach(panel=>{
    panel.addEventListener('mousemove', function(e){
      const rect = panel.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      panel.style.transform = 'perspective(900px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 8) + 'deg) translateZ(0)';
      panel.style.boxShadow = (-x * 30) + 'px ' + (-y * 30) + 'px 60px rgba(0,240,255,0.06)';
    });
    panel.addEventListener('mouseleave', function(){
      panel.style.transform = '';
      panel.style.boxShadow = '';
    });
  });
}
function bindNav(){
  navToggle.addEventListener('click', function(){
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = this.getAttribute('href');
      if(target.length > 1){
        e.preventDefault();
        const el = document.querySelector(target);
        if(el){
          el.scrollIntoView({behavior:'smooth', block:'start'});
          navLinks.classList.remove('open');
        }
      }
    });
  });
}
function bindScrollProgress(){
  window.addEventListener('scroll', function(){
    const h = document.documentElement;
    const percent = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    scrollBar.style.width = percent + '%';
  }, {passive: true});
}
function resizeCanvas(){
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
function initParticles(){
  particles = [];
  const count = Math.max(20, Math.floor(canvas.width / 30));
  for(let i = 0; i < count; i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2
    });
  }
}
function step(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;
    if(p.x < 0){
      p.x = canvas.width;
    }
    if(p.x > canvas.width){
      p.x = 0;
    }
    if(p.y < 0){
      p.y = canvas.height;
    }
    if(p.y > canvas.height){
      p.y = 0;
    }
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,240,255,' + p.alpha + ')';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(step);
}
function startParticles(){
  resizeCanvas();
  initParticles();
  step();
}
function heroAnimate(){
  const spanTech = document.createElement('span');
  spanTech.className = 'tech';
  spanTech.textContent = 'Cyber';
  const spanAnc = document.createElement('span');
  spanAnc.className = 'ancient';
  spanAnc.textContent = '人文';
  heroTitle.innerHTML = '';
  heroTitle.appendChild(spanTech);
  heroTitle.appendChild(spanAnc);
  spanTech.animate([{opacity:0, transform:'translateY(6px)'}, {opacity:1, transform:'translateY(0)'}], {duration:700, easing:'cubic-bezier(.2,.9,.3,1)', fill:'forwards'});
  spanAnc.animate([{opacity:0, transform:'translateY(6px)'}, {opacity:1, transform:'translateY(0)'}], {duration:900, easing:'cubic-bezier(.2,.9,.3,1)', fill:'forwards', delay:80});
}
function lazyLoadMore(){
  const lazy = new IntersectionObserver(function(entries){
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const src = el.getAttribute('data-bg');
        if(src && !el.classList.contains('img-ready')){
          const img = new Image();
          img.onload = function(){
            el.style.backgroundImage = "linear-gradient(180deg, rgba(8,12,18,0.2), rgba(0,0,0,0.45)), url('" + src + "')";
            el.classList.add('img-ready');
          };
          img.onerror = function(){
            setFallback(el);
          };
          img.src = src;
        }
        lazy.unobserve(el);
      }
    });
  }, {rootMargin: '200px 0px'});
  document.querySelectorAll('.panel-img').forEach(i=>lazy.observe(i));
}
function keyboardNav(){
  const panels = Array.from(document.querySelectorAll('.panel'));
  let index = 0;
  window.addEventListener('keydown', function(e){
    if(e.key === 'ArrowDown' || e.key === 'PageDown'){
      e.preventDefault();
      index = Math.min(index + 1, panels.length - 1);
      panels[index].scrollIntoView({behavior: 'smooth', block: 'center'});
      panels[index].focus();
    }
    if(e.key === 'ArrowUp' || e.key === 'PageUp'){
      e.preventDefault();
      index = Math.max(index - 1, 0);
      panels[index].scrollIntoView({behavior: 'smooth', block: 'center'});
      panels[index].focus();
    }
  });
  panels.forEach(p=>{
    p.setAttribute('tabindex', '0');
    p.addEventListener('focus', function(){
      index = panels.indexOf(p);
    });
  });
}
window.addEventListener('DOMContentLoaded', function(){
  loadImages();
  initObserver();
  bindPanelTilt();
  bindNav();
  bindScrollProgress();
  heroAnimate();
  lazyLoadMore();
  keyboardNav();
});
window.addEventListener('load', function(){
  resizeCanvas();
  startParticles();
});
window.addEventListener('resize', function(){
  resizeCanvas();
  initParticles();
});
