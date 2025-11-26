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
  const id: string = getIdFromSlug(params.id);
  const result = await productApiRequest.productDetail(id);
  const product = result.payload;
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: product.productName,
    openGraph: {
      images: [product.images[0]?.imgUrl || "", ...previousImages],
    },
  };
}

const page = async ({ params }: TProps) => {
  const productRes = await productApiRequest.productDetail(
    getIdFromSlug(params.id),
  );
  const productData = productRes.payload;
  const variantsRes = await productApiRequest.productVariants(productData.id);
  const variantsData = variantsRes.payload;

  const discount = Math.floor(Math.random() * 100);

  const productOverviewProps = {
    id: productData.id,
    name: productData.productName,
    images: productData.images.map((image) => image.imgUrl),
    brandId: productData.brandId,
    rating: 5,
    price: productData.price * (1 + discount / 100), // price before discount
    priceAfterDiscount: productData.price,
    discount: discount,
    promotionInformation: [
      "Mua kèm giá sốc, tặng quà hấp dẫn theo đơn hàng.",
      "Miễn 50% phí Ship (tối đa 50k) cho đơn hàng từ 500k.",
      "Miễn 100% phí Ship cho đơn hàng trên 3.500k.",
      "Tích lũy Hạng thành viên để nhận chiết khấu hấp dẫn.",
      "Đổi trả miễn phí trong 7 ngày nếu sản phẩm lỗi.",
      "Cam kết 100% sản phẩm chính hãng, có tem chống hàng giả.",
    ],
    variants: variantsData,
    attributes: productData.attributes,
  };

  return (
    <div className="relative w-full leading-[1.21]">
      <div
        className={cn("mx-auto w-full max-w-[75rem] py-4 xs:py-8 xl:w-full")}
      >
        <ProductDetailBreadcrumb
          categoryId={productData.categoryId}
          name={productData.productName}
        />
        <ProductOverview {...productOverviewProps} />
        <ProductDescription description={""} />
        <ProductReviews />
      </div>
    </div>
  );
};

export default page;
