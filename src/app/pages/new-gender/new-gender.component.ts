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
  selector: 'app-new-gender',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent, RouterLink],
  templateUrl: './new-gender.component.html',
  styleUrl: './new-gender.component.css'
})
export class NewGenderComponent {
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  genders = signal<any>([]);

  genderForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    console.warn('[ngOnInit] Se ha inicializado el componente Detail');

    this.categoriesService.getGender().subscribe({
      next: (genders) => {
        this.genders.set(genders);
      },
    });
  }

  onSubmit() {
    if (this.genderForm.valid) {
      console.log('Podemos enviar la información');
      this.categoriesService.newGender(this.genderForm.value).subscribe({
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
