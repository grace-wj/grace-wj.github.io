// grace — marginalia: illuminated manuscript interactions
(() => {
  "use strict";

  const body = document.getElementById("body");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");

  // hover/click a footnote superscript → highlight the matching gloss in the margin
  body.addEventListener("mouseover", (e) => {
    const fn = e.target.closest("sup.fn");
    if (fn) highlightGloss(fn.dataset.fn, true);
    const nt = e.target.closest(".note");
    if (nt) highlightGloss(nt.dataset.note, true);
  });
  body.addEventListener("mouseout", (e) => {
    const fn = e.target.closest("sup.fn");
    if (fn) highlightGloss(fn.dataset.fn, false);
    const nt = e.target.closest(".note");
    if (nt) highlightGloss(nt.dataset.note, false);
  });

  // click a footnote / note → scroll its gloss into view on small screens, otherwise just pulse
  body.addEventListener("click", (e) => {
    const fn = e.target.closest("sup.fn");
    const nt = e.target.closest(".note");
    if (fn) {
      const el = document.getElementById(fn.dataset.fn);
      if (el) { el.scrollIntoView({ block: "center", behavior: "smooth" }); pulse(el); }
    } else if (nt) {
      const el = document.getElementById(nt.dataset.note);
      if (el) { el.scrollIntoView({ block: "center", behavior: "smooth" }); pulse(el); }
    }
  });

  function highlightGloss(id, on) {
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("highlight", on);
  }
  function pulse(el) {
    el.classList.add("highlight");
    setTimeout(() => el.classList.remove("highlight"), 1100);
  }

  // WORKS (footnote-of-footnote modal contents)
  const WORKS = {
    hum: {
      title: "hum",
      kind: "project · 2023– · rust, webaudio",
      body: [
        "<em>Hum</em> is a pocket synthesizer for people who cannot read music, but who hum to themselves in the kitchen<sup class=\"fn\">a</sup>. You hum into your phone; it gives you back a small song it thinks you meant.",
        "The synthesizer sits somewhere between a toy and an instrument. It is not trying to compete with a DAW; it is trying to be kind to a voice that is already singing<sup class=\"fn\">b</sup>.",
      ],
      fns: [
        ["a", "Which, it turns out, is most of us."],
        ["b", "The pitch detector is a modified YIN. It forgives you."],
      ],
    },
    slowcompiler: {
      title: "slowcompiler",
      kind: "project · 2024 · talk: !!con NYC",
      body: [
        "A compiler that deliberately takes thirty seconds to compile <code>hello world</code>, and prints a small haiku at each stage<sup class=\"fn\">a</sup>. An argument that developer tools could have moods.",
        "The talk asked whether we build fast tools because they need to be fast, or because we have forgotten how to wait.",
      ],
      fns: [
        ["a", "<em>parse — / three tokens walk in / hello / world / stop</em>"],
      ],
    },
    weft: {
      title: "weft",
      kind: "project · 2022– · physical loom, git",
      body: [
        "A hand-built jacquard loom, a Raspberry Pi, and a git post-receive hook. Every time I push to a long-running repository called <code>weft-diary</code>, one thread is tied.",
        "It finishes a scarf once per orbital year. The first scarf was a gift; the second lives on the back of a chair; the third is not yet done.",
      ],
      fns: [],
    },
    stillness: {
      title: "On Stillness",
      kind: "essay · notebook i",
      body: [
        "There is a kind of software that sits still. It does one thing and does not grow<sup class=\"fn\">a</sup>. <code>cat</code>, <code>grep</code>, <code>make</code>. The Unix utilities were finished before I was born. They work.",
        "Most of what I build does not sit still. I want to learn how to stop.",
        "A finished program is less interesting than an unfinished one, until you realize that an unfinished program will eat your life, and the finished one will not.",
      ],
      fns: [
        ["a", "Plan 9's <em>9p</em> is a recent counterexample; it still sits still."],
      ],
    },
    kitsch: {
      title: "Notes Toward a Theory of Kitsch",
      kind: "essay · draft, ongoing",
      body: [
        "Kitsch is the aesthetic of pre-digested feeling. A neural network is a kitsch machine if you squint<sup class=\"fn\">a</sup>.",
        "I am interested in the opposite: art that asks you to chew. Art that leaves something stuck in your teeth.",
        "A painting that is merely pleasant is kitsch. A painting that is merely difficult is also kitsch. The trick is the third thing.",
      ],
      fns: [
        ["a", "With apologies to Clement Greenberg, whom I reread and found to be mostly correct, and mostly a jerk."],
      ],
    },
    frameworks: {
      title: "A Year Without Frameworks",
      kind: "essay · 2025",
      body: [
        "For one full year I built every side project in plain HTML, CSS, and JavaScript.",
        "Here is what broke: routing, state management for anything complex, forms with many fields. Here is what I missed: a good dev server.",
        "Here is what I stopped missing, roughly in order: the type system of whatever framework I was most recently tired of, the build step, the ambient anxiety that my tools would deprecate before my project did.",
      ],
      fns: [],
    },
  };

  document.querySelectorAll("a.work").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const w = WORKS[a.dataset.work];
      if (!w) return;
      openModal(w);
    });
  });

  function openModal(w) {
    const fnsHtml = (w.fns || []).map(([k, v]) =>
      `<p><span class="n">${k}</span>${v}</p>`
    ).join("");
    modalContent.innerHTML = `
      <h3>${w.title}</h3>
      <p class="kind">${w.kind}</p>
      ${w.body.map((p) => `<p>${p}</p>`).join("")}
      ${fnsHtml ? `<div class="fn-list">${fnsHtml}</div>` : ""}
    `;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();
