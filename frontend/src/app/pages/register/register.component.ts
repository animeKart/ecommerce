import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  name = '';
  email = '';
  password = '';

  register() {
    this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        console.log('Registered');
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Registration failed', err)
    });
  }
}
