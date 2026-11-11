/* DUNIA CODING YASMIN — enjin cerita, cabaran & rekod kajian */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const IMG = n => `assets/img/${n}.webp`;
  const SND = n => `assets/snd/${n}.mp3`;
  const ICON = { up: 'bitmap_20', right: 'bitmap_22', left: 'bitmap_22', stairs: 'bitmap_23', up2: 'bitmap_20', up4: 'bitmap_20' };

  const stage = $('#stage'), bgA = $('#bgA'), bgB = $('#bgB'), chars = $('#chars'), fx = $('#fx');
  const bubble = $('#bubble'), narr = $('#narr'), title = $('#title'), hud = $('#hud'), nav = $('#nav');
  const chEl = $('#challenge'), prog = $('#progress');

  /* ---------- storan selamat ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  /* ---------- keadaan ---------- */
  const S = { node: 0, step: 0, auto: store.get('dct_auto', true), sound: store.get('dct_sound', true), cc: store.get('dct_cc', true), timer: null, token: 0, session: null };
  const flat = STORY; // senarai nod (babak / cabaran / tamat)

  /* ---------- audio ---------- */
  let voice = null, voice2 = null, sfx = null, amb = null, ambName = null;
  const msVoice = () => {
    const vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    return vs.find(v => /^ms/i.test(v.lang)) || vs.find(v => /^id/i.test(v.lang)) || null;
  };
  if (window.speechSynthesis) speechSynthesis.onvoiceschanged = () => {};
  function stopVoice() {
    [voice, voice2].forEach(a => { if (a) { a.onended = null; a.pause(); } });
    voice = voice2 = null;
    if (window.speechSynthesis) speechSynthesis.cancel();
  }
  function playSfx(n) { if (!S.sound || !n) return; try { sfx = new Audio(SND(n)); sfx.volume = .8; sfx.play().catch(() => {}); } catch {} }
  function setAmb(n) {
    if (n === undefined || n === ambName) return;
    if (amb) { amb.pause(); amb = null; }
    ambName = n;
    if (!n || !S.sound) return;
    amb = new Audio(SND(n)); amb.loop = true; amb.volume = .35; amb.play().catch(() => {});
  }
  function speak(text, done) {
    const v = msVoice();
    if (!S.sound || !window.speechSynthesis || !v) return done(false);
    const u = new SpeechSynthesisUtterance(text.replace(/[…]+/g, ', ').replace(/—/g, ','));
    u.voice = v; u.lang = v.lang; u.rate = .95; u.pitch = 1.05;
    u.onend = () => done(true); u.onerror = () => done(false);
    speechSynthesis.speak(u);
  }

  /* ---------- paparan langkah ---------- */
  let curBg = null, bgFlip = false;
  const CAMS = ['in', 'right', 'out', 'left', 'up', 'in2', 'down'];
  const hashCam = n => CAMS[[...n].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % CAMS.length];
  function setBg(n, cam, durS) {
    if (!n || n === curBg) return false;
    curBg = n; const nx = bgFlip ? bgA : bgB, old = bgFlip ? bgB : bgA; bgFlip = !bgFlip;
    nx.style.animation = 'none';
    nx.src = IMG(n);
    nx.onload = () => {
      nx.classList.add('on'); old.classList.remove('on');
      if (cam && cam !== 'none') { void nx.offsetWidth; nx.style.animation = `cam-${cam} ${durS || 10}s cubic-bezier(.3,.1,.3,1) forwards`; }
      chars.dataset.cam = cam || '';
    };
    if (nx.complete) nx.onload();
    return true;
  }

  /* ---------- lapisan motion graphic ---------- */
  const amb2 = document.createElement('div'); amb2.id = 'particles'; stage.insertBefore(amb2, $('#chars'));
  let partType = '';
  function setParticles(t) {
    if (t === partType) return; partType = t; amb2.className = t || ''; amb2.innerHTML = '';
    const R = (a, b) => a + Math.random() * (b - a);
    if (t === 'code') {
      const G = ['{ }', '</>', '0', '1', 'if', '( )', '=>', ';', '[ ]', '01', 'for', '★'];
      for (let i = 0; i < 26; i++) { const e = document.createElement('i'); e.textContent = G[i % G.length];
        e.style.cssText = `left:${R(0, 100)}%;font-size:${R(1, 2.4)}cqw;animation-duration:${R(7, 15)}s;animation-delay:${-R(0, 15)}s;opacity:${R(.25, .7)}`; amb2.appendChild(e); }
    } else if (t === 'dust') {
      for (let i = 0; i < 22; i++) { const e = document.createElement('i');
        e.style.cssText = `left:${R(0, 100)}%;top:${R(0, 100)}%;width:${R(.25, .7)}cqw;height:${R(.25, .7)}cqw;animation-duration:${R(6, 14)}s;animation-delay:${-R(0, 14)}s`; amb2.appendChild(e); }
    } else if (t === 'rain') {
      for (let i = 0; i < 70; i++) { const e = document.createElement('i');
        e.style.cssText = `left:${R(0, 50)}%;animation-duration:${R(.5, .9)}s;animation-delay:${-R(0, 1)}s;height:${R(3, 6)}cqw`; amb2.appendChild(e); }
    } else if (t === 'stars') {
      for (let i = 0; i < 30; i++) { const e = document.createElement('i');
        e.style.cssText = `left:${R(0, 100)}%;top:${R(0, 100)}%;animation-duration:${R(1.6, 3.2)}s;animation-delay:${-R(0, 3)}s`; amb2.appendChild(e); }
    }
  }
  const PART_BY_BG = [[/^dunia|05_08_47|08_20|08_36|11_03/, 'code'], [/03_54_46|03_34_57/, 'rain'], [/03_25_39|03_31_59|02_36_06|02_09_00/, 'stars']];
  const partFor = st => st.particles || (PART_BY_BG.find(([re]) => re.test(st.bg || '')) || [0, 'dust'])[1];

  // siapa dalam gambar watak (untuk animasi "bercakap")
  const CHAR_WHO = { bitmap_6: 'Yasmin', bitmap_5: 'Yasmin', yasmin_terkejut_hd: 'Yasmin', bitmap_8: 'Izzuwan', cikgu_azlan_hd: 'Cikgu Azlan', bitmap_9: 'Pakcik Omar' };
  let lastChars = '';
  function setChars(list, who) {
    const key = JSON.stringify(list || []);
    if (key !== lastChars) {
      lastChars = key; chars.innerHTML = '';
      (list || []).forEach((c, i) => {
        const d = document.createElement('div'); d.className = 'ch ' + (c.pos || 'left'); d.style.height = (c.h || 75) + '%';
        d.style.animationDelay = (i * .18) + 's'; d.dataset.who = c.who || CHAR_WHO[c.img] || '';
        if (c.sprite) {
          // animasi frame demi frame (sprite strip) + gerakan berjalan dalam babak
          const sp = c.sprite; d.classList.add('sprite'); const [aw, ah] = String(sp.aspect).split('/').map(Number); d.style.width = `calc(${c.h || 75}cqh * ${aw / ah})`;
          d.innerHTML = `<div class="sp-win"><img src="${IMG(c.img)}" alt="" style="--n:${sp.frames};animation-duration:${sp.frames / sp.fps}s"></div>`;
          chars.appendChild(d);
          if (sp.walk) {
            const a = d.animate([{ transform: sp.walk.from }, { transform: sp.walk.to }], { duration: sp.walk.ms || 8000, easing: 'cubic-bezier(.35,.1,.55,1)', fill: 'forwards' });
            a.onfinish = () => d.classList.add('arrived');
          }
          return;
        }
        const im = new Image(); im.src = IMG(c.img); im.alt = ''; im.style.animationDelay = -(i * 1.3) + 's';
        d.appendChild(im); chars.appendChild(d);
      });
    }
    const named = [...chars.children].some(d => d.dataset.who && who && who.includes(d.dataset.who));
    [...chars.children].forEach(d => {
      const talk = !!(who && d.dataset.who && who.includes(d.dataset.who));
      d.classList.toggle('talk', talk); d.classList.toggle('dim', named && !talk);
    });
  }
  function kinetic(el, text) {
    el.innerHTML = '';
    text.split(/(\s+)/).forEach((w, i) => {
      if (/^\s+$/.test(w)) { el.appendChild(document.createTextNode(' ')); return; }
      const sp = document.createElement('span'); sp.className = 'kw'; sp.textContent = w; sp.style.animationDelay = (i * .028) + 's'; el.appendChild(sp);
    });
  }
  function lowerThird(node) {
    const old = $('.lt', stage); if (old) old.remove();
    if (!node.chapter) return;
    const d = document.createElement('div'); d.className = 'lt';
    d.innerHTML = `<span class="lt-bar"></span><b>${node.chapter}</b><span class="lt-t">${node.chapterTitle || ''}</span>`;
    stage.appendChild(d); setTimeout(() => d.remove(), 4200);
  }
  function wipe() {
    const w = document.createElement('div'); w.className = 'wipe'; w.innerHTML = '<i></i><i></i><i></i>';
    stage.appendChild(w); setTimeout(() => w.remove(), 1100);
  }
  function textOf(st) { return (st.say && st.say.text) || st.narr || ''; }

  function showStep(st) {
    const tok = ++S.token;
    clearTimeout(S.timer); stopVoice();
    stage.classList.remove('zoom', 'shake'); fx.innerHTML = ''; title.className = 'hidden';
    // tempoh kamera = jumlah langkah seterusnya yang guna latar sama
    const node = flat[S.node]; let same = 0;
    for (let k = S.step; k < node.steps.length && node.steps[k].bg === st.bg; k++) same++;
    setBg(st.bg, st.cam || hashCam(st.bg), Math.min(32, Math.max(8, same * 7)));
    setAmb(st.amb); setParticles(partFor(st));
    setChars(st.chars, st.say && st.say.who);

    if (st.say) {
      bubble.className = st.say.type || 'speech';
      const c = (st.chars || []);
      if (c.length === 1 && c[0].pos === 'left') bubble.classList.add('right');
      if (c.length === 1 && c[0].pos === 'right') bubble.classList.add('left');
      $('.who', bubble).textContent = st.say.who || '';
      $('.who', bubble).style.background = whoColor(st.say.who);
      kinetic($('.txt', bubble), st.say.text);
    } else bubble.className = 'hidden';
    if (st.narr) { narr.className = ''; kinetic($('.txt', narr), st.narr); } else narr.className = 'hidden';
    if (st.title) { title.textContent = st.title; void title.offsetWidth; title.className = st.title; }

    if (st.fx === 'flash') fx.innerHTML = '<div class="flash"></div>';
    if (st.fx === 'pow') fx.innerHTML = `<svg class="pow" viewBox="0 0 200 160"><polygon points="100,4 116,46 160,18 140,62 196,64 146,88 178,132 124,108 110,156 92,110 46,146 66,98 6,96 58,70 22,26 80,48" fill="#ffe14a" stroke="#1a1a1a" stroke-width="5" stroke-linejoin="round"/><polygon points="100,30 110,58 138,42 126,70 160,74 128,88 148,114 116,100 106,128 96,102 66,122 80,92 42,88 76,74 54,48 88,58" fill="#ff6a2a"/></svg>`;
    if (st.fx === 'shake') stage.classList.add('shake');
    if (st.fx === 'zoom') stage.classList.add('zoom');
    if (st.fx === 'doors') fx.innerHTML = `<div class="doors"><img src="${IMG('pintu_kiri')}" alt=""><img src="${IMG('pintu_kanan')}" alt=""></div>`;
    if (st.fx === 'arrows') {
      const seq = ['up', 'right', 'up', 'right', 'stairs'];
      fx.innerHTML = `<div class="arrows">${seq.map((a, i) => `<div class="ar" style="animation-delay:${.6 + i * .9}s"><img src="${IMG(ICON[a])}" alt=""></div>`).join('')}</div>`;
    }
    playSfx(st.sfx);

    // tempoh: tunggu audio tamat ATAU tempoh minimum
    const minMs = (st.dur || Math.max(2.8, textOf(st).split(/\s+/).length * .36)) * 1000;
    let audioDone = !(st.voice || st.tts), timeDone = false;
    const finish = () => { if (tok !== S.token) return; if (audioDone && timeDone) onStepDone(); };
    S.timer = setTimeout(() => { timeDone = true; finish(); }, minMs);
    const audioEnd = () => { setTimeout(() => { audioDone = true; finish(); }, 500); };
    if (st.voice && S.sound) {
      voice = new Audio(SND(st.voice)); voice.onended = audioEnd; voice.onerror = audioEnd;
      voice.play().catch(audioEnd);
      if (st.voice2) { voice2 = new Audio(SND(st.voice2)); voice2.volume = .9; voice2.play().catch(() => {}); }
    } else if (st.tts) speak(textOf(st), audioEnd);
    else audioDone = true;

    $('#btnNext').classList.toggle('pulse', !S.auto);
  }
  const WHO = { 'Yasmin': '#e83e6c', 'Izzuwan': '#1f6fe0', 'Cikgu Azlan': '#1fa64a', 'Pakcik Omar': '#f08a12', 'Lim': '#7a3fe0', 'Sarah': '#d63384' };
  const whoColor = w => WHO[w] || (w && w.includes('&') ? '#334' : '#1f6fe0');

  function onStepDone() { if (S.auto) next(); }

  /* ---------- navigasi ---------- */
  function totalSteps() { return flat.reduce((n, x) => n + (x.steps ? x.steps.length : 1), 0); }
  const TOTAL = totalSteps();
  function progressPos() { let n = 0; for (let i = 0; i < S.node; i++) n += flat[i].steps ? flat[i].steps.length : 1; return n + S.step; }
  function render() {
    const node = flat[S.node];
    prog.firstElementChild.style.width = (progressPos() / TOTAL * 100) + '%';
    if (node.challenge) return startChallenge(node.challenge);
    if (node.end) return showEnd();
    chEl.className = 'hidden'; nav.className = '';
    if (S.step === 0 && S.lastNode !== S.node) { wipe(); lowerThird(node); }
    S.lastNode = S.node;
    showStep(node.steps[S.step]);
  }
  function next() {
    const node = flat[S.node];
    if (node.steps && S.step < node.steps.length - 1) S.step++;
    else if (S.node < flat.length - 1) { S.node++; S.step = 0; }
    else return;
    render();
  }
  function back() {
    if (S.step > 0) S.step--;
    else {
      let i = S.node - 1;
      while (i >= 0 && !flat[i].steps) i--;
      if (i < 0) return;
      S.node = i; S.step = flat[i].steps.length - 1;
    }
    render();
  }
  function go(where) {
    const i = flat.findIndex(n => n.jump === where);
    S.node = Math.max(0, i); S.step = 0; render();
  }

  /* ---------- sesi kajian ---------- */
  function newSession(mode) {
    const nama = ($('#nama').value || '').trim() || 'Tanpa nama';
    store.set('dct_nama', nama);
    S.session = { id: Date.now().toString(36), nama, mod: mode, mula: new Date().toISOString(), tamat: '', cabaran: {} };
    saveSession();
  }
  function saveSession() {
    if (!S.session) return;
    const all = store.get('dct_sesi', []);
    const i = all.findIndex(s => s.id === S.session.id);
    if (i >= 0) all[i] = S.session; else all.push(S.session);
    store.set('dct_sesi', all);
  }

  /* ---------- CABARAN (gaya arena MOBA) ---------- */
  // bunyi sintetik ringkas (tiada fail tambahan)
  let AC = null;
  function tone(seq) {
    if (!S.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      let t = AC.currentTime;
      seq.forEach(([f, d, type = 'triangle', v = .18]) => {
        const o = AC.createOscillator(), g = AC.createGain();
        o.type = type; o.frequency.value = f; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
        o.connect(g).connect(AC.destination); o.start(t); o.stop(t + d); t += d * .8;
      });
    } catch {}
  }
  const SFX = {
    ok: () => tone([[660, .09], [880, .09], [1320, .18]]),
    bad: () => tone([[180, .18, 'sawtooth', .12], [140, .22, 'sawtooth', .1]]),
    tick: () => tone([[520, .12, 'square', .08]]),
    go: () => tone([[784, .1], [1046, .25, 'square', .12]]),
    win: () => tone([[523, .14], [659, .14], [784, .14], [1046, .32], [784, .12], [1046, .5]]),
    pick: () => tone([[440, .05, 'sine', .08]]),
  };
  const CALLS = ['', '', 'COMBO ×2!', 'COMBO ×3!', 'HEBAT!', 'LEGENDARY!'];

  function startChallenge(key) {
    stopVoice(); clearTimeout(S.timer); S.token++;
    const C = CHALLENGES[key];
    setBg(C.bg); setAmb(null);
    chars.innerHTML = ''; lastChars = ''; fx.innerHTML = ''; bubble.className = narr.className = title.className = 'hidden'; setParticles(''); S.lastNode = -1;
    nav.className = 'hidden'; hud.classList.add('hidden');
    const rec = { cubaan: 0, salah: 0, petunjuk: 0, masa_s: 0, skor: 0, bintang: 0, siap: false };
    if (S.session) { S.session.cabaran[key] = rec; saveSession(); }
    chEl.className = 'moba ' + C.color;

    /* 1) KAD MISI */
    chEl.innerHTML = `
      <div class="m-intro">
        <div class="m-hero"><div class="fr"><img src="${IMG(C.hero)}" style="object-position:${C.heroPos || 'center'}" alt=""></div>
          <div class="m-heroname">${C.heroName}</div></div>
        <div class="m-brief">
          <div class="m-no">MISI ${C.no}</div>
          <div class="m-title">${C.concept}</div>
          <div class="m-sub">${C.conceptBM}</div>
          <div class="m-obj"><b>OBJEKTIF</b>${C.task}</div>
          <div class="m-reward"><span>GANJARAN</span>⭐⭐⭐ <i>+${C.slots.length * 100} XP</i></div>
          <button class="m-start" data-start><span>⚔ MULA MISI</span></button>
        </div>
      </div>`;
    playSfx('sfx_whoosh');
    $('[data-start]', chEl).onclick = () => countdown(() => arena(C, key, rec));
  }

  function countdown(after) {
    const o = document.createElement('div'); o.className = 'm-count'; chEl.appendChild(o);
    let n = 3;
    const step = () => {
      if (n === 0) { o.innerHTML = '<span class="go">MULA!</span>'; SFX.go(); setTimeout(() => { o.remove(); after(); }, 650); return; }
      o.innerHTML = `<span>${n}</span>`; SFX.tick(); n--; setTimeout(step, 700);
    };
    step();
  }

  function arena(C, key, rec) {
    const t0 = performance.now();
    const SC = C.scene || {};
    let score = 0, combo = 0;
    const P = ([x, y]) => `left:${x}%;top:${y}%`;
    const route = SC.route ? `<svg class="s-route" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline class="glow" points="${SC.route.map(p => p.join(',')).join(' ')}"/>
        <polyline class="dash" points="${SC.route.map(p => p.join(',')).join(' ')}"/>
        ${(SC.anchors || []).map((a, i) => SC.slotPos && SC.slotPos[i] ? `<line class="lead" x1="${a[0]}" y1="${a[1]}" x2="${SC.slotPos[i][0]}" y2="${SC.slotPos[i][1]}"/>` : '').join('')}__CL__</svg>` : '';
    const anchorsHTML = (SC.anchors || []).map((a, i) => `<div class="s-anchor" data-a="${i}" style="${P(a)}">${i + 1}</div>`).join('');
    // anak panah kuning sepanjang laluan (kotak 3:2)
    let arrowsHTML = '';
    if (SC.arrows && SC.route) {
      for (let i = 0; i < SC.route.length - 1; i++) {
        const [x1, y1] = SC.route[i], [x2, y2] = SC.route[i + 1];
        const dx = (x2 - x1) * 3, dy = (y2 - y1) * 2, len = Math.hypot(dx, dy);
        const ang = Math.atan2(dy, dx) * 180 / Math.PI, n = Math.max(1, Math.floor(len / 13));
        for (let k = 1; k <= n; k++) { const t = k / (n + 1);
          arrowsHTML += `<i class="s-arw" style="left:${x1 + (x2 - x1) * t}%;top:${y1 + (y2 - y1) * t}%;--r:${ang}deg"></i>`; }
      }
    }
    // label arahan di setiap titik
    const CALL = { lurus: ['Lurus', 'up', 'g'], kanan: ['Belok Kanan', 'right', 'y'], kiri: ['Belok Kiri', 'left', 'y'], tangga: ['Naik Tangga', 'stairs', 'p'] };
    const callHTML = (SC.callouts || []).map((c, i) => { const d = CALL[C.slots[i]]; if (!d || !c) return '';
      return `<div class="s-call ${d[2]}" style="${P(c)}">${d[0]}<img class="${d[1] === 'left' ? 'flip' : ''}" src="${IMG(ICON[d[1]])}" alt=""></div>`; }).join('');
    const callLines = (SC.callouts || []).map((c, i) => c && SC.anchors[i] ? `<line class="cl" x1="${c[0]}" y1="${c[1]}" x2="${SC.anchors[i][0]}" y2="${SC.anchors[i][1]}"/>` : '').join('');
    const legendHTML = SC.legend ? `<div class="s-legend"><b>PETUNJUK ARAHAN</b>${[['up', 'Lurus', 'Jalan terus'], ['right', 'Belok Kanan', 'Pusing ke kanan'], ['left', 'Belok Kiri', 'Pusing ke kiri'], ['stairs', 'Naik Tangga', 'Ke tingkat atas']].map(([ic, a, b]) => `<span><img class="${ic === 'left' ? 'flip' : ''}" src="${IMG(ICON[ic])}" alt=""><em>${a}<small>(${b})</small></em></span>`).join('')}</div>` : '';
    const marks = [
      SC.start ? `<div class="s-mark start" style="${P(SC.start.at)}">${SC.start.label}</div>` : '',
      SC.goal ? (SC.goal.finish ? `<div class="s-finish" style="${P(SC.goal.at)}"><div class="f-pole"><i></i></div><b>TAMAT</b>${SC.goal.label ? `<small>${SC.goal.icon || ''} ${SC.goal.label}</small>` : ''}</div>` : `<div class="s-mark goal" style="${P(SC.goal.at)}"><span>${SC.goal.icon}</span>${SC.goal.label}</div>`) : '',
      SC.ring ? `<div class="s-ring" style="${P(SC.ring.at)};width:${SC.ring.w}%;height:${SC.ring.h}%"><b>${SC.ring.label}</b></div>` : '',
      ...(SC.items || []).map((it, i) => `<div class="s-item" style="${P(it.at)};font-size:${it.size || 4}cqw;animation-delay:${.2 + i * .12}s">${it.emoji}</div>`),
      ...(SC.medals || []).map(m => `<div class="s-medal ${m.tone}" style="${P(m.at)}"><span class="md-img"><img src="${IMG(m.img)}" alt=""></span></div><div class="s-medlab ${m.tone}" style="${P(m.labAt)}">${m.label}</div>`),
      SC.glow ? `<div class="s-glow" style="${P(SC.glow.at)}"><b>${SC.glow.label}</b></div>` : '',
    ].join('');
    let slotsHTML = '';
    if (SC.zones) {
      slotsHTML = SC.zones.map((z, i) => `<div class="slot zone" data-i="${i}" data-id="${z.id}" style="left:${z.x}%;top:${z.y}%;width:${z.w}%;height:${z.h}%">
          <div class="z-lab">${z.label}</div><div class="z-tags">${z.tags.map(t => `<span>${t}</span>`).join('')}</div><div class="z-drop">LETAK DI SINI</div></div>`).join('');
    } else {
      slotsHTML = (SC.slotPos || []).map((p, i) => { const cp = SC.slotCaps ? SC.slotCaps[i] : SC.slotCaption; return `<div class="slot hex onmap${SC.slotShape === 'frame' ? ' frame' : ''}" data-i="${i}" style="${P(p)}">
          ${cp && cp[0] ? `<i class="cap1">${cp[0]}</i>` : ''}<em>${cp ? '?' : i + 1}</em>${cp && cp[1] ? `<i class="cap2">${cp[1]}</i>` : ''}</div>`; }).join('');
    }
    // blok C gaya Scratch: ULANG [n] KALI { badan }
    if (SC.ifblock) { const ib = SC.ifblock;
      slotsHTML += `<div class="s-cblock s-ifb" style="${P(ib.at)};width:${ib.w || 30}%">
        <div class="cb-head"><span class="cb-t">❓ JIKA<small>(kalau)</small></span><div class="slot cbs c" data-i="${ib.cond}"><em>${ib.condPh || 'syarat?'}</em></div></div>
        <div class="cb-head sub"><span class="cb-t">MAKA<small>(jadi)</small></span></div>
        <div class="cb-mid"><div class="cb-arm"></div><div class="cb-body"><div class="slot cbs" data-i="${ib.then}"><em>${ib.thenPh || 'tindakan?'}</em></div></div></div>
        <div class="cb-else"><span class="cb-t">JIKA TIDAK<small>(kalau tidak)</small></span></div>
        <div class="cb-mid"><div class="cb-arm"></div><div class="cb-body"><div class="cb-fixed">${ib.elseText}</div></div></div>
        <div class="cb-foot"></div></div>`; }
    if (SC.cblock) { const cb = SC.cblock;
      slotsHTML += `<div class="s-cblock" style="${P(cb.at)};width:${cb.w || 24}%">
        <div class="cb-head"><span class="cb-t">🔁 ULANG</span><div class="slot cbs n" data-i="${cb.times}"><em>?</em></div><span class="cb-t">KALI</span></div>
        <div class="cb-mid"><div class="cb-arm"></div><div class="cb-body">${cb.body.map(i => `<div class="slot cbs" data-i="${i}"><em>${cb.body.length > 1 ? 'langkah ' + (cb.body.indexOf(i) + 1) : '?'}</em></div>`).join('')}</div></div>
        <div class="cb-foot"><span>↺ ulang semula</span></div></div>`; }
    if (SC.longCode) { const lc = SC.longCode;
      slotsHTML += `<div class="s-long" style="${P(lc.at)};width:${lc.w || 19}%"><div class="lc-t">${lc.title}</div>
        ${lc.lines.map((l, i) => `<div class="lc-b" style="--d:${i}">${l}</div>`).join('')}<div class="lc-n">${lc.note || ''}</div></div>`; }
    const order = C.blocks.map((b, i) => ({ ...b, k: i })).sort(() => Math.random() - .5);
    const pathStrip = C.showPath ? `<div class="r-path">${C.showPath.map(p => `<i class="${p === 'left' ? 'flip' : ''}"><img src="${IMG(ICON[p])}" alt="">${p === 'up2' ? '<b>2</b>' : p === 'up4' ? '<b>4</b>' : ''}</i>`).join('')}</div>` : '';
    const ifBanner = C.banner ? `<div class="s-if">${C.banner}</div>` : '';

    chEl.innerHTML = `
      <img class="s-fill" src="${IMG(C.bg)}" alt="">
      <div class="s-box">
        <img class="s-bg" src="${IMG(C.bg)}" alt="">
        <div class="s-vig"></div>
        ${route.replace('__CL__', callLines)}${arrowsHTML}${marks}${SC.walkerStart && SC.walker ? `<div class="s-walker" style="${P(SC.route[0])}"><img src="${IMG(SC.walker)}" style="object-position:${SC.walkerPos || 'center 15%'}" alt=""></div>` : ''}${callHTML}${anchorsHTML}${slotsHTML}${legendHTML}
        <div class="m-top">
          <button class="m-exit" data-exit title="Menu">✕</button>
          <div class="m-badge"><span class="lv">${C.no}</span><div><small>MISI ${C.no}</small><b>${C.concept}</b></div></div>
        </div>${ifBanner}
      </div>
      <aside class="s-panel">
        <div class="r-stats"><div class="m-timer"><small>MASA</small><b data-time>00:00</b></div><div class="m-score"><small>SKOR</small><b data-score>0</b></div></div>
        <div class="r-obj">🎯 ${C.task}</div>
        <div class="r-head">BLOK KOD</div>${pathStrip}
        <div class="m-bar vert${C.blocks.length > 5 ? ' many' : ''}${C.blocks.length > 7 || (C.blocks.length > 6 && C.mode === 'key') ? ' many8' : ''}">${order.map(b => blockHTML(b, false, C)).join('')}</div>
        <div class="r-skills">
          <button class="m-skill hint" data-hint><span>🐱</span><small>PETUNJUK</small></button>
          ${C.mode === 'key' ? '<button class="m-skill key" data-key><span>🔑</span><small>KUNCI</small></button>' : ''}
        </div>
      </aside>
      <div class="m-call" data-call></div>`;

    const box = $('.s-box', chEl);
    const slots = [...chEl.querySelectorAll('.slot')], nSlots = SC.zones ? C.blocks.length : C.slots.length, filled = new Array(slots.length).fill(null);
    slots.forEach(s => s.dataset.label = s.innerHTML);
    // program diisi awal (misi cari pepijat)
    (C.prefill || []).forEach((id, i) => {
      const b = (C.prefillDefs || []).concat(C.blocks).find(x => x.id === id); if (!b || !slots[i]) return;
      filled[i] = { id, src: null }; slots[i].classList.add('full', 'pre');
      const cap1 = slots[i].querySelector('.cap1'), cap2 = slots[i].querySelector('.cap2');
      slots[i].innerHTML = (cap1 ? cap1.outerHTML : '') + blockHTML(b, true, C) + (cap2 ? cap2.outerHTML : '');
      slots[i].querySelector('.block').onclick = () => returnBlock(i);
    });
    const tEl = $('[data-time]', chEl), sEl = $('[data-score]', chEl), callEl = $('[data-call]', chEl);
    const tick = setInterval(() => { const s = Math.floor((performance.now() - t0) / 1000); tEl.textContent = `${String(s / 60 | 0).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }, 250);
    const call = (t, cls) => { callEl.className = 'm-call'; void callEl.offsetWidth; callEl.textContent = t; callEl.className = 'm-call show ' + (cls || ''); };
    const rel = el => { const r = el.getBoundingClientRect(), R = chEl.getBoundingClientRect(); return { x: r.left - R.left + r.width / 2, y: r.top - R.top + r.height / 2, h: r.height }; };
    const addScore = (n, el) => {
      score += n; sEl.textContent = score; sEl.parentElement.classList.remove('bump'); void sEl.offsetWidth; sEl.parentElement.classList.add('bump');
      if (el) { const c = rel(el); const f = document.createElement('div'); f.className = 'm-float'; f.textContent = '+' + n; f.style.left = c.x + 'px'; f.style.top = (c.y - c.h / 2) + 'px'; chEl.appendChild(f); setTimeout(() => f.remove(), 1000); }
    };
    const burst = el => {
      const c = rel(el);
      for (let i = 0; i < 16; i++) { const p = document.createElement('i'); p.className = 'm-spark'; p.style.left = c.x + 'px'; p.style.top = c.y + 'px'; const a = Math.random() * 6.28, d = 40 + Math.random() * 70; p.style.setProperty('--x', Math.cos(a) * d + 'px'); p.style.setProperty('--y', Math.sin(a) * d + 'px'); chEl.appendChild(p); setTimeout(() => p.remove(), 700); }
    };
    const good = el => { combo++; addScore(100 * Math.min(combo, 3), el); burst(el); SFX.ok(); const c = CALLS[Math.min(combo, 5)]; if (c) call(c); };
    const bad = t => { combo = 0; SFX.bad(); call(t || 'CUBA LAGI!', 'red'); chEl.classList.remove('hit'); void chEl.offsetWidth; chEl.classList.add('hit'); };

    // animasi kemenangan atas peta
    function walk(done) {
      if (!SC.route || !SC.walker) return done();
      let w = $('.s-walker', box);
      if (!w) { w = document.createElement('div'); w.className = 's-walker';
        w.innerHTML = `<img src="${IMG(SC.walker)}" style="object-position:${SC.walkerPos || 'center 15%'}" alt="">`;
        box.appendChild(w); }
      const kf = SC.route.map(([x, y]) => ({ left: x + '%', top: y + '%' }));
      const a = w.animate(kf, { duration: 650 * SC.route.length, easing: 'ease-in-out', fill: 'forwards' });
      $('.s-route', box).classList.add('lit');
      a.onfinish = () => { $('.s-mark.goal', box) && $('.s-mark.goal', box).classList.add('reached'); $('.s-finish', box) && $('.s-finish', box).classList.add('reached'); SFX.go(); setTimeout(done, 500); };
    }
    function countBoxes(done) {
      if (!SC.boxDots) return done();
      box.querySelectorAll('.s-item').forEach(e => e.classList.add('bounce'));
      SC.boxDots.forEach((p, i) => setTimeout(() => {
        const d = document.createElement('div'); d.className = 's-count'; d.style.cssText = P(p); d.textContent = i + 1; box.appendChild(d); SFX.tick();
      }, 250 * i));
      setTimeout(done, 250 * SC.boxDots.length + 600);
    }
    function fillShelf(done) {
      if (!SC.fillTo) return done();
      const its = [...box.querySelectorAll('.s-item')];
      its.forEach((e, i) => { const t = SC.fillTo[i]; if (!t) return;
        setTimeout(() => { e.classList.remove('bounce'); e.style.animation = 'none';
          e.animate([{ left: e.style.left, top: e.style.top, fontSize: e.style.fontSize, offset: 0 },
                     { top: (Math.min(parseFloat(e.style.top), t[1]) - 12) + '%', offset: .5 },
                     { left: t[0] + '%', top: t[1] + '%', fontSize: (SC.fillSize || 2.4) + 'cqw', offset: 1 }],
                    { duration: 520, easing: 'ease-in-out', fill: 'forwards' }); SFX.tick(); }, 300 * i);
      });
      setTimeout(done, 300 * its.length + 900);
    }
    function collapse(done) {
      const L = $('.s-long', box); if (!L) return done();
      L.querySelectorAll('.lc-b').forEach((b, i) => setTimeout(() => { b.classList.add('gone'); SFX.tick(); }, 160 * i));
      const n = L.querySelectorAll('.lc-b').length;
      setTimeout(() => { L.classList.add('done'); const t = document.createElement('div'); t.className = 's-shrink';
        t.innerHTML = `<b>${n} baris</b> ➜ <b>1 blok ULANG</b> 🎉<small>Kod lebih pendek & mudah!</small>`; box.appendChild(t); SFX.go(); }, 160 * n + 200);
      setTimeout(done, 160 * n + 1900);
    }
    const finish = () => {
      clearInterval(tick);
      rec.siap = true; rec.masa_s = Math.round((performance.now() - t0) / 1000); rec.skor = score;
      rec.bintang = rec.salah === 0 && rec.petunjuk === 0 ? 3 : rec.salah <= 2 ? 2 : 1;
      saveSession();
      const after = () => setTimeout(() => victory(C, rec), 300);
      if (SC.finishFx === 'doors') {
        const d = document.createElement('div'); d.className = 'doors s-doors'; d.innerHTML = `<img src="${IMG('pintu_kiri')}" alt=""><img src="${IMG('pintu_kanan')}" alt="">`;
        if (SC.doorsReveal) { const rv = document.createElement('div'); rv.className = 's-reveal'; rv.innerHTML = `<img src="${IMG(SC.doorsReveal)}" alt="">${SC.revealText ? `<b>${SC.revealText}</b>` : ''}`; box.appendChild(rv); }
        box.appendChild(d); playSfx('sfx_pintu'); setTimeout(after, SC.doorsReveal ? 4200 : 2600);
      } else if (SC.finishFx === 'screen') {
        const d = document.createElement('div'); d.className = 's-screen'; d.style.cssText = P(SC.screenAt || [60, 32]); d.innerHTML = SC.screenText || '';
        box.appendChild(d); SFX.go(); setTimeout(after, 1800);
      } else if (SC.boxDots) collapse(() => countBoxes(() => fillShelf(after))); else walk(after);
    };

    $('[data-exit]', chEl).onclick = () => { clearInterval(tick); home(); };
    $('[data-hint]', chEl).onclick = () => {
      rec.petunjuk++; saveSession();
      const old = $('.m-hint', chEl); if (old) old.remove();
      const h = document.createElement('div'); h.className = 'm-hint';
      h.innerHTML = `<span class="cat">🐱</span><span>${C.hint}</span>`;
      box.appendChild(h); setTimeout(() => h.remove(), 7000);
      if (SC.boxDots) SC.boxDots.forEach(p => { const d = document.createElement('div'); d.className = 's-count soft'; d.style.cssText = P(p); d.textContent = '?'; box.appendChild(d); setTimeout(() => d.remove(), 4000); });
      if (SC.route) { $('.s-route', box).classList.add('hint'); setTimeout(() => $('.s-route', box).classList.remove('hint'), 4000); }
    };
    if (C.mode === 'key') {
      $('[data-key]', chEl).onclick = () => {
        rec.cubaan++;
        if (filled.some(f => !f)) { saveSession(); return bad('ISI SEMUA SLOT!'); }
        let wrong = 0;
        filled.forEach((f, i) => { const ok = f.id === C.slots[i]; slots[i].classList.toggle('ok', ok); slots[i].classList.toggle('no', !ok); if (!ok) wrong++; });
        if (wrong) {
          rec.salah++; saveSession(); bad(`${wrong} BLOK SALAH!`);
          filled.forEach((f, i) => { if (f.id !== C.slots[i]) setTimeout(() => returnBlock(i), 900); });
        } else {
          slots.forEach((s, i) => setTimeout(() => burst(s), i * 120));
          addScore(C.slots.length * 100 * (rec.salah ? 1 : 2), $('[data-key]', chEl)); SFX.ok(); call(rec.salah ? 'LALUAN BETUL!' : 'SEMPURNA!');
          $('[data-key]', chEl).disabled = true; saveSession(); finish();
        }
      };
    }
    function returnBlock(i) {
      const f = filled[i]; if (!f) return;
      filled[i] = null; const s = slots[i]; s.classList.remove('ok', 'no', 'full');
      s.classList.remove('pre'); s.innerHTML = s.dataset.label; if (f.src) f.src.classList.remove('used');
    }
    function place(i, b, src) {
      filled[i] = { id: b.id, src }; src.classList.add('used');
      const s = slots[i]; s.classList.add('full');
      if (s.classList.contains('zone')) {
        s.insertAdjacentHTML('beforeend', `<div class="z-token">${tokenHTML(C, b)}</div>`);
      } else {
        const cap1 = s.querySelector('.cap1'), cap2 = s.querySelector('.cap2');
        s.innerHTML = (cap1 ? cap1.outerHTML : '') + blockHTML(b, true, C) + (cap2 ? cap2.outerHTML : '');
        if (C.mode === 'key') s.querySelector('.block').onclick = () => returnBlock(i);
      }
    }

    // seret & lepas (tetikus + sentuhan)
    chEl.querySelectorAll('.m-bar .block').forEach(src => {
      src.addEventListener('pointerdown', e => {
        e.preventDefault(); SFX.pick();
        const b = C.blocks[+src.dataset.k], r = src.getBoundingClientRect();
        const ghost = src.cloneNode(true); ghost.classList.add('dragging');
        ghost.style.width = r.width + 'px'; ghost.style.height = r.height + 'px';
        document.body.appendChild(ghost); src.classList.add('lifted'); chEl.classList.add('dragging-on');
        const dx = e.clientX - r.left, dy = e.clientY - r.top;
        const move = ev => {
          ghost.style.left = (ev.clientX - dx) + 'px'; ghost.style.top = (ev.clientY - dy) + 'px';
          slots.forEach(s => s.classList.toggle('hover', hit(s, ev)));
        };
        const up = ev => {
          window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
          ghost.remove(); src.classList.remove('lifted'); chEl.classList.remove('dragging-on'); slots.forEach(s => s.classList.remove('hover'));
          const i = slots.findIndex(s => hit(s, ev));
          if (i < 0) return;
          if (filled[i]) { if (C.mode === 'key') returnBlock(i); else return; }
          rec.cubaan++;
          if (C.mode === 'instant') {
            const want = SC.zones ? (b.goes || C.slots[0]) : C.slots[i];
            const got = SC.zones ? slots[i].dataset.id : b.id;
            if (got === want) {
              place(i, b, src); slots[i].classList.add('ok'); good(slots[i]);
              const an = $(`.s-anchor[data-a="${i}"]`, chEl); if (an) an.classList.add('ok');
              const ans = $(`[data-ans="${b.id}"]`, chEl) || (C.blocks.length === 1 && $('[data-ans]', chEl));
              if (ans) { ans.textContent = ans.dataset.fill || '✓'; ans.classList.add('ok'); }
              if (filled.filter(Boolean).length >= nSlots) finish();
            } else {
              rec.salah++; slots[i].classList.add('no'); setTimeout(() => slots[i].classList.remove('no'), 600);
              bad(C.wrongCall || 'CUBA LAGI!');
            }
          } else { place(i, b, src); SFX.pick(); }
          saveSession();
        };
        move(e);
        window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
      });
    });
  }
  function tokenHTML(C, b) {
    if (b && b.emoji) return `<span class="tk-img emo">${b.emoji}</span><span class="lb">${b.label}</span>`;
    const t = C.scene && C.scene.token;
    return t ? `<span class="tk-img"><img src="${IMG(t.img)}" style="object-position:${t.pos}" alt=""></span><span class="lb">${t.label}</span>` : '';
  }

  function victory(C, rec) {
    SFX.win(); playSfx('sfx_2s');
    const v = document.createElement('div'); v.className = 'm-victory';
    v.innerHTML = `
      <div class="rays"></div>
      <div class="vic"><span>VICTORY</span></div>
      <div class="sub">MISI ${C.no} · ${C.concept} SELESAI</div>
      <div class="stars">${[1, 2, 3].map(n => `<i class="${n <= rec.bintang ? 'on' : ''}" style="animation-delay:${.5 + n * .25}s">★</i>`).join('')}</div>
      ${rec.bintang === 3 ? '<div class="mvp">MVP</div>' : ''}
      <div class="stats">
        <div><small>SKOR</small><b>${rec.skor}</b></div>
        <div><small>MASA</small><b>${rec.masa_s}s</b></div>
        <div><small>SALAH</small><b>${rec.salah}</b></div>
        <div><small>PETUNJUK</small><b>${rec.petunjuk}</b></div>
      </div>
      <button class="m-start" data-cont><span>TERUSKAN ▶</span></button>`;
    chEl.appendChild(v);
    $('[data-cont]', v).onclick = () => { chEl.className = 'hidden'; chEl.innerHTML = ''; hud.classList.remove('hidden'); next(); };
  }

  const hit = (el, e) => { const r = el.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; };
  function blockHTML(b, placed, C) {
    if (b.kind === 'token') return `<div class="block token" ${placed ? '' : `data-k="${b.k}"`}>${tokenHTML(C, b)}</div>`;
    if (b.kind === 'code') return `<div class="block code" ${placed ? '' : `data-k="${b.k}"`}><div class="cs">${b.lines.map(l => `<div class="cl ${l[0]}">${l[1]}</div>`).join('')}</div></div>`;
    if (b.kind === 'card') return `<div class="block card ${b.tone || ''}" ${placed ? '' : `data-k="${b.k}"`}><span class="lb">${b.label}</span></div>`;
    const ic = b.icon && ICON[b.icon] ? `<img src="${IMG(ICON[b.icon])}" class="${b.icon === 'left' ? 'flip' : ''}" alt="">` : b.icon === 'loop' ? '🔁' : b.kind === 'num' ? '🔁' : b.kind === 'dir' ? (b.id.includes('kiri') ? '⬅' : '➡') : '';
    return `<div class="block ${b.kind}" ${placed ? '' : `data-k="${b.k}"`}><span class="ic">${ic}</span><span class="lb">${b.label}</span></div>`;
  }

  /* ---------- TAMAT ---------- */
  function showEnd() {
    stopVoice(); setAmb('amb_kelas'); setBg('dunia_b'); nav.className = 'hidden';
    chars.innerHTML = ''; lastChars = ''; setParticles('stars'); bubble.className = narr.className = 'hidden';
    if (S.session) { S.session.tamat = new Date().toISOString(); saveSession(); }
    const cab = (S.session && S.session.cabaran) || {};
    const B = [['sequence', 'SEQUENCE', 'var(--seq)'], ['loop', 'LOOP', 'var(--loop)'], ['conditional', 'CONDITIONAL', 'var(--cond)'], ['logic', 'LOGIC', 'var(--logic)']];
    chEl.className = '';
    chEl.innerHTML = `<div class="ch-body"><div class="end">
      <h1>TAMAT! 🎉</h1>
      <p>Tahniah${S.session ? ', ' + esc(S.session.nama) : ''}! Kamu telah membantu Yasmin pulang ke dunianya.</p>
      <div class="badges">${B.map(([k, n, c]) => { const ks = [k, k + '2', k + '3', k + '4'].filter(x => CHALLENGES[x]), N = ks.length, st = ks.reduce((t, x) => t + ((cab[x] && cab[x].bintang) || 0), 0), done = ks.filter(x => cab[x] && cab[x].siap).length, av = Math.round(st / N);
        return `<div class="badge" style="background:${c}"><b>${n}</b>${done}/${N} misi · ${'★'.repeat(av)}${'☆'.repeat(3 - av)}<small>${st}/${N * 3} bintang</small></div>`; }).join('')}</div>
      <div class="row"><button class="cta small" data-home>🏠 Menu Utama</button><button class="pill" data-again>↻ Main semula</button></div>
    </div></div>`;
    $('[data-home]', chEl).onclick = home;
    $('[data-again]', chEl).onclick = () => { newSession('penuh'); S.node = 0; S.step = 0; hud.className = ''; render(); };
    for (let i = 0; i < 40; i++) { const c = document.createElement('div'); c.className = 'confetti'; c.textContent = ['⭐', '🎉', '✨', '🟦', '🟧', '🟩', '🟪'][i % 7]; c.style.left = Math.random() * 100 + '%'; c.style.animationDuration = 3 + Math.random() * 3 + 's'; c.style.animationDelay = Math.random() * 2 + 's'; fx.appendChild(c); }
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- MENU / LAPORAN ---------- */
  function home() {
    stopVoice(); setAmb(null); clearTimeout(S.timer); S.token++;
    chEl.className = 'hidden'; chEl.innerHTML = ''; fx.innerHTML = ''; hud.className = nav.className = prog.className = 'hidden';
    $('#namecard').classList.add('hidden'); chars.innerHTML = ''; lastChars = ''; setParticles(''); S.lastNode = -1;
    ['#laporan'].forEach(s => $(s).classList.add('hidden')); $('#home').classList.remove('hidden');
  }
  function begin(mode, where) {
    newSession(mode);
    $('#home').classList.add('hidden'); hud.className = ''; prog.className = '';
    if (where) go(where); else { S.node = 0; S.step = 0; render(); }
  }
  const COLS = ['nama', 'mod', 'mula', 'tamat'];
  const CH = Object.keys(CHALLENGES);
  const F = ['siap', 'bintang', 'skor', 'masa_s', 'cubaan', 'salah', 'petunjuk'];
  function rows() {
    return store.get('dct_sesi', []).map(s => {
      const r = { nama: s.nama, mod: s.mod, mula: fmt(s.mula), tamat: fmt(s.tamat) };
      CH.forEach(c => F.forEach(f => { const v = s.cabaran[c] ? s.cabaran[c][f] : ''; r[`${c}_${f}`] = f === 'siap' ? (v === '' ? '' : v ? 'Ya' : 'Tidak') : v; }));
      return r;
    });
  }
  const fmt = iso => iso ? new Date(iso).toLocaleString('ms-MY', { dateStyle: 'short', timeStyle: 'short' }) : '';
  const HEAD = [...COLS, ...CH.flatMap(c => F.map(f => `${c}_${f}`))];
  function showLaporan() {
    const R = rows();
    $('#tbl').innerHTML = `<thead><tr>${HEAD.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${R.length ? R.reverse().map(r => `<tr>${HEAD.map(h => `<td>${esc(r[h] ?? '')}</td>`).join('')}</tr>`).join('') : `<tr><td class="empty" colspan="${HEAD.length}">Belum ada rekod. Rekod akan muncul selepas murid bermain.</td></tr>`}</tbody>`;
    $('#laporan').classList.remove('hidden');
  }
  function csv() {
    const R = rows(); const q = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const text = '﻿' + [HEAD.join(','), ...R.map(r => HEAD.map(h => q(r[h])).join(','))].join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' }));
    a.download = `laporan_dunia_coding_yasmin_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  }

  /* ---------- ikat butang ---------- */
  $('#nama').value = store.get('dct_nama', '');
  let pendingGo = '';
  const openName = go => { pendingGo = go; $('#namecard').classList.remove('hidden'); setTimeout(() => $('#nama').focus(), 50); };
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => openName(b.dataset.go));
  const enter = () => { $('#namecard').classList.add('hidden'); begin(pendingGo || 'penuh', pendingGo || undefined); };
  $('#btnStart').onclick = enter;
  $('#nama').addEventListener('keydown', e => { if (e.key === 'Enter') enter(); });
  $('#btnNoName').onclick = () => { $('#nama').value = ''; enter(); };
  $('#namecard').addEventListener('click', e => { if (e.target.id === 'namecard') $('#namecard').classList.add('hidden'); });
  $('#btnLaporan').onclick = showLaporan;
  document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => b.closest('.screen').classList.add('hidden'));
  $('#btnCSV').onclick = csv;
  let clearArm = 0;
  $('#btnClear').onclick = e => {
    if (Date.now() - clearArm < 3000) { store.set('dct_sesi', []); showLaporan(); e.target.textContent = '🗑 Padam semua rekod'; clearArm = 0; }
    else { clearArm = Date.now(); e.target.textContent = 'Tekan sekali lagi untuk sahkan'; setTimeout(() => e.target.textContent = '🗑 Padam semua rekod', 3000); }
  };
  $('#btnMenu').onclick = home;
  $('#btnNext').onclick = () => { stopVoice(); next(); };
  $('#btnBack').onclick = () => { stopVoice(); back(); };
  const syncHud = () => { stage.classList.toggle('nocc', !S.cc); $('#btnCC').classList.toggle('off', !S.cc); $('#btnSound').textContent = S.sound ? '🔊' : '🔇'; $('#btnAuto').classList.toggle('off', !S.auto); $('#btnAuto').textContent = S.auto ? '⏯ Auto' : '⏯ Manual'; };
  $('#btnSound').onclick = () => { S.sound = !S.sound; store.set('dct_sound', S.sound); if (!S.sound) { stopVoice(); setAmb(null); } syncHud(); };
  $('#btnAuto').onclick = () => { S.auto = !S.auto; store.set('dct_auto', S.auto); syncHud(); $('#btnNext').classList.toggle('pulse', !S.auto); };
  $('#btnCC').onclick = () => { S.cc = !S.cc; store.set('dct_cc', S.cc); syncHud(); };
  syncHud();
  stage.addEventListener('click', e => {
    const inStory = $('#home').classList.contains('hidden') && chEl.classList.contains('hidden');
    if (inStory && !S.auto && e.target.closest('#bubble,#narr,#bg,#fx')) { stopVoice(); next(); }
  });
  document.addEventListener('keydown', e => {
    if ($('#home').classList.contains('hidden') && chEl.classList.contains('hidden')) {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); stopVoice(); next(); }
      if (e.key === 'ArrowLeft') { stopVoice(); back(); }
    }
  });
  // pautan terus ke misi: index.html#misi=loop2
  const hm = location.hash.match(/misi=(\w+)/);
  if (hm) { const i = flat.findIndex(n => n.challenge === hm[1]); if (i >= 0) { newSession('misi ' + hm[1]); $('#home').classList.add('hidden'); hud.className = ''; prog.className = ''; S.node = i; S.step = 0; render(); } }
  // pramuat gambar latar seterusnya
  window.addEventListener('load', () => {
    const set = new Set(); STORY.forEach(n => (n.steps || []).forEach(s => { set.add(s.bg); (s.chars || []).forEach(c => set.add(c.img)); }));
    Object.values(CHALLENGES).forEach(c => set.add(c.bg));
    let i = 0; const arr = [...set].filter(Boolean);
    (function pre() { if (i >= arr.length) return; const im = new Image(); im.onload = im.onerror = pre; im.src = IMG(arr[i++]); })();
  });
})();
