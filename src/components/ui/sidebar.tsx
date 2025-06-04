"use client";
import React from "react";
import { Nav } from "./nav";
import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import { Button } from "./button";

import { useWindowWidth } from "@react-hook/window-size";
import { clearToken } from "@/lib/tokenUtils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

type Props = {};

export default function Sidebar({}: Props) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            variant="secondary"
            className="rounded-full p-2"
            onClick={toggleSidebar}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Categories",
            href: "/categories",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Jobs",
            href: "/jobs",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Users",
            href: "/users",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Orders",
            href: "/orders",
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
          {
            title: "Register",
            href: "/register",
            icon: Settings,
            variant: "ghost",
          },
          {
            title: "Login",
            href: "/login",
            icon: Settings,
            variant: "ghost",
          },
          {
            title: "Profile",
            href: "/profile",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Favourites",
            href: "/favourites",
            icon: LayoutDashboard,
            variant: "default",
          },
        ]}
      />
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full justify-start ${isCollapsed ? "px-0" : "px-4"}`}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}
