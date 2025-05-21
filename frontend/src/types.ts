export type APIResponse<T> = {
  isSuccess: boolean;
  message: string;
  data: T;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}