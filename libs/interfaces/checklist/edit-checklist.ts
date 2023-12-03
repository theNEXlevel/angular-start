import { AddChecklist } from './add-checklist';
import { Checklist } from './checklist';

export type EditChecklist = {
  id: Checklist['id'];
  data: AddChecklist;
};
