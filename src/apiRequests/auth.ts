import http from "@/lib/http";
import { getTokenExpiration } from "@/lib/jwt";
import {
  ChangePasswordBodyType,
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";
import Cookies from "js-cookie";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/register", body),
  changePassword: (body: ChangePasswordBodyType) =>
    http.patch("/auth/change-password", body),
  setToken: async (token: string) => {
    const expiresAt = getTokenExpiration(token);

    if (typeof window !== "undefined") {
      const expires = expiresAt
        ? expiresAt
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      Cookies.set("sessionToken", token, {
        expires,
        path: "/",
        sameSite: "lax",
        secure: true,
      });
    }

    return http.post(
      "/api/auth",
      { sessionToken: token, expiresAt: expiresAt?.toISOString() },
      { baseUrl: "" },
    );
  },
  logout: () => {
    if (typeof window !== "undefined") {
      Cookies.remove("sessionToken");
    }
    return http.delete("/api/auth", { baseUrl: "" });
  },
};

export default authApiRequest;
