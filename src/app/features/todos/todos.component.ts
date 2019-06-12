import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Todo } from 'app/shared/model/todo/todo.model';
import { environment } from './environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit, OnDestroy {

  todos: Todo[];
  action: String;
  counter: any;
  subcription$: any;
  todoRef: AngularFirestoreCollection<Todo>;

  constructor(private firestore: AngularFirestore) {
    this.todoRef = this.firestore.collection<Todo>('todos');
    this.todos = [];
    this.subcription$ = this.todoRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const did = a.payload.doc.id;
        return { did, ...data };
      }))
    ).subscribe((data: any) => {
      this.todos = data;
      // update counter when data changed
      this.counter = this.todos.reduce((obj, item: Todo) => {
        item.isCompleted ? obj.completed++ : obj.active++;
        return obj;
      }, { active: 0, completed: 0 });
    }, (err: any) => {
      //
    });
    // this.subcription$ = this.todoRef.valueChanges()
  }

  ngOnDestroy() {
    this.subcription$.unsubscribe();
  }

  ngOnInit() {
    this.action = 'all';
    this.counter = {
      active: 0,
      completed: 0
    };
  }

  todoId(index, todo) {
    return todo.id;
  }

  onChange(action: string, todo: Todo = null) {
    // handle action
    switch (action) {
      case 'add':
        this.todoRef.add({...todo});
        break
      case 'delete':
        // just for animation handling
        todo.isDeleting = true;
        setTimeout(() => {
          this.todoRef.doc(todo.did).delete().catch((err) => {
            // not found doc
          });
        }, 500);
        break
      case 'completed':
        this.todoRef.doc(todo.did).update(todo).catch((err) => {
          // not found doc
        });
        break
      case 'finish':
        // just for animation handling
        const completedItems = this.todos.filter((item: Todo) => {
          if (item.isCompleted) {
            item.isDeleting = true;
          }
          return item.isCompleted;
        });
        completedItems.forEach((item: Todo) => {
          this.todoRef.doc(item.did).delete().catch((err) => {
            // not found doc
          });
        });
        break
      default: break;
    }
  }
}
