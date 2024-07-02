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

  getTypeOffer() {
    return this.http.get('http://localhost:3000/api/typeoffers');
  }

  getGenderById(id: string) {
    return this.http.get('http://localhost:3000/api/gender/' + id);
  }

  getPegiById(id: string) {
    return this.http.get('http://localhost:3000/api/pegi/' + id);
  }

  getGameModeById(id: string) {
    return this.http.get('http://localhost:3000/api/gamemode/' + id);
  }

  getThemeById(id: string) {
    return this.http.get('http://localhost:3000/api/theme/' + id);
  }

  getTypeOfferById(id: string) {
    return this.http.get('http://localhost:3000/api/typeoffer/' + id);
  }

  getDeveloperById(id: string) {
    return this.http.get('http://localhost:3000/api/developer/' + id);
  }

  deleteGender(id: string) {
    return this.http.delete('http://localhost:3000/api/gender/' + id);
  }

  deletePegi(id: string) {
    return this.http.delete('http://localhost:3000/api/pegi/' + id);
  }

  deleteGameMode(id: string) {
    return this.http.delete('http://localhost:3000/api/gamemode/' + id);
  }

  deleteTheme(id: string) {
    return this.http.delete('http://localhost:3000/api/theme/' + id);
  }

  deleteTypeOffer(id: string) {
    return this.http.delete('http://localhost:3000/api/typeoffer/' + id);
  }

  deleteDeveloper(id: string) {
    return this.http.delete('http://localhost:3000/api/developer/' + id);
  }

  newGender(formValues: any) {
    return this.http.post('http://localhost:3000/api/gender', {
      name: formValues.name
    });
  }

  newPegi(formValues: any) {
    return this.http.post('http://localhost:3000/api/pegi', {
      name: formValues.name
    });
  }

  newGameMode(formValues: any) {
    return this.http.post('http://localhost:3000/api/gamemode', {
      name: formValues.name
    });
  }

  newTheme(formValues: any) {
    return this.http.post('http://localhost:3000/api/theme', {
      name: formValues.name
    });
  }

  newTypeOffer(formValues: any) {
    return this.http.post('http://localhost:3000/api/typeoffer', {
      name: formValues.name
    });
  }

  newDeveloper(formValues: any) {
    return this.http.post('http://localhost:3000/api/developer', {
      name: formValues.name
    });
  }

  editGender(id: string, data: any) {
    return this.http.patch(`http://localhost:3000/api/gender/${id}`, data);
  }

  editPegi(id: string, data: any) {
    return this.http.patch(`http://localhost:3000/api/pegi/${id}`, data);
  }

  editGameMode(id: string, data: any) {
    return this.http.patch(`http://localhost:3000/api/gamemode/${id}`, data);
  }

  editTheme(id: string, data: any) {
    return this.http.patch(`http://localhost:3000/api/theme/${id}`, data);
  }

  editTypeOffer(id: string, data: any) {
    return this.http.patch(`http://localhost:3000/api/typeoffer/${id}`, data);
  }

  editDeveloper(id: string, data: any) {
    return this.http.patch(`http://localhost:3000/api/developer/${id}`, data);
  }
}
