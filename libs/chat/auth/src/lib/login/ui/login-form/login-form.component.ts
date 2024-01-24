import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials, LoginStatus } from '@interfaces/chat';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'as-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Input({ required: true }) data!: { status: LoginStatus };
  @Output() login = new EventEmitter<Credentials>();
  fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.login.emit(this.loginForm.getRawValue());
  }
}
