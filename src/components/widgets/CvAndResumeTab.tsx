// components/profile/CvAndResumeTab.tsx
"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CvAndResumeFormValues {
  cv?: FileList;
  resume?: FileList;
}

interface Props {
  defaultValues?: Partial<CvAndResumeFormValues>;
  onSubmit?: (values: CvAndResumeFormValues) => void;
}

export const CvAndResumeTab = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm<CvAndResumeFormValues>({
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: CvAndResumeFormValues) => {
    const cvFile = values.cv?.[0];
    const resumeFile = values.resume?.[0];

    console.log("CV File:", cvFile);
    console.log("Resume File:", resumeFile);

    onSubmit?.(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CV & Resume Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              name="cv"
              render={(field) => (
                <FormItem>
                  <FormLabel>CV</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="resume"
              render={(field) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
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
