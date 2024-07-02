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
  selector: 'app-new-developer',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent, RouterLink],
  templateUrl: './new-developer.component.html',
  styleUrl: './new-developer.component.css'
})
export class NewDeveloperComponent {
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  developers = signal<any>([]);

  developerForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    console.warn('[ngOnInit] Se ha inicializado el componente Detail');

    this.categoriesService.getDeveloper().subscribe({
      next: (developers) => {
        this.developers.set(developers);
      },
    });
  }

  onSubmit() {
    if (this.developerForm.valid) {
      console.log('Podemos enviar la información');
      this.categoriesService.newDeveloper(this.developerForm.value).subscribe({
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
