type PriceOption = {
  priceFrom?: number;
  priceTo?: number;
};

export const filterPrices: Record<string, PriceOption> = {
  "Giá dưới 500.000₫": {
    priceTo: 500000,
  },
  "500.000₫ - 1.000.000₫": {
    priceFrom: 500000,
    priceTo: 1000000,
  },
  "1.000.000₫ - 1.500.000₫": {
    priceFrom: 1000000,
    priceTo: 1500000,
  },
  "1.500.000₫ - 2.000.000₫": {
    priceFrom: 1500000,
    priceTo: 2000000,
  },
  "2.000.000₫ - 2.500.000₫": {
    priceFrom: 2000000,
    priceTo: 2500000,
  },
  "Giá trên 2.500.000₫": {
    priceFrom: 2500000,
  },
};
