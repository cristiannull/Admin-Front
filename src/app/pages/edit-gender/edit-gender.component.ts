import { Component, inject, signal, Input } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { CategoriesService } from '../../service/categories.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkWithHref  } from '@angular/router';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-gender',
  standalone: true,
  imports: [NavComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterLinkWithHref ],
  templateUrl: './edit-gender.component.html',
  styleUrl: './edit-gender.component.css'
})
export class EditGenderComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);

  genderId = signal<string>('');  
  gender = signal<any>({});
  nameString = signal<string>('');  

  @Input() id: string = '';

  genderForm = new FormGroup({
    name: new FormControl('', {
      validators: [],
    }),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.genderId.set(id);
      this.loadGender();
    }
  }

  loadGender() {
    this.categoriesService.getGenderById(this.genderId()).subscribe({ 
      next: (gender) => {
        this.gender.set(gender);
        this.genderForm.patchValue(gender); 
      },
      error: (error) => {
        console.error('Error loading gender:', error);
      },
    });
  }

  onSubmit() {
    if (this.genderForm.valid) {
      const currentGender = this.genderForm.value; 
      const currentGenderId = this.genderId();

      if (currentGender && currentGenderId) {
        this.categoriesService.editGender(currentGenderId, currentGender).subscribe({
          next: () => {
            console.log('Gender updated successfully!');
            this.router.navigate(['/categories']);
          },
          error: (error) => {
            console.error('Error updating gender:', error);
          },
        });
      } else {
        console.error('Gender or gender ID is null');
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
