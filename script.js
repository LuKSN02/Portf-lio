/* ── CURSOR ── */
(function(){
  const cur=document.getElementById('cursor');
  const ring=document.getElementById('cursor-ring');
  let rx=window.innerWidth/2,ry=window.innerHeight/2;
  let cx=rx,cy=ry;
  document.addEventListener('mousemove',e=>{cx=e.clientX;cy=e.clientY});
  (function loop(){
    rx+=(cx-rx)*0.18;ry+=(cy-ry)*0.18;
    cur.style.left=cx+'px';cur.style.top=cy+'px';
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
})();

/* ── CANVAS PARTICLES + SHOOTING STARS ── */
(function(){
  const cv=document.getElementById('canvas-bg');
  const ctx=cv.getContext('2d');
  let W,H;
  function resize(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight}
  resize();window.addEventListener('resize',resize);

  const COLS=['rgba(123,79,255,','rgba(0,229,255,','rgba(74,255,140,','rgba(255,79,216,'];
  let pts=[],mx=W/2,my=H/2;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});

  function Pt(){
    this.x=Math.random()*W;this.y=Math.random()*H;
    this.r=Math.random()*1.4+0.3;
    this.vx=(Math.random()-0.5)*0.22;this.vy=(Math.random()-0.5)*0.22;
    this.a=Math.random()*0.45+0.08;
    this.col=COLS[Math.floor(Math.random()*COLS.length)];
    this.ph=Math.random()*Math.PI*2;
  }
  for(let i=0;i<100;i++) pts.push(new Pt());

  // shooting stars
  let stars=[];
  function Star(){
    this.x=Math.random()*W;this.y=0;
    this.len=Math.random()*120+60;
    this.speed=Math.random()*6+4;
    this.a=1;this.angle=Math.PI/4+Math.random()*0.3;
    this.vx=Math.cos(this.angle)*this.speed;
    this.vy=Math.sin(this.angle)*this.speed;
    this.col=COLS[Math.floor(Math.random()*2)];
    this.life=1;
  }
  setInterval(()=>{if(stars.length<3)stars.push(new Star())},3200);

  function draw(){
    ctx.clearRect(0,0,W,H);

    // shooting stars
    stars=stars.filter(s=>{
      s.x+=s.vx;s.y+=s.vy;s.life-=0.015;
      if(s.life<=0||s.x>W||s.y>H)return false;
      const g=ctx.createLinearGradient(s.x,s.y,s.x-s.vx*(s.len/s.speed),s.y-s.vy*(s.len/s.speed));
      g.addColorStop(0,s.col+s.life*0.8+')');
      g.addColorStop(1,s.col+'0)');
      ctx.beginPath();ctx.moveTo(s.x,s.y);
      ctx.lineTo(s.x-s.vx*(s.len/s.speed),s.y-s.vy*(s.len/s.speed));
      ctx.strokeStyle=g;ctx.lineWidth=1.5;ctx.stroke();
      return true;
    });

    // particles
    pts.forEach((p,i)=>{
      p.ph+=0.007;
      const a=p.a*(0.65+0.35*Math.sin(p.ph));
      p.x+=p.vx+(mx-W/2)*0.000035;
      p.y+=p.vy+(my-H/2)*0.000035;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.col+a+')';ctx.fill();
      for(let j=i+1;j<pts.length;j++){
        const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){
          ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
          ctx.strokeStyle='rgba(123,79,255,'+(0.07*(1-d/110))+')';
          ctx.lineWidth=0.4;ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── SCROLL REVEAL ── */
(function(){
  const els=document.querySelectorAll('.reveal');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        // trigger skill bars
        e.target.querySelectorAll('.sk-bar-fill').forEach(b=>{
          b.style.width=b.dataset.w+'%';
        });
        io.unobserve(e.target);
      }
    });
  },{threshold:0.1});
  els.forEach(el=>io.observe(el));
})();

/* ── CARD TILT + SPOTLIGHT ── */
document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const nx=(e.clientX-r.left)/r.width-0.5;
    const ny=(e.clientY-r.top)/r.height-0.5;
    card.style.transform=`perspective(800px) rotateY(${nx*6}deg) rotateX(${-ny*6}deg)`;
    const px=((e.clientX-r.left)/r.width*100).toFixed(1);
    const py=((e.clientY-r.top)/r.height*100).toFixed(1);
    card.style.setProperty('--cx',px+'%');
    card.style.setProperty('--cy',py+'%');
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(800px) rotateY(0) rotateX(0)';
  });
});

/* ── TEXT SCRAMBLE ── */
(function(){
  const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  function scramble(el,delay){
    const orig=el.textContent;
    setTimeout(()=>{
      let f=0,tot=22;
      const iv=setInterval(()=>{
        el.textContent=orig.split('').map((c,i)=>{
          if(c===' ')return ' ';
          if(f/tot>i/orig.length)return c;
          return chars[Math.floor(Math.random()*chars.length)];
        }).join('');
        if(++f>tot){el.textContent=orig;clearInterval(iv)}
      },40);
    },delay);
  }
  scramble(document.getElementById('ht1'),900);
  scramble(document.getElementById('ht2'),1050);
  scramble(document.getElementById('ht3'),1200);
})();

/* ── COUNTER ANIMATION ── */
(function(){
  document.querySelectorAll('[data-target]').forEach(el=>{
    const span=el.querySelector('span');
    const target=+el.dataset.target;
    const io=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        let n=0,dur=1200,step=dur/target;
        const iv=setInterval(()=>{
          n++;span.textContent=n;
          if(n>=target)clearInterval(iv);
        },step);
        io.disconnect();
      }
    });
    io.observe(el);
  });
})();

/* ── RIPPLE on buttons ── */
document.querySelectorAll('.cbtn').forEach(btn=>{
  btn.addEventListener('click',e=>{
    const r=btn.getBoundingClientRect();
    const rip=document.createElement('span');
    rip.className='ripple';
    const s=Math.max(r.width,r.height);
    rip.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
    btn.appendChild(rip);
    setTimeout(()=>rip.remove(),500);
  });
});

/* ── MOBILE MENU ── */
(function(){
  const burger=document.getElementById('navBurger');
  const menu=document.getElementById('mobileMenu');
  if(!burger||!menu)return;
  function closeMenu(){
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
  }
  burger.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    burger.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open?'true':'false');
  });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  window.addEventListener('resize',()=>{if(window.innerWidth>800)closeMenu()});
})();

/* ── NAV ACTIVE ── */
(function(){
  const secs=document.querySelectorAll('section[id]');
  const links=document.querySelectorAll('.nav-links a, .mobile-menu a');
  window.addEventListener('scroll',()=>{
    let cur='';
    secs.forEach(s=>{if(window.scrollY>=s.offsetTop-130)cur=s.id});
    links.forEach(a=>{
      const href=a.getAttribute('href').slice(1);
      a.classList.toggle('active',href===cur);
    });
  },{passive:true});
})();
