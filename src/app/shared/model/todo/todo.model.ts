export class Todo {

  id: number;
  name: string;
  isCompleted: boolean;
  // just for handle animation
  isDeleting: boolean;
  did: string;

  constructor(name = '') {
    this.id = new Date().getTime();
    this.name = name;
    this.isCompleted = false;
  }
}
