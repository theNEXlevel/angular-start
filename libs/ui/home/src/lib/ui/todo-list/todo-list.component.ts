import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '@interfaces/todo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'as-todo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
}