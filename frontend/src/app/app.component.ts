import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-frontend';

  authService = inject(AuthService);
  cartService = inject(CartService);

  ngOnInit() {
    // Load cart if user is logged in
    if (this.authService.isLoggedIn()) {
      this.cartService.getCart().subscribe({
        error: (err) => console.error('Failed to load cart:', err)
      });
    }
  }
}

