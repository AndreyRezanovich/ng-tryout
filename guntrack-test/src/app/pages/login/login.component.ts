import { Component, OnInit } from '@angular/core';
import { LoginCredentials, LoginService } from './login.service';

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

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

  }

  // loginUser() {
  //   this.loginService.login(this.credentials).subscribe();
  // }

}
