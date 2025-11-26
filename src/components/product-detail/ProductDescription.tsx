"use client";
import { inter } from "@/lib/font";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TProps = {
  description: string;
};

export const ProductDescription = ({ description }: TProps) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const descriptionLength = description.length;
  if (descriptionLength === 0) {
    description = "<p>Không có mô tả</p>";
  }
  return (
    <div
      className={cn(
        "relative mx-auto mt-8 w-[95%] justify-between overflow-hidden rounded-[0.75rem] bg-white p-6",
      )}
    >
      <h3 className={cn("text-[1.25rem] font-bold uppercase leading-[1.21]")}>
        Đặc điểm nổi bật
      </h3>
      <div
        className={cn(
          "editor-rendered-content mt-4 overflow-hidden",
          isShowMore ? "max-h-max" : "max-h-[35rem]",
          inter.variable,
        )}
        style={{ fontFamily: inter.style.fontFamily }}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <button
        onClick={() => setIsShowMore(!isShowMore)}
        className={cn(
          "absolute bottom-6 flex h-[5rem] w-[calc(100%-3rem)] flex-col items-center justify-end",
          isShowMore || descriptionLength === 0 ? "hidden" : "",
        )}
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 21.88%, rgba(255, 255, 255, 0.95) 45.31%,#fff 67.71%,#fff 100%)",
        }}
      >
        Xem thêm
      </button>
    </div>
  );
};
