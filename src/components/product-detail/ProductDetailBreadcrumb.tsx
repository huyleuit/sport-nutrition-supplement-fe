"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { categories, productCategories } from "@/data/category";
import { convertSlugUrl } from "@/lib/utils";
import { TParamsCategory } from "@/types/category";

type TProps = {
  categoryId: string;
  name: string;
};

export const ProductDetailBreadcrumb = ({ categoryId, name }: TProps) => {
  const findParentCategory = (
    categoryId: string,
    categories: TParamsCategory[],
    parent: TParamsCategory | null = null,
  ): TParamsCategory | null => {
    for (const category of categories) {
      if (category.id === categoryId) {
        return parent;
      }
      if (category.children) {
        const parentCategory = findParentCategory(
          categoryId,
          category.children,
          category,
        );
        if (parentCategory) {
          return parentCategory;
        }
      }
    }
    return null;
  };

  const findCategoryById = (
    categoryId: string,
    categories: TParamsCategory[],
  ): TParamsCategory | null => {
    for (const category of categories) {
      if (category.id === categoryId) {
        return category;
      }
      if (category.children) {
        const foundCategory = findCategoryById(categoryId, category.children);
        if (foundCategory) {
          return foundCategory;
        }
      }
    }
    return null;
  };

  const currentCategory = findCategoryById(
    categoryId.toString(),
    productCategories,
  );
  const parentCategory = findParentCategory(
    categoryId.toString(),
    productCategories,
  );

  // Nếu không tìm thấy category trong data, vẫn hiển thị breadcrumb cơ bản
  if (!currentCategory) {
    console.warn("⚠️ Category not found in local data:", categoryId);
    return (
      <Breadcrumb className="px-[0.625rem]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="line-clamp-1 text-black">
            {name}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb className="px-[0.625rem]">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        {parentCategory ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/danh-muc/${convertSlugUrl(categories[parentCategory.children?.[0].id as unknown as keyof typeof categories])}-${parentCategory.children?.[0].id}`}
              >
                {parentCategory?.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-black">
              <BreadcrumbLink
                href={`/danh-muc/${convertSlugUrl(categories[categoryId as unknown as keyof typeof categories])}-${categoryId}`}
              >
                {currentCategory?.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="line-clamp-1 text-black">
              {name}
            </BreadcrumbItem>
          </>
        ) : (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-black">
              <BreadcrumbLink
                href={`/danh-muc/${convertSlugUrl(categories[categoryId as unknown as keyof typeof categories])}-${categoryId}`}
              >
                {currentCategory?.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="line-clamp-1 text-black">
              {name}
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
