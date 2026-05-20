// add a new post:
//   1. copy posts/_template.html to posts/<slug>.html, edit the content
//   2. add a new entry to this array
// remove a post: delete its file and delete its entry.
// edit a post: just edit the html file (and update title/date here if those changed).
//
// the latest 5 posts (by date) appear on the home page; all posts appear at /posts/.
//
// tags: array of strings. recognized: "essay" | "review" | "personal".
// posts can be filtered by tag at /posts/?tag=essay etc.
//
// private: true  — hide from the /posts/ archive and tag filter. the file
// at posts/<slug>.html still resolves if anyone has the direct URL, so the
// content stays intact; it just isn't listed publicly.
//
// the "top" view on /posts/ renders this array in order — strongest first.

window.POSTS = [
  {
    slug: "the-circular-train-problem",
    title: "The Circular Train Problem",
    date: "2024-08-27",
    summary: "A logic puzzle and an algorithm for it.",
    tags: ["essay"]
  },
  {
    slug: "metamorphosis-prime-intellect",
    title: "The Metamorphosis of Prime Intellect",
    date: "2022-10-23",
    summary: "A review of the book.",
    tags: ["review"]
  },
  {
    slug: "memory-palaces",
    title: "Memory Palaces",
    date: "2024-08-25",
    summary: "How to memorize 100 digits of pi.",
    tags: ["essay"]
  },
  {
    slug: "thoughts-on-korean-values",
    title: "Thoughts on Korean Values",
    date: "2024-03-17",
    summary: "On filial piety and modesty.",
    tags: ["essay"]
  },
  {
    slug: "for-a-diversity-of-consciousness",
    title: "For a Diversity of Consciousness",
    date: "2022-11-19",
    summary: "On consciousness, psychedelics, and the hard problem.",
    tags: ["essay"]
  },
  {
    slug: "the-line-grows-blurrier",
    title: "The Line Grows Blurrier",
    date: "2023-12-31",
    summary: "On art, logic, and growing up.",
    tags: ["personal"]
  },
  {
    slug: "on-pleasure",
    title: "On Pleasure",
    date: "2024-07-27",
    summary: "From a journal entry on what gives life meaning.",
    tags: ["personal"]
  },
  {
    slug: "cigarettes",
    title: "Cigarettes",
    date: "2022-10-14",
    summary: "A friend's father, lung cancer, and the smell that lingers.",
    tags: ["personal"]
  },
  {
    slug: "palm-trees",
    title: "Palm Trees (and Bougainvillea)",
    date: "2022-10-14",
    summary: "On moving from Missouri to California.",
    tags: ["essay"]
  },
  {
    slug: "on-inebriants",
    title: "On Inebriants",
    date: "2022-10-20",
    summary: "On art, passion, and intoxication.",
    tags: ["essay"]
  },
  {
    slug: "on-drug-addiction",
    title: "On Drug Addiction",
    date: "2026-05-13",
    summary: "An essay.",
    tags: ["essay"],
    private: true
  },
  // {
  //   slug: "your-next-post",
  //   title: "your next post title",
  //   date: "YYYY-MM-DD",
  //   summary: "one-line summary shown on archive page (optional).",
  //   tags: ["essay"]
  // },
];
