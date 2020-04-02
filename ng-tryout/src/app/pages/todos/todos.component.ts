import {Component, OnInit} from '@angular/core';
import {DataServiceService, ServerResponse, Status, Todo} from '../../services/data-service.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {
  todos: Todo[];
  todoText: string;
  editedTodoIndex: number;

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
    this.editedTodoIndex = undefined;
    this.dataService.removeTodo(todo.id).subscribe((response: ServerResponse) => {
      if (response.status === Status.success) {
        this.todos = this.todos.filter((t: Todo) => {
          return t.id !== response.id;
        });
      }
    });
  }

  addTodo(): void {
    if (this.todoText) {
      this.dataService.writeTodo(this.todoText).subscribe((newTodo: Todo) => {
        const isTodoExist = this.todos.some((todo: Todo) => {
          return todo.id === newTodo.id;
        });
        if (!isTodoExist) {
          this.todos.push(newTodo);
        }
      });
      this.todoText = '';
    } else {
      alert('This input must be заполненно');
    }
  }

  clickTodo(todo): void {
    this.dataService.getTodoById(todo.id).subscribe((t: Todo) => {
      console.log(`You clicked on todo #${t.id}`);
    });
  }

  editTodo(index) {
    if (this.editedTodoIndex === index) {
      this.dataService.updateTodo(this.todos[index]).subscribe((newTodo: Todo) => {
        this.editedTodoIndex = undefined;
      });
    } else {
      this.editedTodoIndex = index;
    }
  }

  updateText($event: any) {
    this.todos[this.editedTodoIndex].text = $event;
  }
}
