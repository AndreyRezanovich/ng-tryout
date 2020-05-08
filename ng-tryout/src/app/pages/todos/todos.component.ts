import { Component, OnInit } from '@angular/core';
import { DataServiceService, ServerResponse, Status, Todo } from '../../services/data-service.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {
  todos: Todo[];
  todosCopy: Todo[];
  todoText: string;
  editedTodoIndex: number;
  searchText: string;
  foundTodos: Todo[];
  buttonName: any = 'Complete todo';


  constructor(
    private dataService: DataServiceService
  ) {
  }

  ngOnInit(): void {
    this.dataService.fetchTodoList().subscribe(
      (todoList: Todo[]) => {
        this.todos = this.todosCopy = todoList;
        this.filterTodosArray();
      }
    );
  }

  deleteTodo(todo: Todo): void {
    this.editedTodoIndex = undefined;
    this.dataService.removeTodo(todo._id).subscribe((response: ServerResponse) => {
      if (response.status === Status.success) {
        this.todos = this.todos.filter((t: Todo) => {
          return t._id !== response._id;
        });
      }
    });
  }

  addTodo(): void {
    if (this.todoText) {
      this.dataService.writeTodo(this.todoText).subscribe((newTodo: Todo) => {
        const isTodoExist = this.todos.some((todo: Todo) => {
          return todo._id === newTodo._id;
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
    this.dataService.getTodoById(todo._id).subscribe((t: Todo) => {
      console.log(`You clicked on todo #${t._id}`);
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

  searchTodo() {
    this.dataService.findTodo(this.searchText).subscribe((todosArr: Todo[]) => {
      this.foundTodos = todosArr;
      this.searchText = undefined;
    });
  }

  resetTodo() {
    this.foundTodos = [];
  }

  filterTodosArray(event?) {
    const text = event?.target?.value || '';
    this.todos = text ? this.todosCopy.filter(todo => todo.text === text) : this.todosCopy;
  }

  doneTodo(todo) {
    todo.checked = !todo.checked;
    this.dataService.updateTodo(todo).subscribe((updatedTodo: Todo) => {
      todo = updatedTodo;
    });
  }
}


