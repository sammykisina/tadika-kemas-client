import type { LoginData } from "src/types/typings.t";
import { API } from "./api";

const AuthAPI = {
  login: async (data: LoginData) => API.post("/auth/login", data),
  user: async () => API.get("/api/user"),
};

export default AuthAPI;
