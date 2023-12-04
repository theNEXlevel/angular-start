import { AddChecklistItem } from './add-checklist-item';
import { ChecklistItem } from './checklist-item';

export type EditChecklistItem = {
  id: ChecklistItem['id'];
  data: AddChecklistItem['item'];
};
