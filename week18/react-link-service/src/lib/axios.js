import axios from "axios";

const instance = axios.create({
  baseURL: "https://learn.codeit.kr/api/link-service",
  withCredentials: true,
});

//interceptors를 사용해서 리스폰스를 가로챈 다음에 토큰 만료로 추정이 된다면
//토큰을 재발급하고 다시 재시도를 한다는 아이디아
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      await instance.post("/auth/token/refresh", undefined, { _retry: true });
      originalRequest._retry = true;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
