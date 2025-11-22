// ** Import next
import { categories } from "@/data/category";
import { convertSlugUrl } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TProps = {
  category: {
    id: string;
    label: string;
    icon: string | StaticImageData;
    children?: {
      id: string;
      label: string;
      icon: string | StaticImageData;
    }[];
  };
};

const ProductCategory = ({ category }: TProps) => {
  const pathname = usePathname();
  if (pathname === "/danh-muc/tat-ca-san-pham") {
    if (category.children) {
      return (
        <Link
          href={`/danh-muc/${convertSlugUrl(categories[category.children[0].id as unknown as keyof typeof categories])}-${category.children[0].id}`}
          className="flex flex-1 flex-row items-center gap-3 rounded-xl bg-white p-3 leading-[1.21]"
        >
          <div className="size-10">
            <Image
              src={category.children[0].icon}
              alt={category.label}
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="w-full">
            <div className="text-[0.875rem] font-medium">{category.label}</div>
          </div>
        </Link>
      );
    } else {
      return (
        <Link
          href={`/danh-muc/${convertSlugUrl(categories[category.id as unknown as keyof typeof categories])}-${category.id}`}
          className="flex flex-1 flex-row items-center gap-3 rounded-xl bg-white p-3 leading-[1.21]"
        >
          <div className="size-10">
            <Image
              src={category.icon}
              alt={category.label}
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="w-full">
            <div className="text-[0.875rem] font-medium">{category.label}</div>
          </div>
        </Link>
      );
    }
  } else {
    return (
      <Link
        href={`/danh-muc/${convertSlugUrl(categories[category.id as unknown as keyof typeof categories])}-${category.id}`}
        className="flex flex-1 flex-row items-center gap-3 rounded-xl bg-white p-3 leading-[1.21]"
      >
        <div className="flex size-10 min-w-10 items-center justify-center">
          <Image
            src={category.icon}
            alt={category.label}
            width={40}
            height={40}
            className="h-10 w-auto max-w-10"
          />
        </div>
        <div className="w-full">
          <div className="text-[0.875rem] font-medium">{category.label}</div>
        </div>
      </Link>
    );
  }
};

export default ProductCategory;
