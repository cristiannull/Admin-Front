import { Component, inject, signal, Input } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [NavComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  userId = signal<any>([]);
  user = signal<any>({});
  roles = signal<any>([]);
  nameString = signal<any>([]);
  selectedPegiId = signal<any>([]);

  @Input() id: string = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.userId.set(id);
      this.loadUser();
      this.loadRol();
    }
  }

  loadUser() {
    this.userService.getUserById(this.id).subscribe({
      next: (user) => {
        this.user.set(user);
      },
      error: (error) => {
        console.error('Error loading user:', error);
      },
    });
  }

  loadRol() {
    this.userService.getRol().subscribe({
      next: (roles) => {
        this.roles.set(roles);
      },
    });
  }

  isSelected(rol: string) {
    if (Object.keys(this.user()).length === 0) return;
    console.log(rol);
    if (this.user().rol.name === rol) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  }

  userForm = new FormGroup({
    firstname: new FormControl('', {
      validators: [],
    }),
    lastname: new FormControl('', {
      validators: [],
    }),
    email: new FormControl(''),
    
    age: new FormControl('', {
      validators: [],
    }),
    rol: new FormControl('', {
      validators: [],
    }),
  });

  onSubmit() {
    const currentUser = this.user();
    const currentUserId = this.userId();

    if (currentUser && currentUserId) {
      this.userService
        .editUser(currentUserId, currentUser)
        .subscribe({
          next: () => {
            console.log('User updated successfully!');
            this.router.navigate(['/videogames']);
          },
          error: (error) => {
            console.error('Error updating user:', error);
          },
        });
    } else {
      console.error('user or user ID is null');
    }
  }
}
