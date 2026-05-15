# content branch

A bare-bones, content-focused version of the site. The visual design lives on `main` and the `concept/*` branches; this branch is a separate track that holds the actual content (bio, projects, writing, resume, links) without being blocked on aesthetic decisions.

When a final design is chosen, the content here can be migrated into it.

## Local preview

```
cd /path/to/grace-wj.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

(You can also just `open index.html`, but a server is more representative.)

## Editing content

- **Bio / tagline / nav links** — edit `index.html` (look for `TODO` comments).
- **Resume** — replace `resume.pdf` in the repo root.
- **Projects** — edit the `PROJECTS` array in `projects.js`. Renders on the home page.
- **Writing** — see below.

## Posts

Posts are individual HTML files in `posts/`, listed in `posts.js`.

**Add a post:**
1. Copy `posts/_template.html` to `posts/your-slug.html`.
2. Edit the title, date, and content.
3. Add an entry to `window.POSTS` in `posts.js` with a matching `slug` and one or more `tags`.

**Tags:** `essay`, `review`, or `personal`. Each tag becomes a clickable chip in the post list that filters the archive (e.g. `/posts/?tag=essay`).

**Make a post private:** Add `private: true` to its entry in `posts.js`. The post is excluded from the `/posts/` archive and the tag filter, but the file at `posts/<slug>.html` still resolves — so the content stays intact and the URL still works for anyone who has it directly.

**Remove a post:** Delete the file and remove its entry from `posts.js`.

**Edit a post:** Edit the HTML file. Update `title`/`date` in `posts.js` if those changed.

The home page shows the 5 most recent posts (by `date`); the full archive is at `/posts/`.
