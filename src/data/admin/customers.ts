export const mockCustomers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    avatar: null,
    totalOrders: 12,
    totalSpent: 15250000,
    status: "ACTIVE",
    addresses: [
      {
        id: 1,
        label: "Nhà riêng",
        address: "123 Nguyễn Văn Linh, Q7, TP.HCM",
        isDefault: true,
      },
      {
        id: 2,
        label: "Văn phòng",
        address: "456 Lê Văn Việt, Q9, TP.HCM",
        isDefault: false,
      },
    ],
    createdAt: "2023-05-10T10:00:00Z",
    lastOrderAt: "2024-10-13T08:30:00Z",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    avatar: null,
    totalOrders: 8,
    totalSpent: 9800000,
    status: "ACTIVE",
    addresses: [
      {
        id: 3,
        label: "Nhà riêng",
        address: "789 Võ Văn Ngân, Thủ Đức, TP.HCM",
        isDefault: true,
      },
    ],
    createdAt: "2023-08-22T10:00:00Z",
    lastOrderAt: "2024-10-13T07:00:00Z",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    avatar: null,
    totalOrders: 5,
    totalSpent: 6250000,
    status: "ACTIVE",
    addresses: [
      {
        id: 4,
        label: "Nhà riêng",
        address: "321 Quang Trung, Gò Vấp, TP.HCM",
        isDefault: true,
      },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    lastOrderAt: "2024-10-12T15:30:00Z",
  },
];

export type Customer = (typeof mockCustomers)[0];
