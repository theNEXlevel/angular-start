import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Checklist } from '@interfaces/checklist';

@Component({
  selector: 'as-checklist-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checklist-header.component.html',
  styleUrl: './checklist-header.component.scss',
})
export class ChecklistHeaderComponent {
  @Input({ required: true }) data!: Checklist;
}
