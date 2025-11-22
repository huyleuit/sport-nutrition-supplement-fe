import { cn, convertSlugUrl } from "@/lib/utils";
import Image from "next/image";

// ** Import images
import { categories, productCategories } from "@/data/category";
import arrow from "/public/arrow.svg";

const SideBar = () => {
  return (
    <div
      className={cn(
        "sticky top-32 z-[1] hidden h-[37.75rem] w-[20rem] rounded-2xl bg-white xl:block",
      )}
    >
      <div className="relative">
        <div className="px-4 py-3">
          <h2 className="text-base font-bold leading-[1.21]">Danh mục</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            {productCategories.map((nav, index) => (
              <li key={index}>
                {!nav.children && (
                  <a
                    href={
                      nav.id === "tat-ca-san-pham" || nav.id === "tim-kiem"
                        ? `/danh-muc/${nav.id}`
                        : `/danh-muc/${convertSlugUrl(categories[nav.id as unknown as keyof typeof categories])}-${nav.id}`
                    }
                    className={cn(
                      "flex min-h-8 flex-row items-center gap-2 px-4 text-[0.875rem] font-semibold text-[#333333] hover:text-[#1250DC] hover:underline",
                    )}
                  >
                    <div className="flex w-8 items-center justify-center">
                      {nav.icon && (
                        <Image
                          src={nav.icon}
                          alt={nav.label}
                          className={cn(
                            "h-8 w-auto",
                            nav.icon ? "" : "opacity-0",
                          )}
                        />
                      )}
                    </div>
                    <span>{nav.label}</span>
                  </a>
                )}
                {nav.children && (
                  <div
                    className={cn(
                      "group relative flex cursor-pointer flex-row items-center gap-2 px-4 text-[0.875rem] font-semibold text-[#333333]",
                    )}
                  >
                    <div className="flex w-8 items-center justify-center">
                      <Image
                        src={nav.icon}
                        alt={nav.label}
                        className={cn(
                          "h-8 w-auto",
                          nav.icon ? "" : "opacity-0",
                        )}
                      />
                    </div>
                    <span className="group-hover:text-[#1250DC] group-hover:underline">
                      {nav.label}
                    </span>
                    <Image
                      src={arrow}
                      alt=""
                      className="absolute right-4 h-5 w-auto"
                    />
                    <div className="absolute top-0 z-[2000] hidden w-[20rem] -translate-y-[50%] translate-x-[19.05rem] flex-col rounded-2xl bg-white py-4 opacity-0 shadow-xl group-hover:flex group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-300">
                      <ul className="space-y-2 px-4">
                        {nav.children.map((childNav, index) => (
                          <li key={index}>
                            <a
                              href={`/danh-muc/${convertSlugUrl(categories[childNav.id as unknown as keyof typeof categories])}-${childNav.id}`}
                              className={cn(
                                "flex min-h-8 flex-row items-center gap-2 text-[0.875rem] font-semibold text-[#333333] hover:text-[#1250DC] hover:underline",
                              )}
                            >
                              <div className="flex w-8 flex-shrink-0 items-center justify-center">
                                {childNav.icon && (
                                  <Image
                                    src={childNav.icon}
                                    alt={childNav.label}
                                    loading="lazy"
                                    className={cn(
                                      "h-8 w-auto object-fill",
                                      childNav.icon ? "" : "opacity-0",
                                    )}
                                  />
                                )}
                              </div>
                              <span>{childNav.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
