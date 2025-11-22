"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export interface FormFieldConfig<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}

interface DynamicFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fields: FormFieldConfig<T>[];
  onSubmit: (values: T) => void | Promise<void>;
  submitButtonText: string;
  loading?: boolean;
  formClassName?: string;
  submitButtonClassName?: string;
  defaultInputClassName?: string;
  renderExtraContent?: () => ReactNode;
}

export function DynamicForm<T extends FieldValues>({
  form,
  fields,
  onSubmit,
  submitButtonText,
  loading = false,
  formClassName,
  submitButtonClassName,
  defaultInputClassName = "!h-auto !rounded-none border border-solid border-app-carbon px-3 py-2 pr-[2.625rem] text-base font-normal focus:outline-none",
  renderExtraContent,
}: DynamicFormProps<T>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full max-w-[600px] flex-shrink-0 space-y-2",
          formClassName,
        )}
        noValidate
      >
        {fields.map((fieldConfig) => (
          <FormField
            key={fieldConfig.name}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <FormItem className={fieldConfig.className}>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fieldConfig.placeholder || fieldConfig.label}
                    type={fieldConfig.type || "text"}
                    disabled={fieldConfig.disabled || loading}
                    className={cn(
                      defaultInputClassName,
                      fieldConfig.inputClassName,
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {renderExtraContent && renderExtraContent()}

        <Button
          type="submit"
          disabled={loading}
          className={cn(
            "!mt-4 h-auto w-full rounded-none border-[2px] border-solid border-[#1250DC] bg-[#1250DC] py-3 text-base font-bold text-white transition-all duration-200 hover:bg-[#1250DC]/[0.9] disabled:cursor-not-allowed disabled:opacity-50",
            submitButtonClassName,
          )}
        >
          {loading ? "Đang xử lý..." : submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
