import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistItem } from '@interfaces/checklist-item';

@Component({
  selector: 'as-checklist-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checklist-item-list.component.html',
  styleUrl: './checklist-item-list.component.scss',
})
export class ChecklistItemListComponent {
  @Input() data: ChecklistItem[] = [];
}
