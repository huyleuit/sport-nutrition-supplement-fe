# Sport Nutrition Supplement - Frontend

Ứng dụng web frontend cho hệ thống thương mại điện tử chuyên kinh doanh thực phẩm bổ sung thể thao, được xây dựng hiện đại với Next.js 14, TypeScript và tích hợp Web3 cho chương trình khách hàng thân thiết.

## 📋 Giới thiệu

Dự án cung cấp một trải nghiệm mua sắm trực tuyến toàn diện cho các sản phẩm dinh dưỡng thể thao như Whey Protein, Mass Gainer, Pre-workout, Vitamin, v.v. Hệ thống bao gồm giao diện cho người dùng cuối (Storefront) và giao diện quản trị (Admin Dashboard).

Đặc biệt, dự án có tích hợp **Web3** để quản lý điểm thưởng (Loyalty Token) trên mạng lưới Blockchain (Sepolia Testnet).

## ✨ Tính năng chính

### 👤 Người dùng (Customer)

- **Duyệt sản phẩm:** Xem danh sách sản phẩm theo danh mục, thương hiệu, tìm kiếm và lọc.
- **Chi tiết sản phẩm:** Xem thông tin chi tiết, hình ảnh, giá cả và đánh giá.
- **Giỏ hàng & Thanh toán:** Thêm sản phẩm vào giỏ, quản lý số lượng, thanh toán trực tuyến hoặc COD.
- **Tài khoản:** Đăng ký, đăng nhập, quản lý thông tin cá nhân, địa chỉ giao hàng.
- **Lịch sử đơn hàng:** Theo dõi trạng thái đơn hàng đã đặt.
- **Loyalty Program (Web3):** Kết nối ví Metamask, xem số dư token thưởng, đổi quà (tích hợp Blockchain).

### 🛠 Quản trị viên (Admin)

- **Dashboard:** Xem thống kê tổng quan về doanh thu, đơn hàng.
- **Quản lý sản phẩm:** Thêm, sửa, xóa sản phẩm, quản lý kho.
- **Quản lý đơn hàng:** Xem và cập nhật trạng thái đơn hàng.
- **Quản lý khách hàng:** Xem danh sách và thông tin khách hàng.

## 🚀 Công nghệ sử dụng

### Core Framework

- **Next.js 14.2.10** (App Router) - Framework React full-stack.
- **React 18.3.1** - Thư viện UI.
- **TypeScript 5.6.2** - Ngôn ngữ lập trình định kiểu mạnh.

### UI & Styling

- **Tailwind CSS 3.4.11** - Utility-first CSS framework.
- **Shadcn UI / Radix UI** - Bộ component UI headless, dễ tùy biến.
- **Material-UI (MUI) 6.1.1** - Thư viện component (sử dụng ở một số module).
- **Lucide React & Font Awesome** - Bộ icon đa dạng.

### State Management & Form

- **React Hook Form** - Quản lý form hiệu năng cao.
- **Zod** - Schema validation mạnh mẽ.

### Web3 & Blockchain

- **Ethers.js v6** - Thư viện tương tác với Ethereum Blockchain.
- **Metamask** - Ví điện tử để xác thực và ký giao dịch.
- **Network:** Sepolia Testnet.

### Tools & Utilities

- **pnpm** - Package manager nhanh và hiệu quả.
- **ESLint & Prettier** - Chuẩn hóa code.

## 📦 Cài đặt và Chạy dự án

### 1. Yêu cầu tiên quyết

- Node.js (khuyến nghị phiên bản LTS mới nhất, v18+).
- Trình quản lý gói `pnpm` (hoặc npm/yarn).
- Ví Metamask (cài đặt extension trên trình duyệt) để test tính năng Web3.

### 2. Clone dự án

```bash
git clone <repository-url>
cd sport-nutrition-supplement-fe
```

### 3. Cài đặt dependencies

```bash
pnpm install
```

### 4. Cấu hình biến môi trường

Tạo file `.env.local` tại thư mục gốc và điền các thông tin sau:

```env
# API Backend
NEXT_PUBLIC_API_ENDPOINT=http://localhost:port/api # Thay đổi theo API thực tế
NEXT_PUBLIC_URL=http://localhost:3000

# Web3 (Tùy chọn nếu dùng custom RPC)
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

### 5. Chạy môi trường phát triển

```bash
pnpm dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để xem kết quả.

## 📜 Scripts có sẵn

- `pnpm dev` - Chạy development server
- `pnpm build` - Build ứng dụng cho production
- `pnpm start` - Chạy production server
- `pnpm lint` - Kiểm tra lỗi code với ESLint

## 📂 Cấu trúc dự án

```
src/
├── apiRequests/      # Các hàm gọi API (Auth, Product, Cart,...)
├── app/              # Next.js App Router (Pages & Layouts)
│   ├── (main)/       # Giao diện người dùng (Home, Product, Cart...)
│   ├── admin/        # Giao diện quản trị (Dashboard, Products...)
│   └── api/          # Next.js API Routes (nếu có)
├── components/       # Các React Components tái sử dụng
│   ├── admin/        # Components riêng cho trang Admin
│   ├── common/       # Components chung (Button, Input, Modal...)
│   ├── loyalty/      # Components liên quan đến Web3/Loyalty
│   └── ui/           # Shadcn UI components
├── config/           # Cấu hình dự án (Env, Contract Address...)
├── hooks/            # Custom React Hooks
├── lib/              # Các hàm tiện ích (Utils, Web3 helper...)
├── schemaValidations/# Zod schemas cho validation
└── types/            # TypeScript type definitions
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
