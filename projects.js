// add/remove/edit projects here. they render on the home page in this order.
// fields: name (required), url, year, description (one-liner), thumb (list-page image).

window.PROJECTS = [
  {
    name: "aperture",
    url: "/projects/aperture.html",
    year: "2026",
    description: "a visual debugger for ai agent traces — drop in a run and see its shape as a tree and timeline, then replay it step by step. vite + react, three.js, zustand, zod. no backend.",
    thumb: "/projects/thumbs/aperture.svg"
  },
  {
    name: "texting claude",
    url: "/projects/claude-bot.html",
    year: "2026",
    description: "a coding agent you text on telegram — describe a task and it works on real github repos, opening pull requests. typescript, claude agent sdk, self-hosted on a hardened vps.",
    thumb: "/projects/thumbs/claude-bot.svg"
  },
  {
    name: "debaterhub 3d search",
    url: "/projects/debaterhub.html",
    year: "2025",
    description: "3d planet ui for exploring database search results. three.js + gsap.",
    thumb: "/projects/thumbs/debaterhub.svg"
  },
  {
    name: "sleep heals",
    url: "/projects/sleep-heals.html",
    year: "2024",
    description: "informational site on the importance of sleep, with original illustrations and interactive elements. html/css/js.",
    thumb: "/projects/thumbs/sleep-heals.svg"
  },
  {
    name: "jay-zam",
    url: "/projects/jay-zam.html",
    year: "2022",
    description: "a shazam-like song-identification app, scoped to jay-z's discography. python, flask, docker.",
    thumb: "/projects/thumbs/jay-zam.svg"
  },
  {
    name: "great ideas",
    url: "/great-ideas.pdf",
    year: "2018",
    description: "a survey of philosophers and schools of thought. ~30,000 words. pdf.",
    thumb: "/projects/thumbs/great-ideas.svg"
  },
  // {
  //   name: "project name",
  //   url: "https://...",
  //   year: "YYYY",
  //   description: "one-line description"
  // },
];
