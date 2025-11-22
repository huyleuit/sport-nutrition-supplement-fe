import { StaticImageData } from "next/image";

export type TParamsCategory = {
  id: string;
  label: string;
  icon: string | StaticImageData;
  children?: {
    id: string;
    label: string;
    icon: string | StaticImageData;
  }[];
};

export type TParamsCategoryWithAmount = {
  id: string;
  label: string;
  icon: string | StaticImageData;
  amount?: number;
  children?: {
    id: string;
    label: string;
    icon: string | StaticImageData;
  }[];
};

export type CategoryType = {
  id: string;
  categoryName: string;
  imgUrl: string;
};

export type CategoryListType = CategoryType[];

export type CategoryTreeType = {
  id: string;
  categoryName: string;
  imgUrl: string;
  children: CategoryTreeType[];
};
