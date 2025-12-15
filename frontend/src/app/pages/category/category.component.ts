import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/api.models';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';

interface CategoryInfo {
    name: string;
    slug: string;
    description: string;
}

const CATEGORIES: Record<string, CategoryInfo> = {
    'anime': {
        name: 'Anime',
        slug: 'anime',
        description: 'Explore our collection of anime-inspired artwork and merchandise.'
    },
    'abstract-art': {
        name: 'Abstract Art',
        slug: 'abstract-art',
        description: 'Discover unique abstract art pieces for your space.'
    },
    'spiritual': {
        name: 'Spiritual',
        slug: 'spiritual',
        description: 'Find peace with our spiritual and mindfulness collection.'
    },
    'custom': {
        name: 'Custom',
        slug: 'custom',
        description: 'Custom-made products tailored just for you.'
    }
};

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent, ProductModalComponent],
    templateUrl: './category.component.html',
    styles: ``
})
export class CategoryComponent implements OnInit {
    route = inject(ActivatedRoute);
    router = inject(Router);
    productService = inject(ProductService);

    // Category info
    categorySlug = signal('');
    categoryInfo = computed(() => CATEGORIES[this.categorySlug()] || null);

    // Products and pagination
    products = signal<Product[]>([]);
    currentPage = signal(0);
    totalPages = signal(0);
    totalElements = signal(0);
    loading = signal(false);
    pageSize = 10;

    // Search
    searchQuery = signal('');
    searchInput = '';

    // Modal
    selectedProduct = signal<Product | null>(null);
    isModalOpen = signal(false);

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const slug = params.get('slug') || '';
            this.categorySlug.set(slug);

            // Read query params
            const queryParams = this.route.snapshot.queryParams;
            if (queryParams['page']) {
                this.currentPage.set(parseInt(queryParams['page'], 10) - 1);
            }
            if (queryParams['q']) {
                this.searchQuery.set(queryParams['q']);
                this.searchInput = queryParams['q'];
            }

            this.loadProducts();
        });
    }

    loadProducts() {
        if (!this.categoryInfo()) {
            this.router.navigate(['/']);
            return;
        }

        this.loading.set(true);
        const categoryName = this.categoryInfo()!.name;

        // Use search if query exists, otherwise get by category
        if (this.searchQuery()) {
            // Search within category - we'll filter by category on client side
            // since backend might not support category+search together
            this.productService.searchProducts(this.searchQuery(), this.currentPage(), this.pageSize)
                .subscribe({
                    next: (response) => {
                        // Filter by category (client-side filtering if backend doesn't support)
                        const filtered = response.content.filter(p =>
                            p.category.toLowerCase() === categoryName.toLowerCase()
                        );
                        this.products.set(filtered);
                        this.totalPages.set(response.totalPages);
                        this.totalElements.set(response.totalElements);
                        this.loading.set(false);
                    },
                    error: (err) => {
                        console.error('Failed to search products:', err);
                        this.loading.set(false);
                    }
                });
        } else {
            this.productService.getProductsByCategory(categoryName, this.currentPage(), this.pageSize)
                .subscribe({
                    next: (response) => {
                        this.products.set(response.content);
                        this.currentPage.set(response.number);
                        this.totalPages.set(response.totalPages);
                        this.totalElements.set(response.totalElements);
                        this.loading.set(false);
                    },
                    error: (err) => {
                        console.error('Failed to load products:', err);
                        this.loading.set(false);
                    }
                });
        }
    }

    onSearch() {
        this.searchQuery.set(this.searchInput);
        this.currentPage.set(0);
        this.updateUrl();
        this.loadProducts();
    }

    clearSearch() {
        this.searchInput = '';
        this.searchQuery.set('');
        this.currentPage.set(0);
        this.updateUrl();
        this.loadProducts();
    }

    nextPage() {
        if (this.currentPage() < this.totalPages() - 1) {
            this.currentPage.update(p => p + 1);
            this.updateUrl();
            this.loadProducts();
        }
    }

    previousPage() {
        if (this.currentPage() > 0) {
            this.currentPage.update(p => p - 1);
            this.updateUrl();
            this.loadProducts();
        }
    }

    goToPage(page: number) {
        if (page >= 0 && page < this.totalPages()) {
            this.currentPage.set(page);
            this.updateUrl();
            this.loadProducts();
        }
    }

    private updateUrl() {
        const queryParams: Record<string, string> = {};
        if (this.currentPage() > 0) {
            queryParams['page'] = (this.currentPage() + 1).toString();
        }
        if (this.searchQuery()) {
            queryParams['q'] = this.searchQuery();
        }
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge'
        });
    }

    openProductModal(product: Product) {
        this.selectedProduct.set(product);
        this.isModalOpen.set(true);
        document.body.style.overflow = 'hidden';
    }

    closeProductModal() {
        this.isModalOpen.set(false);
        this.selectedProduct.set(null);
        document.body.style.overflow = '';
    }

    onAddedToCart() {
        // Optionally show a success message or close the modal
        console.log('Product added to cart successfully');
    }

    // Generate page numbers for pagination
    getPageNumbers(): number[] {
        const total = this.totalPages();
        const current = this.currentPage();
        const pages: number[] = [];

        // Show max 5 page numbers
        let start = Math.max(0, current - 2);
        let end = Math.min(total - 1, start + 4);

        if (end - start < 4) {
            start = Math.max(0, end - 4);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }
}
