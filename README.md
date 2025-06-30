# 🎨 NZaoCard - Digital Business Card Generator

A beautiful, modern digital business card generator built with Next.js, TypeScript, and Tailwind CSS. Create stunning personal introduction cards with animations and seamless sharing capabilities.

![NZaoCard Preview](https://img.shields.io/badge/NZaoCard-Digital%20Business%20Cards-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange?style=for-the-badge&logo=firebase)

## ✨ Features

### 🎯 Core Features
- **Beautiful Design**: Stunning animations and glassmorphism effects
- **Mobile Responsive**: Perfect display on all devices
- **Rich Social Links**: Support for 20+ social media platforms
- **Real-time Preview**: Live preview while creating your card
- **Success Page**: Dedicated page with confetti animation and share options
- **SEO Optimized**: Built for search engines and social sharing

### 🚀 Advanced Features
- **Confetti Animation**: Celebratory animation on card creation
- **Real-time Statistics**: Dynamic stats display
- **Multiple Share Options**: Facebook, Twitter, LinkedIn, WhatsApp, and more
- **Copy URL**: One-click URL copying
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Smooth loading animations

### 📱 Social Media Support
- Facebook, Instagram, Twitter/X, LinkedIn
- YouTube, TikTok, GitHub, Website
- Email, Phone, WhatsApp, Telegram
- Discord, Spotify, Behance, Dribbble
- Pinterest, Snapchat, Twitch, Zalo, Messenger

## 🏗️ Project Structure

```
linkcard_generator/
├── components/                 # React components
│   ├── cards/                 # Card-related components
│   │   ├── CardPreview.tsx    # Main card display component
│   │   └── CardPreviewNew.tsx # Alternative card design
│   ├── forms/                 # Form components
│   │   ├── FormInput.tsx      # Reusable input component
│   │   └── SocialLinks.tsx    # Social media links form
│   ├── layout/                # Layout components
│   │   ├── Header.tsx         # Site header
│   │   └── Footer.tsx         # Site footer
│   └── ui/                    # UI components
│       ├── ShareButton.tsx    # Social sharing component
│       ├── Toast.tsx          # Notification system
│       ├── LoadingSpinner.tsx # Loading indicators
│       ├── ErrorBoundary.tsx  # Error handling
│       ├── SuccessNotification.tsx # Success messages
│       └── Stats.tsx          # Statistics display
├── pages/                     # Next.js pages
│   ├── _app.tsx              # App wrapper
│   ├── index.tsx             # Homepage
│   ├── success.tsx           # Success page
│   └── u/[slug].tsx          # Public card page
├── types/                     # TypeScript type definitions
│   └── index.ts              # Common interfaces
├── constants/                 # Application constants
│   └── platforms.ts          # Social platform configurations
├── utils/                     # Utility functions
│   └── generateSlug.ts       # Slug generation
├── lib/                       # External library configurations
│   └── firebase.ts           # Firebase setup
├── styles/                    # Global styles
│   └── globals.css           # Tailwind and custom CSS
├── public/                    # Static assets
└── temp_nzao_card/           # Legacy files (can be removed)
```

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
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🎨 Customization

### Adding New Social Platforms
1. Update `constants/platforms.ts` with new platform details
2. Add platform icon and color configurations
3. Update `components/forms/SocialLinks.tsx` if needed

### Styling
- Global styles: `styles/globals.css`
- Tailwind config: `tailwind.config.js`
- Component-specific styles use Tailwind classes

### Animations
- Confetti animation: CSS keyframes in `globals.css`
- Floating bubbles: Tailwind animations
- Hover effects: CSS transitions

## 📱 Usage

### Creating a Card
1. Visit the homepage
2. Fill in your name and bio
3. Add social media links
4. Preview your card in real-time
5. Click "Create My Card"
6. Share your card from the success page

### Sharing Options
- **Copy URL**: One-click copying to clipboard
- **Social Media**: Direct sharing to Facebook, Twitter, LinkedIn, WhatsApp
- **Public Page**: View your card's public page
- **Create Another**: Start over with a new card

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Firestore Database
3. Set up security rules
4. Add environment variables

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

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

- **Next.js** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Firebase** for the backend services
- **Vercel** for hosting and deployment

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/nzaoo/linkcard_generator/issues)
- **Email**: nzao1327@gmail.com
- **Website**: [https://linkcardgenerator.vercel.app](https://linkcardgenerator.vercel.app)

## 🚀 Live Demo

Visit [https://linkcardgenerator.vercel.app](https://linkcardgenerator.vercel.app) to see NZaoCard in action!

---

Made with ❤️ by [Nzaoo](https://github.com/nzaoo)
