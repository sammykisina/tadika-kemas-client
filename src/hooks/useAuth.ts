import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthAPI } from "@/api";
import type { LoginData } from "src/types/typings.t";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Notifications } from "@/components";

export type User = {
  name: string;
  email: string;
  role: string;
};

const useAuth = () => {
  /**
   * hook states
   */
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const router = useRouter();

  /**
   * hook functions
   */

  const { mutateAsync: loginMutateAsync, isLoading: isLogging } = useMutation({
    mutationFn: (login_data: LoginData) => {
      return AuthAPI.login(login_data);
    },

    onSuccess: async (data) => {
      Cookies.set("user", JSON.stringify(data.user));
      Cookies.set("token", data.token);

      await redirect();
      router.refresh();
      Notifications.successNotification(data.message);
    },
  });

  const {
    mutateAsync: updatePasswordMutateAsync,
    isLoading: isUpdatingPassword,
  } = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return AuthAPI.updatePassword(data);
    },

    onSuccess: async (data) => {
      Notifications.successNotification(data.message);
    },
  });

  const redirect = async () => await router.push("/");

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    setToken(undefined);
    setUser(undefined);

    router.refresh();
  };

  useEffect(() => {
    const user = Cookies.get("user") && JSON?.parse(Cookies.get("user") || "");
    const token = Cookies.get("token");
    if (token !== undefined || token !== "") {
      setToken(token);
    }

    if (user !== undefined || user !== "") {
      setUser(user);
    }
  }, []);

  return {
    user,
    token,
    loginMutateAsync,
    isLogging,
    logout,
    updatePasswordMutateAsync,
    isUpdatingPassword,
  };
};

export default useAuth;
