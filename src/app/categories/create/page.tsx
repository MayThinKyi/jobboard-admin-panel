"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/services/categoryService";

const schema = z.object({
  name: z.string().min(1, "Category name is required"),
});

type FormValues = z.infer<typeof schema>;

export default function CreateCategoryPage() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => router.push("/categories"),
  });

  const onSubmit = (values: FormValues) => mutate({ name: values.name });

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6">
      <PageTitle title="Create Category" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="name"
            render={({ onChange, value, error }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder="Enter category name"
                  />
                </FormControl>
                <FormMessage error={error} />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
