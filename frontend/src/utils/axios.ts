import axios from "axios";
import { getJWT } from "./auth";

let baseUrl = "http://localhost:8080/";

export const AxiosInstance = axios.create({
  baseURL: baseUrl,
});

// export type I_AuthHeader = {
//   headers: {
//     Authorization: string;
//   };
// };

export const getToken = (): string | undefined => {
  const token = getJWT();

  if (token) {
    return "Bearer " + token;
  } else return;
};
