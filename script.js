/* Destaca no topo a seção que está na tela */
(function(){
  const links=[...document.querySelectorAll('.top nav a')];
  const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
  const secs=[...map.keys()].map(id=>document.getElementById(id)).filter(Boolean);
  if(!('IntersectionObserver' in window)||!secs.length)return;

  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      links.forEach(a=>a.classList.remove('on'));
      const a=map.get(e.target.id);
      if(a)a.classList.add('on');
    });
  },{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(s=>io.observe(s));

  // no topo da página, nenhum link fica marcado
  window.addEventListener('scroll',()=>{
    if(window.scrollY<200)links.forEach(a=>a.classList.remove('on'));
  },{passive:true});
})();

/* Abertura: clique, toque ou qualquer tecla pula; ao terminar, ela sai do DOM */
(function(){
  const root=document.documentElement;
  const intro=document.getElementById('intro');
  if(!intro||!root.classList.contains('intro-on'))return;
  function skip(){
    root.classList.add('intro-skipped');
    cleanup();
  }
  function cleanup(){
    intro.remove();
    ['pointerdown','keydown'].forEach(t=>window.removeEventListener(t,skip));
  }
  ['pointerdown','keydown'].forEach(t=>window.addEventListener(t,skip,{once:true}));
  intro.addEventListener('animationend',e=>{if(e.animationName==='intro-out')cleanup()});
})();

/* Barra de progresso de leitura */
(function(){
  const bar=document.getElementById('progress');
  if(!bar)return;
  let ticking=false;
  function update(){
    const max=document.documentElement.scrollHeight-innerHeight;
    bar.style.transform='scaleX('+(max>0?Math.min(1,scrollY/max):0)+')';
    ticking=false;
  }
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
  addEventListener('resize',update);
  update();
})();

/* Brilho roxo que segue o mouse nas linhas de projeto */
(function(){
  if(!matchMedia('(hover:hover)').matches)return;
  document.querySelectorAll('.case').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();
      el.style.setProperty('--mx',(e.clientX-r.left)+'px');
      el.style.setProperty('--my',(e.clientY-r.top)+'px');
    });
  });
})();

/* Copiar email */
(function(){
  const live=document.getElementById('copy-live');
  document.querySelectorAll('.copy').forEach(btn=>{
    const label=btn.textContent;
    btn.addEventListener('click',async()=>{
      const text=btn.dataset.copy;
      try{
        if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);
        else{
          const t=document.createElement('textarea');
          t.value=text;t.style.position='fixed';t.style.opacity='0';
          document.body.appendChild(t);t.select();
          const ok=document.execCommand('copy');t.remove();
          if(!ok)throw new Error('copy');
        }
        btn.textContent='Copiado';btn.classList.add('done');
        if(live)live.textContent='Email copiado';
      }catch(e){
        btn.textContent='Copie manualmente';
      }
      setTimeout(()=>{btn.textContent=label;btn.classList.remove('done');if(live)live.textContent=''},1800);
    });
  });
})();

/* Objeto wireframe do hero: um icosaedro desenhado no canvas 2D, girando devagar */
(function(){
  const cv=document.getElementById('orb');
  if(!cv||!cv.getContext)return;
  const ctx=cv.getContext('2d');
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

  // vértices e arestas do icosaedro
  const t=(1+Math.sqrt(5))/2;
  const V=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]]
    .map(v=>{const l=Math.hypot(...v);return v.map(c=>c/l)});
  const E=[];
  for(let i=0;i<V.length;i++)for(let j=i+1;j<V.length;j++){
    const d=Math.hypot(V[i][0]-V[j][0],V[i][1]-V[j][1],V[i][2]-V[j][2]);
    if(d<1.12)E.push([i,j]);
  }

  let W=0,H=0,dpr=1;
  function size(){
    const r=cv.getBoundingClientRect();
    dpr=Math.min(devicePixelRatio||1,2);
    W=r.width;H=r.height;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  let px=0,py=0,tx=0,ty=0;
  addEventListener('pointermove',e=>{
    tx=(e.clientX/innerWidth-.5);ty=(e.clientY/innerHeight-.5);
  },{passive:true});

  function frame(time){
    const a=reduce?0.6:time/1000*0.22;
    px+=(tx-px)*.05;py+=(ty-py)*.05;
    const ay=a+px*1.2, ax=0.5+py*1.0;
    const cy=Math.cos(ay),sy=Math.sin(ay),cx=Math.cos(ax),sx=Math.sin(ax);
    const R=Math.min(W,H)*0.3, cxp=W/2, cyp=H/2;

    const P=V.map(v=>{
      let x=v[0]*cy+v[2]*sy, z=-v[0]*sy+v[2]*cy, y=v[1];
      const y2=y*cx-z*sx, z2=y*sx+z*cx;
      const k=1/(1.9-z2*0.5);
      return {x:cxp+x*R*k*1.9,y:cyp+y2*R*k*1.9,z:z2};
    });

    ctx.clearRect(0,0,W,H);

    // anel orbital e satélite
    ctx.save();
    ctx.translate(cxp,cyp);ctx.rotate(-0.35);
    ctx.strokeStyle='rgba(169,140,255,.22)';ctx.lineWidth=1;
    ctx.beginPath();ctx.ellipse(0,0,R*1.5,R*0.54,0,0,Math.PI*2);ctx.stroke();
    const o=reduce?1.2:time/1000*0.5;
    ctx.fillStyle='#a98cff';ctx.beginPath();
    ctx.arc(Math.cos(o)*R*1.5,Math.sin(o)*R*0.54,3,0,Math.PI*2);ctx.fill();
    ctx.restore();

    // arestas (as de trás ficam mais fracas)
    ctx.lineWidth=1.1;
    E.forEach(([i,j])=>{
      const z=(P[i].z+P[j].z)/2, al=0.22+0.5*((z+1)/2);
      ctx.strokeStyle='rgba(123,79,255,'+al.toFixed(3)+')';
      ctx.beginPath();ctx.moveTo(P[i].x,P[i].y);ctx.lineTo(P[j].x,P[j].y);ctx.stroke();
    });
    // vértices
    P.forEach(p=>{
      const al=0.35+0.65*((p.z+1)/2);
      ctx.fillStyle='rgba(169,140,255,'+al.toFixed(3)+')';
      ctx.beginPath();ctx.arc(p.x,p.y,1.8+1.2*((p.z+1)/2),0,Math.PI*2);ctx.fill();
    });
  }

  let raf=0,visible=true;
  function loop(t){frame(t);if(visible&&!document.hidden)raf=requestAnimationFrame(loop);else raf=0}
  function start(){if(!raf&&!reduce)raf=requestAnimationFrame(loop)}

  size();frame(0);
  addEventListener('resize',()=>{size();if(reduce)frame(0)});
  if(reduce)return;
  if('IntersectionObserver' in window){
    new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)start()}).observe(cv);
  }
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)start()});
  start();
})();
