import { Injectable, inject } from '@angular/core';
import { AddChecklistItem, ChecklistItemsState, EditChecklistItem, RemoveChecklistItem } from '@interfaces/checklist-item';
import { signalSlice } from 'ngxtension/signal-slice';
import { EMPTY, Observable, Subject, catchError, map, merge } from 'rxjs';
import { RemoveChecklist } from '@interfaces/checklist';
import { ChecklistService, StorageService } from '@as-shared/data-access';

const INITIAL_STATE: ChecklistItemsState = {
  checklistItems: [],
  loaded: false,
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemsService {
  private checklistService = inject(ChecklistService);
  private storageService = inject(StorageService);

  // sources
  private errors$ = new Subject<string>();
  private loadChecklistItems$ = this.storageService.loadChecklistItems().pipe(
    catchError((error) => {
      this.errors$.next(error);
      return EMPTY;
    }),
  );

  private sources$ = merge(
    this.loadChecklistItems$.pipe(map((checklistItems) => ({ checklistItems, loaded: true }))),
    this.errors$.pipe(map((error) => ({ error }))),
  );

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
      edit: (state, actions$: Observable<EditChecklistItem>) =>
        actions$.pipe(
          map((editItem) => ({
            ...state(),
            checklistItems: state().checklistItems.map((item) => (editItem.id === item.id ? { ...item, ...editItem.data } : item)),
          })),
        ),
      toggle: (state, actions$: Observable<RemoveChecklistItem>) =>
        actions$.pipe(
          map((checklistItemId) => ({
            ...state(),
            checklistItems: state().checklistItems.map((item) => (item.id === checklistItemId ? { ...item, checked: !item.checked } : item)),
          })),
        ),
      remove: (state, actions$: Observable<RemoveChecklistItem>) =>
        actions$.pipe(
          map((removeItemId) => ({
            ...state(),
            checklistItems: state().checklistItems.filter((item) => item.id !== removeItemId),
          })),
        ),
      removeChecklist: (state, actions$: Observable<RemoveChecklist>) =>
        actions$.pipe(
          map((checklistId) => ({
            ...state(),
            checklistItems: state().checklistItems.filter((item) => item.checklistId !== checklistId),
          })),
        ),
      reset: (state, actions$: Observable<RemoveChecklistItem>) =>
        actions$.pipe(
          map((checklistId) => ({
            ...state(),
            checklistItems: state().checklistItems.map((item) => (item.checklistId === checklistId ? { ...item, checked: false } : item)),
          })),
        ),
    },
    effects: (state) => ({
      init: () => {
        if (state.loaded()) {
          this.storageService.saveChecklistItems(state.checklistItems());
        }
      },
    }),
    sources: [this.sources$],
  });

  constructor() {
    this.state.removeChecklist(this.checklistService.state.remove$);
  }
}
