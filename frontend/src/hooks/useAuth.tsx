import { useCallback, useContext, useMemo } from "react";
import { removeJWT, setJWT } from "../utils/auth";
import { AxiosInstance } from "../utils/axios";
import { ISingInFormState } from "../utils/types";
import { appContext } from "./context";

const useAuth = () => {
  const { user, setUser, clearUser } = useContext(appContext);
  const login = useCallback(
    async (data: ISingInFormState) => {
      const loginRes = await AxiosInstance.post("/user/login", data);
      if (loginRes?.data) {
        setUser(loginRes.data.user);
        setJWT(loginRes.data.token);
      }
    },
    [setUser]
  );
  const register = useCallback(
    async (data: ISingInFormState) => {
      const registerRes = await AxiosInstance.post("/user/register", data);
      if (registerRes?.data) {
        setUser(registerRes.data.user);
        setJWT(registerRes.data.token);
      }
    },
    [setUser]
  );
  const logout = useCallback(() => {
    clearUser();
    removeJWT();
  }, [clearUser]);

  const isAuthenticated = useMemo(() => user?.email, [user?.email]);

  return { user, login, register, logout, isAuthenticated };
};

export default useAuth;
