import { Component, signal, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-cards-users',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLink],
  templateUrl: './cards-users.component.html',
  styleUrl: './cards-users.component.css'
})
export class CardsUsersComponent {
  private userService= inject(UserService);
  private router = inject(Router);

  users= signal<any>([]);
  @Input() id: string = '';
  @Input() firstname: string = '';
  @Input() lastname: string = '';
  @Input() email: string = '';


  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users: any) => {
        this.users.set(users.data);
      },
    });
  }

  deleteUser(id: string) {
    if (confirm('seguro quieres eliminar')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error deleting User:', error);
        },
      });
    }
  }
}
