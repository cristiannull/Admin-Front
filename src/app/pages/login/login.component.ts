import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  showPassword = signal(false);
  errorMessage: string = '';
  passwordVisibility = signal(false);

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.adminlogin(this.loginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('user_token', response.token);
          this.router.navigate(['/products']);
        },
        error: (error) => {
          if (error.status === 403) {
            this.errorMessage =
              'No tienes acceso. Este usuario no es un administrador.';
          } else if (error.status === 401) {
            this.errorMessage = 'Correo electrónico o contraseña incorrectos';
          }
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos';
    }
  }
  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }
}
