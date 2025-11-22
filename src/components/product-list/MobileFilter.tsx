import {
  checkValidQuery,
  convertStringToQueriesObject,
  convertValidStringQueries,
  filterOptions,
} from "@/components/product-list/FilterBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { filterPrices } from "@/data/filterPrices";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import filterIcon from "/public/filter.svg";

const MobileFilter = ({ category }: { category: string }) => {
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
        ) ||
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
    <div className="shrink-0 leading-[1.21] xl:hidden">
      <Sheet>
        <SheetTrigger className="flex flex-row items-center">
          <Image src={filterIcon} alt="filter" width={24} height={24} />
          <span className="text-base font-medium">Lọc</span>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          iconColor={"text-[#000]"}
          className="no-scrollbar h-[80vh] w-full overflow-x-hidden overflow-y-scroll rounded-t-[0.625rem] bg-white"
        >
          <div className="w-full border-b border-solid border-[#333]/30 p-4 text-center text-base font-semibold">
            Bộ lọc nâng cao
          </div>
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
                    <AccordionTrigger className="px-4 pb-3 pt-4 text-base font-medium uppercase">
                      {title}
                    </AccordionTrigger>
                    <AccordionContent
                      className={cn(
                        "grid items-center gap-4 px-4 pt-2",
                        id === "prices"
                          ? "grid-cols-1 sm:grid-cols-2"
                          : "grid-cols-2",
                      )}
                    >
                      {Object.entries(options).map(([key, value]) => {
                        if (id === "prices") {
                          return (
                            <CheckboxAndRadioGroup
                              key={id === "prices" ? key : value}
                            >
                              <CheckboxAndRadioItem
                                type={type}
                                name={id}
                                id={`${id}-${key.toLocaleLowerCase().trim()}`}
                                label={id === "prices" ? key : value} // Hiển thị name cho người dùng
                                value={id === "prices" ? key : value} // Sử dụng name trong quá trình kiểm tra
                                checked={isChecked(
                                  id,
                                  id === "prices" ? key : value,
                                )} // Kiểm tra xem option đã được chọn chưa
                                onChange={handleSelectFilterOptions}
                              />
                            </CheckboxAndRadioGroup>
                          );
                        } else {
                          return (
                            <CheckboxAndRadioGroup
                              key={id === "prices" ? key : value}
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
                        }
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilter;

interface ICheckboxAndRadioGroup {
  children: ReactNode;
}

function CheckboxAndRadioGroup({ children }: ICheckboxAndRadioGroup) {
  return (
    <div className="relative flex flex-row items-center gap-2">{children}</div>
  );
}

interface CheckboxAndRadioItem extends ComponentPropsWithoutRef<"input"> {
  label: string;
}

function CheckboxAndRadioItem({ id, label, ...props }: CheckboxAndRadioItem) {
  return (
    <>
      <input id={id} className="peer hidden" {...props} />
      <label
        htmlFor={id}
        className={cn(
          "inline-flex w-full cursor-pointer flex-row items-center justify-center rounded-[0.375rem] border border-solid border-[#333] px-4 py-3 text-sm transition-all duration-200",
          "peer-checked:border-[#1250dc] peer-checked:bg-[#1250dc]/10 peer-checked:text-[#1250dc]",
          props.type === "radio" ? "" : "uppercase",
        )}
      >
        {label}
      </label>
    </>
  );
}
