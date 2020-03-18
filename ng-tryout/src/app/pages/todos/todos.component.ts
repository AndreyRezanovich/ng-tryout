import {Component, OnInit} from '@angular/core';
import {DataServiceService, Todo} from '../../services/data-service.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(
    private dataService: DataServiceService
  ) {
  }

  ngOnInit(): void {
    this.dataService.fetchTodoList().subscribe(
      (todoList: Todo[]) => {
        this.todos = todoList;
      }
    );
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter((t: Todo) => {
      return t.id !== todo.id;
    });
  }

}
