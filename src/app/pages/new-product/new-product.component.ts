import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Videogame } from '../../models/videogame';
import { NavComponent } from '../../components/nav/nav.component';
import { VideogamesService } from '../../service/videogames.service';
import { CategoriesService } from '../../service/categories.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent, RouterLink],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  private videogameService = inject(VideogamesService);
  private router = inject(Router);
  private categoriesService = inject(CategoriesService);

  gamemodes = signal<any>([]);
  videogames = signal<any>([]);
  genders = signal<any>([]);
  themes = signal<any>([]);
  pegis = signal<any>([]);
  developers = signal<any>([]);
  typeoffers = signal<any>([]);

  videogameForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    price: new FormControl('', {
      validators: [Validators.required],
    }),
    image: new FormControl(''),

    cover: new FormControl('', {
      validators: [Validators.required],
    }),
    gamemode: new FormControl('', {
      validators: [Validators.required],
    }),
    developer: new FormControl('', {
      validators: [Validators.required],
    }),
    gender: new FormControl('', {
      validators: [Validators.required],
    }),
    pegi: new FormControl('', {
      validators: [Validators.required],
    }),
    theme: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    systemRequirements: new FormControl('', {
      validators: [Validators.required],
    }),
    videoId: new FormControl('', {
      validators: [Validators.required],
    }),
    typeoffer: new FormControl(''),
  });

  ngOnInit() {
    console.warn('[ngOnInit] Se ha inicializado el componente Detail');

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
    this.categoriesService.getTypeOffer().subscribe({
      next: (typeoffers) => {
        this.typeoffers.set(typeoffers);
      },
    });
  }

  onSubmit(event: Event) {
    if (this.videogameForm.valid) {
      const copy: Videogame = {
        _id: '',
        name: this.videogameForm.value.name || '',
        price: parseFloat(this.videogameForm.value.price || '0'),
        image: this.videogameForm.value.image
          ? this.videogameForm.value.image.split(', ')
          : [],
        cover: this.videogameForm.value.cover || '',
        gamemode: { _id: this.videogameForm.value.gamemode || '', name: '' },
        developer: { _id: this.videogameForm.value.developer || '', name: '' },
        gender: { _id: this.videogameForm.value.gender || '', name: '' },
        pegi: { _id: this.videogameForm.value.pegi || '', name: '' },
        theme: { _id: this.videogameForm.value.theme || '', name: '' },
        description: this.videogameForm.value.description || '',
        systemRequirements: this.videogameForm.value.systemRequirements || '',
        videoId: this.videogameForm.value.videoId || '',
        typeoffer: { _id: this.videogameForm.value.typeoffer || '', name: '' },
      };

      console.log('Podemos enviar la información');
      this.videogameService.newVideogame(copy).subscribe({
        next: (response) => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error al agregar el videojuego:', error);
        },
      });
    } else {
      console.log('Campos no válidos');
    }
  }
}
