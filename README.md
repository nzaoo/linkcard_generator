# IntroCard - Thẻ Giới Thiệu Cá Nhân Đẹp Mắt

![IntroCard](https://img.shields.io/badge/IntroCard-✨%20Beautiful%20Personal%20Cards-blue?style=for-the-badge&logo=react)

Một ứng dụng web hiện đại để tạo thẻ giới thiệu cá nhân đẹp mắt với giao diện người dùng tuyệt vời, animations mượt mà và trải nghiệm người dùng tối ưu.

## ✨ Tính Năng Nổi Bật

### 🎨 **Giao Diện Hiện Đại**

- Design gradient đẹp mắt với glass morphism effect
- Animations mượt mà và micro-interactions
- Responsive design cho mọi thiết bị
- Dark/light theme tự động

### 📱 **Trải Nghiệm Người Dùng**

- Form validation thông minh với error handling
- Real-time preview khi nhập liệu
- Loading states và feedback trực quan
- Smooth transitions và hover effects

### 🔗 **Tính Năng Chia Sẻ**

- Tạo thẻ giới thiệu với thông tin cá nhân
- Hỗ trợ nhiều platform social media
- URL tùy chỉnh cho mỗi thẻ
- SEO optimized với meta tags

### 🎯 **Platforms Hỗ Trợ**

- Facebook, Instagram, Twitter/X
- LinkedIn, YouTube, TikTok
- GitHub, Website, Portfolio
- Email, Phone, WhatsApp
- Telegram, Discord, Spotify
- Behance, Dribbble, Pinterest
- Snapchat, Twitch và nhiều hơn nữa!

## 🚀 Công Nghệ Sử Dụng

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS
- **Backend**: Firebase Firestore
- **Styling**: Custom CSS animations, Glass morphism
- **Deployment**: Vercel (recommended)

## 📦 Cài Đặt

### Yêu Cầu Hệ Thống

- Node.js 16+
- npm hoặc yarn
- Firebase project

### Bước 1: Clone Repository

```bash
git clone https://github.com/yourusername/introcard.git
cd introcard
```

### Bước 2: Cài Đặt Dependencies

```bash
npm install
# hoặc
yarn install
```

### Bước 3: Cấu Hình Firebase

1. Tạo project mới trên [Firebase Console](https://console.firebase.google.com/)
2. Bật Firestore Database
3. Tạo file `.env.local` trong root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Bước 4: Chạy Development Server

```bash
npm run dev
# hoặc
yarn dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 🎨 Cấu Trúc Dự Án

```
introcard/
├── components/          # React components
│   ├── CardPreview.tsx  # Component hiển thị thẻ
│   ├── FormInput.tsx    # Component input form
│   └── SocialLinks.tsx  # Component social links
├── pages/              # Next.js pages
│   ├── index.tsx       # Trang chủ
│   └── u/[slug].tsx    # Trang hiển thị thẻ
├── styles/             # CSS styles
│   └── globals.css     # Global styles & animations
├── lib/                # Utilities
│   └── firebase.ts     # Firebase configuration
└── utils/              # Helper functions
    └── generateSlug.ts # Slug generator
```

## 🎯 Cách Sử Dụng

### 1. Tạo Thẻ Mới

- Truy cập trang chủ
- Điền thông tin cá nhân (tên, giới thiệu)
- Thêm các liên kết social media
- Xem preview real-time
- Nhấn "Tạo Thẻ Của Tôi"

### 2. Chia Sẻ Thẻ

- Sau khi tạo, bạn sẽ được chuyển đến URL thẻ
- Copy URL và chia sẻ với bạn bè
- Thẻ sẽ hiển thị đẹp mắt trên mọi thiết bị

### 3. Tùy Chỉnh

- Thay đổi thông tin bất cứ lúc nào
- Thêm/bớt social links
- Cập nhật avatar (sắp tới)

## 🎨 Customization

### Thay Đổi Màu Sắc

Chỉnh sửa gradient trong `tailwind.config.js`:

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

### Thêm Platform Mới

Cập nhật `components/CardPreview.tsx`:

```typescript
const getPlatformIcon = (platform: string) => {
  // Thêm platform mới
  if (platformLower.includes("your-platform")) return "🎯";
  return "🔗";
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Connect repository với Vercel
3. Add environment variables
4. Deploy!

### Netlify

1. Build project: `npm run build`
2. Upload `out` folder
3. Configure redirects

## 🤝 Đóng Góp

Chúng tôi rất hoan nghênh mọi đóng góp! Hãy:

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên Hệ

- **Email**: your.email@example.com
- **Website**: https://yourwebsite.com
- **GitHub**: https://github.com/yourusername

## 🙏 Cảm Ơn

Cảm ơn bạn đã sử dụng IntroCard! Nếu bạn thích dự án này, hãy cho chúng tôi một ⭐ trên GitHub.

---

**Made with ❤️ by [Your Name]**
