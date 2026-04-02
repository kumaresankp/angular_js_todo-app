import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';
import { TodoItemComponent } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css']
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];

  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number; title: string }>();

  filter: string = 'all';

  get filteredTodos(): Todo[] {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(t => !t.completed);
      case 'completed':
        return this.todos.filter(t => t.completed);
      default:
        return this.todos;
    }
  }

  get activeCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }

  get completedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  trackById(index: number, todo: Todo): number {
    return todo.id;
  }

  onToggle(id: number): void {
    this.toggle.emit(id);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  onEdit(event: { id: number; title: string }): void {
    this.edit.emit(event);
  }
}