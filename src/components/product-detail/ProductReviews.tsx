import { cn } from "@/lib/utils";
import Image from "next/image";
import ratingStar1 from "/public/rating-star-1.svg";
import ratingStar from "/public/rating-star.svg";

export const ProductReviews = () => {
  const customRating = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <li key={i}>
            <Image
              src={ratingStar}
              alt="rating-star"
              className="h-4 w-4 md:h-5 md:w-5"
            />
          </li>,
        );
      } else {
        stars.push(
          <li key={i}>
            <Image
              src={ratingStar1}
              alt="rating-star"
              className="h-4 w-4 md:h-5 md:w-5"
            />
          </li>,
        );
      }
    }
    return stars;
  };
  return (
    <div
      className={cn(
        "relative mx-auto mt-8 w-[95%] select-none justify-between overflow-hidden rounded-[0.75rem] bg-white p-6",
      )}
    >
      <h3 className={cn("text-[1.25rem] font-bold uppercase leading-[1.21]")}>
        Đánh giá sản phẩm
      </h3>
      <div className="mb-4 mt-2 h-px w-full bg-[#E5E7Eb]" />
      <div className="md:flex md:flex-row">
        <div className="md:mr-8">
          <div className="mb-4 flex items-center justify-between md:mb-0 md:block">
            <div>
              <p className="text-base font-semibold text-[#4A4F63]">
                Trung bình
              </p>
              <p
                className={cn(
                  "flex items-center text-[1.75rem] font-semibold leading-[2.5rem] text-[#020B27]",
                  "md:text-[2.25rem] md:leading-[3.25rem]",
                )}
              >
                5
                <svg
                  width="24"
                  height="24"
                  className="ml-2"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.803 6.08569C22.7017 4.26474 25.2983 4.26473 26.197 6.08568L31.0493 15.9177L41.8996 17.4943C43.9091 17.7863 44.7115 20.2558 43.2574 21.6732L35.4061 29.3264L37.2595 40.1327C37.6028 42.1342 35.5021 43.6604 33.7047 42.7155L24 37.6134L14.2952 42.7155C12.4978 43.6604 10.3971 42.1342 10.7404 40.1327L12.5938 29.3264L4.74255 21.6732C3.28843 20.2558 4.09083 17.7863 6.10037 17.4943L16.9506 15.9177L21.803 6.08569Z"
                    fill="url(#paint0_linear_4531_177138)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_4531_177138"
                      x1="43.9999"
                      y1="43.0023"
                      x2="5.75441"
                      y2="3.04089"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F79009"></stop>
                      <stop offset="1" stopColor="#FDB022"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </p>
            </div>
            <button
              className={cn(
                "inline-flex h-12 items-center justify-center rounded-[2.625rem] bg-[linear-gradient(315deg,#1250dc_0%,#306de4_100%)] px-6 py-3 text-base font-medium tracking-[0.005em] text-white",
                "focus-visible:outline-none",
              )}
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-center gap-2">
            <ul className="flex flex-row items-center">{customRating(5)}</ul>
            <div className="h-2 w-[14.375rem] grow rounded-[.5rem] bg-[linear-gradient(315deg,#f79009_0%,#fdb022_100%)] md:grow-0" />
            <span className="text-[.8125rem] leading-[1.125rem] tracking-[.02rem] text-[#020B27]">
              5
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <ul className="flex flex-row items-center">{customRating(4)}</ul>
            <div className="h-2 w-[14.375rem] grow rounded-[.5rem] bg-[#D9DFE5] md:grow-0" />
            <span className="text-[.8125rem] leading-[1.125rem] tracking-[.02rem] text-[#020B27]">
              0
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <ul className="flex flex-row items-center">{customRating(3)}</ul>
            <div className="h-2 w-[14.375rem] grow rounded-[.5rem] bg-[#D9DFE5] md:grow-0" />
            <span className="text-[.8125rem] leading-[1.125rem] tracking-[.02rem] text-[#020B27]">
              0
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <ul className="flex flex-row items-center">{customRating(2)}</ul>
            <div className="h-2 w-[14.375rem] grow rounded-[.5rem] bg-[#D9DFE5] md:grow-0" />
            <span className="text-[.8125rem] leading-[1.125rem] tracking-[.02rem] text-[#020B27]">
              0
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <ul className="flex flex-row items-center">{customRating(1)}</ul>
            <div className="h-2 w-[14.375rem] grow rounded-[.5rem] bg-[#D9DFE5] md:grow-0" />
            <span className="text-[.8125rem] leading-[1.125rem] tracking-[.02rem] text-[#020B27]">
              0
            </span>
          </div>
        </div>
      </div>
      <div className="my-4 h-px w-full bg-[#E5E7Eb]" />
    </div>
  );
};
