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
  selector: 'app-edit-pegi',
  standalone: true,
  imports: [NavComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterLinkWithHref ],
  templateUrl: './edit-pegi.component.html',
  styleUrl: './edit-pegi.component.css'
})
export class EditPegiComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);

  pegiId = signal<string>('');  
  pegi = signal<any>({});
  nameString = signal<string>('');  

  @Input() id: string = '';

  pegiForm = new FormGroup({
    name: new FormControl('', {
      validators: [],
    }),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.pegiId.set(id);
      this.loadPegi();
    }
  }

  loadPegi() {
    this.categoriesService.getPegiById(this.pegiId()).subscribe({ 
      next: (pegi) => {
        this.pegi.set(pegi);
        this.pegiForm.patchValue(pegi);  
      },
      error: (error) => {
        console.error('Error loading pegi:', error);
      },
    });
  }

  onSubmit() {
    if (this.pegiForm.valid) {
      const currentPegi = this.pegiForm.value;  
      const currentpegiId = this.pegiId();

      if (currentPegi && currentpegiId) {
        this.categoriesService.editPegi(currentpegiId, currentPegi).subscribe({
          next: () => {
            console.log('Pegi updated successfully!');
            this.router.navigate(['/categories']);
          },
          error: (error) => {
            console.error('Error updating pegi:', error);
          },
        });
      } else {
        console.error('pegi or pegi ID is null');
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
