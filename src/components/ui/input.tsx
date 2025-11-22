"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import visibilityIcon from "/public/visibility-icon.svg";
import visibilityOffIcon from "/public/visibility-off-icon.svg";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <div className="relative">
        <input
          type={type === "password" ? (isVisible ? "text" : "password") : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <div className="absolute bottom-0 right-0 z-[1] flex size-[2.625rem] cursor-pointer items-center justify-center">
            <Image
              onClick={() => setIsVisible(!isVisible)}
              src={isVisible ? visibilityIcon : visibilityOffIcon}
              alt=""
            />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
