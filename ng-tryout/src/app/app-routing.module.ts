import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent} from "./pages/todos/todos.component";


const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
    // loadChildren: 'app/pages/todos/todos.module#TodosModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
