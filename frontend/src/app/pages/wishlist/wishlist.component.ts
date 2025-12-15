import { Component, inject, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService, WishlistItem } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-wishlist',
    standalone: true,
    imports: [CommonModule, RouterLink, CurrencyPipe],
    templateUrl: './wishlist.component.html',
    styles: ``
})
export class WishlistComponent {
    wishlistService = inject(WishlistService);
    cartService = inject(CartService);
    authService = inject(AuthService);
    router = inject(Router);

    items = computed(() => this.wishlistService.items());
    isEmpty = computed(() => this.items().length === 0);

    addingToCart: Record<string, boolean> = {};

    removeFromWishlist(productId: string) {
        this.wishlistService.removeFromWishlist(productId);
    }

    addToCart(item: WishlistItem) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }

        this.addingToCart[item.productId] = true;
        this.cartService.addToCart({ productId: item.productId, quantity: 1 }).subscribe({
            next: () => {
                this.addingToCart[item.productId] = false;
                // Optionally remove from wishlist after adding to cart
                // this.wishlistService.removeFromWishlist(item.productId);
            },
            error: (err) => {
                this.addingToCart[item.productId] = false;
                console.error('Failed to add to cart:', err);
                alert('Failed to add to cart: ' + err.message);
            }
        });
    }

    moveAllToCart() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }

        const items = this.items();
        items.forEach(item => {
            this.addToCart(item);
        });
    }

    clearWishlist() {
        if (confirm('Are you sure you want to clear your wishlist?')) {
            this.wishlistService.clearWishlist();
        }
    }
}
