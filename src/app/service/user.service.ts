import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users';

  constructor() {}

  getUsers() {
    return this.http.get('http://localhost:3000/api/users');
  }

  getUserById(id: string) {
    return this.http.get('http://localhost:3000/api/users/' + id);
  }

  getRol() {
    return this.http.get('http://localhost:3000/api/rol');
  }

  editUser(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  login(formValues: any) {
    return this.http.post('http://localhost:3000/api/auth/login', {
      email: formValues.email,
      password: formValues.password,
    });
  }

  isLogged() {
    if (localStorage.getItem('user_token')) {
      return true;
    } else {
      return false;
    }
  }

  removeToken() {
    localStorage.removeItem('user_token');
    return;
  }
}
