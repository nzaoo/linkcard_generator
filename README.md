# LinkCard Generator

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 🚀 Introduction

**LinkCard Generator** is a modern web application that allows users to create and share beautiful personal link cards. Built with Next.js, TypeScript, Tailwind CSS, and Firebase, it offers a seamless and responsive user experience for digital networking.

---

## ✨ Features

- **Modern UI/UX**: Clean, responsive, and mobile-friendly design
- **Live Card Preview**: Instantly see your card as you edit
- **Rich Social Links**: Support for multiple social platforms
- **Easy Sharing**: Share your card via a unique URL
- **Success Page**: Dedicated page with sharing options
- **Statistics**: Track card views and shares (optional)
- **Error Handling**: User-friendly notifications and error boundaries
- **Fast & Secure**: Powered by Next.js and Firebase

---

## 📁 Folder Structure

```
linkcard_generator/
  components/
    Card/
      CardPreview.tsx
      CardPreviewNew.tsx
    Form/
      FormInput.tsx
      SocialLinks.tsx
  constants/
    platforms.ts
  lib/
    firebase.ts
  pages/
    _app.tsx
    index.tsx
    success.tsx
    u/
      [slug].tsx
  public/
    default-avatar.png
  styles/
    globals.css
  utils/
    generateSlug.ts
  types/
    index.ts
  README.md
  package.json
  ...
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Firebase project (for backend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nzaoo/linkcard_generator.git
   cd linkcard_generator
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure Firebase:**
   - Update `lib/firebase.ts` with your Firebase project credentials.
   - (Optional) Add environment variables if needed.

---

## 🛠️ Usage

### Development

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build and run for production:

```bash
npm run build
npm start
```

---

## ☁️ Deployment

You can deploy this project to [Vercel](https://vercel.com/) or any platform that supports Next.js.

---

## 🤝 Contribution Guidelines

We welcome contributions from the community!

1. Fork the repository and create a new branch from `main`.
2. Make your changes with clear, descriptive commit messages (in English).
3. Ensure your code follows the existing style and passes lint/type checks.
4. Submit a pull request with a detailed description of your changes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
