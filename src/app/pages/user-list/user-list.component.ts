import { Component, inject, signal, computed } from '@angular/core';
import { CardsUsersComponent } from '../../components/cards-users/cards-users.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../service/user.service';
import { SkeletonModule } from 'primeng/skeleton';
import { NavComponent } from '../../components/nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CardsUsersComponent,
    SkeletonModule,
    RouterLinkActive,
    RouterLink,
    NavComponent,
    CommonModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  private userService = inject(UserService);

  users = signal<any>([]);
  data: any;

  ngOnInit() {
    console.warn(
      '[ngOnInit] El componente lista de videojuegos ha sido inicializado'
    );  
    this.userService.getUsers().subscribe({
      next: (users: any) => {
        this.users.set(users);
      },
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        window.location.reload(); 
      },
      error: (error) => {
        console.error('Error deleting videogame:', error);
      },
    });
  }
}
