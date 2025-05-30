import {User} from "@/features/auth/auth.types";

export interface AuthContextType {
  authUser: User | null;

  isLoadingAuthUser: boolean;
  loadAuthUserError: string;
  loadUser: () => Promise<User | null>;

  isLoggingIn: boolean;
  loginError: string;
  login: (username: string, password: string) => Promise<User | null>;

  logout: () => Promise<boolean>;
  isLoggingOut: boolean;

  signup: (username: string, firstName: string, lastName: string, password: string, confirmPassword: string) => Promise<User | null>;
  isSigningUp: boolean;
  signUpError: string;

  isChangingPassword: boolean;
  changePasswordError: string;
  changePassword: (currentPassword: string, newPassword: string, confirmNewPassword: string) => Promise<User | null>;

  isDeleting: boolean;
  deleteError: string;
  deleteAccount: (password: string) => Promise<boolean>;
}