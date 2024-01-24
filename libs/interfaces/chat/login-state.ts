import { LoginStatus } from "./login-status";

export interface LoginState {
  status: LoginStatus;
  error: string | null;
}
