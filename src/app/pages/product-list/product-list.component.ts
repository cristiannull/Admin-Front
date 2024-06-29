import { Component, inject, signal, computed } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VideogamesService } from '../../service/videogames.service';
import { SkeletonModule } from 'primeng/skeleton';
import { NavComponent } from '../../components/nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CardsComponent,
    SkeletonModule,
    RouterLinkActive,
    RouterLink,
    NavComponent,
    CommonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private videogamesService = inject(VideogamesService);

  videogames = signal<any>([]);
  isLoading: boolean = true;
  data: any;
  currentPage = signal(1);
  pageSize = 12;
  totalItems = signal(0);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize));

  ngOnInit() {
    console.warn(
      '[ngOnInit] El componente lista de videojuegos ha sido inicializado'
    );
    this.videogamesService.getVideogames().subscribe({
      next: (videogames: any) => {
        this.videogames.set(videogames.data);
      },
    });
    this.videogamesService.getVideogames().subscribe({
      next: (response) => {
        this.data = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading data', error);
        this.isLoading = false;
      },
    });
    this.loadVideogames();
  }

  loadVideogames() {
    this.videogamesService
      .getVideogamesPages(this.currentPage(), this.pageSize)
      .subscribe((response) => {
        this.videogames.set(response.data);
        this.totalItems.set(response.pagination.totalItems);
      });
  }

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadVideogames();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  get pages() {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  deleteVideogame(id: string): void {
    this.videogamesService.deleteVideogame(id).subscribe({
      next: () => {
        // Este callback se ejecuta cuando la solicitud HTTP de eliminación es exitosa.
        // Puedes poner aquí cualquier lógica que necesites ejecutar después de eliminar el videojuego.
        // Por ejemplo, recargar la lista de videojuegos o navegar a otra ruta.
        this.loadVideogames(); // Vuelve a cargar la lista de videojuegos
        window.location.reload(); // Recarga la página actual
      },
      error: (error) => {
        // Este callback se ejecuta si la solicitud HTTP de eliminación falla.
        console.error('Error deleting videogame:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario.
      },
    });
  }
}
