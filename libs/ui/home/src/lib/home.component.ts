import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalComponent, ModalComponent } from '@as-shared/ui';
import { Checklist } from '@interfaces/checklist';
import { FormBuilder } from '@angular/forms';
import { ChecklistService } from '@as-shared/data-access';
import { ChecklistListComponent } from './ui/checklist-list';

@Component({
  selector: 'as-home',
  standalone: true,
  imports: [ChecklistListComponent, CommonModule, FormModalComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private formBuilder = inject(FormBuilder);

  checklistService = inject(ChecklistService);

  checklistBeingEdited = signal<Partial<Checklist | null>>(null);

  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      if (!this.checklistBeingEdited()) {
        this.checklistForm.reset();
      }
    });
  }
}
