import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'as-message-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  @Output() send = new EventEmitter<string>();
  messageControl = new FormControl();
}
