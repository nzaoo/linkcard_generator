# LinkCard Generator

## Giới thiệu

LinkCard Generator là ứng dụng tạo card liên kết cá nhân, sử dụng Next.js, TypeScript, TailwindCSS và Firebase.

## Cấu trúc thư mục

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

## Cài đặt

1. Cài đặt dependencies:
   ```bash
   npm install
   ```
2. Tạo file cấu hình Firebase trong `lib/firebase.ts` (xem hướng dẫn trong file mẫu nếu có).

## Chạy local

```bash
npm run dev
```

## Build production

```bash
npm run build
npm start
```

## Deploy

- Có thể deploy lên Vercel hoặc bất kỳ nền tảng nào hỗ trợ Next.js.

## Đóng góp

1. Fork repo, tạo branch mới từ `main`.
2. Commit code, tạo pull request.
3. Mô tả rõ thay đổi và lý do.

## License

MIT
