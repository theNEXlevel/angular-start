import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Credentials, RegisterStatus } from '@interfaces/chat';

@Component({
  selector: 'as-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Input({ required: true }) data!: { status: RegisterStatus };
  @Output() register = new EventEmitter<Credentials>();

  private fb = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(8), Validators.required]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.register.emit(this.registerForm.getRawValue());
  }
}
