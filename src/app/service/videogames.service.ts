import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Videogame } from '../models/videogame';

@Injectable({
  providedIn: 'root',
})
export class VideogamesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/videogame';

  constructor() {}

  getVideogameById(id: string): Observable<Videogame> {
    return this.http.get<Videogame>(
      'http://localhost:3000/api/videogamebyid/' + id
    );
  }

  editVideogame(id: string, data: Videogame): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

  getVideogames(): Observable<Videogame[]> {
    return this.http.get<Videogame[]>('http://localhost:3000/api/videogame');
  }

  newVideogame(formValues: Videogame): Observable<Videogame> {
    return this.http.post<Videogame>('http://localhost:3000/api/videogame', {
      name: formValues.name,
      price: formValues.price,
      image: formValues.image,
      cover: formValues.cover,
      gamemode: formValues.gamemode,
      developer: formValues.developer,
      gender: formValues.gender,
      pegi: formValues.pegi,
      theme: formValues.theme,
      description: formValues.description,
      systemRequirements: formValues.systemRequirements,
      videoId: formValues.videoId,
      typeoffer: formValues.typeoffer,
    });
  }

  getVideogameSearch(name?: String): Observable<Videogame[]> {
    let endpoint = 'http://localhost:3000/api/videogame/';
    if (name) {
      endpoint = `${endpoint}${name}`;
    }

    return this.http.get<Videogame[]>(endpoint);
  }

  deleteVideogame(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getVideogamesPages(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  saveUrls(image: string[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, { urls: image });
  }
}
