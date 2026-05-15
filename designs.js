// add a new design project:
//   1. copy design/_template.html to design/<slug>.html, edit the content
//   2. drop image files into design/img/ (name them after the slug)
//   3. add a new entry to this array
// remove a project: delete its file and delete its entry.
//
// the archive at /design/ renders this array in order.
//
// tags: array of strings. recognized: "merch" | "branding" | "campaign"
//   | "illustration" | "typography" | "editorial".

window.DESIGNS = [
  {
    slug: "codeology-merch",
    title: "Codeology Merch",
    year: "2022",
    client: "Codeology @ Berkeley",
    summary: "Internal merch — single-color illustration on tees and hoodies.",
    thumb: "img/codeology-merch-thumb.jpg",
    tags: ["merch", "illustration"]
  },
  {
    slug: "bare-sticker",
    title: "BARE Magazine Sticker",
    year: "2022",
    client: "BARE Magazine @ Berkeley",
    summary: "Graffiti-inspired sticker for guerrilla placement around campus.",
    thumb: "img/bare-sticker-thumb.png",
    tags: ["illustration", "typography"]
  },
  {
    slug: "garb-hoodie",
    title: "Garb Hoodie SP23",
    year: "2023",
    client: "Garb @ Berkeley",
    summary: "Member merch — custom typography in cyber-sigilism and neo-tribal forms.",
    thumb: "img/garb-hoodie-thumb.jpg",
    tags: ["merch", "typography"]
  },
  {
    slug: "codeology-recruitment",
    title: "Codeology Recruitment Campaign",
    year: "2023",
    client: "Codeology @ Berkeley",
    summary: "Recruitment promo set — flyers and social posts. 420 applications (a club record).",
    thumb: "img/codeology-recruitment-thumb.jpg",
    tags: ["campaign", "editorial"]
  },
  {
    slug: "codeology-industry",
    title: "Codeology × Industry",
    year: "2023",
    client: "Codeology @ Berkeley",
    summary: "Event promo for industry partnership talks with Uber and Veeva.",
    thumb: "img/codeology-industry-thumb.jpg",
    tags: ["campaign", "editorial"]
  },
  // {
  //   slug: "your-next-project",
  //   title: "title",
  //   year: "YYYY",
  //   client: "client / org",
  //   summary: "one-line summary shown on the archive page",
  //   thumb: "img/your-next-project-thumb.jpg",
  //   tags: ["branding"]
  // },
];
