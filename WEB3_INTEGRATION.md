# Hướng dẫn tích hợp Web3 - Token Balance

## Tổng quan

Đã tích hợp thành công việc đọc token balance từ smart contract LoyaltyToken trên Sepolia testnet.

## Các file đã tạo/cập nhật

### 1. `package.json`
- ✅ Thêm `ethers: ^6.13.0` vào dependencies

### 2. `src/config/contract.ts` (MỚI)
- Cấu hình contract addresses và ABI
- Contract addresses từ `deployments/sepolia.json`:
  - LoyaltyToken: `0x53B662608d30318b3476A74666A56C91F39597AA`
  - LoyaltyManager: `0xCb6c4a5f4E23b1F78384728a75457d1eed5bC7Dd`

### 3. `src/lib/web3.ts` (MỚI)
- `getTokenBalance(address)`: Lấy token balance từ contract
- `isCorrectNetwork()`: Kiểm tra network có đúng Sepolia không
- `switchToSepolia()`: Chuyển sang Sepolia testnet

### 4. `src/components/loyalty/LoyaltySection.tsx` (CẬP NHẬT)
- ✅ Đã thay thế mock data bằng việc gọi `getTokenBalance()` từ smart contract
- ✅ Tự động kiểm tra và chuyển sang Sepolia network nếu cần
- ✅ Tự động refresh balance khi account hoặc chain thay đổi

## Cách sử dụng

### 1. Cài đặt dependencies

```bash
pnpm install
```

### 2. Cấu hình môi trường (tùy chọn)

Tạo file `.env.local` nếu muốn sử dụng custom RPC URL:

```env
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

### 3. Chạy ứng dụng

```bash
pnpm dev
```

### 4. Sử dụng tính năng

1. Mở trang có component `LoyaltySection`
2. Nhấn "Kết nối MetaMask"
3. Cho phép kết nối và chuyển sang Sepolia testnet (nếu cần)
4. Token balance sẽ tự động được lấy từ smart contract và hiển thị

## Tính năng đã implement

✅ **Đọc token balance từ smart contract**
- Sử dụng ethers.js để tương tác với contract
- Tự động convert từ wei sang token units (dựa trên decimals)
- Xử lý lỗi đầy đủ

✅ **Kiểm tra và chuyển network**
- Tự động phát hiện network hiện tại
- Hướng dẫn user chuyển sang Sepolia nếu cần
- Tự động thêm Sepolia vào MetaMask nếu chưa có

✅ **Tự động refresh balance**
- Refresh khi account thay đổi
- Refresh khi chain thay đổi
- Xử lý edge cases

## Lưu ý

1. **Network**: Ứng dụng yêu cầu Sepolia testnet (Chain ID: 11155111)
2. **Contract**: Đảm bảo contract đã được deploy trên Sepolia
3. **MetaMask**: User cần cài đặt MetaMask extension
4. **Test tokens**: User cần có tokens trong ví để hiển thị balance > 0

## Các bước tiếp theo (TODO)

- [ ] Implement `handleRedeem()` để gọi smart contract khi đổi thưởng
- [ ] Thêm loading state khi đang fetch balance
- [ ] Thêm error boundary cho Web3 errors
- [ ] Cache balance để giảm số lần gọi contract
- [ ] Thêm transaction history từ blockchain events

