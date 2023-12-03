import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistService } from '@as-shared/data-access';
import { ChecklistHeaderComponent } from './ui/checklist-header/checklist-header.component';

@Component({
  selector: 'as-checklist',
  standalone: true,
  imports: [ChecklistHeaderComponent, CommonModule],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
})
export class ChecklistComponent {
  private checklistService = inject(ChecklistService);

  @Input({ required: true }) id!: string;

  checklist = computed(() => this.checklistService.state.checklists().find((checklist) => checklist.id === this.id));
}
