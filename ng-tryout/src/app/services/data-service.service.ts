import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
    return this.http.get<Todo[]>(environment.API_URL + 'todos');
  }

  fetchUsers(): Observable<any> {
    return this.http.get<any>(environment.API_URL + 'auth/users');
  }

  getTodoById(id): Observable<Todo> {
    return this.http.get<Todo>(environment.API_URL + 'todos/' + id + '/find');
  }

  writeTodo(text: string): Observable<Todo> {
    return this.http.post<Todo>(environment.API_URL + 'todos', { text });
  }

  removeTodo(id: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(environment.API_URL + 'todos/' + id);
  }

  updateTodo(todo: { _id?: string, text?: string, checked?: boolean }): Observable<Todo> {
    return this.http.put<Todo>(environment.API_URL + 'todos/' + todo._id, todo);
  }

  findTodo(text: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.API_URL + 'todos/search' + '?text=' + text);
  }
}

