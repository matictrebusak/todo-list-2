import { Component, inject, input } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo';
import { RouterLink } from '@angular/router';
import { TodoService } from '../../shared/data-access/todo.service';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <ul>
      @for (todo of todos(); track todo.id) {
      <li>
        <a routerLink="/detail/{{ todo.id }}">{{ todo.title }}</a
        >&nbsp;&nbsp;&nbsp;<button (click)="todoService.removeTodo(todo.id)">
          Remove
        </button>
      </li>
      } @empty {
      <li>Nothing to do!</li>
      }
    </ul>
  `,
  imports: [RouterLink],
  styles: [
    `
      ul {
        margin: 0;
        padding: 1rem;
      }
    `,
  ],
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
  todoService = inject(TodoService);
}
