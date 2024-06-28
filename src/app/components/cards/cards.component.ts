import { Component, signal, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { VideogamesService } from '../../service/videogames.service';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLink],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  private videogamesService = inject(VideogamesService);
  private router = inject(Router);

  videogames = signal<any>([]);
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() price: string = '';
  @Input() edit: string = '';
  @Input() delete: string = '';
  @Input() cover: string = '';

  ngOnInit() {
    console.warn(
      '[ngOnInit] El componente lista de videojuegos ha sido inicializado'
    );
    this.loadVideogames();
  }

  loadVideogames() {
    this.videogamesService.getVideogames().subscribe({
      next: (videogames: any) => {
        this.videogames.set(videogames.data);
      },
    });
  }

  deleteVideogame(id: string) {
    if (confirm('seguro quieres eliminar')) {
      this.videogamesService.deleteVideogames(id).subscribe({
        next: () => {
          this.loadVideogames();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error deleting videogame:', error);
        },
      });
    }
  }
}
