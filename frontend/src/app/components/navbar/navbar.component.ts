import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartDrawerComponent } from '../cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CartDrawerComponent],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  wishlistService = inject(WishlistService);
  router = inject(Router);

  searchQuery = '';
  showUserMenu = false;
  showMobileMenu = false;
  showCartDrawer = false;

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

  toggleCartDrawer() {
    this.showCartDrawer = !this.showCartDrawer;
  }

  closeCartDrawer() {
    this.showCartDrawer = false;
  }

  logout() {
    this.authService.logout();
    this.closeUserMenu();
  }
}

