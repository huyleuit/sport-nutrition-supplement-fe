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

- [x] Implement `handleRedeem()` để gọi smart contract khi đổi thưởng
- [x] Thêm loading state khi đang fetch balance
- [x] Thêm error boundary cho Web3 errors
- [x] Cache balance để giảm số lần gọi contract
- [x] Thêm transaction history từ blockchain events

## Tính năng mới đã implement

### ✅ **Implement handleRedeem() với smart contract**
- Gọi hàm `redeemReward()` từ LoyaltyManager contract
- Tự động approve tokens trước khi redeem
- Kiểm tra network và chuyển sang Sepolia nếu cần
- Xử lý lỗi đầy đủ (rejected transactions, insufficient balance, etc.)
- Refresh balance và transaction history sau khi redeem thành công

### ✅ **Loading states**
- Loading state khi fetch balance (`isLoadingBalance`)
- Loading state khi đang redeem (`isRedeeming`)
- Loading state khi load transaction history (`isLoadingHistory`)
- Hiển thị spinner và disable buttons khi đang xử lý

### ✅ **Error Boundary cho Web3**
- Component `Web3ErrorBoundary` để bắt và hiển thị lỗi Web3
- Hiển thị thông báo lỗi thân thiện với người dùng
- Hướng dẫn khắc phục lỗi
- Nút "Thử lại" để reset error state

### ✅ **Cache balance**
- Cache balance trong 30 giây để giảm số lần gọi contract
- Tự động clear cache khi có transaction mới
- Hàm `clearBalanceCache()` để force refresh khi cần

### ✅ **Transaction history từ blockchain**
- Query Transfer events để lấy lịch sử nhận điểm (earn)
- Query RewardRedeemed events để lấy lịch sử đổi thưởng (redeem)
- Tự động load history khi connect wallet
- Nút "Làm mới" để reload history
- Hiển thị transaction hash và block number

## Các file đã cập nhật

### 1. `src/config/contract.ts`
- ✅ Thêm `loyaltyManagerABI` với các hàm: `redeemReward`, `getRewardCost`, `isCustomerRegistered`
- ✅ Thêm `approve` và `allowance` vào `loyaltyTokenABI`
- ✅ Thêm `Transfer` event vào `loyaltyTokenABI` để query events
- ✅ Thêm default contract addresses

### 2. `src/lib/web3.ts`
- ✅ Thêm `approveTokens(amount)`: Approve tokens cho LoyaltyManager
- ✅ Thêm `redeemReward(rewardId)`: Gọi smart contract để redeem reward
- ✅ Thêm `getTransactionHistory(address)`: Lấy lịch sử giao dịch từ blockchain events
- ✅ Thêm cache cho `getTokenBalance()` với thời gian cache 30 giây
- ✅ Thêm `clearBalanceCache()`: Clear cache khi cần

### 3. `src/components/loyalty/Web3ErrorBoundary.tsx` (MỚI)
- ✅ Error boundary component để bắt lỗi Web3
- ✅ Hiển thị thông báo lỗi và hướng dẫn khắc phục
- ✅ Nút "Thử lại" để reset error state

### 4. `src/components/loyalty/LoyaltySection.tsx`
- ✅ Implement `handleRedeem()` với smart contract calls
- ✅ Thêm loading states: `isLoadingBalance`, `isRedeeming`, `isLoadingHistory`
- ✅ Wrap component với `Web3ErrorBoundary`
- ✅ Load transaction history từ blockchain khi connect wallet
- ✅ Nút "Làm mới" để reload transaction history
- ✅ Hiển thị loading spinner khi đang fetch data
- ✅ Tự động refresh balance sau khi redeem thành công

