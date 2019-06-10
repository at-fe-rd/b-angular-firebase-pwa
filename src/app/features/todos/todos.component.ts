import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Todo } from 'app/shared/model/todo/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  action: String;
  counter: any;
  posts: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.posts = db.collection('posts').valueChanges();
    console.log(this.posts);
  }

  ngOnInit() {
    this.action = 'all';
    this.todos = [];
    this.counter = {
      active: 0,
      completed: 0
    };
  }

  onChange(action: string, todo: Todo = null) {
    // handle action
    switch (action) {
      case 'add':
        this.todos = [todo, ...this.todos];
        break
      case 'delete':
        // just for animation handling
        todo.isDeleting = true;
        setTimeout(() => {
          this.todos = this.todos.filter(item => item.id !== todo.id)
        }, 500);
        break
      case 'finish':
        // just for animation handling
        const completedItems = this.todos.filter((item: Todo) => {
          if (item.isCompleted) {
            item.isDeleting = true;
          }
          return !item.isCompleted;
        });
        setTimeout(() => {
          this.todos = completedItems
        }, 500);
        break
      default: break;
    }
    // update counter when data changed
    this.counter = this.todos.reduce((obj, item: Todo) => {
      item.isCompleted ? obj.completed++ : obj.active++;
      return obj;
    }, { active: 0, completed: 0 });
  }
}
