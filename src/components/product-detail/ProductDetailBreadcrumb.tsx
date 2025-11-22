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
import { useRouter } from "next/navigation";

type TProps = {
  categoryId: number;
  name: string;
};

export const ProductDetailBreadcrumb = ({ categoryId, name }: TProps) => {
  const router = useRouter();

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

  if (findCategoryById(categoryId.toString(), productCategories) === null) {
    router.push("/not-found");
    return null;
  }

  const parentCategory = findParentCategory(
    categoryId.toString(),
    productCategories,
  );
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
                {
                  findCategoryById(categoryId.toString(), productCategories)
                    ?.label
                }
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
                {
                  findCategoryById(categoryId.toString(), productCategories)
                    ?.label
                }
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
