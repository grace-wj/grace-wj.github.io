// carillon — six FM bells, all synthesized in the browser. no audio file dependencies.

(() => {
  'use strict';

  let ctx = null;
  let masterGain = null;
  let convolverWet = null;
  let dryGain = null;
  let wetGain = null;
  let enabled = false;

  const proem = document.getElementById('proem');
  const enableBtn = document.getElementById('enable');
  const bellsRoot = document.getElementById('bells');
  const ropeBtn = document.getElementById('ropeBtn');
  const hourText = document.getElementById('hourText');

  const bells = Array.from(document.querySelectorAll('.bell'));

  // ——— audio setup —————————————————————————————————————

  function buildImpulse(durationSec, decay) {
    // a small synthesized impulse response — gentle stone-room reverb
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * durationSec);
    const ir = ctx.createBuffer(2, length, sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = ir.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const t = i / length;
        const env = Math.pow(1 - t, decay);
        // pinkish noise
        data[i] = (Math.random() * 2 - 1) * env * 0.6;
      }
      // a few early reflections
      const refls = [0.012, 0.027, 0.041, 0.063];
      for (const r of refls) {
        const idx = Math.floor(r * sampleRate);
        if (idx < length) data[idx] += (Math.random() * 0.3 + 0.6) * (ch === 0 ? 1 : -1);
      }
    }
    return ir;
  }

  function ensureCtx() {
    if (ctx) return ctx;
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    masterGain = ctx.createGain();
    masterGain.gain.value = 0.55;
    masterGain.connect(ctx.destination);

    // slight low-shelf trim to keep bottom from honking
    const trim = ctx.createBiquadFilter();
    trim.type = 'highpass';
    trim.frequency.value = 60;
    trim.Q.value = 0.6;
    trim.connect(masterGain);

    // wet/dry mix into a stone-room IR
    convolverWet = ctx.createConvolver();
    convolverWet.buffer = buildImpulse(2.6, 2.4);
    wetGain = ctx.createGain();
    wetGain.gain.value = 0.45;
    convolverWet.connect(wetGain).connect(trim);

    dryGain = ctx.createGain();
    dryGain.gain.value = 0.85;
    dryGain.connect(trim);

    return ctx;
  }

  // ——— FM bell strike —————————————————————————————————————

  // bell partials (relative to fundamental). Approximates a struck-metal bell:
  // hum, prime, tierce (minor third), quint, nominal, super-quint, octave-nominal.
  const PARTIALS = [
    { mult: 0.500, gain: 0.55, decay: 1.6 }, // hum (sub-octave)
    { mult: 1.000, gain: 1.00, decay: 1.0 }, // prime (fundamental)
    { mult: 1.190, gain: 0.45, decay: 0.9 }, // tierce (slightly flat minor third)
    { mult: 1.500, gain: 0.40, decay: 0.85 }, // quint
    { mult: 2.000, gain: 0.55, decay: 0.7 }, // nominal (octave above prime)
    { mult: 2.510, gain: 0.30, decay: 0.5 },
    { mult: 3.010, gain: 0.22, decay: 0.4 },
    { mult: 4.260, gain: 0.14, decay: 0.32 },
  ];

  function strikeBell({ fund, ratio, decay, modDecay, mass, vel }) {
    const now = ctx.currentTime;
    vel = vel == null ? 1 : vel;

    // per-strike sub-mixer
    const strikeOut = ctx.createGain();
    strikeOut.gain.value = 0.0;
    strikeOut.gain.setValueAtTime(0.0, now);
    strikeOut.gain.linearRampToValueAtTime(vel, now + 0.005);
    // overall taper from amplitude=vel down — partials decay at their own rates too
    strikeOut.gain.exponentialRampToValueAtTime(0.0001, now + decay + 0.4);

    // route through both wet and dry
    strikeOut.connect(dryGain);
    strikeOut.connect(convolverWet);

    // ——— attack: short noise burst (the strike itself) ———
    const noiseLen = Math.floor(ctx.sampleRate * 0.06);
    const nbuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
    const nd = nbuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
      const t = i / noiseLen;
      nd[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = nbuf;
    const noiseFilt = ctx.createBiquadFilter();
    noiseFilt.type = 'bandpass';
    noiseFilt.frequency.value = fund * 4.5;
    noiseFilt.Q.value = 1.6;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.16 * vel;
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    noise.connect(noiseFilt).connect(noiseGain).connect(strikeOut);
    noise.start(now);
    noise.stop(now + 0.2);

    // ——— each partial: an FM voice ———
    PARTIALS.forEach((p, i) => {
      const carrierFreq = fund * p.mult;
      if (carrierFreq < 25 || carrierFreq > 12000) return;

      // carrier
      const car = ctx.createOscillator();
      car.type = 'sine';
      car.frequency.value = carrierFreq;

      // modulator
      const mod = ctx.createOscillator();
      mod.type = 'sine';
      mod.frequency.value = carrierFreq * ratio;

      // modulator depth (drives FM index)
      const modDepth = ctx.createGain();
      const peakDepth = carrierFreq * (1.6 + 1.2 / (i + 1)) * vel;
      modDepth.gain.value = peakDepth;
      // modulator depth dies fast — gives the metallic "ping" then tone
      modDepth.gain.setValueAtTime(peakDepth, now);
      modDepth.gain.exponentialRampToValueAtTime(0.001, now + modDecay * (1 + i * 0.04));

      mod.connect(modDepth).connect(car.frequency);

      // partial gain envelope
      const partialDecay = decay * p.decay;
      const partialPeak = p.gain * vel * (0.85 - i * 0.02);
      const pg = ctx.createGain();
      pg.gain.value = 0;
      pg.gain.setValueAtTime(0, now);
      pg.gain.linearRampToValueAtTime(partialPeak, now + 0.004 + i * 0.0008);
      pg.gain.exponentialRampToValueAtTime(0.0001, now + partialDecay);

      // very slight detune for movement
      const detune = (Math.random() * 2 - 1) * 1.4;
      car.detune.value = detune;

      car.connect(pg).connect(strikeOut);

      car.start(now);
      mod.start(now);
      car.stop(now + partialDecay + 0.2);
      mod.stop(now + partialDecay + 0.2);
    });

    return decay;
  }

  // ——— UI hookups ——————————————————————————————————————

  function ensureEnabled() {
    if (enabled) return Promise.resolve();
    ensureCtx();
    if (ctx.state === 'suspended') {
      return ctx.resume().then(() => {
        enabled = true;
        if (proem) {
          proem.innerHTML = 'six bells. <span class="ital">strike one to begin.</span>';
        }
      });
    }
    enabled = true;
    if (proem) proem.innerHTML = 'six bells. <span class="ital">strike one to begin.</span>';
    return Promise.resolve();
  }

  function ringBellEl(btn, vel = 1) {
    const data = btn.dataset;
    const params = {
      fund: parseFloat(data.fund),
      ratio: parseFloat(data.ratio),
      decay: parseFloat(data.decay),
      modDecay: parseFloat(data.modDecay),
      mass: parseFloat(data.mass) || 1,
      vel,
    };

    ensureEnabled().then(() => {
      strikeBell(params);
    });

    // visual swing — heavier bells swing slower & farther
    const peak = Math.min(16, 7 + 6 / params.mass);
    const dur = 1.1 + params.mass * 0.5;
    btn.style.setProperty('--peak', peak + 'deg');
    btn.style.setProperty('--swing-dur', dur.toFixed(2) + 's');

    btn.classList.remove('is-ringing');
    // force reflow for animation restart
    void btn.offsetWidth;
    btn.classList.add('is-ringing');
    clearTimeout(btn._ringTimer);
    btn._ringTimer = setTimeout(() => {
      btn.classList.remove('is-ringing');
    }, dur * 1000 + 80);
  }

  bells.forEach((btn) => {
    btn.addEventListener('click', () => ringBellEl(btn));
  });

  // keyboard: a s d f g h ring bells; r rings all six in sequence; space tolls tenor
  const keymap = { a: 0, s: 1, d: 2, f: 3, g: 4, h: 5 };

  window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    const k = e.key.toLowerCase();
    if (k in keymap) {
      e.preventDefault();
      const idx = keymap[k];
      if (bells[idx]) ringBellEl(bells[idx]);
    } else if (k === 'r') {
      e.preventDefault();
      peal();
    } else if (k === ' ') {
      e.preventDefault();
      tollTenor(true);
    }
  });

  if (enableBtn) {
    enableBtn.addEventListener('click', () => {
      ensureEnabled().then(() => {
        enableBtn.setAttribute('hidden', '');
        // a discrete welcome strike on the highest bell
        if (bells[0]) ringBellEl(bells[0], 0.6);
      });
    });
  }

  // peal — the six bells in sequence
  function peal() {
    let t = 0;
    bells.forEach((btn, i) => {
      setTimeout(() => ringBellEl(btn, 0.85), t);
      t += 360;
    });
  }

  // ——— tenor (the seventh bell, or rather the deepest) ——————————————————————————

  function tollTenor(byUser) {
    const now = ctx ? ctx.currentTime : 0;
    if (ropeBtn) {
      ropeBtn.classList.remove('is-pulled');
      void ropeBtn.offsetWidth;
      ropeBtn.classList.add('is-pulled');
      setTimeout(() => ropeBtn.classList.remove('is-pulled'), 1300);
    }
    ensureEnabled().then(() => {
      strikeBell({ fund: 87.31, ratio: 1.86, decay: 14, modDecay: 0.42, mass: 2.2, vel: byUser ? 1.0 : 0.7 });
    });
    if (hourText) {
      const d = new Date();
      const hh = ((d.getHours() + 11) % 12) + 1;
      const mm = String(d.getMinutes()).padStart(2, '0');
      hourText.innerHTML = byUser
        ? `the tenor tolls. <strong>${hh}:${mm}</strong>.`
        : `the quarter passes. <strong>${hh}:${mm}</strong>.`;
    }
  }

  if (ropeBtn) ropeBtn.addEventListener('click', () => tollTenor(true));

  // automatic toll on the quarter hour, but only after the user has interacted (so we never auto-play with sound)
  function scheduleQuarter() {
    const now = new Date();
    const ms = now.getMilliseconds();
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const minutesToNextQuarter = 15 - (min % 15);
    const wait = ((minutesToNextQuarter * 60) - sec) * 1000 - ms;
    setTimeout(() => {
      if (enabled) tollTenor(false);
      scheduleQuarter();
    }, Math.max(1000, wait));
  }

  // gate quarter-tolling on first user audio
  let scheduled = false;
  document.addEventListener('click', () => {
    if (!scheduled) {
      scheduled = true;
      scheduleQuarter();
    }
  }, { once: false });

})();
