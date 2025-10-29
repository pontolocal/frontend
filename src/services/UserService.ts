import { useAuth } from "../api/AuthContext.tsx";
import httpClient from "../api/axiosConfig.ts";
import type {
  UserRegisterRequest,
  UserLoginRequest,
  UserUpdateRequest,
  UserRegisterResponse,
  UserLoginResponse,
} from "../models/User.ts";

export class UserServices {
  async registerUser(url: string, request: UserRegisterRequest) {
    try {
      const response = await httpClient({ url, method: "post", data: request });
      const user: UserRegisterResponse = response.data;
      return user;
    } catch (error) {
      console.error("Erro no registerUser:", error);
      throw error;
    }
  }

  async loginUser(url: string, request: UserLoginRequest) {
    try {
      const response = await httpClient({ url, method: "post", data: request });
      const loginUser: UserLoginResponse = response.data;
      return loginUser;
    } catch (error) {
      console.error("Erro no registerUser:", error);
      throw error;
    }
  }

  async updateUser(url: string, request: UserUpdateRequest) {
    try {
      const response = await httpClient({ url, method: "put", data: request });
      const user: any = response.data;
      return user;
    } catch (error) {
      throw new Error(`Erro to update user: ${error}`);
    }
  }

  async deleteUser(url: string) {
    try {
      const response = await httpClient({ url, method: "delete" });
      const data: any = response.data;
      return data;
    } catch (error) {
      throw new Error(`Erro to delete user: ${error}`);
    }
  }
}
