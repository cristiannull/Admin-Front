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
  selector: 'app-edit-theme',
  standalone: true,
  imports: [NavComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterLinkWithHref],
  templateUrl: './edit-theme.component.html',
  styleUrl: './edit-theme.component.css'
})
export class EditThemeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);

  themeId = signal<string>('');  
  theme = signal<any>({});
  nameString = signal<string>('');  

  @Input() id: string = '';

  themeForm = new FormGroup({
    name: new FormControl('', {
      validators: [],
    }),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.themeId.set(id);
      this.loadTheme();
    }
  }

  loadTheme() {
    this.categoriesService.getThemeById(this.themeId()).subscribe({ 
      next: (theme) => {
        this.theme.set(theme);
        this.themeForm.patchValue(theme);  
      },
      error: (error) => {
        console.error('Error loading theme:', error);
      },
    });
  }

  onSubmit() {
    if (this.themeForm.valid) {
      const currentTheme = this.themeForm.value;  
      const currentThemeId = this.themeId();

      if (currentTheme && currentThemeId) {
        this.categoriesService.editTheme(currentThemeId, currentTheme).subscribe({
          next: () => {
            console.log('Theme updated successfully!');
            this.router.navigate(['/categories']);
          },
          error: (error) => {
            console.error('Error updating theme:', error);
          },
        });
      } else {
        console.error('theme or theme ID is null');
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
