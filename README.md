# Memory Safe Guard 🔐

Ứng dụng quản lý mật khẩu hiện đại được xây dựng với React, TypeScript và Supabase. Lưu trữ và quản lý mật khẩu một cách an toàn trên cloud database.

![Memory Safe Guard](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)

## ✨ Tính năng chính

- ☁️ **Lưu trữ cloud**: Sử dụng Supabase PostgreSQL để lưu trữ dữ liệu an toàn
- 🔒 **Quản lý mật khẩu**: Thêm, chỉnh sửa, xóa và tìm kiếm mật khẩu
- 🎨 **Giao diện hiện đại**: Thiết kế đẹp mắt với shadcn/ui và Tailwind CSS
- 🛡️ **Bảo mật**: Dữ liệu được mã hóa và lưu trữ an toàn trên Supabase
- 🎲 **Tạo mật khẩu**: Tính năng tạo mật khẩu ngẫu nhiên mạnh
- 📋 **Sao chép nhanh**: Sao chép thông tin đăng nhập vào clipboard
- 🌙 **Dark/Light Theme**: Hỗ trợ chuyển đổi theme tự động

## 🚀 Công nghệ sử dụng

### Core Technologies
- **React 18.3.1**: Frontend framework với hooks và functional components
- **TypeScript 5.5.3**: Static typing cho JavaScript
- **Vite 5.4.1**: Build tool và dev server hiện đại
- **Tailwind CSS 3.4.11**: Utility-first CSS framework
- **shadcn/ui**: Component library dựa trên Radix UI
- **Supabase**: Backend-as-a-Service với PostgreSQL

### Key Libraries
- **@supabase/supabase-js**: Supabase client
- **@radix-ui/***: Headless UI components
- **lucide-react**: Icon library
- **react-hook-form**: Form handling với validation
- **zod**: Schema validation
- **sonner**: Toast notifications
- **date-fns**: Date manipulation

## 📦 Cài đặt

1. **Clone repository:**
```bash
git clone https://github.com/tungvu82nt/memory-safe-guard-v2.git
cd memory-safe-guard-v2
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Cấu hình environment variables:**
```bash
cp .env.example .env.local
```

Chỉnh sửa `.env.local` với thông tin Supabase của bạn:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Khởi chạy development server:**
```bash
npm run dev
```

5. **Mở trình duyệt tại:** `http://localhost:8080`

## 🛠️ Scripts có sẵn

```bash
# Development
npm run dev          # Khởi chạy dev server tại localhost:8080

# Production
npm run build        # Build cho production
npm run build:dev    # Build cho development mode
npm run preview      # Preview production build

# Code Quality
npm run lint         # Chạy ESLint để kiểm tra code

# Testing
npm run test         # Chạy tests
```

## 📁 Cấu trúc dự án

```
src/
├── assets/              # Static resources (images, fonts)
│   └── password-hero.png
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── PasswordCard.tsx    # Password display component
│   ├── PasswordForm.tsx    # Add/edit password form
│   ├── SearchBar.tsx       # Search functionality
│   └── ThemeToggle.tsx     # Theme switcher
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx      # Mobile detection hook
│   ├── use-passwords-supabase.ts # Supabase password management
│   └── use-toast.ts        # Toast notification hook
├── lib/                 # Utilities and libraries
│   ├── supabase.ts         # Supabase client configuration
│   ├── supabase-service-fixed.ts # Supabase service layer
│   ├── theme-context.tsx   # Theme context provider
│   └── utils.ts            # Common utility functions
├── pages/               # Page components
│   ├── Index.tsx           # Main application page
│   └── NotFound.tsx        # 404 error page
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🗄️ Database Schema

Bảng `passwords` trong Supabase:

```sql
CREATE TABLE passwords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔒 Bảo mật

- **Cloud Storage**: Dữ liệu được lưu trữ an toàn trên Supabase PostgreSQL
- **Row Level Security**: Supabase RLS để bảo vệ dữ liệu người dùng
- **HTTPS**: Tất cả kết nối được mã hóa
- **Type Safety**: TypeScript đảm bảo type safety
- **Input Validation**: Validation đầu vào với Zod schema

## 🎯 Tính năng đã test

### ✅ CRUD Operations
- ✅ Thêm mật khẩu mới
- ✅ Chỉnh sửa mật khẩu
- ✅ Xóa mật khẩu
- ✅ Tìm kiếm mật khẩu
- ✅ Hiển thị danh sách

### ✅ UI/UX Features
- ✅ Dark/Light/System theme
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling

### ✅ Technical Features
- ✅ Supabase integration
- ✅ TypeScript type safety
- ✅ React hooks pattern
- ✅ Optimistic updates
- ✅ Debounced search
- ✅ Production build

## 📊 Performance

- **Bundle size**: 627KB (minified)
- **CSS**: 69KB
- **Images**: 24KB
- **Gzip**: 186KB
- **Database latency**: ~0.6-1.9s

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) - Backend-as-a-Service platform
- [shadcn/ui](https://ui.shadcn.com/) - Component library tuyệt vời
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

**Memory Safe Guard** - Bảo vệ mật khẩu của bạn một cách an toàn và hiện đại với Supabase! 🚀