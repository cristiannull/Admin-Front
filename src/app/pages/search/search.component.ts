import { Component, inject, signal, Input, SimpleChanges } from '@angular/core';
import { VideogamesService } from '../../service/videogames.service';
import { NavComponent } from '../../components/nav/nav.component';
import { CardsComponent } from '../../components/cards/cards.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NavComponent, RouterLink, CardsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private videogameService = inject(VideogamesService);

  videogames = signal<any>([]);

  @Input() name: string = '';
  ngOnInit() {
    console.warn(
      '[ngOnInit] El componente lista de videojuegos ha sido inicializado'
    );
    this.videogameService.getVideogameSearch(this.name).subscribe({
      next: (videogames: any) => {
        this.videogames.set(videogames);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['name'] && this.name.toLowerCase()) {
      const searchName = this.name;
      this.videogameService.getVideogameSearch(searchName).subscribe({
        next: (videogames: any) => {
          this.videogames.set(videogames);
        },
      });
    }
  }
}
