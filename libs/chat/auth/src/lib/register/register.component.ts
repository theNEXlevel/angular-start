import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './ui';
import { RegisterService } from './data-access';

@Component({
  selector: 'as-register',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerService = inject(RegisterService);
}
