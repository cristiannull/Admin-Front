import { Component, inject, signal, Input } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, Rol } from '../../models/User.model';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    NavComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  userId = signal<string | null>(null);
  user = signal<User | null>(null);
  roles = signal<Rol[]>([]);

  @Input() id: string = '';

  userForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(),
    rol: new FormControl(''),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.userId.set(id);
      this.loadUser();
      this.loadRoles();
    }
  }

  loadUser() {
    if (this.userId() !== null) {
      this.userService.getUserById(this.userId()!).subscribe({
        next: (user: User) => {
          /* console.log('User loaded:', user); */

          const selectedRolId =
            user.rol instanceof Array ? user.rol[0]?._id : undefined;
          /* console.log('selectedRolId', selectedRolId); */

          this.user.set(user);

          this.userForm.patchValue({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            age: user.age !== null ? user.age : '',
            rol: selectedRolId,
          });
        },
        error: (error) => {
          console.error('Error loading user:', error);
        },
      });
    }
  }

  loadRoles() {
    this.userService.getRol().subscribe({
      next: (roles: Rol[]) => {
        this.roles.set(roles);
      },
    });
  }

  onSubmit() {
    const formValues = this.userForm.value;
    const userId = this.userId() ?? '';

    const ageValue = typeof formValues.age === 'number' ? formValues.age : null;

    const updatedUser: User = {
      _id: userId,
      firstname: formValues.firstname || '',
      lastname: formValues.lastname || '',
      email: formValues.email || '',
      password: formValues.password || '',
      age: ageValue,
      rol: { _id: formValues.rol || '', name: '' },
    };

    this.userService.editUser(userId, updatedUser).subscribe({
      next: () => {
        /* console.log('User updated successfully!'); */
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
    });
  }
}
