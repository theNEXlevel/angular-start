import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

interface FormModalData {
  title: string;
  formGroup: FormGroup;
}
@Component({
  selector: 'as-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent {
  @Input({ required: true }) data!: FormModalData;
  @Output() save = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>();
}
