import { Component, inject, signal, Input } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { VideogamesService } from '../../service/videogames.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CategoriesService } from '../../service/categories.service';
import { CommonModule } from '@angular/common';

const selectedPegiId = signal<number | null>(null);
function setSelectedPegiId(id: number) {
  selectedPegiId.set(id);
}
function getSelectedPegiId() {
  return selectedPegiId();
}

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [NavComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private videogameService = inject(VideogamesService);
  private categoriesService = inject(CategoriesService);

  videogameId = signal<any>([]);
  videogame = signal<any>({});
  gamemodes = signal<any>([]);
  genders = signal<any>([]);
  themes = signal<any>([]);
  pegis = signal<any>([]);
  developers = signal<any>([]);
  nameString = signal<any>([]);
  selectedPegiId = signal<any>([]);

  @Input() id: string = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.videogameId.set(id);
      this.loadVideogame();
      this.loadCategories();
    }
  }

  loadVideogame() {
    this.videogameService.getVideogameById(this.id).subscribe({
      next: (videogame) => {
        this.videogame.set(videogame);
      },
      error: (error) => {
        console.error('Error loading videogame:', error);
      },
    });
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
    this.categoriesService.getDeveloper().subscribe({
      next: (developers) => {
        this.developers.set(developers);
      },
    });
  }

  isSelected(pegi: string) {
    if (Object.keys(this.videogame()).length === 0) return;
    console.log(pegi);
    if (this.videogame().pegi.name === pegi) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  }

  formattedUrls(): string {
    if (!this.videogame().image) return '';
    return this.videogame().image.join(', ');
  }

  videogameForm = new FormGroup({
    name: new FormControl('', {
      validators: [],
    }),
    price: new FormControl('', {
      validators: [],
    }),
    image: new FormControl(''),

    cover: new FormControl('', {
      validators: [],
    }),
    gamemode: new FormControl('', {
      validators: [],
    }),
    developer: new FormControl('', {
      validators: [],
    }),
    gender: new FormControl('', {
      validators: [],
    }),
    pegi: new FormControl('', {
      validators: [],
    }),
    theme: new FormControl('', {
      validators: [],
    }),
    description: new FormControl('', {
      validators: [],
    }),
    systemRequirements: new FormControl('', {
      validators: [],
    }),
    videoId: new FormControl('', {
      validators: [],
    }),
  });

  onSubmit() {
    const currentVideogame = this.videogame();
    const currentVideogameId = this.videogameId();

    if (currentVideogame && currentVideogameId) {
      this.videogameService
        .editVideogame(currentVideogameId, currentVideogame)
        .subscribe({
          next: () => {
            console.log('Videogame updated successfully!');
            this.router.navigate(['/videogames']);
          },
          error: (error) => {
            console.error('Error updating videogame:', error);
          },
        });
    } else {
      console.error('Videogame or Videogame ID is null');
    }
  }
}
