import { Checklist } from './checklist';

export interface ChecklistState {
  checklists: Checklist[];
  loaded: boolean;
  error: string | null;
}
