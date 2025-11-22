import { Skeleton } from "../ui/skeleton";

export const ProductsLoading = () => {
  return (
    <div className="mx-auto mt-8 grid w-[95%] grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-y-6 ml:grid-cols-4 ml:gap-y-4 xl:mt-4 xl:w-full">
      <Skeleton className="mx-auto h-[23rem] w-full max-w-[13rem] rounded-[0.625rem]" />
      <Skeleton className="mx-auto h-[23rem] w-full max-w-[13rem] rounded-[0.625rem]" />
      <Skeleton className="mx-auto h-[23rem] w-full max-w-[13rem] rounded-[0.625rem]" />
      <Skeleton className="mx-auto h-[23rem] w-full max-w-[13rem] rounded-[0.625rem]" />
    </div>
  );
};
