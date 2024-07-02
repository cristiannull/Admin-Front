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
  selector: 'app-new-theme',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent, RouterLink],
  templateUrl: './new-theme.component.html',
  styleUrl: './new-theme.component.css'
})
export class NewThemeComponent {
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  themes = signal<any>([]);

  themeForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    console.warn('[ngOnInit] Se ha inicializado el componente Detail');

    this.categoriesService.getTheme().subscribe({
      next: (themes) => {
        this.themes.set(themes);
      },
    });
  }

  onSubmit() {
    if (this.themeForm.valid) {
      console.log('Podemos enviar la información');
      this.categoriesService.newTheme(this.themeForm.value).subscribe({
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
