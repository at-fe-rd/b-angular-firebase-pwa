import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'app/shared/model/todo/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteMe: EventEmitter<Todo> = new EventEmitter();
  @Output() toggleMe: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onToggle() {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.toggleMe.emit(this.todo);
  }

  onDelete() {
    this.deleteMe.emit(this.todo);
  }
}
