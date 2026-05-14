// add a new post:
//   1. copy posts/_template.html to posts/<slug>.html, edit the content
//   2. add a new entry to this array
// remove a post: delete its file and delete its entry.
// edit a post: just edit the html file (and update title/date here if those changed).
//
// the latest 5 posts (by date) appear on the home page; all posts appear at /posts/.
//
// tags: array of strings. recognized: "essay" | "review" | "journal".
// posts can be filtered by tag at /posts/?tag=essay etc.

window.POSTS = [
  {
    slug: "hello-world",
    title: "hello, world",
    date: "2026-05-12",
    summary: "first post on the new site. placeholder for now.",
    tags: []
  },
  {
    slug: "metamorphosis-prime-intellect",
    title: "The Metamorphosis of Prime Intellect",
    date: "2026-05-12",
    summary: "A review of the book.",
    tags: ["review"]
  },
  {
    slug: "on-drug-addiction",
    title: "On Drug Addiction",
    date: "2026-05-13",
    summary: "An essay.",
    tags: ["essay"]
  },
  // {
  //   slug: "your-next-post",
  //   title: "your next post title",
  //   date: "YYYY-MM-DD",
  //   summary: "one-line summary shown on archive page (optional).",
  //   tags: ["essay"]
  // },
];
