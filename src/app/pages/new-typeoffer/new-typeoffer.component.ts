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
  selector: 'app-new-typeoffer',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent, RouterLink],
  templateUrl: './new-typeoffer.component.html',
  styleUrl: './new-typeoffer.component.css'
})
export class NewTypeofferComponent {
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  typeoffers = signal<any>([]);

  typeofferForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    console.warn('[ngOnInit] Se ha inicializado el componente Detail');

    this.categoriesService.getTypeOffer().subscribe({
      next: (typeoffers) => {
        this.typeoffers.set(typeoffers);
      },
    });
  }

  onSubmit() {
    if (this.typeofferForm.valid) {
      console.log('Podemos enviar la información');
      this.categoriesService.newTypeOffer(this.typeofferForm.value).subscribe({
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
