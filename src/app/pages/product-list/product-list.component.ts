import { Component, inject, signal } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { VideogamesService } from '../../service/videogames.service';

import { SkeletonModule } from 'primeng/skeleton';
import { NavComponent } from '../../components/nav/nav.component';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CardsComponent,  SkeletonModule, RouterLinkActive, RouterLink, NavComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  private videogamesService = inject(VideogamesService);

  videogames = signal<any>([]);
  isLoading: boolean = true;
  data: any;

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
  }
}
