import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-cart-drawer',
    standalone: true,
    imports: [CommonModule, CurrencyPipe, RouterLink],
    templateUrl: './cart-drawer.component.html',
    styles: [`
        :host {
            display: contents;
        }
    `]
})
export class CartDrawerComponent {
    @Input() isOpen = false;
    @Output() close = new EventEmitter<void>();
    @Output() viewFullCart = new EventEmitter<void>();

    cartService = inject(CartService);
    authService = inject(AuthService);
    router = inject(Router);

    ngOnChanges() {
        // Fetch cart when drawer opens
        if (this.isOpen && this.authService.isLoggedIn()) {
            this.cartService.getCart().subscribe();
        }
    }

    updateQuantity(productId: string, quantity: number) {
        if (quantity < 1) return;

        this.cartService.updateItemQuantity(productId, quantity).subscribe({
            error: (err) => console.error('Failed to update quantity:', err)
        });
    }

    removeItem(productId: string) {
        this.cartService.removeItem(productId).subscribe({
            error: (err) => console.error('Failed to remove item:', err)
        });
    }

    closeDrawer() {
        this.close.emit();
    }

    goToFullCart() {
        this.closeDrawer();
        this.router.navigate(['/cart']);
    }

    goToCheckout() {
        this.closeDrawer();
        this.router.navigate(['/checkout']);
    }

    onBackdropClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('drawer-backdrop')) {
            this.closeDrawer();
        }
    }
}
