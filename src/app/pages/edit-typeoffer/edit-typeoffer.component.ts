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
  selector: 'app-edit-typeoffer',
  standalone: true,
  imports: [NavComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterLinkWithHref],
  templateUrl: './edit-typeoffer.component.html',
  styleUrl: './edit-typeoffer.component.css'
})
export class EditTypeofferComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);

  typeofferId = signal<string>('');  
  typeoffer = signal<any>({});
  nameString = signal<string>('');  

  @Input() id: string = '';

  typeofferForm = new FormGroup({
    name: new FormControl('', {
      validators: [],
    }),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.typeofferId.set(id);
      this.loadTypeOffer();
    }
  }

  loadTypeOffer() {
    this.categoriesService.getTypeOfferById(this.typeofferId()).subscribe({ 
      next: (typeoffer) => {
        this.typeoffer.set(typeoffer);
        this.typeofferForm.patchValue(typeoffer);  
      },
      error: (error) => {
        console.error('Error loading typeoffer:', error);
      },
    });
  }

  onSubmit() {
    if (this.typeofferForm.valid) {
      const currentTypeOffer = this.typeofferForm.value;  
      const currentTypeOfferId = this.typeofferId();

      if (currentTypeOffer && currentTypeOfferId) {
        this.categoriesService.editTypeOffer(currentTypeOfferId, currentTypeOffer).subscribe({
          next: () => {
            console.log('Theme updated successfully!');
            this.router.navigate(['/categories']);
          },
          error: (error) => {
            console.error('Error updating typeoffer:', error);
          },
        });
      } else {
        console.error('typeoffer or typeoffer ID is null');
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
