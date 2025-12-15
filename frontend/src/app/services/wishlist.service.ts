import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/api.models';

export interface WishlistItem {
    productId: string;
    productName: string;
    price: number;
    imageUrl: string;
    addedAt: Date;
}

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    private readonly STORAGE_KEY = 'wishlist_items';

    // Wishlist items signal
    private wishlistItems = signal<WishlistItem[]>(this.loadFromStorage());

    // Computed values
    wishlistCount = computed(() => this.wishlistItems().length);
    items = computed(() => this.wishlistItems());

    constructor() {
        // Initialize from local storage
        this.wishlistItems.set(this.loadFromStorage());
    }

    private loadFromStorage(): WishlistItem[] {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    private saveToStorage(items: WishlistItem[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        } catch (e) {
            console.error('Failed to save wishlist to storage:', e);
        }
    }

    isInWishlist(productId: string): boolean {
        return this.wishlistItems().some(item => item.productId === productId);
    }

    addToWishlist(product: Product): void {
        if (this.isInWishlist(product.id)) return;

        const newItem: WishlistItem = {
            productId: product.id,
            productName: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            addedAt: new Date()
        };

        const updatedItems = [...this.wishlistItems(), newItem];
        this.wishlistItems.set(updatedItems);
        this.saveToStorage(updatedItems);
    }

    removeFromWishlist(productId: string): void {
        const updatedItems = this.wishlistItems().filter(item => item.productId !== productId);
        this.wishlistItems.set(updatedItems);
        this.saveToStorage(updatedItems);
    }

    toggleWishlist(product: Product): boolean {
        if (this.isInWishlist(product.id)) {
            this.removeFromWishlist(product.id);
            return false;
        } else {
            this.addToWishlist(product);
            return true;
        }
    }

    clearWishlist(): void {
        this.wishlistItems.set([]);
        this.saveToStorage([]);
    }
}
