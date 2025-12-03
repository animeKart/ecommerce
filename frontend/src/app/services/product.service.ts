import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse, Product, CreateProductRequest, UpdateProductRequest } from '../models/api.models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private api = inject(ApiService);

    getAllProducts(page: number = 0, size: number = 10): Observable<PaginatedResponse<Product>> {
        return this.api.get<ApiResponse<PaginatedResponse<Product>>>(`/api/products?page=${page}&size=${size}`).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    getProduct(id: string): Observable<Product> {
        return this.api.get<ApiResponse<Product>>(`/api/products/${id}`).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    searchProducts(query: string, page: number = 0, size: number = 10): Observable<PaginatedResponse<Product>> {
        return this.api.get<ApiResponse<PaginatedResponse<Product>>>(`/api/products/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    getProductsByCategory(category: string, page: number = 0, size: number = 10): Observable<PaginatedResponse<Product>> {
        return this.api.get<ApiResponse<PaginatedResponse<Product>>>(`/api/products/category/${encodeURIComponent(category)}?page=${page}&size=${size}`).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    getProductsByPriceRange(minPrice: number, maxPrice: number, page: number = 0, size: number = 10): Observable<PaginatedResponse<Product>> {
        return this.api.get<ApiResponse<PaginatedResponse<Product>>>(`/api/products/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    // Admin operations
    createProduct(product: CreateProductRequest): Observable<Product> {
        return this.api.post<ApiResponse<Product>>('/api/products', product).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    updateProduct(id: string, product: UpdateProductRequest): Observable<Product> {
        return this.api.put<ApiResponse<Product>>(`/api/products/${id}`, product).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    deleteProduct(id: string): Observable<void> {
        return this.api.delete<ApiResponse<null>>(`/api/products/${id}`).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return;
            })
        );
    }
}

