import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
  private todos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  public getTodos(){
    return this.todos;
  }

  public addTodo(todo){
    this.todos.push(todo);
  }

}
