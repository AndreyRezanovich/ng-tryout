import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Todo {
  id: number;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) {
    console.log('it works');
  }

  fetchTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>('assets/data/todos.json');
  }
}
