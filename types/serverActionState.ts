import { AuthError } from "@supabase/supabase-js";

export interface ErrorDetail {
    path: string;
    message: string;
  }
  
export interface SuccessState {
    status: "success";
    message: string;
    user: { email: string };
  }
  
export interface ErrorState {
    status: "error";
    message: string | null;
    errors?: Array<ErrorDetail> | AuthError | unknown;
  }

export type State = SuccessState | ErrorState | null;