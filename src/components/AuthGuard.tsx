"use client";

import { getToken } from "@/lib/tokenUtils";
import { useAuth } from "@/providers/AuthProvider";
import { isEmpty } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  useEffect(() => {
    if (!isLoading && user && isAuthRoute) {
      return router.push("/");
    }
    if (isEmpty(getToken()) && !isAuthRoute) {
      return router.push("/login");
    }
  }, [isLoading, user, isAuthRoute]);

  return <div className="flex">{children}</div>;
};

export default AuthGuard;
