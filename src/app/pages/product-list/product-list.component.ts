import { Component, inject, signal, computed } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VideogamesService } from '../../service/videogames.service';
import { SkeletonModule } from 'primeng/skeleton';
import { NavComponent } from '../../components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { Videogame } from '../../models/videogame';

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
    this.loadVideogames();
  }

  loadVideogames() {
    this.videogamesService
      .getVideogamesPages(this.currentPage(), this.pageSize)
      .subscribe((response) => {
        const sortedVideogames = response.data.sort(
          (a: Videogame, b: Videogame) => a.name.localeCompare(b.name)
        );
        this.videogames.set(sortedVideogames);
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
        this.loadVideogames();
        window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting videogame:', error);
      },
    });
  }
}
