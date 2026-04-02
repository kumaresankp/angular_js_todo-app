import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-form.html',
  styleUrls: ['./todo-form.css']
})
export class TodoFormComponent {
  newTodoTitle: string = '';

  @Output() addTodo = new EventEmitter<string>();

  onSubmit(): void {
    if (this.newTodoTitle.trim()) {
      this.addTodo.emit(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }
}