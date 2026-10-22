(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('#yr').textContent=new Date().getFullYear();

/* ---------- CONTEÚDO EDITÁVEL ---------- */
const roles=[
  'Eu estou estudando Java',
  'Eu estou em preparação para o vestibular',
  'Ano que vem pretendo iniciar Ciência da Computação',
  'Estudante de T.I. no Senac',
  'Lógica de programação 100%',
  'Focado em Python & MySQL'
];
const skills=[['Lógica de Programação',100],['Python',90],['MySQL',85],['Java (Estudando)',75],['Git & GitHub',75],['HTML & CSS',70]];
const projects=[
 ['Portfólio Pessoal & Repositório','Meu primeiro projeto publicado: repositório de código deste portfólio interativo, apresentando minha trajetória, estudos no Senac e metas.',['HTML5','CSS3','JavaScript','GitHub'],'#1d4ed8','#00c8ff','https://github.com/rafaelarcanjogarcia']
];

/* ---------- nome letra a letra ---------- */
const nm=$('#name');const txt=nm.textContent;nm.textContent='';
[...txt].forEach((c,i)=>{const s=document.createElement('span');s.className='ch';s.textContent=c===' '?'\u00A0':c;s.style.animationDelay=(.4+i*.06)+'s';s.setAttribute('aria-hidden','true');nm.appendChild(s)});

/* ---------- digitação ---------- */
(()=>{const el=$('#typed');let r=0,i=0,del=false;
 if(reduce){el.textContent=roles[0];return}
 (function t(){const w=roles[r];el.textContent=w.slice(0,i);
  if(!del&&i===w.length){del=true;return setTimeout(t,1600)}
  if(del&&i===0){del=false;r=(r+1)%roles.length}
  i+=del?-1:1;setTimeout(t,del?35:70)})();})();

/* ---------- marquee, skills, projetos ---------- */
const words=['Ciência da Computação','Java','Python','MySQL','Senac','Lógica 100%','Vestibular','Git & GitHub'];
$('#track').innerHTML=[...words,...words].map(w=>`<span>${w}</span>`).join('');
$('#bars').innerHTML=skills.map(([n,v],i)=>`<div class="bar rv" style="--d:${i*.08}s"><div class="top"><span>${n}</span><span>${v}%</span></div><div class="bg"><div class="fill" data-w="${v}"></div></div></div>`).join('');
$('#grid').innerHTML=projects.map(([t,d,tg,c1,c2,link],i)=>`<a href="${link||'#'}" target="_blank" rel="noopener noreferrer" class="card rv" style="--d:${i*.1}s"><div class="thumb" style="--c1:${c1};--c2:${c2}"></div><div class="body"><h3>${t}</h3><p>${d}</p><div class="tags">${tg.map(x=>`<span>${x}</span>`).join('')}</div></div></a>`).join('');

/* ---------- revelar ao rolar + barras + contadores ---------- */
const count=el=>{const n=+el.dataset.n,s=el.dataset.s||'';if(reduce){el.textContent=n+s;return}
 const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1500,1);el.textContent=Math.round(n*(1-Math.pow(1-p,4)))+s;if(p<1)requestAnimationFrame(f)})(t0)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;el.classList.add('in');
 el.querySelectorAll('.fill').forEach(f=>f.style.width=f.dataset.w+'%');
 el.querySelectorAll('[data-n]').forEach(count);io.unobserve(el)}),{threshold:.2});
$$('.rv,.sh').forEach(el=>io.observe(el));

/* ---------- barra de progresso, linha do tempo, menu ativo ---------- */
const prog=$('#prog'),tl=$('#tl'),tline=$('#tline'),links=$$('nav a[href^="#"]'),secs=links.map(a=>$(a.getAttribute('href')));
const onScroll=()=>{const h=document.documentElement,m=h.scrollHeight-innerHeight;prog.style.transform=`scaleX(${m>0?scrollY/m:0})`;
 const r=tl.getBoundingClientRect();tline.style.height=Math.max(0,Math.min(r.height,innerHeight*.6-r.top))+'px';
 let cur=-1;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<innerHeight*.4)cur=i});
 links.forEach((a,i)=>a.classList.toggle('on',i===cur))};
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* ---------- inclinação 3D + brilho nos cards ---------- */
$$('.card').forEach(c=>{
 c.addEventListener('pointermove',e=>{if(reduce)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  c.style.transform=`rotateY(${(x-.5)*14}deg) rotateX(${(.5-y)*14}deg) translateY(-6px)`;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});
 c.addEventListener('pointerleave',()=>c.style.transform='')});

/* ---------- botões magnéticos ---------- */
$$('.mag').forEach(b=>{
 b.addEventListener('pointermove',e=>{if(reduce)return;const r=b.getBoundingClientRect();
  b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});
 b.addEventListener('pointerleave',()=>b.style.transform='')});

/* ---------- cursor personalizado ---------- */
const cur=$('#cur');let cx=0,cy=0,tx=0,ty=0;
addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});
(function loop(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cur.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(loop)})();
$$('a,button').forEach(el=>{el.addEventListener('pointerenter',()=>cur.classList.add('big'));el.addEventListener('pointerleave',()=>cur.classList.remove('big'))});

/* ---------- tema ---------- */
const root=document.documentElement;
try{const s=localStorage.getItem('tema');if(s)root.dataset.theme=s}catch(e){}
$('#theme').addEventListener('click',()=>{
 const dark=root.dataset.theme!=='light';
 root.dataset.theme=dark?'light':'dark';try{localStorage.setItem('tema',root.dataset.theme)}catch(e){}});

/* ---------- partículas conectadas no hero ---------- */
const cv=$('#fx'),ctx=cv.getContext('2d');let W,H,P=[],mouse={x:-999,y:-999};
const size=()=>{const r=cv.parentElement.getBoundingClientRect(),d=devicePixelRatio||1;W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
 P=Array.from({length:Math.min(90,Math.floor(W*H/14000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}))};
size();addEventListener('resize',size);
cv.parentElement.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});
cv.parentElement.addEventListener('pointerleave',()=>mouse.x=-999);
const col=()=>getComputedStyle(root).getPropertyValue('--a').trim();
(function draw(){ctx.clearRect(0,0,W,H);const c=col();ctx.fillStyle=c;ctx.strokeStyle=c;
 for(const p of P){
  if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
   const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.hypot(dx,dy);if(d<130){p.x+=dx/d*2;p.y+=dy/d*2}}
  ctx.globalAlpha=.8;ctx.beginPath();ctx.arc(p.x,p.y,2,0,6.3);ctx.fill()}
 for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);
  if(d<120){ctx.globalAlpha=(1-d/120)*.35;ctx.beginPath();ctx.moveTo(P[i].x,P[i].y);ctx.lineTo(P[j].x,P[j].y);ctx.stroke()}}
 requestAnimationFrame(draw)})();
})();