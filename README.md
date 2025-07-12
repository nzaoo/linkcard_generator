# NZaoCard - Personal Introduction Card Generator

> **Latest Update**: Build errors fixed - ready for production deployment! 🚀

A modern, beautiful, and feature-rich personal introduction card generator built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎨 **Visual & UX Enhancements**

- **Animated Effects**: Smooth animations and micro-interactions
- **Loading Skeletons**: Beautiful shimmer effects during loading
- **Theme Customizer**: Multiple themes with real-time preview
- **Parallax Effects**: Engaging scroll animations
- **Auto-save Drafts**: Never lose your work
- **Real-time Preview**: See changes instantly

### 📊 **Analytics & Smart Features**

- **View Counter**: Track how many people view your card
- **QR Code Generator**: Create customizable QR codes for easy sharing
- **Advanced Sharing**: Email templates, SMS, and bulk sharing options
- **Google Analytics**: Comprehensive tracking and reporting
- **Performance Monitoring**: Track page load times and user interactions

### 🚀 **Foundation & Performance**

- **Next.js 14**: Latest features and optimizations
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Firebase Integration**: Real-time database and authentication
- **PWA Support**: Install as a native app
- **SEO Optimized**: Meta tags, structured data, and social sharing
- **Accessibility**: WCAG compliant with keyboard navigation
- **Mobile Responsive**: Perfect on all devices

### 🎯 **Core Features**

- **Beautiful Cards**: Modern, customizable card designs
- **Social Links**: Support for 20+ social platforms
- **Avatar Upload**: Profile picture support
- **Custom Bio**: Personal description and branding
- **Unique URLs**: Shareable card links
- **Instant Preview**: Real-time card preview

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Firebase Firestore, Firebase Auth
- **Deployment**: Vercel
- **Analytics**: Google Analytics, Firebase Analytics
- **PWA**: Service Worker, Web App Manifest

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nzaoo/linkcard_generator.git
   cd linkcard_generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

1. **Create Your Card**
   - Fill in your name, bio, and social links
   - Upload a profile picture (optional)
   - Customize your card theme

2. **Preview & Customize**
   - See real-time preview of your card
   - Adjust theme and styling
   - Test all your links

3. **Share Your Card**
   - Get your unique card URL
   - Generate QR codes for easy sharing
   - Use advanced sharing options (email, SMS, bulk sharing)

4. **Track Analytics**
   - Monitor card views and engagement
   - Track link clicks and shares
   - View detailed analytics

## 🎨 Customization

### Themes

- **Default**: Clean and modern design
- **Dark**: Elegant dark theme
- **Gradient**: Colorful gradient backgrounds
- **Minimal**: Simple and clean
- **Professional**: Business-focused design

### Social Platforms

Support for 20+ social platforms including:

- Facebook, Instagram, Twitter/X
- LinkedIn, YouTube, TikTok
- GitHub, Website, Email
- WhatsApp, Telegram, Discord
- And many more!

## 📊 Analytics

Track your card's performance with:

- **View Counters**: See how many people visit your card
- **Click Tracking**: Monitor which links get the most clicks
- **Share Analytics**: Track sharing across platforms
- **Referrer Data**: See where your traffic comes from
- **Performance Metrics**: Monitor page load times

## 🔧 Development

### Project Structure

```
linkcard_generator/
├── components/          # React components
│   ├── Card/           # Card preview components
│   ├── Form/           # Form components
│   └── ui/             # UI components
├── constants/          # App constants
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Next.js pages
├── styles/             # Global styles
├── types/              # TypeScript types
└── utils/              # Utility functions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Firebase](https://firebase.google.com/)
- Deployed on [Vercel](https://vercel.com/)

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check our documentation
- Contact us through the project

---

**Made with ❤️ by the NZaoCard team**

_Last updated: December 2024_
