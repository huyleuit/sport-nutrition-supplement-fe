# Sport Nutrition Supplement - Frontend

Ứng dụng web frontend cho hệ thống bán thực phẩm bổ sung thể thao, được xây dựng với Next.js 14 và TypeScript.

## 📋 Mô tả

Dự án frontend cho website thương mại điện tử chuyên về các sản phẩm thực phẩm bổ sung thể thao như:

- Whey Protein
- Mass Gainer
- Pre-workout
- BCAA/EAA
- Creatine
- Vitamin và các sản phẩm bổ sung khác

## 🚀 Công nghệ sử dụng

### Core

- **Next.js 14.2.10** - React framework với App Router
- **React 18.3.1** - UI library
- **TypeScript 5.6.2** - Type safety

### UI Libraries

- **Material-UI (MUI) 6.1.1** - Component library
- **Radix UI** - Headless UI components (Dialog, Dropdown, Toast, etc.)
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Font Awesome** - Icon library

### Form & Validation

- **React Hook Form 7.53.1** - Form management
- **Zod 3.23.8** - Schema validation
- **@hookform/resolvers** - Form validation resolvers

### State Management & Utilities

- **js-cookie** - Cookie management
- **class-variance-authority** - Component variants
- **clsx & tailwind-merge** - Class name utilities

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 📦 Cài đặt

### Yêu cầu

- Node.js >= 18.x
- pnpm >= 10.23.0

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd Sport-Nutrition-Supplement-FE
```

### Bước 2: Cài đặt dependencies

```bash
pnpm install
```

### Bước 3: Cấu hình biến môi trường

Tạo file `.env.local` trong thư mục gốc với nội dung:

```env
NEXT_PUBLIC_API_ENDPOINT=your_api_endpoint
NEXT_PUBLIC_URL=your_frontend_url
```

### Bước 4: Chạy ứng dụng

```bash
pnpm dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để xem kết quả.

## 📜 Scripts có sẵn

- `pnpm dev` - Chạy development server
- `pnpm build` - Build ứng dụng cho production
- `pnpm start` - Chạy production server
- `pnpm lint` - Kiểm tra lỗi code với ESLint

## 📁 Cấu trúc dự án

```
src/
├── apiRequests/          # API request functions
│   ├── address.ts
│   ├── auth.ts
│   ├── cart.ts
│   ├── product.ts
│   └── user.ts
├── app/                  # Next.js App Router
│   ├── (main)/          # Main routes (public)
│   │   ├── (auth)/      # Authentication pages
│   │   ├── (document)/  # Document pages
│   │   ├── danh-muc/    # Category pages
│   │   ├── gio-hang/    # Cart page
│   │   ├── nguoi-dung/  # User pages
│   │   └── san-pham/    # Product pages
│   ├── admin/           # Admin panel
│   │   ├── customers/
│   │   ├── dashboard/
│   │   ├── orders/
│   │   ├── products/
│   │   └── promotions/
│   └── api/             # API routes
├── components/           # React components
│   ├── admin/          # Admin components
│   ├── cart/           # Cart components
│   ├── common/         # Common components
│   ├── footer/         # Footer components
│   ├── header/         # Header components
│   ├── home/           # Home page components
│   ├── product-detail/ # Product detail components
│   ├── product-list/   # Product list components
│   └── ui/             # UI components (shadcn/ui)
├── config.ts           # Environment configuration
├── data/               # Static data
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── schemaValidations/  # Zod validation schemas
└── types/              # TypeScript type definitions
```

## 🎨 Tính năng chính

### Người dùng

- ✅ Xem danh sách sản phẩm và tìm kiếm
- ✅ Xem chi tiết sản phẩm
- ✅ Thêm sản phẩm vào giỏ hàng
- ✅ Quản lý giỏ hàng
- ✅ Đăng nhập/Đăng ký
- ✅ Quản lý thông tin cá nhân
- ✅ Quản lý địa chỉ giao hàng
- ✅ Xem lịch sử đơn hàng
- ✅ Hệ thống đánh giá sản phẩm

### Admin

- ✅ Dashboard quản lý
- ✅ Quản lý sản phẩm
- ✅ Quản lý đơn hàng
- ✅ Quản lý khách hàng
- ✅ Quản lý khuyến mãi

## 🔧 Cấu hình

### ESLint

Dự án sử dụng ESLint với cấu hình Next.js và TypeScript. Xem file `.eslintrc.json` để biết chi tiết.

### Tailwind CSS

Cấu hình Tailwind CSS được đặt trong `tailwind.config.ts`.

### TypeScript

Cấu hình TypeScript được đặt trong `tsconfig.json`.

## 🚢 Deployment

### Vercel (Khuyến nghị)

Cách dễ nhất để deploy Next.js app là sử dụng [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push code lên GitHub/GitLab
2. Import project vào Vercel
3. Cấu hình biến môi trường
4. Deploy

### Build cho production

```bash
pnpm build
pnpm start
```

## 📝 Lưu ý

- Đảm bảo cấu hình đúng các biến môi trường trước khi chạy
- Sử dụng pnpm làm package manager (không phải npm hoặc yarn)
- Kiểm tra lỗi TypeScript và ESLint trước khi commit
