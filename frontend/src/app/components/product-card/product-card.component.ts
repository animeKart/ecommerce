import { Component, Input, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/api.models';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {
  @Input() product!: Product;

  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  adding = false;
  isInWishlist = false;

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.adding = true;
    this.cartService.addToCart({ productId: this.product.id, quantity: 1 }).subscribe({
      next: () => {
        this.adding = false;
        console.log('Added to cart successfully');
      },
      error: (err) => {
        this.adding = false;
        console.error('Failed to add to cart:', err);
        alert('Failed to add to cart: ' + err.message);
      }
    });
  }

  quickAddToCart(event: Event) {
    event.stopPropagation();
    this.addToCart();
  }

  toggleWishlist(event: Event) {
    event.stopPropagation();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    // Toggle wishlist state (would integrate with wishlist service in real app)
    this.isInWishlist = !this.isInWishlist;
    console.log(`Product ${this.product.id} ${this.isInWishlist ? 'added to' : 'removed from'} wishlist`);
  }

  viewProduct() {
    this.router.navigate(['/products', this.product.id]);
  }
}

