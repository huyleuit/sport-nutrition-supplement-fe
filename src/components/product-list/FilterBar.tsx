"use client";

// ** Import next
import Image from "next/image";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

// ** Import react
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useState,
} from "react";

// ** Import ui
import { filterBrands } from "@/data/brand";
import { categories } from "@/data/category";
import { filterPrices } from "@/data/filterPrices";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import filterIcon from "/public/filter.svg";

export const filterOptions = [
  {
    id: "prices",
    title: "Giá bán",
    options: filterPrices,
    type: "radio",
  },
  {
    id: "category",
    title: "Loại sản phẩm",
    options: categories,
    type: "checkbox",
  },
  {
    id: "brand",
    title: "Thương hiệu",
    options: filterBrands,
    type: "checkbox",
  },
];

export function checkValidQuery(queries: string[]) {
  return queries.filter((query) => query !== "").length > 0;
}

export function convertStringToQueriesObject(
  searchParams: ReadonlyURLSearchParams,
) {
  const selectedQueries: Record<string, string[]> = {};
  searchParams.forEach((value, key) => {
    const queries = value.split(",");
    if (selectedQueries[key]) {
      selectedQueries[key].push(...queries);
    } else {
      selectedQueries[key] = queries;
    }
  });
  return selectedQueries;
}

export function convertValidStringQueries(queries: Record<string, string[]>) {
  let q = "";
  const sortedKeys = Object.keys(queries).sort((a, b) => {
    const order = ["category", "brand", "priceFrom", "priceTo"];
    return order.indexOf(a) - order.indexOf(b);
  });
  for (const key of sortedKeys) {
    const value = queries[key];
    if (value.length > 0) {
      q = q + `${q === "" ? "" : "&"}${key}=${value.join(`&${key}=`)}`;
    }
  }
  return q;
}

const FilterBar = ({ category }: { category: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [selectedFilterQueries, setSelectedFilterQueries] = useState<
    Record<string, string[]>
  >({});
  useEffect(() => {
    const paramsObj = convertStringToQueriesObject(searchParams);
    setSelectedFilterQueries(paramsObj);
  }, [searchParams]);

  function handleSelectFilterOptions(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    const selectedQueries = { ...selectedFilterQueries }; // Copy object để giữ nguyên trạng thái cũ

    if (name === "prices") {
      // Tìm khoảng giá dựa trên tên
      const selectedPrice = filterPrices[value as keyof typeof filterPrices];

      if (selectedPrice) {
        // Xóa các giá trị hiện tại của `priceFrom` và `priceTo`
        delete selectedQueries.priceFrom;
        delete selectedQueries.priceTo;

        // Chỉ thêm nếu tồn tại `priceFrom` và `priceTo`
        if (selectedPrice.priceFrom) {
          selectedQueries.priceFrom = [selectedPrice.priceFrom.toString()];
        }
        if (selectedPrice.priceTo) {
          selectedQueries.priceTo = [selectedPrice.priceTo.toString()];
        }
      }
    } else {
      if (selectedQueries[name]) {
        if (type === "radio") {
          selectedQueries[name] = [value];
        } else if (selectedQueries[name].includes(value)) {
          selectedQueries[name] = selectedQueries[name].filter(
            (query) => query !== value,
          );
          if (!checkValidQuery(selectedQueries[name])) {
            delete selectedQueries[name];
          }
        } else {
          selectedQueries[name].push(value);
        }
      } else {
        selectedQueries[name] = [value];
      }
    }

    setSelectedFilterQueries(selectedQueries);

    router.push(`${pathname}?${convertValidStringQueries(selectedQueries)}`, {
      scroll: false,
    });
  }

  function isChecked(id: string, option: string) {
    if (id === "prices") {
      const selectedPrice = filterPrices[option as keyof typeof filterPrices];
      return (
        selectedFilterQueries.priceFrom?.includes(
          selectedPrice?.priceFrom?.toString() || "",
        ) &&
        selectedFilterQueries.priceTo?.includes(
          selectedPrice?.priceTo?.toString() || "",
        )
      );
    }
    return (
      Boolean(selectedFilterQueries[id]) &&
      selectedFilterQueries[id].includes(option.toLowerCase())
    );
  }
  return (
    <>
      <div className="sticky top-32 hidden h-max max-h-[70vh] w-[18rem] overflow-hidden rounded-xl bg-white pb-8 leading-[1.21] xl:block">
        <div className="flex w-full flex-row items-center gap-2 border-b border-solid border-[#333]/30 px-4 pb-2 pt-3">
          <Image src={filterIcon} alt="filter" width={24} height={24} />
          <span className="text-base font-semibold">Bộ lọc nâng cao</span>
        </div>
        <div className="no-scrollbar max-h-[62.5vh] overflow-y-scroll px-4">
          {filterOptions.map(({ id, title, type, options }) => {
            return (
              <div
                key={id}
                className={cn(
                  category !== "tat-ca-san-pham" &&
                    category !== "tim-kiem" &&
                    id === "category"
                    ? "hidden"
                    : "",
                )}
              >
                <Accordion type="single" collapsible defaultValue="prices">
                  <AccordionItem value={id}>
                    <AccordionTrigger className="pb-2 pt-3 text-base font-medium uppercase">
                      {title}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                      {Object.entries(options).map(([key, value]) => {
                        if (id === "prices") {
                          return (
                            <CheckboxAndRadioGroup
                              key={`${id}-${key.toLocaleLowerCase().trim()}`}
                            >
                              <CheckboxAndRadioItem
                                type={type}
                                name={id}
                                id={`${id}-${key.toLocaleLowerCase().trim()}`}
                                label={id === "prices" ? key : value}
                                value={id === "prices" ? key : value}
                                checked={isChecked(
                                  id,
                                  id === "prices" ? key : value,
                                )}
                                onChange={handleSelectFilterOptions}
                              />
                            </CheckboxAndRadioGroup>
                          );
                        } else {
                          return (
                            <CheckboxAndRadioGroup
                              key={`${id}-${key.toLocaleLowerCase().trim()}`}
                            >
                              <CheckboxAndRadioItem
                                type={type}
                                name={id}
                                id={
                                  typeof value === "string"
                                    ? value.toLocaleLowerCase().trim()
                                    : value.name.toLocaleLowerCase().trim()
                                }
                                label={id === "prices" ? key : value}
                                value={
                                  typeof value === "string"
                                    ? value.toLocaleLowerCase().trim()
                                    : value.name.toLocaleLowerCase().trim()
                                }
                                checked={isChecked(
                                  id,
                                  id === "prices" ? key : value,
                                )}
                                onChange={handleSelectFilterOptions}
                              />
                            </CheckboxAndRadioGroup>
                          );
                        }
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FilterBar;

interface ICheckboxAndRadioGroup {
  children: ReactNode;
  className?: string;
}

function CheckboxAndRadioGroup({
  children,
  className,
}: ICheckboxAndRadioGroup) {
  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      {children}
    </div>
  );
}

interface CheckboxAndRadioItem extends ComponentPropsWithoutRef<"input"> {
  label: string;
}

function CheckboxAndRadioItem({ id, label, ...props }: CheckboxAndRadioItem) {
  return (
    <>
      <input
        id={id}
        className={cn(
          props.type === "radio"
            ? "peer hidden"
            : "size-4 shrink-0 text-[0.875rem]",
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "text-sm",
          props.type === "radio"
            ? "inline-flex w-full cursor-pointer flex-row items-center justify-center rounded-[0.375rem] border border-solid border-[#333] px-4 py-3 text-sm transition-all duration-200 peer-checked:border-[#1250dc] peer-checked:bg-[#1250dc]/10 peer-checked:text-[#1250dc]"
            : "uppercase",
        )}
      >
        {label}
      </label>
    </>
  );
}
