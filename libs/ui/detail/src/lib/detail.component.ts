import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '@as/data-access';

@Component({
  selector: 'lib-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  @Input({ required: true }) id!: string;

  private todoService = inject(TodoService);

  todo = computed(() => {
    return this.todoService.todos().find((todo) => todo.id === this.id);
  });
}
