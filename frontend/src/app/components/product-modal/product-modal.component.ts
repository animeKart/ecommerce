import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../models/api.models';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-modal',
    standalone: true,
    imports: [CommonModule, CurrencyPipe],
    templateUrl: './product-modal.component.html',
    styles: [`
        :host {
            display: contents;
        }
    `]
})
export class ProductModalComponent {
    @Input() product: Product | null = null;
    @Input() isOpen = false;

    @Output() close = new EventEmitter<void>();
    @Output() addedToCart = new EventEmitter<void>();

    cartService = inject(CartService);
    wishlistService = inject(WishlistService);
    authService = inject(AuthService);
    router = inject(Router);

    quantity = signal(1);
    adding = signal(false);

    isInWishlist = computed(() => {
        return this.product ? this.wishlistService.isInWishlist(this.product.id) : false;
    });

    incrementQuantity() {
        if (this.product && this.quantity() < this.product.stockQuantity) {
            this.quantity.update(q => q + 1);
        }
    }

    decrementQuantity() {
        if (this.quantity() > 1) {
            this.quantity.update(q => q - 1);
        }
    }

    addToCart() {
        if (!this.product) return;

        if (!this.authService.isLoggedIn()) {
            this.closeModal();
            this.router.navigate(['/login']);
            return;
        }

        this.adding.set(true);
        this.cartService.addToCart({
            productId: this.product.id,
            quantity: this.quantity()
        }).subscribe({
            next: () => {
                this.adding.set(false);
                this.addedToCart.emit();
                this.quantity.set(1);
            },
            error: (err) => {
                this.adding.set(false);
                console.error('Failed to add to cart:', err);
                alert('Failed to add to cart: ' + err.message);
            }
        });
    }

    toggleWishlist() {
        if (!this.product) return;

        if (!this.authService.isLoggedIn()) {
            this.closeModal();
            this.router.navigate(['/login']);
            return;
        }

        this.wishlistService.toggleWishlist(this.product);
    }

    closeModal() {
        this.quantity.set(1);
        this.close.emit();
    }

    onBackdropClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
            this.closeModal();
        }
    }
}
