import http from "@/lib/http";
import { ProfileResType } from "@/schemaValidations/account.schema";

const userApiRequest = {
  profile: () => http.get<ProfileResType>("/user/info"),
};

export default userApiRequest;
