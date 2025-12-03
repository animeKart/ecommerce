import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/api.models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styles: ``
})
export class ProductDetailComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  product = signal<Product | null>(null);
  loading = signal(false);
  adding = signal(false);

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
}

