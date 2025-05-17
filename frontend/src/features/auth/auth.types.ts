export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
}

export type SignUpRequest = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}