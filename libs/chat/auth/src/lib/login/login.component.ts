import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './ui';
import { LoginService } from './data-access';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'as-login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, RouterModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginService = inject(LoginService);
}
