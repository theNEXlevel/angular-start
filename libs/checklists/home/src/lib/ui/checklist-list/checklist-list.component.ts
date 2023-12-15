import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Checklist, RemoveChecklist } from '@interfaces/checklist';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'as-checklist-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checklist-list.component.html',
  styleUrl: './checklist-list.component.scss',
})
export class ChecklistListComponent {
  @Input() data: Checklist[] = [];

  @Output() edit = new EventEmitter<Checklist>();
  @Output() delete = new EventEmitter<RemoveChecklist>();
}
