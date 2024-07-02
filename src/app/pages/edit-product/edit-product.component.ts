import { Component, inject, signal, Input } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { VideogamesService } from '../../service/videogames.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CategoriesService } from '../../service/categories.service';
import { CommonModule } from '@angular/common';
import { Videogame, Category } from '../../models/videogame';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    NavComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private videogameService = inject(VideogamesService);
  private categoriesService = inject(CategoriesService);

  videogameId = signal<string | null>(null);
  videogame = signal<Videogame | null>(null);
  gamemodes = signal<Category[]>([]);
  genders = signal<Category[]>([]);
  themes = signal<Category[]>([]);
  pegis = signal<Category[]>([]);
  developers = signal<Category[]>([]);
  typeoffers = signal<Category[]>([]);

  @Input() id: string = '';

  videogameForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
    cover: new FormControl(''),
    gamemode: new FormControl(''),
    developer: new FormControl(''),
    gender: new FormControl(''),
    pegi: new FormControl(''),
    theme: new FormControl(''),
    description: new FormControl(''),
    systemRequirements: new FormControl(''),
    videoId: new FormControl(''),
    typeoffer: new FormControl(''),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.videogameId.set(id);
      this.loadVideogame();
      this.loadCategories();
    }
  }

  loadVideogame() {
    if (this.videogameId() !== null) {
      this.videogameService.getVideogameById(this.videogameId()!).subscribe({
        next: (videogame: Videogame) => {
          /* console.log('Videogame loaded:', videogame); */

          const selectedPegiId =
            videogame.pegi instanceof Array
              ? videogame.pegi[0]?._id
              : undefined;
          const selectedGamemodeId =
            videogame.gamemode instanceof Array
              ? videogame.gamemode[0]?._id
              : undefined;
          const selectedDeveloperId =
            videogame.developer instanceof Array
              ? videogame.developer[0]?._id
              : undefined;
          const selectedGenderId =
            videogame.gender instanceof Array
              ? videogame.gender[0]?._id
              : undefined;
          const selectedThemeId =
            videogame.theme instanceof Array
              ? videogame.theme[0]?._id
              : undefined;
          const selectedTypeOfferId =
            videogame.typeoffer instanceof Array
              ? videogame.typeoffer[0]?._id
              : undefined;

          this.videogame.set(videogame);

          this.videogameForm.patchValue({
            name: videogame.name,
            price: videogame.price.toString(),
            image: this.formattedUrls(videogame.image),
            cover: videogame.cover,
            gamemode: selectedGamemodeId,
            pegi: selectedPegiId,
            developer: selectedDeveloperId,
            gender: selectedGenderId,
            theme: selectedThemeId,
            description: videogame.description,
            systemRequirements: videogame.systemRequirements,
            videoId: videogame.videoId,
            typeoffer: selectedTypeOfferId,
          });
        },
        error: (error) => {
          console.error('Error loading videogame:', error);
        },
      });
    }
  }

  loadCategories() {
    this.categoriesService.getGender().subscribe({
      next: (genders: Category[]) => {
        this.genders.set(genders);
      },
    });
    this.categoriesService.getTheme().subscribe({
      next: (themes: Category[]) => {
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
      next: (developers: Category[]) => {
        this.developers.set(developers);
      },
    });
    this.categoriesService.getTypeOffer().subscribe({
      next: (typeoffers: Category[]) => {
        this.typeoffers.set(typeoffers);
      },
    });
  }

  formattedUrls(urls: string[]): string {
    return urls.join(', ');
  }

  onSubmit() {
    const formValues = this.videogameForm.value;
    const videogameId = this.videogameId() ?? '';

    const updatedVideogame: Videogame = {
      _id: '',
      name: formValues.name || '',
      price: parseFloat(formValues.price || '0'),
      image: formValues.image
        ? formValues.image.split(',').map((url: string) => url.trim())
        : [],
      cover: formValues.cover || '',
      gamemode: { _id: formValues.gamemode || '', name: '' },
      developer: { _id: formValues.developer || '', name: '' },
      gender: { _id: formValues.gender || '', name: '' },
      pegi: { _id: formValues.pegi || '', name: '' },
      theme: { _id: formValues.theme || '', name: '' },
      description: formValues.description || '',
      systemRequirements: formValues.systemRequirements || '',
      videoId: formValues.videoId || '',
      typeoffer: { _id: formValues.typeoffer || '', name: '' },
    };

    this.videogameService
      .editVideogame(videogameId, updatedVideogame)
      .subscribe({
        next: () => {
          /* console.log('Videogame updated successfully!'); */
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error updating videogame:', error);
        },
      });
  }
}
