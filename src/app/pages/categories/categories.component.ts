import { Component, inject, signal, Input } from '@angular/core';
import { CategoriesService } from '../../service/categories.service';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';



@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLink, NavComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  private categoriesService = inject(CategoriesService);

  gamemodes = signal<any>([]);
  genders = signal<any>([]);
  themes = signal<any>([]);
  pegis = signal<any>([]);
  typeoffers = signal<any>([]);
  developers = signal<any>([]);

  @Input() id: string = '';
  @Input() name: string = '';
  
  ngOnInit() {
    console.warn('[ngOnInit] Se ha inicializado el componente Detail');
this.loadCategories()
  }

loadCategories() { 
  this.categoriesService.getGender().subscribe({
    next: (genders) => {
      this.genders.set(genders);
    },
  });
  this.categoriesService.getTheme().subscribe({
    next: (themes) => {
      this.themes.set(themes);
    },
  });
  this.categoriesService.getGameMode().subscribe({
    next: (gamemodes) => {
      this.gamemodes.set(gamemodes);
    },
  });
  this.categoriesService.getPegi().subscribe({
    next: (pegis) => {
      this.pegis.set(pegis);
    },
  });
  this.categoriesService.getTypeOffer().subscribe({
    next: (typeoffers) => {
      this.typeoffers.set(typeoffers);
    },
  });
  this.categoriesService.getDeveloper().subscribe({
    next: (developers) => {
      this.developers.set(developers);
    },
  });
}

  deleteGender(id: string) {
    if (confirm('¿Seguro quieres eliminar este GENDER?')) {
      this.categoriesService.deleteGender(id).subscribe({
        next: () => {
          this.loadCategories();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error eliminando GENDER:', error);
        },
      });
    }
  }

  deletePegi(id: string) {
    if (confirm('¿Seguro quieres eliminar este PEGI?')) {
      this.categoriesService.deletePegi(id).subscribe({
        next: () => {
          this.loadCategories();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error eliminando PEGI:', error);
        },
      });
    }
  }

  deleteGameMode(id: string) {
    if (confirm('¿Seguro quieres eliminar este GAME MODE?')) {
      this.categoriesService.deleteGameMode(id).subscribe({
        next: () => {
          this.loadCategories();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error eliminando GAME MODE:', error);
        },
      });
    }
  }

  deleteTheme(id: string) {
    if (confirm('¿Seguro quieres eliminar este THEME?')) {
      this.categoriesService.deleteTheme(id).subscribe({
        next: () => {
          this.loadCategories();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error eliminando THEME:', error);
        },
      });
    }
  }

  deleteTypeOffer(id: string) {
    if (confirm('¿Seguro quieres eliminar este TYPE OFFER?')) {
      this.categoriesService.deleteTypeOffer(id).subscribe({
        next: () => {
          this.loadCategories();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error eliminando TYPE OFFER:', error);
        },
      });
    }
  }

  deleteDeveloper(id: string) {
    if (confirm('¿Seguro quieres eliminar este THEME?')) {
      this.categoriesService.deleteDeveloper(id).subscribe({
        next: () => {
          this.loadCategories();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error eliminando THEME:', error);
        },
      });
    }
  }
}
