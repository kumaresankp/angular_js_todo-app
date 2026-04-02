import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Learn Angular',
      completed: false,
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Build a Todo App',
      completed: false,
      createdAt: new Date()
    },
    {
      id: 3,
      title: 'Record YouTube Video',
      completed: false,
      createdAt: new Date()
    }
  ];

  constructor() {
    this.loadFromLocalStorage();
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };
    this.todos.unshift(newTodo);
    this.saveToLocalStorage();
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveToLocalStorage();
  }

  editTodo(id: number, newTitle: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.title = newTitle.trim();
      this.saveToLocalStorage();
    }
  }

  getStats() {
    return {
      total: this.todos.length,
      completed: this.todos.filter(t => t.completed).length,
      pending: this.todos.filter(t => !t.completed).length
    };
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(t => !t.completed);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('angular-todos', JSON.stringify(this.todos));
  }

  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem('angular-todos');
    if (stored) {
      this.todos = JSON.parse(stored);
    }
  }
}