export const mockOrders = [
  {
    id: 1234,
    orderNumber: "ORD-1234",
    customerId: 1,
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@example.com",
    customerPhone: "0901234567",
    status: "PENDING",
    paymentMethod: "INTERNET_BANKING",
    paymentStatus: "PENDING",
    shippingMethod: "TPHCM",
    shippingAddress: "123 Nguyễn Văn Linh, Q7, TP.HCM",
    note: "Giao hàng giờ hành chính",
    products: [
      {
        productId: 1,
        productName: "Whey Protein Isolate",
        variant: "1kg - Chocolate",
        image: "/product-banners/banner-1.webp",
        quantity: 2,
        price: 1050000,
        total: 2100000,
      },
      {
        productId: 2,
        productName: "Mass Gainer",
        variant: "5kg - Chocolate",
        image: "/product-banners/banner-2.webp",
        quantity: 1,
        price: 2250000,
        total: 2250000,
      },
    ],
    subtotal: 4350000,
    shippingFee: 30000,
    discount: 0,
    total: 4380000,
    createdAt: "2024-10-13T08:30:00Z",
    updatedAt: "2024-10-13T08:30:00Z",
    timeline: [
      {
        status: "PENDING",
        description: "Đơn hàng đã được tạo",
        timestamp: "2024-10-13T08:30:00Z",
      },
    ],
  },
  {
    id: 1235,
    orderNumber: "ORD-1235",
    customerId: 2,
    customerName: "Trần Thị B",
    customerEmail: "tranthib@example.com",
    customerPhone: "0912345678",
    status: "SHIPPING",
    paymentMethod: "MOMO",
    paymentStatus: "PAID",
    shippingMethod: "TPHCM",
    shippingAddress: "456 Lê Văn Việt, Q9, TP.HCM",
    note: null,
    products: [
      {
        productId: 3,
        productName: "Pre-Workout Extreme",
        variant: "30 servings - Fruit Punch",
        image: "/product-banners/banner-3.webp",
        quantity: 3,
        price: 800000,
        total: 2400000,
      },
    ],
    subtotal: 2400000,
    shippingFee: 30000,
    discount: 100000,
    total: 2330000,
    createdAt: "2024-10-13T07:00:00Z",
    updatedAt: "2024-10-13T09:00:00Z",
    timeline: [
      {
        status: "PENDING",
        description: "Đơn hàng đã được tạo",
        timestamp: "2024-10-13T07:00:00Z",
      },
      {
        status: "SHIPPING",
        description: "Đơn hàng đang được giao",
        timestamp: "2024-10-13T09:00:00Z",
      },
    ],
  },
];

export const orderStatuses = [
  { value: "PENDING", label: "Chờ xử lý", color: "yellow" },
  { value: "CONFIRMED", label: "Đã xác nhận", color: "blue" },
  { value: "SHIPPING", label: "Đang giao", color: "indigo" },
  { value: "SUCCESS", label: "Hoàn thành", color: "green" },
  { value: "CANCELLED", label: "Đã hủy", color: "red" },
];

export const paymentMethods = [
  { value: "CASH", label: "Tiền mặt" },
  { value: "INTERNET_BANKING", label: "Chuyển khoản" },
  { value: "MOMO", label: "Ví MoMo" },
  { value: "VNPAY", label: "VNPay" },
];

export type Order = (typeof mockOrders)[0];
