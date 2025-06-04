"use client";

import { clearToken } from "@/lib/tokenUtils";
import { getMe, login } from "@/services/userService";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  user: IUser | null;
  isLoading: boolean;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getMe();
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    setUser(null);
    clearToken();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
