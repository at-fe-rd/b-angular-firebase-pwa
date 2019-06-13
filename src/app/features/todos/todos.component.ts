import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Todo } from 'app/shared/model/todo/todo.model';
import { map } from 'rxjs/operators';
import { FirebaseAuthService } from 'app/core/service/firebase/firebase-auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit, OnDestroy {

  isInit: boolean;
  action: string;
  currentUser: string;
  counter: any;
  todos: Todo[];
  todoCollection: AngularFirestoreCollection<Todo>;

  constructor(
    private firestore: AngularFirestore,
    private fas: FirebaseAuthService
  ) {
    this.isInit = true;
    this.action = 'all';
    this.currentUser = this.fas.getToken();
    this.counter = {
      active: 0,
      completed: 0
    };
    this.todos = [];
    this.todoCollection = this.firestore.collection<Todo>('todos');
  }

  ngOnDestroy() {
    //
  }

  ngOnInit() {
    // fetch and watch todos
    this.todoCollection.ref
    .orderBy('id', 'asc')
    .where('owner_id', '==', this.currentUser)
    .onSnapshot((snapshot) => {
      // hidding loader
      this.isInit = false;
      this.todos = snapshot.docs.map(doc => {
        const data = doc.data() as Todo;
        const did = doc.id;
        return { did, ...data };
      });
      // updating counter when data changed
      this.counter = this.todos.reduce((obj, item: Todo) => {
        item.isCompleted ? obj.completed++ : obj.active++;
        return obj;
      }, { active: 0, completed: 0 });
    });
  }

  todoId(index, todo) {
    return todo.id;
  }

  onChange(action: string, todo: Todo = null) {
    // handle action
    switch (action) {
      case 'add':
        const obj = { owner_id: this.currentUser };
        this.todoCollection.add({
          ...{ owner_id: this.currentUser },
          ...todo
        });
        break
      case 'delete':
        // just for animation handling
        todo.isDeleting = true;
        setTimeout(() => {
          this.todoCollection.doc(todo.did).delete().catch((err) => {
            // not found doc
          });
        }, 500);
        break
      case 'completed':
        this.todoCollection.doc(todo.did).update(todo).catch((err) => {
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
          this.todoCollection.doc(item.did).delete().catch((err) => {
            // not found doc
          });
        });
        break
      default: break;
    }
  }
}
