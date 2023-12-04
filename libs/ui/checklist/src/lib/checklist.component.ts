import { Component, Input, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistService } from '@as-shared/data-access';
import { ChecklistHeaderComponent } from './ui/checklist-header/checklist-header.component';
import { ChecklistItemsService } from './data-access/checklist-items';
import { FormBuilder } from '@angular/forms';
import { ChecklistItem } from '@interfaces/checklist-item';
import { FormModalComponent, ModalComponent } from '@as-shared/ui';

@Component({
  selector: 'as-checklist',
  standalone: true,
  imports: [ChecklistHeaderComponent, CommonModule, FormModalComponent, ModalComponent],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
})
export class ChecklistComponent {
  private checklistService = inject(ChecklistService);
  checklistItemsService = inject(ChecklistItemsService);

  formBuilder = inject(FormBuilder);

  @Input({ required: true }) id!: string;

  checklist = computed(() => this.checklistService.state.checklists().find((checklist) => checklist.id === this.id));

  checklistItemBeingEdited = signal<Partial<ChecklistItem> | null>(null);

  checklistItemForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      if (!this.checklistItemBeingEdited()) {
        this.checklistItemForm.reset();
      }
    });
  }
}