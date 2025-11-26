import http from "@/lib/http";
import { getTokenExpiration } from "@/lib/jwt";
import {
  ChangePasswordBodyType,
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/register", body),
  changePassword: (body: ChangePasswordBodyType) =>
    http.patch("/auth/change-password", body),
  setToken: async (token: string) => {
    const expiresAt = getTokenExpiration(token);

    if (typeof window !== "undefined") {
      localStorage.setItem("sessionToken", token);
      if (expiresAt) {
        localStorage.setItem("tokenExpires", expiresAt.toISOString());
      }
      console.log("✅ Token saved to localStorage");
    }

    return http.post(
      "/api/auth",
      { sessionToken: token, expiresAt: expiresAt?.toISOString() },
      { baseUrl: "" },
    );
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("tokenExpires");
      console.log("✅ Token removed from localStorage");
    }
    return http.delete("/api/auth", { baseUrl: "" });
  },
};

export default authApiRequest;
