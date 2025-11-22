"use client";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type TProps = {
  dotVisible?: boolean;
  children: React.ReactNode;
};

export function CustomCarousel({ dotVisible = false, children }: TProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="mx-auto w-full"
    >
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious className="-left-6" />
      <CarouselNext className="-right-6" />
      <CarouselDots className={cn(dotVisible ? "" : "hidden")} />
    </Carousel>
  );
}
