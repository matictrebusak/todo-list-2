import { Component, computed, inject, signal } from '@angular/core';
import { TodoService } from '../shared/data-access/todo.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-detail',
  template: `
    @if (todo(); as todo) { @if (isEditing()) {
    <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="title" [placeholder]="todo.title" />
      <br />
      <input
        type="text"
        formControlName="description"
        [placeholder]="todo.description"
      />
      <br />
      <button type="submit">Save</button>
    </form>
    } @else {
    <h2>{{ todo.title }}</h2>
    <button (click)="isEditing.set(true)">Edit</button>
    <p>{{ todo.description }}</p>
    } } @else {
    <p>Could not find todo...</p>
    }
  `,
  imports: [ReactiveFormsModule],
})
export default class DetailComponent {
  todoService = inject(TodoService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  private paramMap = toSignal(this.route.paramMap);

  isEditing = signal(false);

  todo = computed(() =>
    this.todoService
      .todos()
      .find((todo) => todo.id === this.paramMap()?.get('id'))
  );

  editForm = this.fb.nonNullable.group({
    title: [this.todo()?.title ?? '', Validators.required],
    description: [this.todo()?.description ?? ''],
    id: [this.todo()?.id ?? '', Validators.required],
  });

  onSubmit() {
    // console.log('clicked');
    this.isEditing.set(false);
    this.todoService.updateTodo(this.editForm.getRawValue());
  }
}
