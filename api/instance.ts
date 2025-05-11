import { getAccessToken, getRefreshToken } from "@/components/hook/setCookie";
import axios, { AxiosInstance } from "axios";
import { error } from "console";

const BASE_URL = "http://api.sweav.net";

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    AUTHORIZATION: "",
  },
});

// 요청 인터셉터
privateApi.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 리프래시 토큰
// 리프래시 토큰 구현 안함
// privateApi.interceptors.response.use(
//   function (response) {
//     return response;
//   },

//   async function (error) {
//     const {
//       config,
//       response: { status },
//     } = error;

//     if (status === 403) {
//       const originRequest = config;
//       const refreshToken = getRefreshToken();

//       console.debug("403 새로운 토큰 발급");
//       privateApi.get;
//     }
//   }
// );
