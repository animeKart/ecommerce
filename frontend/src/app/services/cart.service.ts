import { Injectable, signal } from '@angular/core';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartCount = signal(0);
    cartItems = signal<CartItem[]>([]);

    addToCart(product: any) {
        this.cartCount.update(count => count + 1);

        this.cartItems.update(items => {
            const existing = items.find(i => i.id === product.id);
            if (existing) {
                return items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...items, { ...product, quantity: 1 }];
        });
    }

    clearCart() {
        this.cartCount.set(0);
        this.cartItems.set([]);
    }
}
