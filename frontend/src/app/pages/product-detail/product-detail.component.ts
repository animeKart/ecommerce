import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { Product } from '../../models/api.models';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styles: ``
})
export class ProductDetailComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  wishlistService = inject(WishlistService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  product = signal<Product | null>(null);
  loading = signal(false);
  adding = signal(false);

  isInWishlist = computed(() => {
    const p = this.product();
    return p ? this.wishlistService.isInWishlist(p.id) : false;
  });

  // Get category slug from product category name
  getCategorySlug(): string {
    const product = this.product();
    if (!product) return '';
    return product.category.toLowerCase().replace(/\s+/g, '-');
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading.set(true);
      this.productService.getProduct(id).subscribe({
        next: (p) => {
          this.product.set(p);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Failed to load product:', err);
          this.loading.set(false);
          alert('Product not found');
          this.router.navigate(['/']);
        }
      });
    }
  }

  addToCart() {
    const product = this.product();
    if (!product) return;

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.adding.set(true);
    this.cartService.addToCart({ productId: product.id, quantity: 1 }).subscribe({
      next: () => {
        this.adding.set(false);
        alert('Added to cart successfully!');
      },
      error: (err) => {
        this.adding.set(false);
        console.error('Failed to add to cart:', err);
        alert('Failed to add to cart: ' + err.message);
      }
    });
  }

  toggleWishlist() {
    const product = this.product();
    if (!product) return;

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.wishlistService.toggleWishlist(product);
  }
}

