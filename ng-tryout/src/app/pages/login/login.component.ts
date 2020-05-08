import { Component, OnInit } from '@angular/core';
import { LoginCredentials, LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  public credentials: LoginCredentials = {
    login: '',
    password: '',
  };

  constructor(
    private loginService: LoginService
  ) {
  }

  loginUser() {
    if (this.credentials.login && this.credentials.password) {
      this.loginService.login(this.credentials).subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      });
    }
  }

  createUser() {
    this.loginService.create(this.credentials).subscribe();
  }

}
