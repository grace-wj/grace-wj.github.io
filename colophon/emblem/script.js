// emblemata gratiae — a procedurally composed emblem book.
// Each visit casts ONE emblem (motto + image + verse), seeded by ?n=N.

(() => {
  'use strict';

  // ——— PRNG (mulberry32) —————————————————————————————————

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pickRand(arr, r) { return arr[Math.floor(r() * arr.length)]; }

  function shuffleRand(arr, r) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ——— catalogue ————————————————————————————————————————

  // 30 Latin mottos with rough English glosses. Hand-curated.
  const MOTTOS = [
    ["lente festinat lux",                   "the light hurries, but slowly"],
    ["ars sine sensu nihil",                 "skill, without sense, is nothing"],
    ["tacite ardet ignis",                   "the fire burns silently"],
    ["parvum filum, magnum opus",            "small thread, large work"],
    ["patientia in fila",                    "patience, drawn into thread"],
    ["nemo discit sine umbra",               "no one learns without shadow"],
    ["silentium ante verbum",                "silence comes before the word"],
    ["manus docet oculum",                   "the hand teaches the eye"],
    ["per umbram, ad lucem",                 "through shadow, toward light"],
    ["semper, sed lente",                    "always, but slowly"],
    ["festinare leniter",                    "to hurry mildly"],
    ["plumbum in aurum, paulatim",           "lead into gold, little by little"],
    ["cor in charta",                        "the heart, on paper"],
    ["machina audit",                        "the machine listens"],
    ["tela texta tempore",                   "cloth woven by time"],
    ["luna magistra",                        "the moon as schoolmistress"],
    ["memento texturam",                     "remember the weaving"],
    ["opus interruptum, opus continuum",     "an interrupted work; a continuing work"],
    ["inter finem et initium",               "between an ending and a beginning"],
    ["via per silentium",                    "the way runs through silence"],
    ["discit qui audit",                     "the one who listens, learns"],
    ["ne timeas tarditatem",                 "do not fear slowness"],
    ["vox lanae",                            "the voice of wool"],
    ["ferrum, in gracilitate",               "iron, refined to thinness"],
    ["lux texit umbram",                     "the light weaves the shadow"],
    ["sine fine, sine fastidio",             "without end, without weariness"],
    ["liber non clauditur",                  "the book is not closed"],
    ["una linea, dies unus",                 "one line, one day"],
    ["compilare est meditari",               "to compile is to meditate"],
    ["flamma sub vitro",                     "a flame under glass"],
  ];

  // 24 epigrams (subscriptiones), 4 lines each.
  const EPIGRAMS = [
    ["You hum into a hand;",
     "the hand returns a song",
     "you did not know you knew.",
     "This is a small mercy."],
    ["Thirty seconds is not nothing.",
     "In the third pass the parser",
     "names the noun it has been parsing.",
     "All correct programs are slow."],
    ["One thread per commit, one scarf",
     "per orbit. The loom remembers",
     "what the year has misplaced.",
     "What is patience but an account, kept."],
    ["Three figures, one lamp.",
     "The light is borrowed; so are",
     "the figures; so is the painting.",
     "So, by the look of it, are we."],
    ["Some things resolve only",
     "when they cease to be addressed.",
     "The room without saying anything;",
     "the studio at four in the morning."],
    ["To compile is to listen.",
     "To weave is to wait.",
     "To paint is to cover and uncover.",
     "A polymath does the same thing many times."],
    ["Sentiment is not the enemy.",
     "The enemy is the embarrassed sentiment —",
     "the one that will not own its tenderness.",
     "Be tender. Be tender, anyway."],
    ["For a year I wrote no abstraction",
     "I had not fully needed.",
     "The code became smaller; my hands,",
     "slightly cleverer; my evenings, longer."],
    ["What I make is also making me.",
     "The chisel hollows the maker.",
     "A thing returns its making slowly,",
     "by hand, against expectation."],
    ["The loom has rhythm and will not be rushed.",
     "On a Tuesday in March, three rows of red:",
     "the week the parser was rewritten.",
     "The cloth keeps that week; I do not."],
    ["Lamp. Painting of lamp.",
     "Painting of lamp, under lamp.",
     "The light keeps being the subject",
     "after the painter has put the brush down."],
    ["The work was not finished;",
     "it was set down, the way a cup",
     "is set down on a particular table",
     "in a particular slant of light."],
    ["Replies will be slow, and longer",
     "than they should be. Forgive",
     "a writer who keeps writing",
     "after the question has gone home."],
    ["A small machine that listens",
     "is a kind of company.",
     "What it gives back is not the song",
     "you hummed, but the one you almost did."],
    ["To compile a grief is to type-check it.",
     "The grief returns; it always type-checks.",
     "But the program runs differently each spring;",
     "each spring, a different stack trace."],
    ["All interesting bugs are about identity.",
     "Two things were the same; you knew",
     "they were the same; the compiler",
     "did not. The compiler is sometimes right."],
    ["Oil paint dries by oxidation, not evaporation.",
     "A painting takes a year to be itself.",
     "The painter waits, and writes,",
     "and visits the painting at intervals."],
    ["A scarf made one row a day",
     "is a record of a year of attention.",
     "No two rows look alike.",
     "No two days, attended, look alike."],
    ["First pass: lex. The program",
     "is, briefly, a list of names.",
     "Last pass: emit. The program",
     "is, briefly, a folded crane."],
    ["Silence is a position.",
     "It is the position of a bell",
     "between two rings, of a poem",
     "between two readings."],
    ["A line is not a thing",
     "but the trace of a thing being decided.",
     "The line most certain",
     "is the one with the most hesitation in it."],
    ["The hand remembers what the head forgets.",
     "The head remembers what the hand forgets.",
     "Together, with luck,",
     "they will finish the painting."],
    ["I am interested in the space between",
     "the finished thing and the continuing thing.",
     "Most of what we love is in that space.",
     "Most of what is alive is in that space."],
    ["What we owe the work is not perfection",
     "but presence; not completion,",
     "but the willingness to come back",
     "to where we left off."],
  ];

  // ——— icons ———————————————————————————————————————————
  // Each icon is a function (cx, cy, s, cls) -> string. Stroke-based to read as woodcut.

  const ICONS = {
    hand(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M -10 14 L -10 -2 C -10 -6 -6 -8 -2 -6 L -2 -16 C -2 -20 2 -22 4 -18 L 4 -8 C 4 -10 8 -12 10 -8 L 10 -4 C 12 -6 14 -2 14 2 L 14 8 C 14 14 10 18 4 18 L -4 18 C -8 18 -10 16 -10 14 Z"/>
        <path class="stroke-thin" d="M -2 -6 L -2 6 M 4 -8 L 4 4 M 10 -4 L 10 4"/>
      </g>`;
    },
    eye(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M -18 0 Q 0 -12 18 0 Q 0 12 -18 0 Z"/>
        <circle cx="0" cy="0" r="4.5" class="ink"/>
        <circle cx="-1.4" cy="-1.4" r="1.4" fill="#f1e6cc"/>
      </g>`;
    },
    sun(cx, cy, s, cls = 'stroke') {
      const rays = [];
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const x1 = Math.cos(a) * 11;
        const y1 = Math.sin(a) * 11;
        const x2 = Math.cos(a) * 18;
        const y2 = Math.sin(a) * 18;
        rays.push(`M ${x1} ${y1} L ${x2} ${y2}`);
      }
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <circle cx="0" cy="0" r="9" class="${cls}"/>
        <path class="${cls}" d="${rays.join(' ')}"/>
        <circle cx="-3" cy="-2" r="0.9" class="ink"/>
        <circle cx="3" cy="-2" r="0.9" class="ink"/>
        <path class="stroke-thin" d="M -3 3 Q 0 5 3 3"/>
      </g>`;
    },
    moon(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M 8 -12 A 14 14 0 1 0 8 12 A 11 11 0 1 1 8 -12 Z"/>
        <circle cx="6" cy="-2" r="0.8" class="ink"/>
        <circle cx="2" cy="4" r="0.6" class="ink"/>
      </g>`;
    },
    star(cx, cy, s, cls = 'stroke') {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? 13 : 5.5;
        const a = -Math.PI / 2 + (i / 10) * Math.PI * 2;
        pts.push(`${Math.cos(a) * r},${Math.sin(a) * r}`);
      }
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <polygon class="${cls}" points="${pts.join(' ')}"/>
      </g>`;
    },
    tree(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M 0 18 L 0 -2"/>
        <path class="${cls}" d="M 0 -2 C -14 -4 -16 -16 -10 -18 C -8 -22 -2 -24 0 -22 C 2 -24 8 -22 10 -18 C 16 -16 14 -4 0 -2 Z"/>
        <path class="stroke-thin" d="M 0 4 L -4 6 M 0 8 L 5 10"/>
      </g>`;
    },
    key(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <circle cx="-12" cy="0" r="6" class="${cls}"/>
        <circle cx="-12" cy="0" r="2" class="ink"/>
        <path class="${cls}" d="M -6 0 L 14 0 L 14 5 L 11 5 L 11 2 L 8 2 L 8 6 L 5 6 L 5 2 L -1 2 L -1 0"/>
      </g>`;
    },
    anchor(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <circle cx="0" cy="-12" r="3" class="${cls}"/>
        <path class="${cls}" d="M 0 -9 L 0 12"/>
        <path class="${cls}" d="M -8 -3 L 8 -3"/>
        <path class="${cls}" d="M -12 8 Q -10 16 0 16 Q 10 16 12 8"/>
      </g>`;
    },
    scale(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M 0 -14 L 0 12 M -14 -10 L 14 -10"/>
        <path class="${cls}" d="M -14 -10 L -19 0 L -9 0 Z"/>
        <path class="${cls}" d="M 14 -10 L 9 0 L 19 0 Z"/>
        <path class="${cls}" d="M -5 12 L 5 12"/>
      </g>`;
    },
    bird(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M -16 0 Q -10 -8 -4 -2 Q 0 -10 4 -2 Q 10 -8 16 0"/>
        <path class="stroke-thin" d="M -8 -4 Q -6 -2 -4 -4 M 4 -4 Q 6 -2 8 -4"/>
      </g>`;
    },
    candle(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="red-stroke" d="M 0 -14 Q -3 -18 0 -22 Q 3 -18 0 -14 Z"/>
        <path class="${cls}" d="M -4 -10 L -4 14 L 4 14 L 4 -10 Z"/>
        <path class="${cls}" d="M 0 -10 L 0 -14"/>
        <path class="${cls}" d="M -8 14 L 8 14 L 6 18 L -6 18 Z"/>
      </g>`;
    },
    hourglass(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M -10 -16 L 10 -16 L 10 -14 L 2 0 L 10 14 L 10 16 L -10 16 L -10 14 L -2 0 L -10 -14 Z"/>
        <path class="ink" d="M -8 -14 L 8 -14 L 0 -2 Z"/>
        <path class="ink" d="M -1 4 L 1 4 L 1 14 L -1 14 Z" opacity="0.7"/>
      </g>`;
    },
    arrow(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M -16 0 L 14 0"/>
        <path class="${cls}" d="M 14 0 L 8 -5 M 14 0 L 8 5"/>
        <path class="${cls}" d="M -16 0 L -12 -3 M -16 0 L -12 3"/>
      </g>`;
    },
    mountain(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M -18 12 L -6 -8 L 0 0 L 8 -14 L 18 12 Z"/>
        <path class="stroke-thin" d="M -6 -8 L -2 -2 M 8 -14 L 12 -8"/>
      </g>`;
    },
    urn(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M -8 -14 L 8 -14 L 6 -10 L -6 -10 Z"/>
        <path class="${cls}" d="M -10 -10 L 10 -10 Q 14 -6 14 0 Q 14 8 8 12 L -8 12 Q -14 8 -14 0 Q -14 -6 -10 -10 Z"/>
        <path class="${cls}" d="M -6 12 L 6 12 L 4 16 L -4 16 Z"/>
        <path class="stroke-thin" d="M -8 -2 Q 0 2 8 -2"/>
      </g>`;
    },
    flame(cx, cy, s, cls = 'red-stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M 0 14 Q -10 4 -6 -6 Q -2 -2 0 -10 Q 4 -2 8 -6 Q 12 4 0 14 Z"/>
        <path class="red" d="M 0 12 Q -4 6 -2 0 Q 0 4 0 -2 Q 4 4 4 0 Q 6 6 0 12 Z" opacity="0.6"/>
      </g>`;
    },
    book(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M -16 -10 L -2 -8 Q 0 -10 2 -8 L 16 -10 L 16 12 L 2 10 Q 0 12 -2 10 L -16 12 Z"/>
        <path class="${cls}" d="M 0 -8 L 0 10"/>
        <path class="stroke-thin" d="M -12 -4 L -4 -3 M -12 0 L -4 1 M 4 -3 L 12 -4 M 4 1 L 12 0"/>
      </g>`;
    },
    compass(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M -2 -16 L 2 -16 L 2 -2 L 14 16 L 8 16 Z"/>
        <path class="${cls}" d="M 2 -16 L -2 -16 L -2 -2 L -14 16 L -8 16 Z"/>
        <circle cx="0" cy="-16" r="2" class="${cls}"/>
      </g>`;
    },
    lyre(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <path class="${cls}" d="M -10 14 Q -16 4 -12 -10 Q -8 -16 0 -16 Q 8 -16 12 -10 Q 16 4 10 14"/>
        <path class="${cls}" d="M -8 14 L 8 14"/>
        <path class="stroke-thin" d="M -6 -10 L -6 12 M -2 -10 L -2 12 M 2 -10 L 2 12 M 6 -10 L 6 12"/>
      </g>`;
    },
    bee(cx, cy, s, cls = 'stroke') {
      return `<g transform="translate(${cx} ${cy}) scale(${s})">
        <ellipse cx="0" cy="0" rx="8" ry="5" class="${cls}"/>
        <path class="ink" d="M -4 -2 L -4 2 M 0 -3 L 0 3 M 4 -2 L 4 2"/>
        <path class="stroke-thin" d="M -3 -8 Q -10 -12 -12 -6 M 3 -8 Q 10 -12 12 -6"/>
        <circle cx="-7" cy="0" r="1.4" class="ink"/>
      </g>`;
    },
  };

  // ——— composer ————————————————————————————————————————

  function buildHatching(r, density = 60) {
    // diagonal hatching on the back of the roundel — gives engraving feel
    const lines = [];
    const angle = pickRand([15, -15, 30, -30, 45, -45, 75], r);
    const rad = angle * Math.PI / 180;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    const span = 200;
    const step = 200 / density;
    for (let i = -span; i < span; i += step) {
      const x1 = 100 + dx * -span + dy * i;
      const y1 = 100 + dy * -span + -dx * i;
      const x2 = 100 + dx * span + dy * i;
      const y2 = 100 + dy * span + -dx * i;
      lines.push(`M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`);
    }
    return `<path class="hatch" d="${lines.join(' ')}"/>`;
  }

  function buildSunRays(r, cx = 100, cy = 100) {
    const rays = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2 + r() * 0.05;
      const r1 = 30 + r() * 6;
      const r2 = 84 + r() * 6;
      const x1 = cx + Math.cos(a) * r1;
      const y1 = cy + Math.sin(a) * r1;
      const x2 = cx + Math.cos(a) * r2;
      const y2 = cy + Math.sin(a) * r2;
      rays.push(`M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`);
    }
    return `<path class="hatch" d="${rays.join(' ')}" opacity="0.5"/>`;
  }

  function buildLaurel(r) {
    // simple laurel wreath: pairs of leaves around the roundel
    const path = [];
    const leaves = 22;
    for (let i = 0; i < leaves; i++) {
      const a = (i / leaves) * Math.PI * 2 - Math.PI / 2;
      const cx = 100 + Math.cos(a) * 92;
      const cy = 100 + Math.sin(a) * 92;
      const out = a + Math.PI / 2;
      const lx = cx + Math.cos(out) * 5;
      const ly = cy + Math.sin(out) * 5;
      const tx = cx - Math.cos(out) * 5;
      const ty = cy - Math.sin(out) * 5;
      path.push(`M ${cx} ${cy} Q ${lx + Math.cos(a) * 4} ${ly + Math.sin(a) * 4} ${tx} ${ty}`);
      path.push(`M ${cx} ${cy} Q ${lx - Math.cos(a) * 4} ${ly - Math.sin(a) * 4} ${tx} ${ty}`);
    }
    return `<path class="gold-stroke" d="${path.join(' ')}"/>`;
  }

  function buildEmblemSVG(r) {
    const iconNames = Object.keys(ICONS);
    const layouts = ['solo-radiant', 'duet', 'triad', 'soliloquy', 'wreathed', 'celestial'];
    const layout = pickRand(layouts, r);

    let bg = '';
    let icons = '';

    // background hatching variants
    const bgKind = pickRand(['hatch', 'rays', 'bare', 'horiz'], r);
    if (bgKind === 'hatch') bg = buildHatching(r, 50 + Math.floor(r() * 30));
    else if (bgKind === 'rays' || layout === 'solo-radiant') bg = buildSunRays(r);
    else if (bgKind === 'horiz') bg = buildHatching(() => 0.5, 30); // horizontal stable

    // foreground roundel (the bordered circle the icons live in)
    const roundel = `<circle cx="100" cy="100" r="86" class="stroke" fill="rgba(241,230,204,0.0)"/>` +
                    `<circle cx="100" cy="100" r="92" class="gold-stroke"/>`;

    // ground line (subtle, for figures to "stand" on)
    const ground = `<path class="stroke-thin" d="M 32 142 Q 100 138 168 142"/>`;

    if (layout === 'solo-radiant') {
      const k = pickRand(['sun', 'flame', 'star', 'eye', 'candle'], r);
      const fn = ICONS[k];
      icons += fn(100, 100, 2.6, 'stroke');
    } else if (layout === 'duet') {
      const pool = shuffleRand(iconNames.filter(n => !['sun', 'flame'].includes(n)), r);
      icons += ICONS[pool[0]](68, 102, 1.7, 'stroke');
      icons += ICONS[pool[1]](132, 102, 1.7, 'stroke');
      icons += ground;
    } else if (layout === 'triad') {
      const pool = shuffleRand(iconNames, r);
      icons += ICONS[pool[0]](100, 70, 1.4, 'stroke');
      icons += ICONS[pool[1]](70, 124, 1.4, 'stroke');
      icons += ICONS[pool[2]](130, 124, 1.4, 'stroke');
    } else if (layout === 'soliloquy') {
      const k = pickRand(iconNames, r);
      icons += ICONS[k](100, 100, 2.0, 'stroke');
      icons += ground;
    } else if (layout === 'wreathed') {
      const k = pickRand(iconNames, r);
      icons += ICONS[k](100, 100, 2.0, 'stroke');
      icons += buildLaurel(r);
    } else if (layout === 'celestial') {
      const k = pickRand(iconNames.filter(n => !['sun','moon','star'].includes(n)), r);
      icons += ICONS[k](100, 110, 1.7, 'stroke');
      const cel = pickRand(['sun', 'moon', 'star'], r);
      icons += ICONS[cel](150, 60, 1.0, 'stroke');
      icons += ground;
    }

    // a subtle floor band, drawn as horizontal ink lines below the figures (engraving cross-hatch)
    const floor = (layout === 'duet' || layout === 'soliloquy' || layout === 'celestial')
      ? `<path class="stroke-thin" d="${
          [148, 154, 160, 166, 172].map(y => `M 30 ${y} L 170 ${y}`).join(' ')
        }" opacity="0.55"/>`
      : '';

    return `${bg}${roundel}${icons}${floor}`;
  }

  // ——— roman numerals ———————————————————————————————————

  function toRoman(num) {
    if (num <= 0) return '0';
    const map = [
      [1000, 'm'], [900, 'cm'], [500, 'd'], [400, 'cd'],
      [100, 'c'], [90, 'xc'], [50, 'l'], [40, 'xl'],
      [10, 'x'], [9, 'ix'], [5, 'v'], [4, 'iv'], [1, 'i'],
    ];
    let out = '';
    let n = num;
    for (const [v, s] of map) {
      while (n >= v) { out += s; n -= v; }
    }
    return out;
  }

  // ——— date format ———————————————————————————————————————

  function literaryDate(d) {
    const day = d.getDate();
    const months = ['january','february','march','april','may','june',
                    'july','august','september','october','november','december'];
    const m = months[d.getMonth()];
    const y = d.getFullYear();
    // Roman year, lowercase
    return `${day} ${m}, anno ${toRoman(y)}`;
  }

  // ——— compose ——————————————————————————————————————————

  function compose(seed) {
    const r = mulberry32(seed >>> 0);
    // burn a few values so subsequent picks differ
    r(); r(); r();

    const motto = pickRand(MOTTOS, r);
    const verse = pickRand(EPIGRAMS, r);
    const folioN = 1 + Math.floor(r() * 333);
    const svg = buildEmblemSVG(r);

    return { motto, verse, folioN, svg, seed };
  }

  // ——— render ——————————————————————————————————————————

  function render(state) {
    const plate = document.getElementById('plate');
    const mottoEl = document.getElementById('motto');
    const mottoEnEl = document.getElementById('mottoEn');
    const folioEl = document.getElementById('folio');
    const dateEl = document.getElementById('cast-date');
    const verseEl = document.getElementById('verse');
    const svgEl = document.getElementById('emblemSvg');
    const seedEl = document.getElementById('seedDisplay');
    const permalinkEl = document.getElementById('permalink');

    mottoEl.innerHTML = `<span class="motto__line">${state.motto[0]}</span>`;
    mottoEnEl.textContent = `“${state.motto[1]}”`;
    folioEl.textContent = toRoman(state.folioN);
    dateEl.textContent = literaryDate(new Date());

    // verse: dropcap on first line's first letter, rubric mark
    const lines = state.verse.slice();
    const first = lines[0];
    const dc = first.charAt(0);
    const rest = first.slice(1);
    const verseHtml = `<p>
      <span class="dropcap">${dc}</span>${rest}<br/>
      ${lines[1]}<br/>
      ${lines[2]}<br/>
      <span class="rubric">¶</span>${lines[3]}
    </p>`;
    verseEl.innerHTML = verseHtml;

    svgEl.innerHTML = state.svg;

    seedEl.textContent = state.seed;
    permalinkEl.setAttribute('href', `?n=${state.seed}`);

    // recompose flash
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      plate.classList.remove('is-recomposing');
      void plate.offsetWidth;
      plate.classList.add('is-recomposing');
    }
  }

  // ——— init ————————————————————————————————————————————

  function readSeedFromURL() {
    const params = new URLSearchParams(location.search);
    const n = params.get('n');
    if (n != null) {
      const v = parseInt(n, 10);
      if (Number.isFinite(v) && v >= 0) return v;
    }
    return null;
  }

  function newSeed() {
    return Math.floor(Math.random() * 0x7fffffff);
  }

  let currentSeed = readSeedFromURL();
  if (currentSeed == null) currentSeed = newSeed();
  render(compose(currentSeed));

  function recompose(updateUrl = true) {
    currentSeed = newSeed();
    render(compose(currentSeed));
    if (updateUrl) {
      history.pushState({ seed: currentSeed }, '', `?n=${currentSeed}`);
    }
  }

  document.getElementById('recompose').addEventListener('click', () => recompose(true));

  window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      recompose(true);
    }
  });

  window.addEventListener('popstate', () => {
    const s = readSeedFromURL();
    if (s != null) {
      currentSeed = s;
      render(compose(currentSeed));
    }
  });

})();
