import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Todo {
  _id: string;
  text: string;
  // checked: boolean;
}
export enum Status {
  success = 'success',
  error = 'error'
}
export interface ServerResponse {
  status: Status;
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) {
    console.log('it works');
  }

  fetchTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:4201/api/todos/');
  }

  getTodoById(id): Observable<Todo> {
    return this.http.get<Todo>('http://localhost:4201/api/todos/' + id);
  }

  writeTodo(text): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:4201/api/todos', {text});
  }

  removeTodo(id: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>('http://localhost:4201/api/todos/' + id);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>('http://localhost:4201/api/todos/' + todo._id, {text: todo.text});
  }

  findTodo(text): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:4201/api/todos?text=' + text);
  }
}

