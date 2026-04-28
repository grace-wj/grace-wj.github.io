// draft — a self-portrait, drafted in real time.
// The page composes itself in front of you over ~75 seconds. Strikethroughs are kept;
// marginal notes are written by hand in the right column.

(() => {
  'use strict';

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const URL_FAST = new URL(location).searchParams.has('fast');
  let SPEED = REDUCED || URL_FAST ? 0 : 1;

  const $ = (sel) => document.querySelector(sel);

  // ——— time-of-day ———————————————————————————————————————

  function todBucket(d) {
    const h = d.getHours();
    if (h < 6)  return 'night';
    if (h < 9)  return 'dawn';
    if (h < 12) return 'morning';
    if (h < 14) return 'midday';
    if (h < 18) return 'afternoon';
    if (h < 21) return 'evening';
    return 'night';
  }

  function applyTod() {
    const d = new Date();
    document.body.dataset.tod = todBucket(d);
    const hh = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, '0');
    const period = hh < 12 ? 'a.m.' : 'p.m.';
    const h12 = ((hh + 11) % 12) + 1;
    const time = `${h12}:${mm} ${period}`;
    const tEl = document.getElementById('time');
    if (tEl) tEl.textContent = time;
  }
  applyTod();
  setInterval(applyTod, 60_000);

  // ——— typed-paragraph state ————————————————————————————

  function escapeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  class Typed {
    constructor(el) {
      this.el = el;
      this.parts = []; // [{kind:'text'|'struck'|'raw', text:string}]
      this.headIdx = -1;
    }
    newHead() {
      this.parts.push({ kind: 'text', text: '' });
      this.headIdx = this.parts.length - 1;
      this.render();
    }
    closeHead() {
      this.headIdx = -1;
      this.render();
    }
    appendChar(ch) {
      if (this.headIdx < 0) this.newHead();
      this.parts[this.headIdx].text += ch;
      this.render();
    }
    appendRaw(html) {
      this.parts.push({ kind: 'raw', text: html });
      this.render();
    }
    strikeHead() {
      if (this.headIdx < 0) return;
      this.parts[this.headIdx].kind = 'struck';
      this.headIdx = -1;
      this.render();
    }
    render() {
      let html = '';
      for (let i = 0; i < this.parts.length; i++) {
        const p = this.parts[i];
        if (p.kind === 'raw') { html += p.text; continue; }
        const text = escapeHTML(p.text);
        if (p.kind === 'struck') html += `<s>${text}</s>`;
        else if (i === this.headIdx) html += `<span class="head-part">${text}<span class="caret"></span></span>`;
        else html += text;
      }
      this.el.innerHTML = html;
    }
  }

  // ——— scheduling helpers ———————————————————————————————

  function pause(ms) {
    const dur = ms * SPEED;
    if (dur <= 0) return Promise.resolve();
    return new Promise((r) => setTimeout(r, dur));
  }

  async function typeInto(typed, text, opts = {}) {
    const base = opts.base ?? 38;
    const variance = opts.variance ?? 28;
    typed.newHead(); // open a fresh "head" part
    for (const ch of text) {
      typed.appendChar(ch);
      let d = base + Math.random() * variance;
      if (ch === ' ')               d += 6;
      else if (ch === '.')          d += 220;
      else if (ch === ',' || ch === ';') d += 110;
      else if (ch === '—')          d += 60;
      else if (ch === '\n')         d += 200;
      await pause(d);
    }
  }

  async function continueInto(typed, text, opts = {}) {
    // append to the current head (or start a new one)
    if (typed.headIdx < 0) typed.newHead();
    const base = opts.base ?? 38;
    const variance = opts.variance ?? 28;
    for (const ch of text) {
      typed.appendChar(ch);
      let d = base + Math.random() * variance;
      if (ch === ' ')               d += 6;
      else if (ch === '.')          d += 220;
      else if (ch === ',' || ch === ';') d += 110;
      else if (ch === '—')          d += 60;
      await pause(d);
    }
  }

  function strikeAndClose(typed) {
    typed.strikeHead();
  }

  async function addMarginalia(slotName, html, opts = {}) {
    const margin = document.querySelector(`.margin[data-margin="${slotName}"]`);
    if (!margin) return;
    const note = document.createElement('span');
    note.className = 'note';
    note.innerHTML = html;
    margin.appendChild(note);
    // brief delay before fade-in to feel like writing
    await pause(60);
    note.classList.add('is-shown');
  }

  function bumpRev() {
    const r = document.getElementById('rev');
    const map = ['i', 'ii', 'iii', 'iv', 'v', 'vi'];
    const cur = r.textContent.trim();
    const idx = Math.max(0, map.indexOf(cur));
    r.textContent = map[Math.min(idx + 1, map.length - 1)];
  }

  // ——— the timeline ——————————————————————————————————————

  async function run() {
    const title    = new Typed($('#title'));
    const subtitle = new Typed($('#subtitle'));
    const p1       = new Typed($('#p1'));
    const p2       = new Typed($('#p2'));
    const lead     = new Typed($('#works-lead'));
    const p4       = new Typed($('#p4'));
    const p5       = new Typed($('#p5'));
    const works    = $('#works');

    // show the skip button after a moment
    setTimeout(() => {
      if (SPEED > 0) document.getElementById('skip').hidden = false;
    }, 1500);

    // —— title ——
    await typeInto(title, 'grace wei-li juan', { base: 60, variance: 30 });
    title.closeHead();
    await pause(450);

    // —— subtitle, with one false start ——
    await typeInto(subtitle, 'a self-portrait', { base: 50, variance: 30 });
    await pause(800);
    strikeAndClose(subtitle);
    await pause(400);
    await typeInto(subtitle, 'a draft, kept open', { base: 50, variance: 30 });
    subtitle.closeHead();
    await pause(700);

    bumpRev();
    addMarginalia('head', '<span class="arrow">↳</span> the second one is the keeper.');

    // —— p1 ——
    await pause(700);
    await typeInto(p1, 'I am writing this in the third person.', { base: 36 });
    await pause(1100);
    strikeAndClose(p1);
    await pause(450);
    await continueInto(p1, ' I write code that wants to be read like a poem');
    await pause(360);
    await continueInto(p1, ', and essays that want to be compiled.');
    await pause(700);

    addMarginalia('p1', '<span class="arrow">↳</span> legible, kind, in love with their materials.');
    await pause(500);

    await continueInto(p1, ' I weave on a loom that takes its instructions from');
    await pause(500);
    // strike the prepositional phrase, replace with a tighter one
    {
      // find the head and strike the last segment we added
      const head = p1.parts[p1.headIdx];
      const cutAt = head.text.lastIndexOf(' takes its instructions from');
      if (cutAt > 0) {
        const before = head.text.slice(0, cutAt);
        const struck = head.text.slice(cutAt);
        head.text = before;
        // close current head, append a struck part, open new head
        p1.parts.splice(p1.headIdx + 1, 0, { kind: 'struck', text: struck });
        p1.parts.splice(p1.headIdx + 2, 0, { kind: 'text', text: '' });
        p1.headIdx = p1.headIdx + 2;
        p1.render();
      }
    }
    await pause(400);
    await continueInto(p1, ' driven by, git');
    await pause(400);
    // walk back the comma
    {
      const head = p1.parts[p1.headIdx];
      head.text = head.text.replace(' driven by, git', ' driven by git');
      p1.render();
    }
    await pause(380);
    await continueInto(p1, ', and I paint in oils, in a small studio with one good window, when the code lets me.');
    p1.closeHead();
    await pause(900);

    bumpRev();

    // —— p2 ——
    await typeInto(p2, 'I am interested in the space between the finished thing and the continuing thing.', { base: 36 });
    p2.closeHead();
    await pause(500);
    addMarginalia('p2', '<span class="arrow">↳</span> the only sentence here I am sure of.');
    await pause(900);

    // —— works ——
    await typeInto(lead, 'A small inventory:', { base: 42 });
    lead.closeHead();
    await pause(360);

    async function typeWork(name, desc) {
      const li = document.createElement('li');
      li.innerHTML = '<span class="work-name"></span><span class="work-desc"></span>';
      works.appendChild(li);
      const tn = new Typed(li.querySelector('.work-name'));
      await typeInto(tn, name, { base: 38 });
      tn.closeHead();
      const td = new Typed(li.querySelector('.work-desc'));
      await typeInto(td, desc, { base: 30 });
      td.closeHead();
      return td;
    }

    await typeWork('hum', ' — a synthesizer for those who cannot read music.');
    await pause(280);
    const sloLi = await typeWork('slowcompiler', ' — thirty seconds per hello world.');
    await pause(420);
    // append a haiku-line afterthought
    await continueInto(sloLi, ' A haiku at every pass.');
    sloLi.closeHead();
    await pause(280);
    await typeWork('weft', ' — one thread per commit, one scarf per orbit.');
    await pause(280);
    await typeWork('three bodies, orbiting a lamp', ' — small oils, shown one october in a borrowed window.');
    await pause(280);
    await typeWork('on stillness', ' — an essay; ~2,400 words; revised in november.');
    await pause(700);

    addMarginalia('works', '<span class="arrow">↳</span> in no particular order — they all want the same thing.');
    await pause(600);

    bumpRev();

    // —— p4: contact ——
    await typeInto(p4, 'Replies will be slow, and longer than they should be — ', { base: 36 });
    await pause(220);
    p4.appendRaw('<a href="mailto:grayswan795@gmail.com" id="mailto-link"></a>');
    p4.closeHead();
    const mailEl = document.getElementById('mailto-link');
    const tm = new Typed(mailEl);
    await typeInto(tm, 'grayswan795@gmail.com', { base: 26 });
    tm.closeHead();
    await pause(700);

    // —— p5: coda ——
    await typeInto(p5, 'This page is being drafted in real time. ', { base: 36 });
    await pause(380);
    await continueInto(p5, 'What I cross out is not gone — it is the shape this draft is not.');
    p5.closeHead();
    await pause(700);

    addMarginalia('p5', '<span class="arrow">↳</span> reload to begin again.');
    await pause(600);

    // —— signoff ——
    const signoff = $('#signoff');
    signoff.innerHTML = 'set in the browser, on the morning of <span id="signoff-date"></span>.';
    const dateEl = document.getElementById('signoff-date');
    const td = new Typed(dateEl);
    const d = new Date();
    const months = ['january','february','march','april','may','june','july',
                    'august','september','october','november','december'];
    const day = d.getDate();
    const monthName = months[d.getMonth()];
    await typeInto(td, `${day} ${monthName}, mmxxvi`, { base: 32 });
    td.closeHead();

    document.getElementById('skip').hidden = true;
    bumpRev();
  }

  // skip-to-settled: set SPEED=0 (instant), the in-flight pauses still resolve quickly
  document.getElementById('skip').addEventListener('click', () => {
    SPEED = 0;
    document.getElementById('skip').hidden = true;
  });

  // start
  run();

})();
