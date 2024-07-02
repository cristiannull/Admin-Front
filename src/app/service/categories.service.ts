import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/videogame';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  constructor() {}

  getGender(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/genders`);
  }

  getTheme(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/themes`);
  }

  getGameMode(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/gamemodes`);
  }

  getPegi(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/pegis`);
  }

  getDeveloper(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/developers`);
  }
  getTypeOffer() {
    return this.http.get<Category[]>(`${this.apiUrl}/typeoffers`);
  }
}
