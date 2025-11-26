import envConfig from "@/config";
import { redirect } from "next/navigation";
import { isTokenValid } from "./jwt";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

let clientLogoutRequest: null | Promise<any> = null;
export const isClient = (): boolean => typeof window !== "undefined";
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  options?: CustomOptions | undefined,
): Promise<{ status: number; payload: Response }> => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
          Accept: "application/json",
        };
  if (isClient()) {
    const sessionToken = localStorage.getItem("sessionToken");

    if (sessionToken) {
      if (isTokenValid(sessionToken)) {
        baseHeaders.Authorization = `Bearer ${sessionToken}`;
      } else {
        console.warn("⚠️ Token đã hết hạn, đang đăng xuất...");
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("tokenExpires");
        localStorage.removeItem("user");
        window.dispatchEvent(new CustomEvent("auth:logout"));
        window.location.href = "/dang-nhap";
        throw new Error("Token đã hết hạn");
      }
    } else {
      console.warn("⚠️ No sessionToken in localStorage");
    }
  }

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });
  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        },
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient()) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch("/api/auth", {
            method: "DELETE",
          });
          try {
            await clientLogoutRequest;
          } catch (error) {
            console.error("Logout error:", error);
          } finally {
            localStorage.removeItem("sessionToken");
            localStorage.removeItem("tokenExpires");
            localStorage.removeItem("user");
            window.dispatchEvent(new CustomEvent("auth:logout"));
            clientLogoutRequest = null;
            window.location.href = "/dang-nhap";
          }
        }
        throw new HttpError(data);
      } else {
        redirect("/dang-nhap");
      }
    } else {
      throw new HttpError(data);
    }
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
  patch<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("PATCH", url, { ...options, body });
  },
};

export default http;
