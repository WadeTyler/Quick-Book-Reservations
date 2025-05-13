export type APIResponse<T> = {
  isSuccess: boolean;
  message: string;
  data: T;
}