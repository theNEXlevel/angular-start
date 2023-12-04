import { ChecklistItem } from "./checklist-item";
import { RemoveChecklistItem } from "./remove-checklist-item";

export type AddChecklistItem = {
  item: Omit<ChecklistItem, 'id' | 'checklistId' | 'checked'>;
  checklistId: RemoveChecklistItem;
};
