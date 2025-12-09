import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  searchQuery = '';
  showUserMenu = false;
  showMobileMenu = false;

  onSearch() {
    if (this.searchQuery.trim()) {
      // Navigate to product list with search query
      this.router.navigate(['/'], { queryParams: { search: this.searchQuery } });
    }
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu() {
    this.showUserMenu = false;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }

  logout() {
    this.authService.logout();
    this.closeUserMenu();
  }
}
