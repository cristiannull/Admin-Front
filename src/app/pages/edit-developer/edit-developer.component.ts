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
  selector: 'app-edit-developer',
  standalone: true,
  imports: [NavComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterLinkWithHref],
  templateUrl: './edit-developer.component.html',
  styleUrl: './edit-developer.component.css'
})
export class EditDeveloperComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);

  developerId = signal<string>('');  
  developer = signal<any>({});
  nameString = signal<string>('');  

  @Input() id: string = '';

  developerForm = new FormGroup({
    name: new FormControl('', {
      validators: [],
    }),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.developerId.set(id);
      this.loadDeveloper();
    }
  }

  loadDeveloper() {
    this.categoriesService.getDeveloperById(this.developerId()).subscribe({  
      next: (developer) => {
        this.developer.set(developer);
        this.developerForm.patchValue(developer);  
      },
      error: (error) => {
        console.error('Error loading developer:', error);
      },
    });
  }

  onSubmit() {
    if (this.developerForm.valid) {
      const currentDeveloper = this.developerForm.value;  
      const currentDeveloperId = this.developerId();

      if (currentDeveloper && currentDeveloperId) {
        this.categoriesService.editDeveloper(currentDeveloperId, currentDeveloper).subscribe({
          next: () => {
            console.log('Developer updated successfully!');
            this.router.navigate(['/categories']);
          },
          error: (error) => {
            console.error('Error updating developer:', error);
          },
        });
      } else {
        console.error('developer or developer ID is null');
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
