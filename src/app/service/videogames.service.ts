import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideogamesService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/api/videogame"

  constructor() {}

  getVideogames() {
    return this.http.get('http://localhost:3000/api/videogame');
  }

  newVideogame(formValues: any) {
    return this.http.post("http://localhost:3000/api/videogame",
      {
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
      }
    )
  }

  saveUrls(image: string[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, { urls: image });
  }
  deleteVideogames(id:string) {
    return this.http.delete('http://localhost:3000/api/videogame/'+ id);
  }
}