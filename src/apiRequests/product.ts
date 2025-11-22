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
    return http.get<AllProductsResType>(`/collection/search?${queryParams}`);
  },
  allProducts: (queryParams: string) => {
    return http.get<AllProductsResType>(`/collection/all?${queryParams}`);
  },
  categoryProducts: (category: string, queryParams: string) => {
    return http.get<AllProductsResType>(
      `/collection/category/${category}?${queryParams}`,
    );
  },
  topDeals: () => http.get<TopDealsResType>("/products/top-deals"),
  productDetail: (productId: string) =>
    http.get<ProductDetailResType>(`/products/${productId}`),
  productVariants: (productId: string) =>
    http.get<ProductVariantListType>(`/products/${productId}/variants`),

  // Category
  categories: () => http.get<CategoryListType>("/categories"),
  categoryTree: () => http.get<CategoryTreeType>("/categories/tree"),

  // Brand
  brands: () => http.get<BrandListType>("/brands"),
};

export default productApiRequest;
