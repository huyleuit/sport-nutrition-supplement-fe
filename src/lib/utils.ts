import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";
import { EntityError } from "./http";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(price)
    .replace(/\s/g, "");
}

export function formatPhoneNumber(phone: string) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
}

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const getContrastingColor = (hex: string): string => {
  hex = hex.replace(/^#/, "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

export const getInitials = (fullName: string): string => {
  const words = fullName.trim().split(/\s+/);

  if (words.length >= 2) {
    const firstInitial = words[0][0];
    const lastInitial = words[words.length - 1][0];
    return `${firstInitial}${lastInitial}`.toUpperCase();
  } else {
    throw new Error("Chuỗi phải chứa ít nhất hai từ.");
  }
};

export const getVietnameseDate = (date: string) => {
  const options = {
    year: "numeric" as const,
    month: "numeric" as const,
    day: "numeric" as const,
  };
  return new Date(date).toLocaleDateString("vi-VN", options);
};

export const getVietnameseTime = (date: string) => {
  return new Date(date).toLocaleTimeString("vi-VN");
};

export const objectToArray = <T extends Record<string, any>>(
  obj: T,
): { field: keyof T; message: T[keyof T] }[] =>
  Object.entries(obj).map(([key, value]) => ({
    field: key as keyof T,
    message: value as T[keyof T],
  }));

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    objectToArray(error.payload.errors).forEach((item) => {
      setError(item.field as string, {
        type: "server",
        message: String(item.message),
      });
    });
  } else {
    toast({
      title: "Lỗi",
      description: error?.payload?.message ?? "Lỗi không xác định",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const getKeyByValueIgnoreCase = (
  obj: Record<string, string>,
  value: string,
) => {
  const lowerValue = value.toLowerCase();
  return Object.keys(obj).find((key) => obj[key].toLowerCase() === lowerValue);
};

export const convertSlugUrl = (str: string) => {
  if (!str) return "";
  return slugify(str, {
    lower: true,
    locale: "vi",
  });
};

export const getIdFromSlug = (slug: string) => {
  const splitHtml = slug.split(".html");
  const splitHyphen = splitHtml[0].split("-");
  return splitHyphen[splitHyphen.length - 1];
};
