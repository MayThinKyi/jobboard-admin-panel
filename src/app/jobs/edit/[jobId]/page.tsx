"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/categoryService";
import { CreateJobDTO } from "@/types/job";
import { fetchJobById, updateJob } from "@/services/jobService";

const schema = z
  .object({
    title: z.string().min(1, "Title is required"),
    jobType: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "FREELANCE"]),
    experience: z.enum(["INTERN", "JUNIOR", "MID", "SENIOR", "EXECUTIVE"]),
    category: z.string().min(1, "Category is required"),
    location: z.string().min(1, "Location is required"),
    info: z.string(),
    description: z
      .array(z.object({ value: z.string().min(1, "Required") }))
      .min(1),
    qualifications: z
      .array(z.object({ value: z.string().min(1, "Required") }))
      .min(1),
    benefits: z
      .array(z.object({ value: z.string().min(1, "Required") }))
      .min(1),
    isNegotiable: z.boolean(),
    salaryFrom: z.coerce.number().optional(),
    salaryTo: z.coerce.number().optional(),
  })
  .refine(
    (data) =>
      data.isNegotiable ||
      (data.salaryFrom !== undefined && data.salaryTo !== undefined),
    {
      message: "Salary range is required when not negotiable",
      path: ["salaryFrom"],
    },
  );

type EditJobFormValues = z.infer<typeof schema>;

export default function EditJobPage() {
  const router = useRouter();
  const { jobId } = useParams() as { jobId: string };

  const form = useForm<EditJobFormValues>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      const { data } = await fetchJobById(jobId);
      return {
        title: data.title,
        jobType: data.jobType,
        experience: data.experience,
        category: data.category,
        location: data.location,
        info: data.info || "",
        description: data.description.map((d: string) => ({ value: d })),
        qualifications: data.qualifications.map((q: string) => ({ value: q })),
        benefits: data.benefits.map((b: string) => ({ value: b })),
        isNegotiable: data.isNegotiable,
        salaryFrom: data.salaryFrom,
        salaryTo: data.salaryTo,
      };
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const isNegotiable = watch("isNegotiable");

  const { data, isLoading: loadingCategories } = useQuery({
    queryKey: ["GET_CATEGORIES"],
    queryFn: fetchCategories,
  });

  const categories = data?.data ?? [];

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateJobDTO) => updateJob(jobId, payload),
    onSuccess: () => router.push("/jobs"),
  });

  const onSubmit = (values: EditJobFormValues) => {
    const cleanedData: CreateJobDTO = {
      ...values,
      description: values.description.map((item) => item.value),
      qualifications: values.qualifications.map((item) => item.value),
      benefits: values.benefits.map((item) => item.value),
    };
    mutate(cleanedData);
  };
  const descriptionFieldArray = useFieldArray({ control, name: "description" });
  const qualificationFieldArray = useFieldArray({
    control,
    name: "qualifications",
  });
  const benefitFieldArray = useFieldArray({ control, name: "benefits" });

  const renderArrayField = <
    T extends "benefits" | "qualifications" | "description",
  >(
    fieldArray: any,
    name: T,
    label: string,
  ) => {
    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        {fieldArray.fields.map((field: any, index: number) => (
          <div key={field.id} className="flex gap-2 items-center mb-2">
            <Controller
              control={control}
              name={`${name}.${index}.value` as const}
              render={({ field }) => (
                <FormControl>
                  <Input
                    {...field}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </FormControl>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => fieldArray.remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => fieldArray.append({ value: "" })}>
          Add {label}
        </Button>
      </FormItem>
    );
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <PageTitle title="Edit Job" />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="title"
            render={(field) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Frontend Developer" {...field} />
                </FormControl>
                <FormMessage error={errors.title} />
              </FormItem>
            )}
          />

          <FormField
            name="location"
            render={(field) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Yangon or Remote" {...field} />
                </FormControl>
                <FormMessage error={errors.location} />
              </FormItem>
            )}
          />

          <FormField
            name="category"
            render={(field) => (
              <FormItem>
                <FormLabel>Category </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loadingCategories}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage error={errors.category} />
              </FormItem>
            )}
          />

          <FormField
            name="jobType"
            render={(field) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                    <SelectItem value="REMOTE">Remote</SelectItem>
                    <SelectItem value="FREELANCE">Freelance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage error={errors.jobType} />
              </FormItem>
            )}
          />

          <FormField
            name="experience"
            render={(field) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INTERN">Intern</SelectItem>
                    <SelectItem value="JUNIOR">Junior</SelectItem>
                    <SelectItem value="MID">Mid</SelectItem>
                    <SelectItem value="SENIOR">Senior</SelectItem>
                    <SelectItem value="EXECUTIVE">Executive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage error={errors.experience} />
              </FormItem>
            )}
          />

          <FormField
            name="isNegotiable"
            render={(field) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Is Salary Negotiable?</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {!isNegotiable && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="salaryFrom"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Salary From</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 300000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage error={errors.salaryFrom} />
                  </FormItem>
                )}
              />
              <FormField
                name="salaryTo"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Salary To</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 500000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage error={errors.salaryTo} />
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormField
            name="info"
            render={(field) => (
              <FormItem>
                <FormLabel>Short Info</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Optional summary of the job..."
                    {...field}
                  />
                </FormControl>
                <FormMessage error={errors.info} />
              </FormItem>
            )}
          />

          {renderArrayField(
            descriptionFieldArray,
            "description",
            "Description",
          )}
          {renderArrayField(
            qualificationFieldArray,
            "qualifications",
            "Qualifications",
          )}
          {renderArrayField(benefitFieldArray, "benefits", "Benefits")}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Updating..." : "Update Job"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
