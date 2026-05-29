/* ============================================================
   CONFIG — Anniversary version
   ============================================================ */
var PAGES = [
  { photo:'assets/demo1.jpg', caption:'The day we first met...' },
  { photo:'assets/demo2.jpg', caption:'Every laugh with you...' },
  { photo:'assets/demo3.jpg', caption:'Adventures together...' },
  { photo:'assets/demo4.jpg', caption:'You make me smile...' },
  { photo:'assets/demo5.jpg', caption:'Thank you for being you...' },
  { photo:'assets/demo6.jpg', caption:'Forever is not enough...' },
  { photo:'assets/demo1.jpg', caption:'I love you more each day...' },
  { photo:'assets/demo2.jpg', caption:'Happy Anniversary, my love.' }
];

var LOVE_PHOTOS = [
  'assets/demo1.jpg','assets/demo2.jpg','assets/demo3.jpg','assets/demo4.jpg','assets/demo5.jpg',
  'assets/demo6.jpg','assets/demo1.jpg','assets/demo2.jpg','assets/demo3.jpg','assets/demo4.jpg',
  'assets/demo5.jpg','assets/demo6.jpg','assets/demo1.jpg','assets/demo2.jpg','assets/demo3.jpg',
  'assets/demo4.jpg','assets/demo5.jpg','assets/demo6.jpg','assets/demo1.jpg','assets/demo2.jpg'
];

/* ============================================================
   GLOBAL STATE
   ============================================================ */
var started=false,musicOn=false,aCtx=null,songTmr=null;
var rainOn=false,cdIv=null,hbIv=null,rvIv=null;
var bookInitialized=false,totalBookPages=0;

/* ============================================================
   LOADING
   ============================================================ */
(function(){
  var s=document.getElementById('LS');
  function hide(){setTimeout(function(){s.classList.add('hide');setTimeout(function(){s.remove();},500);},2200);}
  if(document.readyState==='complete') hide(); else window.addEventListener('load',hide);
})();

/* ============================================================
   PETALS (gold tones)
   ============================================================ */
(function(){
  for(var i=0;i<12;i++){
    var p=document.createElement('div');p.className='pt';
    var sz=Math.random()*7+5;
    p.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(Math.random()*100)+'%;'
      +'background:hsl('+(Math.random()*20+40)+',65%,55%);opacity:'+(Math.random()*.18+.06)+';'
      +'animation-duration:'+(Math.random()*10+8)+'s;animation-delay:'+(Math.random()*10)+'s;';
    document.body.appendChild(p);
  }
})();

/* ============================================================
   RAIN (gold words, anniversary theme)
   ============================================================ */
var rCv=document.getElementById('RC'),rCtx=rCv.getContext('2d'),rDrp=[];
var rWds = [
  'Happy Anniversary',
  'Sayang',
  'Cinta',
  'Love',
  'Amour',
  'Amore',
  'Amor',
  'Liebe',
  '愛',
  '爱',
  '사랑',
  'حب',
  'Aşk',
  'Любовь',
  'Ahava',
  'Eshq',
  'Pyaar',
  'Pag-ibig',
  'Upendo',
  'Yours',
  'Always'
];
function initRain(){
  rCv.width=window.innerWidth;rCv.height=window.innerHeight;rDrp=[];
  var cols=Math.floor(window.innerWidth/130);
  for(var i=0;i<cols;i++){
    rDrp.push({x:i*130+Math.random()*80,y:Math.random()*-rCv.height,
      speed:Math.random()*1.8+1.4,word:rWds[Math.floor(Math.random()*rWds.length)],
      alpha:Math.random()*.45+.15,size:Math.floor(Math.random()*10+22),bright:Math.random()>.55});
  }
}
function drawRainFrame(){
  if(rainOn){
    rCtx.clearRect(0,0,rCv.width,rCv.height);
    rDrp.forEach(function(d){
      rCtx.save();rCtx.globalAlpha=d.alpha;
      rCtx.font='bold '+d.size+'px "Special Elite",serif';
      rCtx.fillStyle=d.bright?'#d4a017':'rgba(184,134,11,.5)';
      rCtx.fillText(d.word,d.x,d.y);rCtx.restore();
      d.y+=d.speed;
      if(d.y>rCv.height+60){d.y=-60;d.word=rWds[Math.floor(Math.random()*rWds.length)];d.bright=Math.random()>.55;}
    });
  }
  requestAnimationFrame(drawRainFrame);
}
window.addEventListener('resize',function(){if(rainOn)initRain();});

/* ============================================================
   MUSIC
   ============================================================ */
var audio = new Audio('assets/Until I Found You - Stephen Sanchez - Cover (Violin).mp3');
audio.loop = true;

function syncMusicUI(){
  document.getElementById('MB').classList.toggle('on',musicOn);
  document.getElementById('IP').style.display=musicOn?'none':'block';
  document.getElementById('IPA').style.display=musicOn?'block':'none';
}
function toggleMusic(){
  if(musicOn){ audio.pause(); musicOn=false; }
  else { audio.play(); musicOn=true; }
  syncMusicUI();
}
function autoMusic(){
  audio.play().then(function(){ musicOn=true; syncMusicUI(); }).catch(function(){});
}

/* ============================================================
   TYPEWRITER — anniversary phrases
   ============================================================ */
var PHRASES = [
  'I Love You So Much',
];

var twI = 0;
var twC = 0;
var twD = false;

var hlEl = document.getElementById('HL');

function typeWrite() {
  let cur = PHRASES[twI % PHRASES.length];

  // render text
  hlEl.innerHTML = cur.slice(0, twC) + '<span class="cur"></span>';

  if (!twD) {
    // typing forward
    twC++;

    if (twC > cur.length) {
      twD = true;
      setTimeout(typeWrite, 1200); // pause at full text
      return;
    }

    setTimeout(typeWrite, 80);
  } 
  else {
    // deleting
    twC--;

    if (twC < 0) {
      twD = false;
      twI++;
      setTimeout(typeWrite, 300); // pause before next phrase
      return;
    }

    setTimeout(typeWrite, 40);
  }
}
/* ============================================================
   START
   ============================================================ */
function startExp(){
  if(started)return;started=true;
  var wc=document.getElementById('WC');
  wc.style.transition='opacity .5s,transform .5s';wc.style.opacity='0';wc.style.transform='scale(.88)';
  setTimeout(function(){
    wc.style.display='none';
    document.getElementById('HW').style.display='flex';
    rainOn=true;initRain();drawRainFrame();typeWrite();autoMusic();
    setTimeout(startCountdown,3500);
  },520);
}

/* ============================================================
   MATRIX RAIN helper (gold colours)
   ============================================================ */
function startMatrixOn(cv,chars,colW,fadeA){
  var ctx=cv.getContext('2d');
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  var cols=Math.floor(cv.width/colW),drops=[];
  for(var i=0;i<cols;i++) drops.push(Math.random()*-60);
  return setInterval(function(){
    ctx.fillStyle='rgba(0,0,0,'+fadeA+')';ctx.fillRect(0,0,cv.width,cv.height);
    for(var i=0;i<cols;i++){
      var c=chars[Math.floor(Math.random()*chars.length)],bright=Math.random()>.78;
      ctx.globalAlpha=bright?1:Math.random()*.45+.2;
      ctx.fillStyle=bright?'rgba(245,215,110,.95)':'rgba(212,160,23,.4)';
      ctx.font='bold 14px "Special Elite",serif';
      ctx.fillText(c,i*colW,drops[i]*colW);ctx.globalAlpha=1;
      if(drops[i]*colW>cv.height&&Math.random()>.965) drops[i]=0;
      drops[i]++;
    }
  },40);
}

/* ============================================================
   COUNTDOWN
   ============================================================ */
function startCountdown(){
  var scr=document.getElementById('CD'),num=document.getElementById('CDN');
  scr.classList.add('on');
  cdIv=startMatrixOn(document.getElementById('CDC'),'HAPPYANNIVERSARYSAYANG\u2665LOVE'.split(''),18,.08);
  var sec=3;num.textContent=sec;
  function tick(){
    sec--;
    if(sec>0){
      setTimeout(function(){
        num.style.animation='none';void num.offsetHeight;
        num.style.animation='cdp .4s cubic-bezier(.34,1.56,.64,1)';
        num.textContent=sec;tick();
      },1000);
    } else {
      setTimeout(function(){clearInterval(cdIv);scr.classList.remove('on');showHBWords();},1100);
    }
  }
  tick();
}

/* ============================================================
   ANNIVERSARY WORDS — dot-matrix pixel font
   ============================================================ */
var PF={
  'A':[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'B':[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
  'D':[[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,1,0],[1,1,1,0,0]],
  'E':[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'H':[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'I':[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
  'N':[[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'P':[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],
  'R':[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
  'S':[[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
  'T':[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'V':[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]],
  'Y':[[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'O':[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'U':[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '!':[[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0]],
  ' ':[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
};
function getUniformDotSize(){
  var W=window.innerWidth,H=window.innerHeight;
  var LONGEST=12;
  var totalCols=LONGEST*5+(LONGEST-1)*2;
  return Math.max(4,Math.min(Math.floor(W*0.88/totalCols),Math.floor(H*0.52/7)));
}
function renderDotWord(cv,word,color,dotSize){
  var W=cv.width=window.innerWidth,H=cv.height=window.innerHeight;
  var ctx=cv.getContext('2d');ctx.clearRect(0,0,W,H);
  var step=dotSize+Math.max(1,Math.round(dotSize*0.3));
  var charStep=5*step+2*step;
  var totalW=word.length*charStep-2*step;
  var totalH=7*step;
  var startX=Math.round((W-totalW)/2),startY=Math.round((H-totalH)/2);
  var sc='ABDHIPRTY'.split('');
  ctx.font='bold 13px "Special Elite",serif';
  for(var s=0;s<300;s++){
    ctx.globalAlpha=Math.random()*.2+.04;
    ctx.fillStyle=Math.random()>.5?color:'rgba(255,220,100,.3)';
    ctx.fillText(sc[Math.floor(Math.random()*sc.length)],Math.random()*W,Math.random()*H);
  }
  ctx.globalAlpha=1;
  word.toUpperCase().split('').forEach(function(ch,ci){
    var bm=PF[ch]||PF[' '];
    var offX=startX+ci*charStep;
    bm.forEach(function(row,r){
      row.forEach(function(cell,c){
        if(!cell)return;
        var x=offX+c*step+step/2,y=startY+r*step+step/2;
        ctx.beginPath();ctx.arc(x,y,dotSize/2,0,Math.PI*2);
        ctx.fillStyle=color;ctx.shadowBlur=dotSize*1.8;ctx.shadowColor=color;
        ctx.fill();ctx.shadowBlur=0;
      });
    });
  });
}
var HB_WORDS=['HAPPY','ANNIVERSARY!'],HB_COLORS=['#d4a017','#f5d76e'],hbIdx=0,hbDotSize=0;
function showHBWords(){
  var scr=document.getElementById('HBW');scr.classList.add('on');
  var bgCv=document.getElementById('HBBC'),wdCv=document.getElementById('HBC');
  bgCv.width=wdCv.width=window.innerWidth;bgCv.height=wdCv.height=window.innerHeight;
  hbIv=startMatrixOn(bgCv,'HAPPYANNIVERSARYILOVEYOUSAYANG'.split(''),20,.07);
  hbDotSize=getUniformDotSize();hbIdx=0;nextHBWord(wdCv);
}
function nextHBWord(cv){
  if(hbIdx>=HB_WORDS.length){clearInterval(hbIv);document.getElementById('HBW').classList.remove('on');showReveal();return;}
  renderDotWord(cv,HB_WORDS[hbIdx],HB_COLORS[hbIdx],hbDotSize);hbIdx++;
  setTimeout(function(){nextHBWord(cv);},1800);
}

/* ============================================================
   REVEAL
   ============================================================ */
function showReveal(){
  document.getElementById('RV').classList.add('on');
  rvIv=startMatrixOn(document.getElementById('RVC2'),'HAPPYANNIVERSARYSAYANG\u2665LOVE\u2605FOREVER'.split(''),20,.055);
  spawnManyHearts();
}

/* ============================================================
   SCRAPBOOK — turn.js
   FIXES: hard cover overflow, removed spine line, removed nav
   ============================================================ */
function buildFlipbook(){
  var fb=document.getElementById('flipbook');
  var hardDivs=Array.from(fb.querySelectorAll('.hard'));
  var insertBefore=hardDivs[2];
  var pageList=PAGES.slice();
  if(pageList.length%2!==0) pageList.push({photo:'',caption:''});
  pageList.forEach(function(pg,i){
    var div=document.createElement('div');
    div.className='page';
    if(pg.photo){
      var img=document.createElement('img');img.src=pg.photo;img.alt='';img.className='page-img';
      div.appendChild(img);
    } else {
      var ph=document.createElement('div');ph.className='page-placeholder';
      ph.innerHTML='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
      div.appendChild(ph);
    }
    if(pg.caption){
      var ov=document.createElement('div');ov.className='page-overlay';
      var ct=document.createElement('div');ct.className='page-caption-txt';ct.textContent=pg.caption;
      ov.appendChild(ct);div.appendChild(ov);
    }
    fb.insertBefore(div,insertBefore);
  });
  totalBookPages=pageList.length;
}

function initTurnJs(){
  buildFlipbook();
  var bw=Math.min(window.innerWidth-32,680);
  var bh=Math.round(bw*0.6);
  bw=Math.max(bw,280);bh=Math.max(bh,200);
  var wrap=document.getElementById('book-wrap');
  wrap.style.width=bw+'px';wrap.style.height=bh+'px';
  $('#flipbook').turn({
    width:bw,
    height:bh,
    autoCenter:true,
    gradients:true,
    acceleration:true,
    when:{
      turned:function(e,page,view){
        spawnHearts(3);
        var total=$('#flipbook').turn('pages');
        if(page>=total) setTimeout(showLoveSection,900);
      }
    }
  });
  bookInitialized=true;
}

function showBook(){
  clearInterval(rvIv);
  document.getElementById('RV').classList.remove('on');
  document.getElementById('HW').style.display='none';
  var bs=document.getElementById('BS');bs.classList.add('on');
  setTimeout(function(){
    initTurnJs();
    spawnHearts(8);
    bs.scrollIntoView({behavior:'smooth',block:'start'});
  },200);
}

/* ============================================================
   LOVE GALLERY
   ============================================================ */
function heartPoint(t,scale){
  var x=scale*16*Math.pow(Math.sin(t),3);
  var y=-scale*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
  return {x:x,y:y};
}
function showLoveSection(){
  document.getElementById('BS').classList.remove('on');
  var lg=document.getElementById('LG');lg.classList.add('on');
  setTimeout(function(){lg.scrollIntoView({behavior:'smooth',block:'start'});},200);
  var wrap=document.getElementById('LW');wrap.innerHTML='';
  var count=LOVE_PHOTOS.length;
  var fw=72,fh=88;
  var availW=Math.min((wrap.parentElement.offsetWidth||340)-32,420);
  var scale=Math.min((availW-fw-12)/32,(availW*1.1-fh)/23);
  scale=Math.max(scale,6);
  var pts=[];
  for(var i=0;i<count;i++){
    var t=(i/count)*2*Math.PI;
    pts.push(heartPoint(t,scale));
  }
  var minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  pts.forEach(function(p){
    minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);
    minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);
  });
  var pad=Math.ceil(Math.max(fw,fh)/2)+6;
  var totalW=Math.ceil(maxX-minX)+pad*2;
  var totalH=Math.ceil(maxY-minY)+pad*2;
  wrap.style.width=totalW+'px';wrap.style.height=totalH+'px';
  var offX=pad-minX,offY=pad-minY;
  pts.forEach(function(pt,i){
    var f=document.createElement('div');f.className='lf';
    f.style.width=fw+'px';f.style.height=fh+'px';
    f.style.left=Math.round(pt.x+offX-fw/2)+'px';
    f.style.top=Math.round(pt.y+offY-fh/2)+'px';
    var src=LOVE_PHOTOS[i]||'';
    if(src){var img=document.createElement('img');img.src=src;img.alt='';f.appendChild(img);}
    else{f.innerHTML='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';}
    wrap.appendChild(f);
    setTimeout(function(el){el.classList.add('show');},200+i*180,f);
  });
  setTimeout(spawnManyHearts,200+count*180+600);
}

/* ============================================================
   HEARTS (gold)
   ============================================================ */
var HC=['#d4a017','#b8860b','#f5d76e','#ffd700','#c8960c'];
function spawnHearts(n){
  for(var i=0;i<(n||8);i++){
    (function(d){setTimeout(function(){
      var h=document.createElement('div');h.className='hp';
      h.style.left=(Math.random()*80+10)+'%';h.style.top=(Math.random()*60+10)+'%';
      var sz=Math.floor(Math.random()*16+12),col=HC[Math.floor(Math.random()*HC.length)];
      h.innerHTML='<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="'+col+'" style="filter:drop-shadow(0 0 4px '+col+')"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
      document.body.appendChild(h);setTimeout(function(){h.remove();},2600);
    },d);})(i*120);
  }
}
function spawnManyHearts(){for(var i=0;i<16;i++) setTimeout(function(){spawnHearts(6);},i*180);}
