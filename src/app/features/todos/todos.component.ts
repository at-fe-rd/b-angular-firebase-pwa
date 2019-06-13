import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Todo } from 'app/shared/model/todo/todo.model';
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
  subscription$: any;

  constructor(
    private firestore: AngularFirestore,
    private fas: FirebaseAuthService
  ) {
    this.isInit = true;
    this.action = 'all';
    this.currentUser = this.fas.getToken();
    this.initCounter();
    this.todos = [];
    this.todoCollection = this.firestore.collection<Todo>(
      'todos',
      ref => ref.where('owner_id', '==', this.currentUser).orderBy('id', 'asc')
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    // fetch and watch todos
    this.subscription$ = this.todoCollection.snapshotChanges().subscribe((snapshots) => {
      // hidding loader
      this.isInit = false;
      // reset counter
      this.initCounter();
      this.todos = snapshots.map(snapshot => {
        const doc = snapshot.payload.doc;
        const data = doc.data() as Todo;
        // updating counter when data changed
        data.isCompleted ? this.counter.completed++ : this.counter.active++;
        const did = doc.id;
        return { did, ...data };
      });
    });
  }

  initCounter() {
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
