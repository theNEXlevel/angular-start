import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistItem, RemoveChecklistItem } from '@interfaces/checklist-item';

@Component({
  selector: 'as-checklist-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checklist-item-list.component.html',
  styleUrl: './checklist-item-list.component.scss',
})
export class ChecklistItemListComponent {
  @Input() data: ChecklistItem[] = [];

  @Output() toggle = new EventEmitter<RemoveChecklistItem>();
  @Output() edit = new EventEmitter<ChecklistItem>();
  @Output() delete = new EventEmitter<RemoveChecklistItem>();
}
