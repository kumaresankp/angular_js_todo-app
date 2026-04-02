import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{ id: number; title: string }>();

  isEditing: boolean = false;
  editTitle: string = '';

  onToggle(): void {
    this.toggle.emit(this.todo.id);
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.todo.title;
  }

  saveEdit(): void {
    if (this.editTitle.trim()) {
      this.edit.emit({ id: this.todo.id, title: this.editTitle });
      this.isEditing = false;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editTitle = '';
  }
}