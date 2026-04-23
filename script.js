// grace@wj — terminal portfolio
(() => {
  "use strict";

  // ---------- virtual filesystem ----------
  // dirs contain entries; files have content (string, lines[], or renderer function)
  const FS = {
    "~": {
      kind: "dir",
      entries: ["about.txt", "projects", "writing", "art", "contact.txt", ".secrets"],
    },
    "~/about.txt": {
      kind: "file",
      content: [
        "grace wei-li juan",
        "software engineer / polymath / visual artist",
        "",
        "i build systems that want to be read like essays, and",
        "essays that want to be executed like systems. currently",
        "oscillating between compilers, oil paint, and whatever",
        "book is open on the kitchen table.",
        "",
        "tip: try `ls projects/` or `cat writing/on-stillness.md`",
      ].join("\n"),
    },
    "~/contact.txt": {
      kind: "file",
      content: [
        "mail      <link mailto:grayswan795@gmail.com>grayswan795@gmail.com</link>",
        "github    <link https://github.com/grace-wj>github.com/grace-wj</link>",
        "elsewhere ask nicely",
      ].join("\n"),
    },
    "~/projects": {
      kind: "dir",
      entries: ["hum.md", "slowcompiler.md", "weft.md"],
    },
    "~/projects/hum.md": {
      kind: "file",
      content: [
        "# hum",
        "a pocket synthesizer for people who can't read music.",
        "input: your voice. output: a little song that knows you.",
        "rust + webaudio, ~4k lines.",
        "",
        "status: quiet beta, ~120 weekly users.",
      ].join("\n"),
    },
    "~/projects/slowcompiler.md": {
      kind: "file",
      content: [
        "# slowcompiler",
        "a compiler that deliberately takes 30 seconds to compile",
        "\"hello world.\" each stage prints a small haiku about what",
        "it's doing. an argument that developer tools could have",
        "moods.",
        "",
        "status: talk given at !!con 2024, repo archived.",
      ].join("\n"),
    },
    "~/projects/weft.md": {
      kind: "file",
      content: [
        "# weft",
        "a weaving loom driven by git commit history. every time",
        "i push, a thread gets tied. the loom finishes a scarf",
        "once a year.",
        "",
        "status: one scarf per year, indefinitely.",
      ].join("\n"),
    },
    "~/writing": {
      kind: "dir",
      entries: ["on-stillness.md", "notes-toward-a-theory-of-kitsch.md", "a-year-without-frameworks.md"],
    },
    "~/writing/on-stillness.md": {
      kind: "file",
      content: [
        "# on stillness",
        "",
        "there is a kind of software that sits still. it does one",
        "thing and does not grow. `cat`, `grep`, `make`. the unix",
        "utilities were finished before i was born. they work.",
        "",
        "most of what i build does not sit still. i want to learn",
        "how to stop.",
      ].join("\n"),
    },
    "~/writing/notes-toward-a-theory-of-kitsch.md": {
      kind: "file",
      content: [
        "# notes toward a theory of kitsch",
        "",
        "1. kitsch is the aesthetic of pre-digested feeling.",
        "2. a neural network is a kitsch machine if you squint.",
        "3. i'm interested in the opposite: art that asks you to",
        "   chew, that leaves something stuck in your teeth.",
      ].join("\n"),
    },
    "~/writing/a-year-without-frameworks.md": {
      kind: "file",
      content: [
        "# a year without frameworks",
        "",
        "i built every side project in plain html, css, and js",
        "for one full year. here is what broke. here is what i",
        "missed. here is what i stopped missing.",
      ].join("\n"),
    },
    "~/art": {
      kind: "dir",
      entries: ["sketch-01.svg", "sketch-02.svg", "sketch-03.svg"],
    },
    "~/.secrets": {
      kind: "dir",
      entries: ["readme.txt"],
    },
    "~/.secrets/readme.txt": {
      kind: "file",
      content: [
        "you found it. there's nothing here yet.",
        "try `sudo make coffee`.",
      ].join("\n"),
    },
  };

  // art files are SVGs rendered inline
  const ART = {
    "~/art/sketch-01.svg": {
      title: "three bodies orbiting a lamp (2024, ink)",
      svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#0b0f0a"/>
        <circle cx="200" cy="110" r="9" fill="#ffd166"/>
        <g fill="none" stroke="#9fefb6" stroke-width="1">
          <ellipse cx="200" cy="110" rx="60" ry="22"/>
          <ellipse cx="200" cy="110" rx="95" ry="40" transform="rotate(18 200 110)"/>
          <ellipse cx="200" cy="110" rx="140" ry="60" transform="rotate(-24 200 110)"/>
        </g>
        <circle cx="258" cy="116" r="3" fill="#ff7aa2"/>
        <circle cx="113" cy="95" r="3" fill="#7ec4ff"/>
        <circle cx="292" cy="138" r="3" fill="#9fefb6"/>
      </svg>`,
    },
    "~/art/sketch-02.svg": {
      title: "tide-chart for a city that doesn't exist (2025, gouache)",
      svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#0b0f0a"/>
        <g fill="none" stroke="#7ec4ff" stroke-width="1.2">
          <path d="M0 150 Q50 110 100 150 T200 150 T300 150 T400 150"/>
          <path d="M0 170 Q50 140 100 170 T200 170 T300 170 T400 170" opacity="0.7"/>
          <path d="M0 130 Q50 90 100 130 T200 130 T300 130 T400 130" opacity="0.5"/>
        </g>
        <g fill="#ffd166">
          <circle cx="80" cy="60" r="2"/>
          <circle cx="150" cy="40" r="2"/>
          <circle cx="230" cy="70" r="2"/>
          <circle cx="320" cy="55" r="2"/>
        </g>
        <text x="10" y="20" fill="#4a7a58" font-family="monospace" font-size="10">harbor — 03:14</text>
      </svg>`,
    },
    "~/art/sketch-03.svg": {
      title: "a portrait of my compiler (2024, oil on panel)",
      svg: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="260" fill="#0b0f0a"/>
        <g fill="none" stroke="#ff7aa2" stroke-width="1">
          <rect x="80" y="40" width="240" height="180" rx="6"/>
          <line x1="80" y1="70" x2="320" y2="70"/>
          <circle cx="95" cy="55" r="3"/>
          <circle cx="108" cy="55" r="3"/>
          <circle cx="121" cy="55" r="3"/>
        </g>
        <g font-family="monospace" font-size="10" fill="#9fefb6">
          <text x="95" y="95">parse(stars) {</text>
          <text x="110" y="112">  const grief = tokens();</text>
          <text x="110" y="129">  return grief.map(soften);</text>
          <text x="95" y="146">}</text>
          <text x="95" y="176" fill="#ffd166">// i love you</text>
          <text x="95" y="194" fill="#4a7a58">// exit 0</text>
        </g>
      </svg>`,
    },
  };

  // ---------- state ----------
  let cwd = "~";
  const history = [];
  const historyEl = document.getElementById("history");
  const input = document.getElementById("input");
  const form = document.getElementById("form");
  const pathEl = document.getElementById("path");
  const motdEl = document.getElementById("motd");
  const cursor = document.getElementById("cursor");
  const cmdHistory = [];
  let cmdIdx = -1;

  // ---------- helpers ----------
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // format: supports <link href>text</link> and a limited set of spans
  function renderInline(s) {
    // escape first
    let out = esc(s);
    // link syntax: &lt;link url&gt;text&lt;/link&gt;
    out = out.replace(/&lt;link ([^&]+?)&gt;(.*?)&lt;\/link&gt;/g, (_, href, text) => {
      const safeHref = href.replace(/"/g, "");
      return `<a class="link" target="_blank" rel="noopener" href="${safeHref}">${text}</a>`;
    });
    return out;
  }

  function println(html, cls = "") {
    const div = document.createElement("div");
    div.className = `out ${cls}`.trim();
    div.innerHTML = html;
    historyEl.appendChild(div);
    return div;
  }

  function echo(cmd) {
    const div = document.createElement("div");
    div.className = "out echo";
    div.innerHTML = `<span class="prompt">grace@wj<span class="sep">:</span><span class="path">${esc(cwd)}</span><span class="dollar">$</span>&nbsp;</span>${esc(cmd)}`;
    historyEl.appendChild(div);
  }

  function scroll() {
    requestAnimationFrame(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    });
  }

  function resolve(path) {
    if (!path || path === ".") return cwd;
    if (path === "~" || path === "/") return "~";
    if (path === "..") {
      if (cwd === "~") return "~";
      return cwd.split("/").slice(0, -1).join("/") || "~";
    }
    if (path.startsWith("~/")) return path.replace(/\/$/, "");
    if (path.startsWith("/")) return "~" + path.replace(/\/$/, "");
    const joined = cwd === "~" ? `~/${path}` : `${cwd}/${path}`;
    return joined.replace(/\/$/, "");
  }

  function exists(p) { return !!FS[p] || !!ART[p]; }

  // ---------- commands ----------
  const COMMANDS = {
    help() {
      return [
        "commands:",
        "  <exe>help</exe>                show this",
        "  <exe>ls</exe> [path]           list directory",
        "  <exe>cd</exe> [path]           change directory (~ to go home)",
        "  <exe>cat</exe> &lt;file&gt;          read a file",
        "  <exe>display</exe> &lt;file&gt;      render an art file",
        "  <exe>whoami</exe>              who is this for",
        "  <exe>tree</exe>                visualize the filesystem",
        "  <exe>pwd</exe>                 print working directory",
        "  <exe>clear</exe>               wipe the screen",
        "  <exe>sudo</exe> &lt;cmd&gt;          try to do something elevated",
        "  <exe>exit</exe>                there is no exit",
        "",
        "tip: click any <link #>blue</link> word in output to run it.",
      ].map(styleInline).join("\n");
    },
    whoami() {
      return catFile("~/about.txt");
    },
    pwd() { return cwd; },
    clear() { historyEl.innerHTML = ""; return null; },
    ls(arg) {
      const target = resolve(arg);
      const node = FS[target];
      if (!node) return { err: `ls: ${arg || target}: no such file or directory` };
      if (node.kind !== "dir") return target.split("/").pop();
      return node.entries
        .map((e) => {
          const child = `${target === "~" ? "~" : target}/${e}`;
          if (FS[child]?.kind === "dir") return `<a class="link dir" data-cmd="cd ${child}">${e}/</a>`;
          if (ART[child]) return `<a class="link exe" data-cmd="display ${child}">${e}</a>`;
          return `<a class="link" data-cmd="cat ${child}">${e}</a>`;
        })
        .join("  ");
    },
    cd(arg) {
      const target = resolve(arg || "~");
      if (!FS[target]) return { err: `cd: ${arg}: no such directory` };
      if (FS[target].kind !== "dir") return { err: `cd: ${arg}: not a directory` };
      cwd = target;
      pathEl.textContent = cwd;
      return null;
    },
    cat(arg) {
      if (!arg) return { err: "cat: missing operand" };
      const target = resolve(arg);
      if (ART[target]) return { err: `cat: ${arg}: is art (try \`display ${arg}\`)` };
      return catFile(target, arg);
    },
    display(arg) {
      if (!arg) return { err: "display: missing operand" };
      const target = resolve(arg);
      const art = ART[target];
      if (!art) return { err: `display: ${arg}: not found (hint: ls art/)` };
      return {
        raw: `<span class="art-frame">${art.svg}<span class="art-caption">${esc(art.title)}</span></span>`,
      };
    },
    tree() {
      const lines = ["~"];
      const dirs = Object.keys(FS).filter((k) => FS[k].kind === "dir").sort();
      const childrenOf = (p) => {
        const node = FS[p];
        if (!node || node.kind !== "dir") return [];
        return node.entries.map((e) => (p === "~" ? `~/${e}` : `${p}/${e}`));
      };
      const walk = (path, prefix) => {
        const kids = childrenOf(path);
        kids.forEach((k, i) => {
          const last = i === kids.length - 1;
          const name = k.split("/").pop();
          const isDir = FS[k]?.kind === "dir";
          const isArt = ART[k];
          const styled = isDir
            ? `<a class="link dir" data-cmd="cd ${k}">${name}/</a>`
            : isArt
              ? `<a class="link exe" data-cmd="display ${k}">${name}</a>`
              : `<a class="link" data-cmd="cat ${k}">${name}</a>`;
          lines.push(`${prefix}${last ? "└── " : "├── "}${styled}`);
          if (isDir) walk(k, prefix + (last ? "    " : "│   "));
        });
      };
      walk("~", "");
      return lines.join("\n");
    },
    sudo(arg) {
      if (!arg) return { err: "sudo: usage: sudo <command>" };
      if (/make\s+coffee/.test(arg)) {
        return { raw: '<span class="ok">☕ coffee.service started. this will take exactly as long as it takes.</span>' };
      }
      if (/make\s+art/.test(arg)) {
        return { raw: '<span class="ok">art is already in progress. see `ls art/`.</span>' };
      }
      return { err: `sudo: ${arg}: permission denied (nice try)` };
    },
    exit() {
      return { raw: '<span class="err">exit: cannot leave. this site has no door, only rooms.</span>' };
    },
    man(arg) {
      if (!arg) return { err: "what manual page do you want?" };
      if (COMMANDS[arg]) return `NAME\n    ${arg}\n\nDESCRIPTION\n    look it up: \`help\`.`;
      return { err: `no manual entry for ${arg}` };
    },
  };

  // aliases
  const ALIAS = {
    dir: "ls", type: "cat", quit: "exit", logout: "exit", view: "display", open: "display",
    "..": "cd ..", home: "cd ~",
  };

  function catFile(path, displayName) {
    const f = FS[path];
    if (!f) return { err: `cat: ${displayName || path}: no such file` };
    if (f.kind !== "file") return { err: `cat: ${displayName || path}: is a directory` };
    return f.content;
  }

  // style inline <exe>...</exe> tokens in help text
  function styleInline(s) {
    return s
      .replace(/<exe>([^<]+)<\/exe>/g, '<span class="exe">$1</span>');
  }

  // ---------- command dispatch ----------
  function dispatch(line) {
    const trimmed = line.trim();
    if (!trimmed) return;
    echo(line);
    cmdHistory.unshift(trimmed);
    cmdIdx = -1;

    // alias expansion (whole command)
    let raw = trimmed;
    if (ALIAS[raw]) raw = ALIAS[raw];
    if (ALIAS[raw.split(/\s+/)[0]]) raw = ALIAS[raw.split(/\s+/)[0]] + raw.slice(raw.split(/\s+/)[0].length);

    const [cmd, ...rest] = raw.split(/\s+/);
    const arg = rest.join(" ");

    const fn = COMMANDS[cmd];
    if (!fn) {
      println(`<span class="err">${esc(cmd)}: command not found. try <a class="link" data-cmd="help">help</a>.</span>`);
      return;
    }
    const out = fn(arg);
    if (out === null || out === undefined) return;
    if (typeof out === "string") {
      // allow pre-styled link anchors with data-cmd
      println(renderOutput(out));
      return;
    }
    if (typeof out === "object") {
      if (out.err) println(`<span class="err">${esc(out.err)}</span>`);
      else if (out.raw) println(out.raw);
    }
  }

  // renderOutput: accepts strings that may contain our anchor/link markup produced by commands,
  // plus our custom <link href>text</link> syntax used in file contents.
  function renderOutput(s) {
    s = s.replace(/<link ([^>]+)>([\s\S]*?)<\/link>/g, (_, href, text) => {
      const safeHref = String(href).replace(/"/g, "").trim();
      return `<a class="link" target="_blank" rel="noopener" href="${safeHref}">${text}</a>`;
    });
    return s.replace(/\n/g, "<br>");
  }

  // ---------- input handling ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const line = input.value;
    input.value = "";
    dispatch(line);
    positionCursor();
    scroll();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      cmdIdx = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      input.value = cmdHistory[cmdIdx];
      setTimeout(positionCursor, 0);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cmdIdx = Math.max(cmdIdx - 1, -1);
      input.value = cmdIdx === -1 ? "" : cmdHistory[cmdIdx];
      setTimeout(positionCursor, 0);
    } else if (e.key === "Tab") {
      e.preventDefault();
      completeTab();
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      historyEl.innerHTML = "";
    }
  });

  input.addEventListener("input", positionCursor);

  function completeTab() {
    const val = input.value;
    const parts = val.split(/\s+/);
    if (parts.length === 1) {
      // complete command
      const matches = Object.keys(COMMANDS).filter((k) => k.startsWith(parts[0]));
      if (matches.length === 1) input.value = matches[0] + " ";
      else if (matches.length > 1) {
        println(matches.join("  "));
        scroll();
      }
    } else {
      // complete path within cwd
      const prefix = parts[parts.length - 1];
      const target = resolve(prefix.includes("/") ? prefix.split("/").slice(0, -1).join("/") || "~" : ".");
      const base = prefix.includes("/") ? prefix.split("/").pop() : prefix;
      const dir = FS[target];
      if (dir?.kind === "dir") {
        const matches = dir.entries.filter((e) => e.startsWith(base));
        if (matches.length === 1) {
          const before = parts.slice(0, -1).join(" ");
          const head = prefix.includes("/") ? prefix.split("/").slice(0, -1).join("/") + "/" : "";
          input.value = `${before} ${head}${matches[0]}${FS[`${target}/${matches[0]}`]?.kind === "dir" ? "/" : ""}`;
        } else if (matches.length > 1) {
          println(matches.join("  "));
          scroll();
        }
      }
    }
    positionCursor();
  }

  // cursor positioning (follow caret)
  function positionCursor() {
    // render cursor just after the input text width
    // measure by cloning the input's text into a hidden span
    const measurer = getMeasurer();
    measurer.textContent = input.value || "";
    const w = measurer.getBoundingClientRect().width;
    // account for prompt width
    const promptEl = form.querySelector(".prompt");
    const promptW = promptEl.getBoundingClientRect().width;
    cursor.style.left = `calc(${promptW + w}px)`;
  }
  let _measurer;
  function getMeasurer() {
    if (_measurer) return _measurer;
    _measurer = document.createElement("span");
    _measurer.style.cssText = "position:absolute;visibility:hidden;white-space:pre;font-family:inherit;font-size:inherit;";
    form.appendChild(_measurer);
    return _measurer;
  }

  // clickable links in output
  historyEl.addEventListener("click", (e) => {
    const a = e.target.closest("a.link[data-cmd]");
    if (!a) return;
    e.preventDefault();
    const cmd = a.getAttribute("data-cmd");
    input.value = cmd;
    form.dispatchEvent(new Event("submit", { cancelable: true }));
  });

  // keep focus on input
  document.addEventListener("click", (e) => {
    if (e.target.closest("a")) return; // allow link clicks
    if (window.getSelection().toString()) return; // allow text selection
    input.focus();
  });

  // ---------- motd ----------
  const MOTD_LINES = [
    '<span class="dim">╭──────────────────────────────────────────────╮</span>',
    '<span class="dim">│</span>  <span class="hl">grace@wj</span>  —  it is <span id="clock"></span>             <span class="dim">│</span>',
    '<span class="dim">│</span>  software engineer · polymath · visual artist  <span class="dim">│</span>',
    '<span class="dim">╰──────────────────────────────────────────────╯</span>',
    "",
    "you are in a terminal. this is the whole site.",
    'type <span class="hl">help</span> for commands, or click the <a class="link" data-cmd="ls">ls</a>·<a class="link" data-cmd="tree">tree</a>·<a class="link" data-cmd="whoami">whoami</a> words.',
  ];
  motdEl.innerHTML = MOTD_LINES.join("\n");
  // keep clickable motd
  motdEl.addEventListener("click", (e) => {
    const a = e.target.closest("a.link[data-cmd]");
    if (!a) return;
    e.preventDefault();
    const cmd = a.getAttribute("data-cmd");
    input.value = cmd;
    form.dispatchEvent(new Event("submit", { cancelable: true }));
  });

  function tickClock() {
    const el = document.getElementById("clock");
    if (!el) return;
    const now = new Date();
    el.textContent = now.toTimeString().slice(0, 8);
  }
  tickClock();
  setInterval(tickClock, 1000);

  // initial focus
  input.focus();
  positionCursor();

  // hidden easter eggs
  COMMANDS.coffee = () => ({ raw: '<span class="ok">☕</span>' });
  COMMANDS.hello = () => "hi.";
  COMMANDS.hi = () => "hello.";
  COMMANDS.about = () => catFile("~/about.txt");
})();
