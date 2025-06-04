// components/profile/EducationTab.tsx
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeInfo } from "@/services/userService";

const educationSchema = z.object({
  education: z.array(
    z.object({
      qualification: z.string().min(1),
      institution: z.string().min(1),
      fieldOfStudy: z.string().min(1),
      educationLevel: z.enum([
        "DOCTORATE",
        "MASTER",
        "BACHELOR",
        "POST_GRADUATE",
        "DIPLOMA",
        "OTHER",
      ]),
      country: z.string().min(1),
      from: z.string().min(1),
      to: z.string().min(1),
      description: z.string().optional(),
    }),
  ),
});

export type EducationFormValues = z.infer<typeof educationSchema>;

interface Props {
  defaultValues: any;
}

export const EducationTab = ({ defaultValues }: Props) => {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: defaultValues ?? [],
    },
  });
  console.warn("defaultValues?.education", defaultValues);

  const {
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateMeInfo,
    mutationKey: ["ME"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ME"] });
    },
  });

  const handleSubmit = (values: EducationFormValues) => {
    mutate({ education: values.education });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
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
                    name={`education.${index}.qualification`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Qualification</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage
                          error={errors.education?.[index]?.qualification}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`education.${index}.institution`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage
                          error={errors.education?.[index]?.institution}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`education.${index}.fieldOfStudy`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage
                          error={errors.education?.[index]?.fieldOfStudy}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`education.${index}.educationLevel`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="DOCTORATE">Doctorate</SelectItem>
                            <SelectItem value="MASTER">Master</SelectItem>
                            <SelectItem value="BACHELOR">Bachelor</SelectItem>
                            <SelectItem value="POST_GRADUATE">
                              Post Graduate
                            </SelectItem>
                            <SelectItem value="DIPLOMA">Diploma</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage
                          error={errors.education?.[index]?.educationLevel}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`education.${index}.country`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage
                          error={errors.education?.[index]?.country}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`education.${index}.from`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>From</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage error={errors.education?.[index]?.from} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`education.${index}.to`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>To</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage error={errors.education?.[index]?.to} />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name={`education.${index}.description`}
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage
                        error={errors.education?.[index]?.description}
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
                  qualification: "",
                  institution: "",
                  fieldOfStudy: "",
                  educationLevel: "BACHELOR",
                  country: "",
                  from: "",
                  to: "",
                  description: "",
                })
              }
              variant="outline"
              className="flex gap-2"
            >
              <Plus size={16} /> Add Education
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
