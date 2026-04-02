import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from './components/todo-form/todo-form';
import { TodoListComponent } from './components/todo-list/todo-list';
import { TodoService } from './services/todo';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodoListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Angular Todo App';

  constructor(private todoService: TodoService) {}

  get todos(): Todo[] {
    return this.todoService.getTodos();
  }

  get stats() {
    return this.todoService.getStats();
  }

  addTodo(title: string): void {
    this.todoService.addTodo(title);
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }

  editTodo(event: { id: number; title: string }): void {
    this.todoService.editTodo(event.id, event.title);
  }

  clearCompleted(): void {
    this.todoService.clearCompleted();
  }
}