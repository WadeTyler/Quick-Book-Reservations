import axiosInstance from "@/config/axios";
import {AxiosResponse} from "axios";
import {APIResponse} from "@/types/api-response.types";
import {LoginRequest, SignupRequest, User} from "@/types/auth.types";



export async function fetchUser(): Promise<User | null> {
  // Get User
  return await axiosInstance.get('/auth')
    .then((response: AxiosResponse<APIResponse<User>>) => {
      // Successfully retrieved user.
      if (!response.data.isSuccess || !response.data.data) {
        throw new Error(response.data.message);
      }

      console.log("Auth User: ", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      // Failed to fetch user
      console.error(error || "Something went wrong fetching user.");
      return null;
    });
}

export async function createAuthToken(loginRequest: LoginRequest): Promise<boolean> {
  // Create token
  return await axiosInstance.post("/auth/token",  null, {
    auth: {
      username: loginRequest.username,
      password: loginRequest.password
    }
  })
    .then((response: AxiosResponse<APIResponse<string>>) => {
      // Successfully created token
      if (!response.data.isSuccess || !response.data.data) {
        throw new Error(response.data.message);
      }
      return true;
    })
    .catch((error) => {
      // Failed to create token
      console.error(error);
      throw new Error("Email or Password incorrect.");
    })

}

export async function signup(signupRequest: SignupRequest): Promise<boolean> {
  // Signup
  return await axiosInstance.post("/auth/signup", signupRequest)
    .then(async () => {
      // Success
      // Create token
      return await createAuthToken({username: signupRequest.username, password: signupRequest.password })
  })
    .catch((error) => {
      // Failed to signup
      throw new Error(error.response.data.message || "Failed to signup.");
    })
}

export async function logout(): Promise<void> {
  await axiosInstance.post("/auth/logout")
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.error(error.response.data.message || "Failed to logout.");
      throw new Error(error.response.data.message || "Failed to logout.");
    })
}