import productApiRequest from "@/apiRequests/product";
import { ProductDescription } from "@/components/product-detail/ProductDescription";
import { ProductDetailBreadcrumb } from "@/components/product-detail/ProductDetailBreadcrumb";
import { ProductOverview } from "@/components/product-detail/ProductOverview";
import { ProductReviews } from "@/components/product-detail/ProductReviews";
import { cn, getIdFromSlug } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";

type TProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params }: TProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = getIdFromSlug(params.id);
  const product = await productApiRequest
    .productDetail(id)
    .then((res) => res.payload);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: product.productName,
    openGraph: {
      images: [product.images[0], ...previousImages],
    },
  };
}

const page = async ({ params }: TProps) => {
  const result = await productApiRequest.productDetail(
    getIdFromSlug(params.id),
  );
  const data = result.payload;

  const productOverviewProps = {
    id: data.productId,
    name: data.productName,
    image: data.images,
    brandId: data.brandId,
    rating: 5,
    price: data.price,
    priceAfterDiscount: data.priceAfterSale,
    discount: data.sale,
    promotionInformation: [
      "Dùng mã TANGQUA để được Free quà tặng.",
      "Mua kèm giá sốc, tặng quà theo đơn hàng.",
      "Miễn 50% phí Ship (tối đa 50k) với đơn từ 500k.",
      "Miễn 100% phí Ship với đơn hàng trên 3500k.",
      "Tích lũy Hạng thành viên, chiết khấu hấp dẫn.",
    ],
    variants: data.variants,
    shortDescription: data.shortDescription,
  };
  return (
    <div className="relative w-full leading-[1.21]">
      <div
        className={cn("mx-auto w-full max-w-[75rem] py-4 xs:py-8 xl:w-full")}
      >
        <ProductDetailBreadcrumb
          categoryId={data.categoryId}
          name={data.productName}
        />
        <ProductOverview {...productOverviewProps} />
        <ProductDescription description={data.description} />
        <ProductReviews />
      </div>
    </div>
  );
};

export default page;
