import { cn } from "@/lib/utils";
import Image from "next/image";
import { CustomCarousel } from "../common/CustomCarousel";
import { CarouselItem } from "../ui/carousel";

export const ProductImages = ({ images }: { images: string[] }) => {
  if (images?.length === 0)
    return (
      <div className={cn("flex w-full justify-center lg:w-[22.5rem]")}>
        <div
          className={cn(
            "flex aspect-square w-full items-center justify-center overflow-hidden rounded-[0.625rem] border border-solid border-[#333]/30 xs:size-[22.5rem]",
          )}
        ></div>
      </div>
    );
  if (images?.length === 1) {
    return (
      <div className={cn("flex w-full justify-center lg:w-[22.5rem]")}>
        <div
          className={cn(
            "flex aspect-square w-full items-center justify-center overflow-hidden rounded-[0.625rem] border border-solid border-[#333]/30 xs:size-[22.5rem]",
          )}
        >
          <Image
            src={images[0]}
            alt="Product image"
            width={360}
            height={360}
            className="h-auto max-h-full w-auto max-w-full select-none"
          />
        </div>
      </div>
    );
  }
  return (
    <div className={cn("flex w-full justify-center lg:w-[22.5rem]")}>
      <div
        className={cn(
          "aspect-square w-full overflow-hidden rounded-[0.625rem] border border-solid border-[#333]/30 px-[10%] xs:size-[22.5rem]",
        )}
      >
        <CustomCarousel dotVisible={true}>
          {images?.map((img, index) => (
            <CarouselItem
              key={index}
              className="flex h-[75vw] w-full basis-full items-center justify-center xs:h-[21.5rem]"
            >
              <Image
                src={img}
                alt={`Product image ${index}`}
                width={360}
                height={360}
                className={cn(
                  "h-auto w-auto select-none",
                  "max-h-[70%] max-w-full xs:max-h-[20rem] xs:max-w-[20rem]",
                )}
              />
            </CarouselItem>
          ))}
        </CustomCarousel>
      </div>
    </div>
  );
};
