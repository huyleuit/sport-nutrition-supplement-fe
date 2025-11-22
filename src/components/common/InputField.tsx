import { cn } from "@/lib/utils";

type InputFieldProps = {
  id: string;
  type: string;
  value: string;
  label: string;
  placeholder: string;
  tailingComponent?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
};

export const InputField = ({
  id,
  type,
  value,
  label,
  placeholder,
  tailingComponent,
  onChange,
  error,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        {label} <span className="text-red-600">*</span>
      </label>
      <div
        className={cn("flex flex-row border border-solid border-app-carbon")}
      >
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onAbort={onChange}
          required
          className={cn("grow px-3 py-2 font-normal focus:outline-none")}
        />
        {tailingComponent && (
          <div className="mr-[2%] flex h-10 w-[10%] cursor-pointer items-center justify-center">
            {tailingComponent}
          </div>
        )}
      </div>
      {error && (
        <p className="ml-4 mt-1 text-[0.75rem] font-medium text-red-600 md:text-sm">
          {error}
        </p>
      )}
    </div>
  );
};
