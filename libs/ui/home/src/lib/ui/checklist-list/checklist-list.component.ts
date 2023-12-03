import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Checklist } from '@interfaces/checklist';
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
}
