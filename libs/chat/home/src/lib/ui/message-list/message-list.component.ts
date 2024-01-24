import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '@interfaces/chat';

@Component({
  selector: 'as-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent {
  @Input({ required: true }) data!: { messages: Message[] };
}
