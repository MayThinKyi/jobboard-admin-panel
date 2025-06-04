// components/profile/PersonalInfoTab.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeInfo } from "@/services/userService";

interface Props {
  defaultValues?: any;
}

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phone: z.string().min(7, "Invalid phone number"),
  dateOfBirth: z.string(),
  occupation: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  country: z.string(),
  city: z.string(),
  address: z.string(),
  postalCode: z.coerce.number(),
  linkedinUrl: z.string().url().optional(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

export const PersonalInfoTab = ({ defaultValues }: Props) => {
  const queryClient = useQueryClient();
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: defaultValues as PersonalInfoFormValues,
  });
  const {
    formState: { errors },
  } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: updateMeInfo,
    mutationKey: ["ME"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ME"] });
    },
  });

  const handleSubmit = (values: PersonalInfoFormValues) => {
    mutate({ personalInfo: { ...values } });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="firstName"
                render={(field) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage error={errors.firstName} />
                  </FormItem>
                )}
              />
              <FormField
                name="lastName"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage error={errors.lastName} />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage error={errors.phone} />
                  </FormItem>
                )}
              />
              <FormField
                name="dateOfBirth"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage error={errors.dateOfBirth} />
                  </FormItem>
                )}
              />
              <FormField
                name="occupation"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage error={errors.occupation} />
                  </FormItem>
                )}
              />
              <FormField
                name="gender"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage error={errors.gender} />
                  </FormItem>
                )}
              />
              <FormField
                name="country"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage error={errors.country} />
                  </FormItem>
                )}
              />
              <FormField
                name="city"
                render={(field) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage error={errors.city} />
                  </FormItem>
                )}
              />
              <FormField
                name="address"
                render={(field) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage error={errors.address} />
                  </FormItem>
                )}
              />
              <FormField
                name="postalCode"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage error={errors.postalCode} />
                  </FormItem>
                )}
              />
              <FormField
                name="linkedinUrl"
                render={(field) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage error={errors.linkedinUrl} />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
