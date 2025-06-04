// components/profile/ExperienceTab.tsx
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeInfo } from "@/services/userService";

const experienceSchema = z.object({
  experience: z.array(
    z
      .object({
        position: z.string().min(1),
        companyName: z.string().min(1),
        jobType: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "FREELANCE"]),
        country: z.string().min(1),
        currentlyWorking: z.boolean(),
        from: z.string().min(1),
        to: z.string().nullable().optional(), // Accepts null, undefined or string
        description: z.string().optional(),
      })
      .superRefine((data, ctx) => {
        const { to, currentlyWorking } = data;

        if (currentlyWorking) {
          // If currentlyWorking is true, 'to' must be empty (null, undefined, or empty string)
          if (to && to.trim() !== "") {
            ctx.addIssue({
              path: ["to"],
              code: z.ZodIssueCode.custom,
              message: "'To' must be empty if currently working is true.",
            });
          }
        } else {
          // If currentlyWorking is false, 'to' must be a valid date
          if (!to || isNaN(new Date(to).getTime())) {
            ctx.addIssue({
              path: ["to"],
              code: z.ZodIssueCode.custom,
              message:
                "'To' must be a valid date if currently working is false.",
            });
          }
        }
      }),
  ),
});
export type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface Props {
  defaultValues: any;
}

export const ExperienceTab = ({ defaultValues }: Props) => {
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    // defaultValues: defaultValues as ExperienceFormValues
    defaultValues: {
      experience: defaultValues,
    },
  });

  const {
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateMeInfo,
    mutationKey: ["ME"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ME"] });
    },
  });

  const handleSubmit = (values: ExperienceFormValues) => {
    mutate({ experience: values.experience });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border p-4 rounded-md space-y-3 relative"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    name={`experience.${index}.position`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage
                          error={errors.experience?.[index]?.position}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`experience.${index}.companyName`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage
                          error={errors.experience?.[index]?.companyName}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`experience.${index}.jobType`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="FULL_TIME">Full Time</SelectItem>
                            <SelectItem value="PART_TIME">Part Time</SelectItem>
                            <SelectItem value="REMOTE">Remote</SelectItem>
                            <SelectItem value="FREELANCE">Freelance</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage
                          error={errors.experience?.[index]?.jobType}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`experience.${index}.country`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage
                          error={errors.experience?.[index]?.country}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`experience.${index}.from`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>From</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage error={errors.experience?.[index]?.from} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`experience.${index}.to`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>To</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            disabled={form.watch(
                              `experience.${index}.currentlyWorking`,
                            )}
                          />
                        </FormControl>
                        <FormMessage error={errors.experience?.[index]?.to} />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name={`experience.${index}.currentlyWorking`}
                  render={(field) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Currently Working</FormLabel>
                      <FormMessage
                        error={errors.experience?.[index]?.currentlyWorking}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`experience.${index}.description`}
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage
                        error={errors.experience?.[index]?.description}
                      />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  size="sm"
                  className="absolute top-2 right-2"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  companyName: "",
                  jobType: "FULL_TIME",
                  country: "",
                  from: "",
                  to: "",
                  currentlyWorking: false,
                  description: "",
                })
              }
              variant="outline"
              className="flex gap-2"
            >
              <Plus size={16} /> Add Experience
            </Button>

            <Button type="submit" className="block">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
