import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  method: string;
  setMethod: Dispatch<SetStateAction<string>>;
  METHODS: {
    icon: StaticImageData | string;
    label: string;
    method: string;
  }[];
  title: string;
};

export const MethodSelection = ({
  method,
  setMethod,
  METHODS,
  title,
}: TProps) => {
  return (
    <div>
      <h2 className="ml-2 text-base font-bold">{title}</h2>
      <div className="mt-1 w-full divide-y bg-white lg:rounded-[0.75rem]">
        {METHODS.map((item) => (
          <button
            key={item.method}
            onClick={() => setMethod(item.method)}
            className="flex w-full flex-row items-center gap-4 px-4 text-left"
          >
            <div
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full",
                method === item.method
                  ? "bg-[#1F5ADD]"
                  : "border-[2px] border-solid border-[#767676] bg-white",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="white"
                className="size-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <div className="flex grow flex-row items-center gap-4 py-4">
              <div className="size-[2.1875rem] shrink-0">
                <Image
                  src={item.icon}
                  alt=""
                  className="h-auto max-w-[2.1875rem]"
                />
              </div>
              <p>{item.label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
