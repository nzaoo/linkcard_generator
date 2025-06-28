# IntroCard - Beautiful Personal Introduction Cards

![IntroCard](https://img.shields.io/badge/IntroCard-✨%20Beautiful%20Personal%20Cards-blue?style=for-the-badge&logo=react)

A modern web application for creating beautiful personal introduction cards with stunning UI, smooth animations, and optimal user experience.

## ✨ Key Features

### 🎨 **Modern Design**

- Beautiful gradient backgrounds with glass morphism effects
- Smooth animations and micro-interactions
- Responsive design for all devices
- Dark/light theme support

### 📱 **User Experience**

- Smart form validation with error handling
- Real-time preview while typing
- Loading states and visual feedback
- Smooth transitions and hover effects

### 🔗 **Sharing Features**

- Create personal introduction cards
- Support for multiple social media platforms
- Custom URLs for each card
- SEO optimized with meta tags

### 🎯 **Supported Platforms**

- Facebook, Instagram, Twitter/X
- LinkedIn, YouTube, TikTok
- GitHub, Website, Portfolio
- Email, Phone, WhatsApp
- Telegram, Discord, Spotify
- Behance, Dribbble, Pinterest
- Snapchat, Twitch and many more!

## 🚀 Technologies Used

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS
- **Backend**: Firebase Firestore
- **Styling**: Custom CSS animations, Glass morphism
- **Deployment**: Vercel (recommended)

## 📦 Installation

### System Requirements

- Node.js 16+
- npm or yarn
- Firebase project

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/introcard.git
cd introcard
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Firebase

1. Create a new project on [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Create `.env.local` file in root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 4: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Visit https://linkcardgenerator.vercel.app to see the application.

## 🎨 Project Structure

```
introcard/
├── components/          # React components
│   ├── CardPreview.tsx  # Card display component
│   ├── FormInput.tsx    # Form input component
│   └── SocialLinks.tsx  # Social links component
├── pages/              # Next.js pages
│   ├── index.tsx       # Home page
│   └── u/[slug].tsx    # Card display page
├── styles/             # CSS styles
│   └── globals.css     # Global styles & animations
├── lib/                # Utilities
│   └── firebase.ts     # Firebase configuration
└── utils/              # Helper functions
    └── generateSlug.ts # Slug generator
```

## 🎯 How to Use

### 1. Create a New Card

- Visit the home page
- Fill in personal information (name, bio)
- Add social media links
- See real-time preview
- Click "Create My Card"

### 2. Share Your Card

- After creation, you'll be redirected to your card URL
- Copy the URL and share with friends
- Card will display beautifully on any device

### 3. Customize

- Change information anytime
- Add/remove social links
- Update avatar (coming soon)

## 🎨 Customization

### Change Colors

Edit gradient in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        from: '#6366f1',
        to: '#8b5cf6'
      }
    }
  }
}
```

### Add New Platform

Update `components/CardPreview.tsx`:

```typescript
const getPlatformIcon = (platform: string) => {
  // Add new platform
  if (platformLower.includes("your-platform")) return "🎯";
  return "🔗";
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy!

### Netlify

1. Build project: `npm run build`
2. Upload `out` folder
3. Configure redirects

## 🤝 Contributing

We welcome all contributions! Please:

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- **Email**: nzao1327@gmail.com
- **Website**: https://nzaoo.github.io/nzao_card
- **GitHub**:  https://github.com/nzaoo

## 🙏 Acknowledgments

Thank you for using IntroCard! If you like this project, please give us a ⭐ on GitHub.

---

**Made with ❤️ by [Your Name]**
