import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from './ui/todo-form';
import { Todo } from '@interfaces/todo';

@Component({
  selector: 'as-home',
  standalone: true,
  imports: [CommonModule, TodoFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  createTodo(todo: Todo) {
    console.log(todo);
  }
}
