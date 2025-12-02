import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  authService = inject(AuthService);
  email = '';
  password = '';

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => console.log('Logged in'),
      error: (err) => console.error('Login failed', err)
    });
  }
}
