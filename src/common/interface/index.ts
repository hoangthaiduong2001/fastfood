export interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  date?: Date;
  path?: string;
}
