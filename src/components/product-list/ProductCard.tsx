import { convertSlugUrl, formatPrice } from "@/lib/utils";
import { TParamsProductCard } from "@/types/products";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductCard = ({
  id,
  productName,
  price,
  imageUrl,
  // sale,
  // priceAfterSale,
  // image,
}: TParamsProductCard) => {
  const router = useRouter();
  return (
    <div
      id={id}
      className="group mx-auto w-full max-w-[13rem] space-y-1 overflow-hidden rounded-[0.625rem] bg-white px-4 py-3"
    >
      <div>
        <Image
          src={imageUrl}
          alt={productName}
          width={145}
          height={145}
          className="mx-auto h-[9.0625rem] w-auto"
        />
      </div>
      <div className="pt-3">
        <Link
          href={`/san-pham/${convertSlugUrl(productName)}-${id}.html`}
          className="space-y-1"
        >
          <div className="line-clamp-3 min-h-[3.9875rem] text-[0.825rem] font-normal leading-normal text-[#333] group-hover:underline xs:text-[0.875rem]">
            {productName}
          </div>
        </Link>
      </div>
      <Rating name="read-only" value={5} readOnly />
      <p className="text-normal font-bold leading-[1.21] text-[#C11616]">
        {formatPrice(price)}
      </p>
      {/*
      <div className="flex flex-row items-center gap-1 pb-1">
        <p className="text-[0.75rem] font-bold leading-[1.21] text-[#8C8F8D] line-through">
          {formatPrice(price)}
        </p>
        <div className="rounded-full bg-[linear-gradient(295deg,#CD1A0C_0%,#FF5246_98.45%)] px-1.5 py-1 text-[0.625rem] font-bold text-white">{`-${sale}%`}</div>
      </div>
      */}
      <button
        onClick={() => {
          router.push(`/san-pham/${convertSlugUrl(productName)}-${id}.html`);
          router.refresh();
        }}
        className="text-normal w-full rounded-full bg-[#1F5ADD] py-3 leading-[1.21] text-white transition-all duration-300 hover:bg-[#2c6af0]"
      >
        Chọn mua
      </button>
    </div>
  );
};

export default ProductCard;
