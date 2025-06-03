"use client";

import {
  FormProvider,
  useFormContext,
  Controller,
  type UseFormReturn,
} from "react-hook-form";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Form({
  children,
  ...props
}: { children: React.ReactNode } & UseFormReturn<any>) {
  return <FormProvider {...props}>{children}</FormProvider>;
}

export function FormField({
  name,
  render,
}: {
  name: string;
  render: (field: any) => React.ReactElement;
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        render({ ...field, error: fieldState.error })
      }
    />
  );
}

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function FormLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <Label className={cn("", className)} {...props} />;
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function FormMessage({ error }: { error?: { message?: string } }) {
  if (!error?.message) return null;
  return <p className="text-sm text-red-600">{error.message}</p>;
}
