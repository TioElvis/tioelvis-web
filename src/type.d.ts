export type Response<T> = {
  message: string;
  data: T;
  success: boolean;
};
