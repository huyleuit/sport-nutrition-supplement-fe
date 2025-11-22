import { cn, convertSlugUrl } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ** Import next
import Image from "next/image";

// ** Import ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";

// ** Import images
import { categories, productCategories } from "@/data/category";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MobileUserNavBar } from "./MobileUserNavBar";

const MobileNavBar = () => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "absolute left-[4%] z-[4] block size-5 leading-[1.21] focus:outline-none xs:size-6",
          "xl:hidden",
        )}
      >
        <FontAwesomeIcon icon={faBars} size="xl" color="white" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn("no-scrollbar overflow-y-scroll bg-white xl:hidden")}
      >
        <SheetHeader
          style={{
            background:
              "linear-gradient(180deg, rgba(63,133,233,1) 0%, rgba(48,116,225,1) 50%, rgba(37,105,222,1) 100%)",
          }}
          className="w-full"
        >
          <MobileUserNavBar />
        </SheetHeader>
        <div>
          <ul>
            {productCategories.map((nav, index) => (
              <li key={index}>
                <Accordion type="single" collapsible className="w-full">
                  {!nav.children && (
                    <a
                      href={`/danh-muc/${convertSlugUrl(categories[nav.id as unknown as keyof typeof categories])}-${nav.id}`}
                      className={cn(
                        "flex min-h-8 flex-row items-center gap-2 border-b border-solid border-[#333]/10 px-4 py-2 text-[0.875rem] font-semibold text-[#333333]",
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
                    <AccordionItem value={`item-${index - 1}`}>
                      <AccordionTrigger>
                        <div className="flex min-h-8 flex-row items-center gap-2 px-4 py-2 text-left text-[0.875rem] font-semibold text-[#333333]">
                          <div className="flex w-8 min-w-8 flex-shrink-0 items-center justify-center">
                            <Image
                              src={nav.icon}
                              alt={nav.label}
                              className={cn(
                                "h-8 w-auto",
                                nav.icon ? "" : "opacity-0",
                              )}
                            />
                          </div>
                          <span className="whitespace-normal">{nav.label}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3">
                        {nav.children.map((childNav, index) => (
                          <a
                            key={index}
                            href={`/danh-muc/${convertSlugUrl(categories[childNav.id as unknown as keyof typeof categories])}-${childNav.id}`}
                            className={cn(
                              "flex min-h-8 flex-row items-center gap-2 px-4 py-2 text-[0.875rem] font-semibold text-[#333333]",
                            )}
                          >
                            <div className="flex min-h-8 w-8 flex-shrink-0 items-center justify-center">
                              {childNav.icon && (
                                <Image
                                  src={childNav.icon}
                                  alt={childNav.label}
                                  className={cn(
                                    "h-8 w-auto",
                                    childNav.icon ? "" : "opacity-0",
                                  )}
                                />
                              )}
                            </div>
                            <span className="whitespace-normal">
                              {childNav.label}
                            </span>
                          </a>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavBar;
