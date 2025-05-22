"use client";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {SignUpRequest, User} from "@/features/auth/auth.types";
import {axiosInstance} from "@/lib/axios";
import {AxiosResponse} from "axios";
import {APIResponse} from "@/types";
import {getErrorMsg} from "@/lib/api-util";
import {AuthContextType} from "@/features/auth/context/auth-context.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({children}: { children: ReactNode }) => {

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoadingAuthUser, setIsLoadingAuthUser] = useState(true);
  const [loadAuthUserError, setLoadAuthUserError] = useState("");

  async function loadUser() {
    setIsLoadingAuthUser(true);
    setLoadAuthUserError("");

    try {
      const response: AxiosResponse<APIResponse<User>> = await axiosInstance.get("/auth")
      setAuthUser(response.data.data);

      return response.data.data;
    } catch (error) {
      setLoadAuthUserError(getErrorMsg(error));
      setAuthUser(null);
      return null;
    } finally {
      setIsLoadingAuthUser(false);
    }
  }

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  async function login(username: string, password: string) {
    setIsLoggingIn(true);
    setLoginError("");

    try {
      await axiosInstance.post("/auth/token", null, {
        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password)
        }
      });

      return await loadUser();
    } catch (error) {
      console.error(error);
      setLoginError("Login Failed. Username or Password incorrect.");
      return null;
    } finally {
      setIsLoggingIn(false);
    }
  }

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logout() {
    setIsLoggingOut(true);
    try {
      await axiosInstance.post("/auth/logout");
      return true;
    } catch (e) {
      console.error("Logout Error: ", e);
      return false;
    } finally {
      setIsLoggingOut(false);
      setAuthUser(null);
    }
  }

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  async function signup(username: string, firstName: string, lastName: string, password: string, confirmPassword: string) {
    setIsSigningUp(true);
    setSignUpError("");

    try {
      const signupRequest: SignUpRequest = {
        username,
        firstName,
        lastName,
        password,
        confirmPassword
      };

      await axiosInstance.post("/auth/signup", signupRequest);
      return await login(username, password);
    } catch (e) {
      setSignUpError(getErrorMsg(e));
      return null;
    } finally {
      setIsSigningUp(false);
    }
  }

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      authUser,
      isLoadingAuthUser,
      loadAuthUserError,
      loadUser,
      isLoggingIn,
      loginError,
      login,
      logout,
      isLoggingOut,
      signup,
      signUpError,
      isSigningUp
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};