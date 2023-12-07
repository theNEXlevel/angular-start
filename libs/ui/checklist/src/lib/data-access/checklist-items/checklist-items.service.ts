import { Injectable } from '@angular/core';
import { AddChecklistItem, ChecklistItemsState, RemoveChecklistItem } from '@interfaces/checklist-item';
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, map } from 'rxjs';

const INITIAL_STATE: ChecklistItemsState = {
  checklistItems: [],
};

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemsService {
  state = signalSlice({
    initialState: INITIAL_STATE,
    actionSources: {
      add: (state, actions$: Observable<AddChecklistItem>) =>
        actions$.pipe(
          map((checklistItem) => ({
            ...state(),
            checklistItems: [
              ...state().checklistItems,
              {
                ...checklistItem.item,
                id: Date.now().toString(),
                checklistId: checklistItem.checklistId,
                checked: false,
              },
            ],
          })),
        ),
      toggle: (state, actions$: Observable<RemoveChecklistItem>) => 
        actions$.pipe(
          map((checklistItemId) => ({
            ...state(),
            checklistItems: state().checklistItems.map((item) => (item.id === checklistItemId ? { ...item, checked: !item.checked } : item ))
          }))
        ),
      reset: (state, actions$: Observable<RemoveChecklistItem>) => 
        actions$.pipe(
          map((checklistId) => ({
            ...state(),
            checklistItems: state().checklistItems.map((item) => (item.checklistId === checklistId ? { ...item, checked: false } : item))
          }))
        )
    },
  });
}
