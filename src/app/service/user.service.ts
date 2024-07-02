import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Rol } from '../models/User.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users';

  constructor() {}

  register(formValues: User) {
    return this.http.post('http://localhost:3000/api/auth/register', {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      age: formValues.age,
      email: formValues.email,
      password: formValues.password,
    });
  }

  getUsers(): Observable<any> {
    const token = localStorage.getItem('user_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>('http://localhost:3000/api/users', {
      headers,
    });
  }

  getUserById(id: string): Observable<any> {
    const token = localStorage.getItem('user_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>('http://localhost:3000/api/users/' + id, {
      headers,
    });
  }

  getRol(): Observable<any> {
    return this.http.get<Rol[]>('http://localhost:3000/api/rol');
  }

  editUser(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('user_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data, { headers });
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

  adminlogin(formValues: any) {
    return this.http.post('http://localhost:3000/api/admin/login', {
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
