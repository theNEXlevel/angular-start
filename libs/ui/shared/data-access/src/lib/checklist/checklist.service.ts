import { Injectable } from '@angular/core';
import { AddChecklist, Checklist, ChecklistState } from '@interfaces/checklist';
import { Observable, map } from 'rxjs';
import { signalSlice } from 'ngxtension/signal-slice';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  initialState: ChecklistState = {
    checklists: [],
  };

  state = signalSlice({
    initialState: this.initialState,
    // selectors: (state) => ({
    //   checklists: () => state().checklists,
    // }),
    actionSources: {
      add: (state, actions$: Observable<AddChecklist>) =>
        actions$.pipe(
          map((checklist) => ({
            checklists: [...state().checklists, this.addIdToChecklist(checklist)],
          })),
        ),
    },
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
