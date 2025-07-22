export interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  date?: Date | string;
  path?: string;
  takenTime?: string;
}
