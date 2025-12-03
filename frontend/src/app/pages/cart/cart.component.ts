import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart } from '../../models/api.models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styles: ``
})
export class CartComponent {
  cartService = inject(CartService);
  loading = signal(false);

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.loading.set(true);
    this.cartService.getCart().subscribe({
      next: () => this.loading.set(false),
      error: (err) => {
        console.error('Failed to load cart:', err);
        this.loading.set(false);
      }
    });
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;

    this.cartService.updateItemQuantity(productId, quantity).subscribe({
      next: () => console.log('Quantity updated'),
      error: (err) => alert('Failed to update quantity: ' + err.message)
    });
  }

  removeItem(productId: string) {
    if (!confirm('Remove this item from cart?')) return;

    this.cartService.removeItem(productId).subscribe({
      next: () => console.log('Item removed'),
      error: (err) => alert('Failed to remove item: ' + err.message)
    });
  }

  clearCart() {
    if (!confirm('Clear entire cart?')) return;

    this.cartService.clearCart().subscribe({
      next: () => console.log('Cart cleared'),
      error: (err) => alert('Failed to clear cart: ' + err.message)
    });
  }
}

