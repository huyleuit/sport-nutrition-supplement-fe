import http from "@/lib/http";
import { TUser } from "@/types/user";

const userApiRequest = {
  profile: () => http.get<TUser>("/user/info"),
};

export default userApiRequest;
