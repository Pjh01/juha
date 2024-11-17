import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }) {
  const [values, setValues] = useState({
    user: null,
    isPending: true, // Context값에 리퀘스트가 진행 중인지 알 수 있는 플래그 추가
  });

  async function getMe() {
    setValues((preValues) => ({ ...preValues, isPending: true }));
    let nextUser;
    try {
      const res = await axios.get("/users/me");
      nextUser = res.data;
    } finally {
      setValues((preValues) => ({
        ...preValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({ email, password }) {
    await axios.post("/auth/login", { email, password });
    await getMe();
  }

  async function logout() {
    // 리퀘스트 성공 시 브라우저 쿠키 삭제됨
    await axios.delete("/auth/logout");
    // context의 유저 데이터 삭제
    setValues((preValues) => ({
      ...preValues,
      user: null,
    }));
  }

  async function updateMe(formData) {
    const res = await axios.patch("/users/me", formData);
    const nextUser = res.data;
    setValues((preValues) => ({
      ...preValues,
      user: nextUser,
    }));
  }

  // 처음에 헌번 로그인해놓으면 다시 사이트에 들어왔을 때 자동으로 로그인
  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
        updateMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// context 값을 활용할 수 있는 커스텀 훅
export function useAuth(required) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    // required가 true이고 user 데이터가 없으면 로그인 페이지로 리다이렉트
    if (required && !context.user && !context.isPending) {
      navigate("/login");
    }
  }, [context.user, context.isPending, navigate, required]);

  return context;
}
