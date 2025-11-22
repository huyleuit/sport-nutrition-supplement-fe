function decodeJWT(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      throw new Error("Invalid token format");
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

export function getTokenExpiration(token: string): Date | null {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) {
      return null;
    }

    return new Date(decoded.exp * 1000);
  } catch {
    return null;
  }
}

export function isTokenValid(
  token: string,
  bufferSeconds: number = 60,
): boolean {
  try {
    const expirationDate = getTokenExpiration(token);
    if (!expirationDate) {
      return false;
    }

    const now = new Date();
    const bufferTime = new Date(now.getTime() + bufferSeconds * 1000);

    return expirationDate > bufferTime;
  } catch {
    return false;
  }
}
