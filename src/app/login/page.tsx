"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { setToken } from "@/lib/tokenUtils";
import { login } from "@/services/userService";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Must include at least one special character",
    }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
      router.push("/");
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="email"
            render={(field) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage error={form.formState.errors.email} />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            render={(field) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage error={form.formState.errors.password} />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
