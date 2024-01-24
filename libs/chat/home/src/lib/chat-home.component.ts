import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageInputComponent, MessageListComponent } from './ui';
import { MessageService } from '@as/chat/shared/data-access';

@Component({
  selector: 'as-chat-home',
  standalone: true,
  imports: [CommonModule, MessageInputComponent, MessageListComponent],
  templateUrl: './chat-home.component.html',
  styleUrl: './chat-home.component.scss',
})
export class ChatHomeComponent {
  messageService = inject(MessageService);
}
