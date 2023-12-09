import { Injectable, inject } from '@angular/core';
import { AddChecklist, Checklist, ChecklistState } from '@interfaces/checklist';
import { EMPTY, Observable, Subject, catchError, map, merge } from 'rxjs';
import { signalSlice } from 'ngxtension/signal-slice';
import { StorageService } from '../storage';

const INITIAL_STATE: ChecklistState = {
  checklists: [],
  loaded: false,
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private storageService = inject(StorageService);

  // sources
  private errors$ = new Subject<string>();
  private loadChecklists$ = this.storageService.loadChecklists().pipe(
    catchError((error) => {
      this.errors$.next(error);
      return EMPTY;
    }),
  );

  private sources$ = merge(this.loadChecklists$.pipe(map((checklists) => ({ checklists, loaded: true }))), this.errors$.pipe(map((error) => ({ error }))));

  state = signalSlice({
    initialState: INITIAL_STATE,
    actionSources: {
      add: (state, actions$: Observable<AddChecklist>) =>
        actions$.pipe(
          map((checklist) => ({
            checklists: [...state().checklists, this.addIdToChecklist(checklist)],
          })),
        ),
    },
    effects: (state) => ({
      init: () => {
        if (state.loaded()) {
          this.storageService.saveChecklists(state.checklists());
        }
      },
    }),
    sources: [this.sources$],
  });

  addIdToChecklist(checklist: AddChecklist): Checklist {
    return {
      ...checklist,
      id: this.generateSlug(checklist.title),
    };
  }

  generateSlug(title: string) {
    // NOTE: This is a simplistic slug generator and will not handle things like special characters.
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    // Check if the slug already exists
    const matchingSlugs = this.state.checklists().find((checklist) => checklist.id === slug);

    // If the title is already being used, add a string to make the slug unique
    if (matchingSlugs) {
      slug = slug + Date.now().toString();
    }

    return slug;
  }
}
