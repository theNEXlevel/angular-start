import { RegisterStatus } from './register-status';

export interface RegisterState {
  status: RegisterStatus;
  error: string | null;
}
