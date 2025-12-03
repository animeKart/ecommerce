import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { Address } from '../../models/api.models';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './checkout.component.html',
  styles: ``
})
export class CheckoutComponent {
  orderService = inject(OrderService);
  cartService = inject(CartService);
  router = inject(Router);

  loading = signal(false);
  submitting = signal(false);

  // Shipping address form
  shippingAddress: Address = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  };

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
        alert('Failed to load cart. Please try again.');
        this.router.navigate(['/cart']);
      }
    });
  }

  placeOrder() {
    if (!this.validateAddress()) {
      alert('Please fill in all address fields');
      return;
    }

    if (!this.cartService.cart() || this.cartService.cart()!.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    this.submitting.set(true);
    this.orderService.createOrder({ shippingAddress: this.shippingAddress }).subscribe({
      next: (order) => {
        this.submitting.set(false);
        alert(`Order placed successfully! Order ID: ${order.id}`);
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.submitting.set(false);
        console.error('Failed to place order:', err);
        alert('Failed to place order: ' + err.message);
      }
    });
  }

  validateAddress(): boolean {
    return !!(this.shippingAddress.street &&
      this.shippingAddress.city &&
      this.shippingAddress.state &&
      this.shippingAddress.zipCode &&
      this.shippingAddress.country);
  }
}

