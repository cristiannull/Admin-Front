import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Videogame } from '../../../../models/videogame';
import { NavComponent } from '../../components/nav/nav.component';
import { VideogamesService } from '../../service/videogames.service';
import { CategoriesService } from '../../service/categories.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  private videogameService = inject(VideogamesService);
  private router = inject(Router);
  private categoriesService = inject(CategoriesService)

  gamemodes = signal<any>([]);
  videogames = signal<any>([]);
  genders = signal<any>([]);
  themes = signal<any>([]);
  pegis = signal<any>([]);

  videogameForm = new FormGroup({
    name: new FormControl('', {
      validators: [],
    }),
    price: new FormControl('', {
      validators: [],
    }),
    image: new FormControl('') ,

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
  }

  onSubmit(event: Event) {
  /*   const urlsInput = this.videogameForm.get('image')?.value;
    if (urlsInput) {
      const urlsArray = urlsInput.split(',').map(url => url.trim());
      this.videogameService.saveUrls(urlsArray).subscribe({
        next: (response) => {
          console.log('URLs saved successfully', response);
        },
        error: (error) => {
          console.error('Error saving URLs', error);
        }
      });
    } else {
      console.error('Input is empty');
    }
 */
    if (this.videogameForm.valid) {
      const copy = {...this.videogameForm.value, image: this.videogameForm.value.image?.split(", ")}
      console.log(copy);
      
      console.log('Podemos enviar la información');
      this.videogameService
        .newVideogame(copy)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      console.log('Campos no válidos');
    }
  }
}
