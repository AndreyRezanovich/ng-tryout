import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataServiceService, ServerResponse, Status, Todo } from '../../services/data-service.service';
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



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
  file: File;
  selectedFiles: any;


  constructor(
    private http: HttpClient ,

    public dataService: DataServiceService,
    private chRef: ChangeDetectorRef
  ) {
  }


  async ngOnInit(): Promise<void> {
    this.dataService.fetchUsers().subscribe((users) => {
    });
    this.dataService.fetchTodoList().subscribe((todoList: Todo[]) => {
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

  fileSelection(event) {
    this.file = event.target.files[0];
  }

  uploadFile(file) {
    // console.log(file);
    // this.dataService.upload(file);

    // const uploadData = new FormData();
    // uploadData.append('File', this.file, this.file.name);

    // console.log('file', file);
    this.dataService.upload(file).subscribe(result => {
        console.log('Result:', result);
      });
  }

}
