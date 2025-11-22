import FilterBar from "@/components/product-list/FilterBar";
import ProductCategoryList from "@/components/product-list/ProductCategoryList";
import { ProductListBreadcrumb } from "@/components/product-list/ProductListBreadcrumb";
import ProductSection from "@/components/product-list/ProductSection";
import { categories } from "@/data/category";
import { cn, getIdFromSlug } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";

type TProps = {
  params: {
    category: string;
  };
};

export async function generateMetadata(
  { params }: TProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const category = params.category;
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title:
      category === "tat-ca-san-pham"
        ? "Tất cả sản phẩm"
        : category === "tim-kiem"
          ? "Tra cứu sản phẩm"
          : categories[
              getIdFromSlug(category) as unknown as keyof typeof categories
            ],
    openGraph: {
      images: [...previousImages],
    },
  };
}

const page = async ({ params }: TProps) => {
  return (
    <div className="relative w-full leading-[1.21]">
      <div className="mx-auto w-full max-w-[75rem] space-y-4 py-4 xs:py-8 xl:w-full">
        <div className="mx-auto w-[95%] max-w-[75rem] space-y-4 xl:w-full">
          <ProductListBreadcrumb params={params} />
          {params.category === "tat-ca-san-pham" && <ProductCategoryList />}
        </div>
        <div
          className={cn(
            "flex w-full flex-row justify-around",
            params.category === "tat-ca-san-pham" ? "pt-4 xs:pt-8" : "",
          )}
        >
          <FilterBar category={params.category} />
          <div className="w-full xl:w-[54.5rem]">
            <ProductSection category={params.category} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
