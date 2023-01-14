export type ApiResponse<T = any> = {
  success: boolean;
  code: number;
  message: string;
  data: T;
};
