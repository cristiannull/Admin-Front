import { Component, inject, signal } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../service/categories.service';

@Component({
  selector: 'app-new-gamemode',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent, RouterLink],
  templateUrl: './new-gamemode.component.html',
  styleUrl: './new-gamemode.component.css'
})
export class NewGamemodeComponent {
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  gamemodes = signal<any>([]);

  gamemodeForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    console.warn('[ngOnInit] Se ha inicializado el componente Detail');

    this.categoriesService.getGameMode().subscribe({
      next: (gamemodes) => {
        this.gamemodes.set(gamemodes);
      },
    });
  }

  onSubmit() {
    if (this.gamemodeForm.valid) {
      console.log('Podemos enviar la información');
      this.categoriesService.newGameMode(this.gamemodeForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/categories']);
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
