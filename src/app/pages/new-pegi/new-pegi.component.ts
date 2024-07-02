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
  selector: 'app-new-pegi',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent, RouterLink],
  templateUrl: './new-pegi.component.html',
  styleUrl: './new-pegi.component.css'
})
export class NewPegiComponent {
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  pegis = signal<any>([]);

  pegiForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    console.warn('[ngOnInit] Se ha inicializado el componente Detail');

    this.categoriesService.getPegi().subscribe({
      next: (pegis) => {
        this.pegis.set(pegis);
      },
    });
  }

  onSubmit() {
    if (this.pegiForm.valid) {
      console.log('Podemos enviar la información');
      this.categoriesService.newPegi(this.pegiForm.value).subscribe({
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
