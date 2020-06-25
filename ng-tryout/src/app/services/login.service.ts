import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface LoginCredentials {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  login(credentials: LoginCredentials): Observable<string> {
    return this.http.post<string>(environment.API_URL + 'auth/login', credentials);
  }

  create(credentials: LoginCredentials) {
    return this.http.post(environment.API_URL + 'auth/create', credentials);
  }

  refreshToken() {
    return this.http.get(`${environment.API_URL}auth/refresh`);
  }
}
