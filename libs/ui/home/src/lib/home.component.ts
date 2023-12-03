import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '@as-shared/ui';
import { Checklist } from '@interfaces/checklist';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  checklistBeingEdited = signal<Partial<Checklist | null>>(null);
}
