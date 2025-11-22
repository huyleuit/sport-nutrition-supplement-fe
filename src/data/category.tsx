// ** Import images
import { TParamsCategory } from "@/types/category";
import allAccessories from "/public/categories/all-accessories.svg";
import allDiet from "/public/categories/all-diet.webp";
// import allElements from "/public/categories/all-elements.webp";
// import allFat from "/public/categories/all-fat.webp";
// import allMass from "/public/categories/all-mass.webp";
// import allPreworkout from "/public/categories/all-preworkout.webp";
import allProducts from "/public/categories/all-products.svg";
// import allVitamin from "/public/categories/all-vitamin.webp";
// import allWhey from "/public/categories/all-whey.webp";
import amino from "/public/categories/amino.svg";
import arginine from "/public/categories/arginine.webp";
// import bcaaeaa from "/public/categories/bcaa-eaa.webp";
import bcaa from "/public/categories/bcaa.webp";
import betaAlanine from "/public/categories/beta-alanine.webp";
import caffeine from "/public/categories/caffeine.webp";
import citrulline from "/public/categories/citrulline.webp";
import creatine from "/public/categories/creatine.webp";
import diet from "/public/categories/diet.svg";
import eaa from "/public/categories/eaa.webp";
import element from "/public/categories/element.webp";
import fatBurner from "/public/categories/fat-burner.svg";
import fatCaffeine from "/public/categories/fat-caffeine.webp";
import fatNoCaffeine from "/public/categories/fat-no-caffeine.webp";
import hightMass from "/public/categories/high-mass.webp";
import lookup from "/public/categories/lookup.svg";
import massGainer from "/public/categories/mass-gainer.webp";
import mediumMass from "/public/categories/medium-mass.webp";
import otherElements from "/public/categories/other-elements.webp";
import practice from "/public/categories/practice.svg";
import preworkoutCaffeine from "/public/categories/preworkout-caffeine.webp";
import preworkoutNoCaffeine from "/public/categories/preworkout-no-caffeine.webp";
import taurine from "/public/categories/taurine.webp";
import vitaminBeauty from "/public/categories/vitamin-beauty.webp";
import vitaminHealthy from "/public/categories/vitamin-healthy.webp";
import vitamin from "/public/categories/vitamin.svg";
import wheyBlend from "/public/categories/whey-blend.webp";
import wheyPlant from "/public/categories/whey-plant.webp";
import wheyProtein from "/public/categories/whey-protein-1.webp";
import workout from "/public/categories/workout.svg";
import zma from "/public/categories/zma.webp";
import saleIcon from "/public/sale-icon.svg";
import saleTag from "/public/sale-tag.svg";

export const productCategories: Array<TParamsCategory> = [
  {
    id: "31",
    label: "GIÁ SIÊU ƯU ĐÃI",
    icon: saleIcon,
  },
  {
    id: "32",
    label: "Deal Hot - Combo Tiết Kiệm",
    icon: saleIcon,
  },
  {
    id: "whey-protein-category",
    label: "Whey Protein (Sữa Tăng Cơ)",
    icon: wheyProtein,
    children: [
      // {
      //   id: "1",
      //   label: "Whey Protein",
      //   icon: allWhey,
      // },
      {
        id: "11",
        label: "Protein Trải Dài",
        icon: wheyBlend,
      },
      {
        id: "12",
        label: "Protein Thực Vật",
        icon: wheyPlant,
      },
    ],
  },
  {
    id: "mass-gainer-category",
    label: "Mass Gainer (Sữa Tăng Cân)",
    icon: massGainer,
    children: [
      // {
      //   id: "2",
      //   label: "Mass Gainer",
      //   icon: allMass,
      // },
      {
        id: "13",
        label: "Mass Cao Năng Lượng",
        icon: hightMass,
      },
      {
        id: "14",
        label: "Mass Trung Năng Lượng",
        icon: mediumMass,
      },
    ],
  },
  {
    id: "eaa-bcaa-category",
    label: "EAA-BCAA (Amino Thiết Yếu)",
    icon: amino,
    children: [
      // {
      //   id: "3",
      //   label: "Tất cả BCAA-EAA",
      //   icon: bcaaeaa,
      // },
      {
        id: "15",
        label: "EAA",
        icon: eaa,
      },
      {
        id: "16",
        label: "BCAA",
        icon: bcaa,
      },
    ],
  },
  {
    id: "fat-burner-category",
    label: "Fat Burner (Đốt Mỡ)",
    icon: fatBurner,
    children: [
      // {
      //   id: "4",
      //   label: "Tất cả Fat Burner",
      //   icon: allFat,
      // },
      {
        id: "17",
        label: "Đốt Mỡ Không Chất Kích Thích",
        icon: fatNoCaffeine,
      },
      {
        id: "18",
        label: "Đốt Mỡ Có Chất Kích Thích",
        icon: fatCaffeine,
      },
    ],
  },
  {
    id: "pre-workout-category",
    label: "Pre-Workout (Tăng Sức Mạnh)",
    icon: workout,
    children: [
      // {
      //   id: "5",
      //   label: "Tất Cả Pre-Workout",
      //   icon: allPreworkout,
      // },
      {
        id: "19",
        label: "Tăng Sức Mạnh Có Caffeine",
        icon: preworkoutCaffeine,
      },
      {
        id: "20",
        label: "Tăng Sức Mạnh Không Caffeine",
        icon: preworkoutNoCaffeine,
      },
    ],
  },
  {
    id: "vitamin-category",
    label: "Vitamin (Tăng Cường Sức Khỏe)",
    icon: vitamin,
    children: [
      // {
      //   id: "6",
      //   label: "Tất Cả Các Loại Vitamin",
      //   icon: allVitamin,
      // },
      {
        id: "21",
        label: "Vitamin Sức Khỏe",
        icon: vitaminHealthy,
      },
      {
        id: "22",
        label: "Thực phẩm Sắc Đẹp",
        icon: vitaminBeauty,
      },
      {
        id: "23",
        label: "ZMA (Zinc - Magnesium - B6)",
        icon: zma,
      },
    ],
  },
  {
    id: "element-category",
    label: "Đơn Chất",
    icon: element,
    children: [
      // {
      //   id: "7",
      //   label: "Tất Cả Các Đơn Chất",
      //   icon: allElements,
      // },
      {
        id: "24",
        label: "Creatine",
        icon: creatine,
      },
      {
        id: "25",
        label: "Caffeine",
        icon: caffeine,
      },
      {
        id: "26",
        label: "Beta Alanine",
        icon: betaAlanine,
      },
      {
        id: "27",
        label: "Citrulline",
        icon: citrulline,
      },
      {
        id: "28",
        label: "Arginine",
        icon: arginine,
      },
      {
        id: "29",
        label: "Taurine",
        icon: taurine,
      },
      {
        id: "30",
        label: "Các Đơn Chất Khác",
        icon: otherElements,
      },
    ],
  },
  {
    id: "diet-category",
    label: "Thực Phẩm Ăn Kiêng",
    icon: diet,
    children: [
      {
        id: "8",
        label: "Tất Cả Các Loại Thực Phẩm Ăn Kiêng",
        icon: allDiet,
      },
    ],
  },
  {
    id: "practice-category",
    label: "Phụ Kiện Tập Luyện",
    icon: practice,
    children: [
      {
        id: "9",
        label: "Tất Cả Phụ Kiện",
        icon: allAccessories,
      },
    ],
  },
  {
    id: "sale-tag",
    label: "Thanh Lý Hàng Lỗi",
    icon: saleTag,
    children: [
      {
        id: "10",
        label: "XẢ KHO SALE",
        icon: saleTag,
      },
    ],
  },
  {
    id: "tim-kiem",
    label: "Tra Cứu Sản Phẩm",
    icon: lookup,
  },
  {
    id: "tat-ca-san-pham",
    label: "Tất cả sản phẩm",
    icon: allProducts,
  },
];

export const categories = {
  1: "Whey Protein",
  11: "Protein Trải Dài",
  12: "Protein Thực Vật",
  2: "Mass Gainer",
  13: "Mass Cao Năng Lượng",
  14: "Mass Trung Năng Lượng",
  3: "BCAA-EAA",
  15: "EAA",
  16: "BCAA",
  4: "Fat Burner",
  17: "Đốt Mỡ Không Chất Kích Thích",
  18: "Đốt Mỡ Có Chất Kích Thích",
  5: "Pre-Workout",
  19: "Tăng Sức Mạnh Có Caffeine",
  20: "Tăng Sức Mạnh Không Caffeine",
  6: "Vitamin",
  21: "Vitamin Sức Khỏe",
  22: "Thực phẩm Sắc Đẹp",
  23: "ZMA (Zinc - Magnesium - B6)",
  7: "Đơn Chất",
  24: "Creatine",
  25: "Caffeine",
  26: "Beta Alanine",
  27: "Citrulline",
  28: "Arginine",
  29: "Taurine",
  30: "Các Đơn Chất Khác",
  8: "Thực Phẩm Sức Khỏe Ăn Kiêng",
  9: "Phụ Kiện",
  10: "Thanh Lý Hàng Lỗi",
  31: "GIÁ SIÊU ƯU ĐÃI",
  32: "Deal Hot - Combo Tiết Kiệm",
};
