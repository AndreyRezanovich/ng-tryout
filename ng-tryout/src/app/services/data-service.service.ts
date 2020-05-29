import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { createSubscription } from '../util/helpers';

export interface Todo {
  checked: boolean;
  _id: string;
  text: string;
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
  }


  fetchTodoList(): Observable<Todo[]> {
    return createSubscription('todos/sse');
  }

  // fetchTodoList(): Observable<Todo[]> {
  //   return this.http.get<Todo[]>(environment.API_URL + 'todos');
  // }

  getTodoById(id): Observable<Todo> {
    return this.http.get<Todo>(environment.API_URL + 'todos/' + id + '/getone');
  }

  writeTodo(text: string): Observable<Todo> {
    return this.http.post<Todo>(environment.API_URL + 'todos' + '/create', { text });
  }

  removeTodo(id: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(environment.API_URL + 'todos/' + id + '/delete');
  }

  updateTodo(todo: { _id?: string, text?: string, checked?: boolean }): Observable<Todo> {
    return this.http.put<Todo>(environment.API_URL + 'todos/' + todo._id + '/update', todo);
  }

  findTodo(text: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.API_URL + 'todos?text=' + text + '/find');
  }
}

