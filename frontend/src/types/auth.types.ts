export type User = {
  id: string;
  username: string;
}

export type LoginRequest = {
  username: string;
  password: string;
}

export type SignupRequest = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}