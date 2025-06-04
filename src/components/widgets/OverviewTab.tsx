// components/profile/OverviewTab.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeInfo } from "@/services/userService";

// --------------------
// ✅ Zod Schema
// --------------------
const overviewSchema = z.object({
  aboutYourself: z
    .string()
    .min(20, "At least 20 characters required.")
    .max(2000, "Maximum 2000 characters allowed."),
  whyShouldWeHireYou: z
    .string()
    .min(20, "At least 20 characters required.")
    .max(2000, "Maximum 2000 characters allowed."),
});

type OverviewFormValues = z.infer<typeof overviewSchema>;

interface Props {
  defaultValues?: Partial<OverviewFormValues>;
  onSubmit?: (values: OverviewFormValues) => void;
}

export const OverviewTab = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm<OverviewFormValues>({
    resolver: zodResolver(overviewSchema),
    defaultValues,
  });

  const {
    formState: { errors },
  } = form;

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateMeInfo,
    mutationKey: ["ME"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ME"] });
    },
  });
  const handleSubmit = (values: OverviewFormValues) => {
    mutate({ overview: values });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* About Yourself */}
            <FormField
              name="aboutYourself"
              render={(field) => (
                <FormItem>
                  <FormLabel>About Yourself</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Tell us about yourself..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage error={errors.aboutYourself} />
                </FormItem>
              )}
            />

            {/* Why Should We Hire You */}
            <FormField
              name="whyShouldWeHireYou"
              render={(field) => (
                <FormItem>
                  <FormLabel>Why Should We Hire You?</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Explain why you’re a good fit..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage error={errors.whyShouldWeHireYou} />
                </FormItem>
              )}
            />

            <Button type="submit">Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
