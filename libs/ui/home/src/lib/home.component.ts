import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from './ui/todo-form';
import { TodoService } from '@as/data-access';
import { TodoListComponent } from './ui/todo-list';

@Component({
  selector: 'as-home',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodoListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  todoService = inject(TodoService);
}
