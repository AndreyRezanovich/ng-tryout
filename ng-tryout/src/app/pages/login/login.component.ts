import { Component, Inject, OnInit } from '@angular/core';
import { LoginCredentials, LoginService } from '../../services/login.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  public credentials: LoginCredentials = {
    login: '',
    password: '',
  };
  // private router: any;

  constructor(@Inject(DOCUMENT)
              private document: Document,
              private loginService: LoginService,
              public router: Router,
  ) {
  }

  loginUser() {
    if (this.credentials.login && this.credentials.password) {
      this.loginService.login(this.credentials).subscribe(res => {
        console.log(res);
        this.goToTodoList();
      }, error => {
        console.log(error);
      });
    }
  }

  goToTodoList(): void {
    this.router.navigate(['todos']).then(err => err);
  }

  createUser() {
    this.loginService.create(this.credentials).subscribe();
  }

  ngOnInit(): void {
    // console.log('Connecting SSE on login');
    // const evtSource = new EventSource('http://localhost:4201/connection');
    // evtSource.addEventListener('message', event => {
    //   const data = JSON.parse(event.data);
    //   console.log(data);
    // });
  }
}
