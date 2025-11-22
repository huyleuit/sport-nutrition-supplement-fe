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
  setToken: (token: string) => {
    const expiresAt = getTokenExpiration(token);
    return http.post(
      "/api/auth",
      { sessionToken: token, expiresAt: expiresAt?.toISOString() },
      { baseUrl: "" },
    );
  },
  logout: () => http.delete("/api/auth", { baseUrl: "" }),
};

export default authApiRequest;
