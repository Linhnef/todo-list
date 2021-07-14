import { AxiosInstance } from "axios";
import { User } from "./types/User";

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    register: register(api),
    logout: logout(api),
    profile: profile(api),
  };
};

type LoginResponse = {
  token: string;
  user: User;
};

type registerRequest = {
  name: string;
  email: string;
  password: string;
  age: number;
};

const register =
  (api: AxiosInstance) =>
  async (data: registerRequest): Promise<string | undefined> => {
    try {
      const res = await api.post<LoginResponse>("/user/register", data);
      return res.data.token;
    } catch (err) {
      return err;
    }
  };

type LoginRequest = {
  email: string;
  password: string;
};

const login =
  (api: AxiosInstance) =>
  async (data: LoginRequest): Promise<string | undefined> => {
    try {
      const res = await api.post<LoginResponse>("/user/login", data);
      return res.data.token;
    } catch (err) {
      return err;
    }
  };


type logoutResponse = {
  success: boolean;
};

const logout =
  (api: AxiosInstance) => async (): Promise<boolean | undefined> => {
    try {
      const res = await api.post<logoutResponse>("/user/logout");
      return res.data.success;
    } catch (err) {
      return err;
    }
  };

type profileResponse = {
  id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
};

const profile = (api: AxiosInstance) => async (): Promise<User | undefined> => {
  try {
    const res = await api.get<profileResponse>("/user/me");
    return res.data;
  } catch (err) {
    return err;
  }
};

const updateProfile =
  (api: AxiosInstance) => async (): Promise<User | undefined> => {
    try {
      const res = await api.put<profileResponse>("/user/me");
      return res.data;
    } catch (err) {
      return err;
    }
  };
