export type GetProductsBodyType = {
  brands?: string[] | undefined;
  category?: string[] | undefined;
  page?: number | undefined;
  priceFrom?: string | undefined;
  priceTo?: string | undefined;
  sortByPrice?: string | undefined;
};

export type ProductsResType = {
  id: string;
  productName: string;
  price: number;
  imageUrl: string;
}[];

// export type ProductsResType = {
//   productId: number;
//   productName: string;
//   price: number;
//   sale: number;
//   priceAfterSale: number;
//   image: {
//     imageId: number;
//     imageUrl: string;
//     publicId: string;
//     createAt: string;
//   }[];
// }[];

export type ProductsMetaType = {
  path: string;
  current_page: number;
  from: number | null;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  per_page: number;
  to: number | null;
  total: number;
};

export type AllProductsResType = {
  data: ProductsResType;
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: ProductsMetaType;
};

export type TopDealsResType = {
  productId: number;
  productName: string;
  price: number;
  sale: number;
  priceAfterSale: number;
  image: {
    imageId: number;
    imageUrl: string;
    publicId: string;
    createAt: string;
  }[];
}[];

export type ProductDetailResType = {
  productId: number;
  productName: string;
  price: number;
  sale: number;
  priceAfterSale: number;
  description: string;
  shortDescription: string[];
  categoryId: number;
  brandId: number;
  images: string[];
  variants: {
    variantId: number;
    variantName: string;
    stockQuantity: number;
  }[];
};

export type ProductVariantType = {
  id: string;
  variantName: string;
  productId: string;
  quantity: number;
  imgUrl: string;
};

export type ProductVariantListType = ProductVariantType[];
