import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';
import { VideogamesService } from '../../service/videogames.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private videogameService = inject(VideogamesService);

  @Input() id: string = '';
  @Input() name: string = '';

  logout() {
    this.userService.removeToken();
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.name !== '') {
      const searchName = this.name.toLowerCase();
      this.videogameService.getVideogameSearch(searchName).subscribe({
        next: (videogames: any) => {
          if (videogames && videogames.length > 0) {
            this.router.navigate([`/search/${this.name}`]);
          } else {
            this.router.navigate(['/not-found']);
          }
        },
        error: (error: any) => {
          console.error('Error fetching videogames:', error);
          this.router.navigate(['/not-found']);
        },
      });
    } else {
      this.router.navigate(['/videogamelist']);
    }
  }
}
