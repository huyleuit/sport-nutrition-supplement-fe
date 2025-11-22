"use client";
import { AccountResType } from "@/schemaValidations/account.schema";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type User = AccountResType;

const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);

  const setUser = useCallback((user: User | null) => {
    setUserState(user);
    if (user === null) {
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, []);

  useEffect(() => {
    const _user = localStorage.getItem("user");
    if (_user && _user !== "null" && _user !== "undefined") {
      try {
        const parsedUser = JSON.parse(_user);
        if (parsedUser && typeof parsedUser === "object") {
          setUserState(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUserState(null);
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
