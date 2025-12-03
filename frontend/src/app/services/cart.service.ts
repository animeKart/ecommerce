import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { ApiResponse, Cart, AddToCartRequest, UpdateCartItemRequest } from '../models/api.models';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private api = inject(ApiService);

    // Signals for reactive cart state
    cart = signal<Cart | null>(null);
    cartCount = signal(0);

    getCart(): Observable<Cart> {
        return this.api.get<ApiResponse<Cart>>('/api/cart').pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            tap(cart => {
                this.cart.set(cart);
                this.cartCount.set(cart.items.reduce((sum, item) => sum + item.quantity, 0));
            })
        );
    }

    addToCart(request: AddToCartRequest): Observable<Cart> {
        return this.api.post<ApiResponse<Cart>>('/api/cart/items', request).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            tap(cart => {
                this.cart.set(cart);
                this.cartCount.set(cart.items.reduce((sum, item) => sum + item.quantity, 0));
            })
        );
    }

    updateItemQuantity(productId: string, quantity: number): Observable<Cart> {
        const request: UpdateCartItemRequest = { quantity };
        return this.api.put<ApiResponse<Cart>>(`/api/cart/items/${productId}`, request).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            tap(cart => {
                this.cart.set(cart);
                this.cartCount.set(cart.items.reduce((sum, item) => sum + item.quantity, 0));
            })
        );
    }

    removeItem(productId: string): Observable<Cart> {
        return this.api.delete<ApiResponse<Cart>>(`/api/cart/items/${productId}`).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            tap(cart => {
                this.cart.set(cart);
                this.cartCount.set(cart.items.reduce((sum, item) => sum + item.quantity, 0));
            })
        );
    }

    clearCart(): Observable<void> {
        return this.api.delete<ApiResponse<null>>('/api/cart').pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return;
            }),
            tap(() => {
                this.cart.set(null);
                this.cartCount.set(0);
            })
        );
    }
}

