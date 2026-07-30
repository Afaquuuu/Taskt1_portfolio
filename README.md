# Personal Portfolio Landing Page

A fully responsive, single-page developer portfolio built with HTML, CSS, and JavaScript for Week 1 of the Front-End Web Development track.

## Live Demo

> Deploy using one of the options below, then add your live URL here.

## Features

- **Responsive layout** — Mobile-first design with Flexbox and CSS Grid
- **Sections** — Hero, About, Skills, Projects (3 cards), Contact
- **Dark / light mode** — Theme toggle with `localStorage` persistence
- **Mobile navigation** — Hamburger menu with keyboard (Escape) support
- **Contact form** — Front-end validation with inline error messages
- **Active nav highlighting** — Updates as you scroll through sections
- **Accessibility** — Skip link, ARIA labels, semantic HTML

## Project Structure

```
task1/
├── index.html          # Main HTML page
├── css/
│   └── styles.css      # All styles (BEM naming, CSS custom properties)
├── js/
│   └── main.js         # Nav toggle, theme switch, form validation
└── README.md
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd task1
   ```

2. Open `index.html` in your browser, or use a local server:
   ```bash
   npx serve .
   ```

## Deployment

### GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Netlify

1. Sign in at [netlify.com](https://www.netlify.com).
2. Drag and drop the project folder, or connect your GitHub repo.
3. No build command needed — publish directory is the root.

### Vercel

1. Sign in at [vercel.com](https://vercel.com).
2. Import your GitHub repository.
3. Leave framework preset as **Other** — no build step required.

## Customization

Replace placeholder content in `index.html`:

- Name, bio, and location in Hero and About sections
- Skills lists under each category
- Project titles, descriptions, tags, and links
- Contact email and phone number
- Social media URLs

## Screenshots

Add screenshots of your desktop and mobile views here before submitting:

- `screenshots/desktop.png`
- `screenshots/mobile.png`

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties, Media Queries)
- Vanilla JavaScript
- [Google Fonts](https://fonts.google.com) — Inter, JetBrains Mono
- [Font Awesome 6](https://fontawesome.com) — Icons

## License

MIT
