import { Injectable } from '@angular/core';
import { AddChecklistItem, ChecklistItemsState } from '@interfaces/checklist-item';
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
    },
  });
}
