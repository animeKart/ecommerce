import { Component, inject, computed } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styles: ``
})
export class CartComponent {
  cartService = inject(CartService);

  totalPrice = computed(() => {
    return this.cartService.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0);
  });
}
