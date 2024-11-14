import { Component, inject } from '@angular/core';
import { TodoFormComponent } from './ui/todo-form.component';
import { TodoService } from '../shared/data-access/todo.service';
import { TodoListComponent } from './ui/todo-list.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <h2>Todo</h2>
    <app-todo-form (todoSubmitted)="todoService.addTodo($event)" />
    <app-todo-list [todos]="todoService.todos()" />
  `,
  imports: [TodoFormComponent, TodoListComponent],
})
export default class HomeComponent {
  todoService = inject(TodoService);
}
