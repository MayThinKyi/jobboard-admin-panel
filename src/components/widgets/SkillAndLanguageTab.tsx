// components/profile/SkillAndLanguageTab.tsx
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
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeInfo } from "@/services/userService";

export const skillAndLanguageSchema = z.object({
  skills: z.array(
    z.object({
      skill: z.string().min(1, "Skill is required"),
      proficiency: z.enum(["HIGH", "MODERATE", "LOW"]),
    }),
  ),
  languages: z.array(
    z.object({
      language: z.string().min(1, "Language is required"),
      proficiency: z.enum(["HIGH", "MODERATE", "LOW"]),
    }),
  ),
});

export type SkillAndLanguageFormValues = z.infer<typeof skillAndLanguageSchema>;

interface Props {
  defaultValues: any;
}

export const SkillAndLanguageTab = ({ defaultValues }: Props) => {
  const form = useForm<SkillAndLanguageFormValues>({
    resolver: zodResolver(skillAndLanguageSchema),
    defaultValues: {
      skills: defaultValues.skills,
      languages: defaultValues.languages,
    },
  });

  const {
    formState: { errors },
  } = form;

  const skillsFieldArray = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const languagesFieldArray = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateMeInfo,
    mutationKey: ["ME"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ME"] });
    },
  });
  const handleSubmit = (values: SkillAndLanguageFormValues) => {
    mutate({ skills: values.skills, languages: values.languages });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Skills Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Skills</h3>
              {skillsFieldArray.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid md:grid-cols-2 gap-4 border p-4 rounded-md relative"
                >
                  <FormField
                    name={`skills.${index}.skill`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Skill</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage error={errors.skills?.[index]?.skill} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`skills.${index}.proficiency`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Proficiency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Proficiency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="HIGH">High</SelectItem>
                            <SelectItem value="MODERATE">Moderate</SelectItem>
                            <SelectItem value="LOW">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage
                          error={errors.skills?.[index]?.proficiency}
                        />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => skillsFieldArray.remove(index)}
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  skillsFieldArray.append({
                    skill: "",
                    proficiency: "MODERATE",
                  })
                }
                className="flex gap-2"
              >
                <Plus size={16} /> Add Skill
              </Button>
            </div>

            {/* Languages Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Languages</h3>
              {languagesFieldArray.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid md:grid-cols-2 gap-4 border p-4 rounded-md relative"
                >
                  <FormField
                    name={`languages.${index}.language`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage
                          error={errors.languages?.[index]?.language}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`languages.${index}.proficiency`}
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Proficiency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Proficiency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="HIGH">High</SelectItem>
                            <SelectItem value="MODERATE">Moderate</SelectItem>
                            <SelectItem value="LOW">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage
                          error={errors.languages?.[index]?.proficiency}
                        />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => languagesFieldArray.remove(index)}
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  languagesFieldArray.append({
                    language: "",
                    proficiency: "MODERATE",
                  })
                }
                className="flex gap-2"
              >
                <Plus size={16} /> Add Language
              </Button>
            </div>

            <Button type="submit" className="block">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
