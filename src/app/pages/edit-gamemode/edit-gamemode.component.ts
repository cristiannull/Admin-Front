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
  selector: 'app-edit-gamemode',
  standalone: true,
  imports: [NavComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterLinkWithHref],
  templateUrl: './edit-gamemode.component.html',
  styleUrl: './edit-gamemode.component.css'
})
export class EditGamemodeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);

  gamemodeId = signal<string>('');  
  gamemode = signal<any>({});
  nameString = signal<string>('');  

  @Input() id: string = '';

  gamemodeForm = new FormGroup({
    name: new FormControl('', {
      validators: [],
    }),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.gamemodeId.set(id);
      this.loadGameMode();
    }
  }

  loadGameMode() {
    this.categoriesService.getGameModeById(this.gamemodeId()).subscribe({  
      next: (gamemode) => {
        this.gamemode.set(gamemode);
        this.gamemodeForm.patchValue(gamemode);  
      },
      error: (error) => {
        console.error('Error loading gamemode:', error);
      },
    });
  }

  onSubmit() {
    if (this.gamemodeForm.valid) {
      const currentGameMode = this.gamemodeForm.value;  
      const currentGameModeId = this.gamemodeId();

      if (currentGameMode && currentGameModeId) {
        this.categoriesService.editGameMode(currentGameModeId, currentGameMode).subscribe({
          next: () => {
            console.log('Game Mode updated successfully!');
            this.router.navigate(['/categories']);
          },
          error: (error) => {
            console.error('Error updating gamemode:', error);
          },
        });
      } else {
        console.error('gamemode or gamemode ID is null');
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
