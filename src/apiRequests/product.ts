import http from "@/lib/http";
import { BrandListType } from "@/types/brand";
import { CategoryListType, CategoryTreeType } from "@/types/category";
import {
  AllProductsResType,
  ProductDetailResType,
  ProductVariantListType,
  TopDealsResType,
} from "@/types/product";

const productApiRequest = {
  searchProducts: (queryParams: string) => {
    return http.get<AllProductsResType>(`/products/search?${queryParams}`);
  },
  allProducts: (queryParams: string) => {
    return http.get<AllProductsResType>(`/products?${queryParams}`);
  },
  categoryProducts: (category: string, queryParams: string) => {
    return http.get<AllProductsResType>(
      `/products/category/${category}?${queryParams}`,
    );
  },
  topDeals: () => http.get<TopDealsResType>("/products/top-deals"),
  productDetail: (productId: string) =>
    http.get<ProductDetailResType>(`/products/${productId}`),
  productVariants: (productId: string) =>
    http.get<ProductVariantListType>(`/variants/product/${productId}`),

  // Category
  categories: () => http.get<CategoryListType>("/categories"),
  categoryTree: () => http.get<CategoryTreeType>("/categories/tree"),

  // Brand
  brands: () => http.get<BrandListType>("/brands"),
};

export default productApiRequest;
