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
    console.log('on view init');
    this.dataService.fetchTodoList().subscribe(
      (todoList: Todo[]) => {
        this.todos = todoList;
      }
    );
  }

}
