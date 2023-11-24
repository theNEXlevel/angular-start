import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from '@interfaces/todo';

@Component({
  selector: 'as-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  @Output() todoSubmitted = new EventEmitter<Todo>();
  private formBuilder = inject(FormBuilder);

  todoForm = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor() {
    this.todoForm.valueChanges.subscribe(console.log);
  }
}
