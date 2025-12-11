import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CategoryCardsComponent } from '../../components/category-cards/category-cards.component';
import { Product } from '../../models/api.models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, CarouselComponent, CategoryCardsComponent],
  templateUrl: './product-list.component.html',
  styles: ``
})
export class ProductListComponent {
  productService = inject(ProductService);

  products = signal<Product[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  loading = signal(false);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(page: number = 0) {
    this.loading.set(true);
    this.productService.getAllProducts(page, 12).subscribe({
      next: (response) => {
        this.products.set(response.content);
        this.currentPage.set(response.number);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.loading.set(false);
      }
    });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.loadProducts(this.currentPage() + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 0) {
      this.loadProducts(this.currentPage() - 1);
    }
  }
}

