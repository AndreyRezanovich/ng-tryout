import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginCredentials {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    // private http: HttpClient
  ) {
  }

  // login(credentials: LoginCredentials): Observable<string> {
  //   return this.http.post<string>(environment.API_URL + 'login', credentials);
  // }
}
