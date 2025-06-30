# 🎨 NZaoCard - Beautiful Personal Introduction Cards

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> Create stunning personal introduction cards with beautiful animations and professional design. Share your digital presence with the world.

## ✨ Features

- 🎨 **Beautiful Design** - Stunning glassmorphism effects and smooth animations
- 📱 **Mobile Responsive** - Perfect display on all devices
- 🔗 **Rich Social Links** - Support for 20+ social media platforms
- ⚡ **Lightning Fast** - Optimized performance with Next.js
- 🔒 **Secure & Private** - Firebase-powered backend with enterprise security
- 🎯 **SEO Optimized** - Built for search engines and discoverability
- 🌟 **Live Preview** - See your card in real-time as you create it
- 📊 **Analytics Ready** - Google Analytics integration
- 🎭 **Error Handling** - Professional error boundaries and user feedback
- 🚀 **Modern Stack** - Built with Next.js, React, TypeScript, and Tailwind CSS

## 🚀 Live Demo

Visit the live application: **[NZaoCard](https://linkcardgenerator.vercel.app)**

## 📸 Screenshots

![NZaoCard Homepage](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=NZaoCard+Homepage)
![Card Creation](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Card+Creation+Interface)
![Mobile View](https://via.placeholder.com/400x800/1a1a1a/ffffff?text=Mobile+Responsive+Design)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS animations
- **Backend**: Firebase Firestore
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4
- **Code Quality**: ESLint, Prettier

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nzaoo/linkcard_generator.git
   cd linkcard_generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Get your Firebase configuration

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Google Analytics (Optional)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

   # App Configuration
   NEXT_PUBLIC_APP_URL=https://linkcardgenerator.vercel.app
   NEXT_PUBLIC_APP_NAME=NZaoCard
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
linkcard_generator/
├── components/          # React components
│   ├── CardPreview.tsx  # Card preview component
│   ├── FormInput.tsx    # Form input component
│   ├── SocialLinks.tsx  # Social media links component
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Footer component
│   ├── Toast.tsx        # Toast notifications
│   ├── LoadingSpinner.tsx # Loading animations
│   └── ErrorBoundary.tsx # Error handling
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper with SEO
│   ├── index.tsx        # Home page
│   └── u/[slug].tsx     # Dynamic card pages
├── lib/                 # Utility libraries
│   └── firebase.ts      # Firebase configuration
├── utils/               # Utility functions
│   └── generateSlug.ts  # Slug generation
├── styles/              # Global styles
│   └── globals.css      # Tailwind and custom CSS
├── public/              # Static assets
└── temp_nzao_card/      # Legacy card template
```

## 🎯 Usage

### Creating a Card

1. Visit the homepage
2. Fill in your name and bio
3. Add your social media links
4. Preview your card in real-time
5. Click "Create My Card" to save
6. Share your unique URL with the world!

### Supported Social Platforms

- GitHub, LinkedIn, Twitter, Instagram
- Facebook, YouTube, TikTok, Discord
- WhatsApp, Telegram, Email, Phone
- Website, Portfolio, Blog, and more!

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

- Firebase Security Rules for data protection
- Input validation and sanitization
- HTTPS enforcement
- XSS protection
- CSRF protection

## 📈 Analytics

The application includes Google Analytics 4 integration for:
- User behavior tracking
- Performance monitoring
- Conversion tracking
- Custom events

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start development server: `npm run dev`
5. Make your changes
6. Run tests and linting
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Firebase](https://firebase.google.com/) for the backend services
- [Vercel](https://vercel.com/) for the hosting platform

## 📞 Support

- **Email**: nzao1327@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/nzaoo/linkcard_generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nzaoo/linkcard_generator/discussions)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=nzaoo/linkcard_generator&type=Date)](https://star-history.com/#nzaoo/linkcard_generator&Date)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/nzaoo">Nzaoo</a>

  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nzaoo)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/nzaoo)
</div>
