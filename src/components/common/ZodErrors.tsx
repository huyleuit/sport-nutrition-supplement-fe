import { cn } from "@/lib/utils";

export function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div
      key={index}
      className={cn("mt-1.5 text-[0.8rem] font-medium text-destructive")}
    >
      {err}
    </div>
  ));
}
