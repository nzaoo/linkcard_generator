# LinkCard Generator (NZaoCard)

<p align="center">
  <img src="public/logo.png" alt="LinkCard Generator Logo" width="180" />
</p>

<p align="center">
  <i>Create and share beautiful personal link cards easily.</i>
</p>

<p align="center">
  <img src="public/demo.gif" alt="Demo GIF" width="600" />
</p>

---

## 🚀 Introduction

**LinkCard Generator (NZaoCard)** is a web application that helps you create beautiful digital business cards with modern design, stunning animations, and easy sharing via a unique link. It supports multiple social platforms, is mobile-optimized, secure, and blazing fast.

---

## ✨ Features

- Modern, responsive UI/UX with beautiful animations
- Live card preview as you edit
- Supports many social platforms (Facebook, Instagram, Twitter, LinkedIn, GitHub, Zalo, etc.)
- Easy sharing with a personalized URL
- Secure data storage with Firebase
- SEO optimized, Open Graph & Twitter Card support
- Easy deployment to Vercel or any Next.js-compatible platform

---

## 🏗️ Project Structure

```
linkcard_generator/
├── components/         # UI components (Card, Form, SocialLinks, ...)
├── constants/          # Social platform list, icons, colors
├── lib/                # Firebase configuration
├── pages/              # Main pages (index, success, [slug])
├── public/             # Default avatar, logo, demo images
├── styles/             # CSS, custom animations, theme
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (generateSlug, ...)
├── tailwind.config.js  # Tailwind CSS configuration
├── vercel.json         # Vercel deployment config
└── ...
```

---

## ⚡ Quick Start

1. **Clone & Install**

   ```bash
   git clone https://github.com/nzaoo/linkcard_generator.git
   cd linkcard_generator
   npm install
   # or: yarn install
   ```

2. **Configure Firebase**
   - Create a project on [Firebase](https://console.firebase.google.com/)
   - Get your config (API Key, Project ID, etc.)
   - Create a `.env.local` file and add:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=...
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
     NEXT_PUBLIC_FIREBASE_APP_ID=...
     ```
   - Or edit `lib/firebase.ts` directly (not recommended)

3. **Run the App**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🖼️ Demo

- Live: [linkcard-generator.vercel.app](https://linkcard-generator.vercel.app)
- Create, share, and preview your card instantly.

---

## ☁️ Deployment

- Easily deploy to [Vercel](https://vercel.com/) (pre-configured with `vercel.json`)
- Supports Next.js 14+, TypeScript, TailwindCSS

---

## 🛠️ Development Scripts

| Script               | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start development server (localhost) |
| `npm run build`      | Build for production                 |
| `npm run start`      | Run production build                 |
| `npm run lint`       | Lint code with ESLint                |
| `npm run type-check` | Type check with TypeScript           |
| `npm run format`     | Format code with Prettier            |

---

## 🧩 Tech Stack

- [Next.js](https://nextjs.org/) (React, SSR/SSG)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (custom animation, dark mode)
- [Firebase](https://firebase.google.com/) (Firestore)
- [Vercel](https://vercel.com/) (deployment)
- UI/UX: Responsive, animated, glassmorphism, gradients, particles, confetti, ...

---

## 🧑‍💻 Contributing

- Fork & branch from `main`
- Commit code following the style guide, with clear messages
- Open a pull request with a detailed description
- See [CONTRIBUTING.md](CONTRIBUTING.md) for more

---

## 📄 License

[MIT](LICENSE)

---

## 📬 Contact & Support

- Author: Nzaoo (nzao1327@gmail.com)
- [Github Issues](https://github.com/nzaoo/linkcard_generator/issues)
