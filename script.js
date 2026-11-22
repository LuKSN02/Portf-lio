/* ───────────────────────────────────────────────
   IDIOMA (PT / EN)
   O HTML está em português. O inglês vem do dicionário abaixo e
   volta ao português restaurando o texto original de cada elemento.
   ─────────────────────────────────────────────── */
const EN={
  'meta.title':'Lucas Neves — Web Developer',
  'meta.desc':'Portfolio of Lucas Neves, front-end developer based in São Paulo, Brazil. Real-time apps, tabletop RPG platforms and interfaces built with Firebase and Three.js.',
  'skip':'Skip to projects',
  'aria.home':'Lucas Neves, home','aria.nav':'Main','aria.stack':'Technologies','aria.foot':'Footer',
  'nav.projects':'Projects','nav.about':'About','nav.contact':'Contact',
  'status':'Available',
  'hero.role':'Web developer · São Paulo, Brazil',
  'hero.lead':'Interfaces that live at the intersection of technology, roleplay and data. I build with Firebase, Three.js and a lot of handcrafted code, from dungeon to dashboard.',
  'hero.cta1':'View projects','hero.cta2':'Get in touch',
  'f.base':'Base','f.focus':'Focus','f.work':'Work',
  'v.base':'São Paulo, Brazil','v.stack':'Firebase, Three.js, vanilla JS',
  'stack.html':'HTML, CSS and JavaScript','stack.a11y':'Accessibility',
  'proj.sub':'Three live projects, built between 2024 and 2026.',
  'open':'View project','newtab':' (opens in a new tab)',
  'kind.vtt':'Virtual tabletop for RPGs',
  'ficha.d':'Virtual tabletop platform for RPGs. Full digital character sheet, procedural 3D map with Three.js, real-time tokens via Firebase and a campaign dashboard with Firestore.',
  'gkio.kind':'Real-time chat',
  'gkio.d':'Cross-platform communication app that blends Discord-style servers with Skype-like profiles and calls, with its own visual identity. DMs, text and voice channels by category, voice and video calls and public profiles, all in real time.',
  'nexus.kind':'E-sports, news and store',
  'nexus.d':'E-sports news portal covering League of Legends, CS2, Valorant and more, integrated with a gaming peripherals store with cart and checkout. Real-time sign-up and login with Firebase Auth, data in Firestore and offline PWA support.',
  'tag.realtime':'Real time','tag.store':'Online store',
  'about.p1':"I'm Lucas Neves Trajano Dias, a junior developer looking for a place in the market, focused on front-end.",
  'about.p2':'I build real projects, like the ones you see here, to grow through practice: testing, failing and learning along the way.',
  'about.p3':'I live in São Paulo and work from home (home office), which is the field I plan to build my career in.',
  'about.p4':"I'm passionate about tabletop RPGs and the idea that a good system deserves a platform to match. I work with plain HTML, CSS and JavaScript, Firebase for real-time data and Three.js for 3D in the browser.",
  'b.age':'Age','b.age.v':'18 years old',
  'b.nat':'Nationality','b.nat.v':'Brazil (PT-BR)',
  'b.city':'Lives in','b.city.v':'São Paulo, Brazil',
  'b.edu':'Education','b.edu.v':'Systems Development, E.E. Amaral Wagner, São Paulo',
  'b.work.v':'Home office, the field I plan to work in',
  'sk.h':'What I work with',
  'sk.three':'3D in the browser, WebGL, procedural maps',
  'sk.css':'CSS and design','sk.css.s':'Animations, glassmorphism, themes',
  'sk.game':'Virtual tabletops and RPG systems',
  'c.h':"Let's talk?",'c.sub':'Open to collaborations, freelance work and good ideas.',
  'copy':'Copy email','soon':'Coming soon',
  'foot.d':'Web developer in São Paulo, Brazil. Real-time interfaces, 3D in the browser and tools for tabletop RPGs.',
  'foot.top':'Back to top','foot.made':'Handmade, no framework',
  'd20.aria':'Roll a d20',
  'n1':'live projects','n3':'Firebase services in use','n4':'frameworks, all vanilla JS',
  'badge.main':'Main project','role.label':'My role',
  'ficha.r':'Built end to end: character sheets, campaigns, 2D and 3D tabletop, profiles and a Firebase backend.',
  'gkio.r':'Built end to end: chat, calls, server permissions with Firestore rules and a mobile layout.',
  'nexus.r':'School group project at E.E. Amaral Wagner. Discord login, store with checkout and PWA.',
};
/* textos que o JS escreve em tempo de execução */
const RT={
  pt:{
    'd20.hint':'Clique no dado e role um d20',
    'd20.rolling':'Rolando...',
    'd20.rolled':'Rolou',
    'd20.r1':'Falha crítica! Tenta de novo?',
    'd20.rlow':'Dá pra melhorar. Role outra vez.',
    'd20.rmid':'Boa rolagem!',
    'd20.r20':'Crítico! Bora trabalhar juntos?',
    'copied':'Copiado','copyfail':'Copie manualmente','live':'Email copiado',
    'lang.label':'Switch to English','lang.btn':'EN',
    'theme.toLight':'Mudar para o tema claro','theme.toDark':'Mudar para o tema escuro','theme.toAmoled':'Mudar para o tema AMOLED'
  },
  en:{
    'd20.hint':'Click the die and roll a d20',
    'd20.rolling':'Rolling...',
    'd20.rolled':'Rolled',
    'd20.r1':'Critical fail! Try again?',
    'd20.rlow':'Could be better. Roll again.',
    'd20.rmid':'Nice roll!',
    'd20.r20':"Critical hit! Let's work together?",
    'copied':'Copied','copyfail':'Copy it manually','live':'Email copied',
    'lang.label':'Mudar para português','lang.btn':'PT',
    'theme.toLight':'Switch to light theme','theme.toDark':'Switch to dark theme','theme.toAmoled':'Switch to AMOLED theme'
  }
};

const I18N=(function(){
  const els=[...document.querySelectorAll('[data-i18n]')];
  const attrEls=[...document.querySelectorAll('[data-i18n-attr]')];
  const metaDesc=document.querySelector('meta[name="description"]');
  const PT={'meta.title':document.title,'meta.desc':metaDesc?metaDesc.content:''};

  els.forEach(el=>{el.dataset.pt=el.textContent;if(!(el.dataset.i18n in PT))PT[el.dataset.i18n]=el.textContent});
  const attrs=attrEls.map(el=>({el,list:el.dataset.i18nAttr.split(';').map(p=>{const[a,k]=p.split(':');return{a,k,pt:el.getAttribute(a)}})}));
  attrs.forEach(o=>o.list.forEach(x=>{if(!(x.k in PT))PT[x.k]=x.pt}));

  let lang='pt';
  function t(key){
    if(lang==='en')return EN[key]??RT.en[key]??PT[key]??key;
    return PT[key]??RT.pt[key]??key;
  }
  function apply(l){
    lang=l;
    document.documentElement.lang=l==='en'?'en':'pt-BR';
    els.forEach(el=>{el.textContent=l==='en'?(EN[el.dataset.i18n]??el.dataset.pt):el.dataset.pt});
    attrs.forEach(o=>o.list.forEach(x=>o.el.setAttribute(x.a,l==='en'?(EN[x.k]??x.pt):x.pt)));
    document.title=t('meta.title');
    if(metaDesc)metaDesc.content=t('meta.desc');
    const btn=document.getElementById('lang');
    if(btn){btn.textContent=t('lang.btn');btn.setAttribute('aria-label',t('lang.label'));btn.setAttribute('lang',l==='en'?'pt-BR':'en')}
    document.dispatchEvent(new CustomEvent('langchange',{detail:l}));
  }
  function set(l){
    apply(l);
    try{localStorage.setItem('lang',l)}catch(e){}
  }

  // idioma inicial: ?lang= > escolha salva > idioma do navegador
  let start=null;
  try{start=new URLSearchParams(location.search).get('lang')}catch(e){}
  if(start!=='pt'&&start!=='en'){
    try{start=localStorage.getItem('lang')}catch(e){start=null}
  }
  if(start!=='pt'&&start!=='en'){
    start=((navigator.language||'pt').toLowerCase().indexOf('pt')===0)?'pt':'en';
  }
  if(start==='en')apply('en');

  const btn=document.getElementById('lang');
  if(btn)btn.addEventListener('click',()=>set(lang==='pt'?'en':'pt'));

  return{t,get lang(){return lang}};
})();
const t=I18N.t;

/* ───────────────────────────────────────────────
   NAV: destaca a seção na tela
   ─────────────────────────────────────────────── */
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

  addEventListener('scroll',()=>{
    if(scrollY<200)links.forEach(a=>a.classList.remove('on'));
  },{passive:true});
})();

/* ───────────────────────────────────────────────
   ABERTURA: clique, toque ou tecla pula
   ─────────────────────────────────────────────── */
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
    ['pointerdown','keydown'].forEach(ev=>removeEventListener(ev,skip));
  }
  ['pointerdown','keydown'].forEach(ev=>addEventListener(ev,skip,{once:true}));
  intro.addEventListener('animationend',e=>{if(e.animationName==='intro-out')cleanup()});
})();

/* ───────────────────────────────────────────────
   BARRA DE PROGRESSO
   ─────────────────────────────────────────────── */
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

/* ───────────────────────────────────────────────
   BRILHO QUE SEGUE O MOUSE NOS PROJETOS
   ─────────────────────────────────────────────── */
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

/* ───────────────────────────────────────────────
   COPIAR EMAIL
   ─────────────────────────────────────────────── */
(function(){
  const live=document.getElementById('copy-live');
  document.querySelectorAll('.copy').forEach(btn=>{
    let timer=0;
    btn.addEventListener('click',async()=>{
      const text=btn.dataset.copy;
      let ok=true;
      try{
        if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);
        else{
          const ta=document.createElement('textarea');
          ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
          document.body.appendChild(ta);ta.select();
          ok=document.execCommand('copy');ta.remove();
        }
      }catch(e){ok=false}
      btn.textContent=ok?t('copied'):t('copyfail');
      btn.classList.toggle('done',ok);
      if(live)live.textContent=ok?t('live'):'';
      clearTimeout(timer);
      timer=setTimeout(()=>{btn.textContent=t('copy');btn.classList.remove('done');if(live)live.textContent=''},1800);
    });
  });
})();

/* ───────────────────────────────────────────────
   D20: um icosaedro de verdade. Clique para rolar.
   20 é crítico; 1 é falha crítica.
   ─────────────────────────────────────────────── */
(function(){
  const cv=document.getElementById('orb');
  const btn=document.getElementById('d20');
  const out=document.getElementById('d20-out');
  const wrap=document.getElementById('d20-wrap');
  if(!cv||!btn||!cv.getContext)return;
  const ctx=cv.getContext('2d');
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

  // geometria do icosaedro
  const phi=(1+Math.sqrt(5))/2;
  const V=[[-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],[0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],[phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]]
    .map(v=>{const l=Math.hypot(v[0],v[1],v[2]);return v.map(c=>c/l)});
  const E=[];
  for(let i=0;i<V.length;i++)for(let j=i+1;j<V.length;j++){
    if(Math.hypot(V[i][0]-V[j][0],V[i][1]-V[j][1],V[i][2]-V[j][2])<1.12)E.push([i,j]);
  }

  // estado
  let raf=0,last=0,visible=true;
  /* cores vêm do CSS, então acompanham o tema */
  let C={};
  function colors(){
    const cs=getComputedStyle(document.documentElement);
    const g=n=>cs.getPropertyValue(n).trim();
    C={edge:g('--edge-rgb'),dot:g('--dot-rgb'),num:g('--num-rgb'),crit:g('--crit-rgb')};
  }
  colors();
  document.addEventListener('themechange',()=>{colors();if(!raf)draw(0)});

  let W=0,H=0;
  let ay=0.6,ax=0.5;           // ângulos
  let oy=0,ox=0;               // velocidades da rolagem
  let rolling=false,shown=null,lastN=null;
  let flickAt=0,orbit=1.2;
  let px=0,py=0,tx=0,ty=0;     // parallax do mouse
  let parts=[];
  const IDLE=0.22;

  function size(){
    const r=cv.getBoundingClientRect();
    const dpr=Math.min(devicePixelRatio||1,2);
    W=r.width;H=r.height;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  addEventListener('pointermove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5},{passive:true});

  /* texto de resultado */
  function msgKey(n){return n===20?'d20.r20':n===1?'d20.r1':n>=10?'d20.rmid':'d20.rlow'}
  function render(){
    if(!out)return;
    if(rolling)out.textContent=t('d20.rolling');
    else if(lastN==null)out.textContent=t('d20.hint');
    else out.textContent=t('d20.rolled')+' '+lastN+' · '+t(msgKey(lastN));
  }
  document.addEventListener('langchange',render);

  /* desenho */
  function draw(dt){
    const A=ay+px*1.2, B=ax+py*1.0;
    const cy=Math.cos(A),sy=Math.sin(A),cx=Math.cos(B),sx=Math.sin(B);
    const R=Math.min(W,H)*0.3, cxp=W/2, cyp=H/2;

    const P=V.map(v=>{
      const x=v[0]*cy+v[2]*sy, z=-v[0]*sy+v[2]*cy, y=v[1];
      const y2=y*cx-z*sx, z2=y*sx+z*cx;
      const k=1/(1.9-z2*0.5);
      return{x:cxp+x*R*k*1.9,y:cyp+y2*R*k*1.9,z:z2};
    });

    ctx.clearRect(0,0,W,H);

    // anel orbital e satélite
    ctx.save();
    ctx.translate(cxp,cyp);ctx.rotate(-0.35);
    ctx.strokeStyle='rgba('+C.dot+',.28)';ctx.lineWidth=1;
    ctx.beginPath();ctx.ellipse(0,0,R*1.5,R*0.54,0,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle='rgb('+C.dot+')';ctx.beginPath();
    ctx.arc(Math.cos(orbit)*R*1.5,Math.sin(orbit)*R*0.54,3,0,Math.PI*2);ctx.fill();
    ctx.restore();

    // arestas e vértices (o fundo fica mais fraco)
    ctx.lineWidth=1.1;
    const boost=rolling?0.25:0;
    E.forEach(e=>{
      const z=(P[e[0]].z+P[e[1]].z)/2, al=Math.min(1,0.22+0.5*((z+1)/2)+boost);
      ctx.strokeStyle='rgba('+C.edge+','+al.toFixed(3)+')';
      ctx.beginPath();ctx.moveTo(P[e[0]].x,P[e[0]].y);ctx.lineTo(P[e[1]].x,P[e[1]].y);ctx.stroke();
    });
    P.forEach(p=>{
      const al=0.35+0.65*((p.z+1)/2);
      ctx.fillStyle='rgba('+C.dot+','+al.toFixed(3)+')';
      ctx.beginPath();ctx.arc(p.x,p.y,1.8+1.2*((p.z+1)/2),0,Math.PI*2);ctx.fill();
    });

    // número no centro
    if(shown!=null){
      ctx.font='800 '+Math.round(R*0.95)+'px Syne, system-ui, sans-serif';
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillStyle=rolling?'rgba('+C.num+',.45)':(lastN===20?'rgb('+C.crit+')':'rgba('+C.num+',.92)');
      ctx.fillText(String(shown),cxp,cyp+R*0.04);
    }

    // partículas do crítico
    parts=parts.filter(p=>p.life>0);
    parts.forEach(p=>{
      p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=60*dt;p.life-=dt*0.85;
      ctx.fillStyle='rgba('+C.dot+','+Math.max(0,p.life).toFixed(3)+')';
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    });
  }

  function step(dt){
    if(rolling){
      const k=Math.exp(-dt*1.5);
      oy*=k;ox*=k;
      const now=performance.now();
      if(now>flickAt){shown=1+Math.floor(Math.random()*20);flickAt=now+70}
      if(Math.abs(oy)<1.1)finish();
    }
    ay+=((rolling?0:IDLE)+oy)*dt;
    ax+=ox*dt;
    orbit+=dt*0.5;
    px+=(tx-px)*.05;py+=(ty-py)*.05;
    draw(dt);
  }

  /* rolagem */
  function crit(){
    wrap.classList.remove('crit');void wrap.offsetWidth;wrap.classList.add('crit');
    const R=Math.min(W,H)*0.3;
    for(let i=0;i<42;i++){
      const a=Math.random()*Math.PI*2,s=70+Math.random()*190;
      parts.push({x:W/2,y:H/2,vx:Math.cos(a)*s,vy:Math.sin(a)*s-30,life:1,r:1+Math.random()*2.2+R*0.01});
    }
  }
  function fail(){
    btn.classList.remove('shake');void btn.offsetWidth;btn.classList.add('shake');
  }
  function finish(){
    rolling=false;oy=0;ox=0;
    lastN=1+Math.floor(Math.random()*20);
    shown=lastN;
    if(lastN===20)crit();
    if(lastN===1)fail();
    render();
    if(reduce)draw(0);else start();
  }
  function roll(){
    if(rolling)return;
    wrap.classList.remove('crit');btn.classList.remove('shake');
    if(reduce){ // sem animação: resultado direto
      rolling=true;finish();return;
    }
    rolling=true;
    oy=(11+Math.random()*6)*(Math.random()<.5?-1:1);
    ox=5+Math.random()*5;
    render();
    start();
  }
  btn.addEventListener('click',roll);

  /* laço de animação: roda só enquanto o dado está visível */
  function loop(ts){
    const dt=Math.min(0.05,(ts-last)/1000||0.016);last=ts;
    step(dt);
    const busy=rolling||parts.length>0;
    if((visible&&!document.hidden)||busy)raf=requestAnimationFrame(loop);else raf=0;
  }
  function start(){if(!raf&&!reduce){last=performance.now();raf=requestAnimationFrame(loop)}}

  size();render();draw(0);
  addEventListener('resize',()=>{size();if(!raf)draw(0)});
  if(reduce)return;
  if('IntersectionObserver' in window){
    new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)start()}).observe(cv);
  }
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)start()});
  start();
})();

/* ───────────────────────────────────────────────
   TEMA ESCURO / AMOLED / CLARO
   (o valor salvo já é aplicado no <head>, antes da primeira pintura)
   ─────────────────────────────────────────────── */
(function(){
  const root=document.documentElement;
  const btn=document.getElementById('theme');
  const meta=document.querySelector('meta[name="theme-color"]');
  if(!btn)return;
  const ORDER=['dark','amoled','light'];
  const NEXT_KEY={dark:'theme.toAmoled',amoled:'theme.toLight',light:'theme.toDark'};
  const META={dark:'#07070d',amoled:'#000000',light:'#f7f6fb'};
  function label(){btn.setAttribute('aria-label',t(NEXT_KEY[root.dataset.theme]||'theme.toAmoled'))}
  function apply(th,save){
    root.dataset.theme=th;
    if(meta)meta.content=META[th];
    label();
    if(save){try{localStorage.setItem('theme',th)}catch(e){}}
    document.dispatchEvent(new CustomEvent('themechange',{detail:th}));
  }
  btn.addEventListener('click',()=>apply(ORDER[(ORDER.indexOf(root.dataset.theme)+1)%3],true));
  document.addEventListener('langchange',label);
  label();
})();

/* ───────────────────────────────────────────────
   PRÉVIA DOS PROJETOS
   Desktop: um cartão segue o mouse com o print do projeto.
   Celular/tablet: o print aparece dentro da linha.
   Os prints ficam em images/ (ficha.jpg, gkio.jpg, nexus.jpg).
   Sem o arquivo, o cartão mostra um placeholder com o nome do projeto.
   ─────────────────────────────────────────────── */
(function(){
  const cases=[...document.querySelectorAll('.case[data-shot]')];
  const peek=document.getElementById('peek');
  if(!cases.length)return;

  const status={};  // src -> true/false (carregou ou não)
  function probe(src){
    return new Promise(res=>{
      if(src in status)return res(status[src]);
      const im=new Image();
      im.onload=()=>{status[src]=true;res(true)};
      im.onerror=()=>{status[src]=false;res(false)};
      im.src=src;
    });
  }

  // prints dentro da linha (aparecem só em telas estreitas ou sem mouse; o CSS decide)
  cases.forEach(el=>{
    probe(el.dataset.shot).then(ok=>{
      if(!ok)return;
      const fig=document.createElement('span');
      fig.className='case-shot ok';
      const im=document.createElement('img');
      im.src=el.dataset.shot;im.alt='';im.loading='lazy';im.decoding='async';
      fig.appendChild(im);
      el.insertBefore(fig,el.firstChild);
    });
  });

  if(!peek)return;
  const can=()=>matchMedia('(hover:hover) and (min-width:901px)').matches;
  const img=peek.querySelector('img');
  const iconBox=peek.querySelector('.peek-icon');
  const nameEl=peek.querySelector('.peek-ph strong');
  const urlEl=peek.querySelector('.peek-url');
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  let x=-999,y=-999,tx=-999,ty=-999,raf=0,active=null;

  function place(){
    const w=peek.offsetWidth||340,h=peek.offsetHeight||240;
    let px=tx+26,py=ty+22;
    if(px+w>innerWidth-16)px=tx-w-26;
    if(py+h>innerHeight-16)py=innerHeight-h-16;
    if(py<70)py=70;
    return[px,py];
  }
  function tick(){
    const[px,py]=place();
    x+=(px-x)*(reduce?1:.2);y+=(py-y)*(reduce?1:.2);
    peek.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0) scale('+(active?1:.96)+')';
    if(active||Math.abs(px-x)>.5||Math.abs(py-y)>.5)raf=requestAnimationFrame(tick);else raf=0;
  }
  function kick(){if(!raf)raf=requestAnimationFrame(tick)}

  function show(el,first){
    if(!can())return;
    active=el;
    const u=new URL(el.href);
    urlEl.textContent=(u.host+u.pathname).replace(/\/index\.html$/,'').replace(/\/$/,'');
    nameEl.textContent=el.querySelector('h3').textContent;
    const svg=el.querySelector('.case-icon svg');
    iconBox.innerHTML=svg?svg.outerHTML:'';
    const src=el.dataset.shot;
    peek.classList.remove('has-img');
    probe(src).then(ok=>{
      if(active!==el)return;
      if(ok){img.src=src;peek.classList.add('has-img')}
    });
    if(first){x=tx+26;y=ty+22}
    peek.classList.add('on');
    kick();
  }
  function hide(){active=null;peek.classList.remove('on');kick()}

  cases.forEach(el=>{
    el.addEventListener('pointerenter',e=>{tx=e.clientX;ty=e.clientY;show(el,!peek.classList.contains('on'))});
    el.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;kick()});
    el.addEventListener('pointerleave',hide);
    el.addEventListener('focus',()=>{
      if(!el.matches(':focus-visible'))return;
      const r=el.getBoundingClientRect();
      tx=r.right-380;ty=r.top+r.height/2-100;
      show(el,true);
    });
    el.addEventListener('blur',hide);
  });
  addEventListener('scroll',()=>{if(active)kick()},{passive:true});
})();

/* ───────────────────────────────────────────────
   REVELAÇÃO SUAVE DAS SEÇÕES
   Só títulos e blocos: rápida, uma vez, sem mexer nos projetos.
   ─────────────────────────────────────────────── */
(function(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  if(!('IntersectionObserver' in window))return;
  const groups=[
    ['.block-head',0],['.numbers div',1],['.about-text',0],['.skills',0],['.reach li',1]
  ];
  const items=[];
  groups.forEach(([sel,stagger])=>{
    document.querySelectorAll(sel).forEach((el,i)=>{
      el.classList.add('reveal');
      if(stagger)el.style.setProperty('--i',i);
      items.push(el);
    });
  });
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting)return;
      e.target.classList.add('in');io.unobserve(e.target);
    });
  },{rootMargin:'0px 0px -8% 0px',threshold:.05});
  items.forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<innerHeight*.9&&r.bottom>0)return;   // já está na tela: não esconde
    el.classList.add('pre');
    io.observe(el);
  });
})();

/* ───────────────────────────────────────────────
   HERO: a grade de pontos acende perto do mouse
   ─────────────────────────────────────────────── */
(function(){
  const hero=document.querySelector('.hero');
  if(!hero||!matchMedia('(hover:hover)').matches)return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  let raf=0,ex=0,ey=0;
  function apply(){
    const r=hero.getBoundingClientRect();
    hero.style.setProperty('--hx',(ex-r.left)+'px');
    hero.style.setProperty('--hy',(ey-r.top)+'px');
    raf=0;
  }
  hero.addEventListener('pointermove',e=>{ex=e.clientX;ey=e.clientY;if(!raf)raf=requestAnimationFrame(apply)});
  hero.addEventListener('pointerleave',()=>{hero.style.removeProperty('--hx');hero.style.removeProperty('--hy')});
})();
