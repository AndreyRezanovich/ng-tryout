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
    public dataService: DataServiceService
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.dataService.fetchTodoList().subscribe((todoList: Todo[]) => {
        console.log(todoList);
        this.todos = this.todosCopy = todoList;
        this.filterTodosArray();
      }
    );
    // const eventSource = new EventSource('http://localhost:4201/todos');
    // eventSource.addEventListener('message', event => {
    //   const data = JSON.parse(event.data);
    //   console.log(data);
    // });
  }

  // ngOnInit(): void {
  //   this.dataService.fetchTodoList().subscribe((todoList: Todo[]) => {
  //       console.log(todoList);
  //       this.todos = this.todosCopy = todoList;
  //       this.filterTodosArray();
  //     }
  //   );
  // }


  deleteTodo(todo: Todo): void {
    this.editedTodoIndex = undefined;
    this.dataService.removeTodo(todo._id).subscribe((response: ServerResponse) => {
      if (response.status === Status.success) {
        this.todos = this.todos.filter((t: Todo) => {
          return t._id !== todo._id;
        });
        this.todosCopy = this.todos;
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
    console.log('index', index);
    if (this.editedTodoIndex === index) {
      this.dataService.updateTodo(this.todos[index]).subscribe((newTodo: Todo) => {
        console.log('updated');
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
      console.log(this.foundTodos);
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
