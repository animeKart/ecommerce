import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private api = inject(ApiService);

    getAllProducts(): Observable<any[]> {
        // Mock data for MVP
        return of([
            { id: 1, name: 'Product 1', price: 100, description: 'Description 1' },
            { id: 2, name: 'Product 2', price: 200, description: 'Description 2' },
            { id: 3, name: 'Product 3', price: 300, description: 'Description 3' },
            { id: 4, name: 'Product 4', price: 400, description: 'Description 4' },
        ]);
    }

    getProduct(id: number): Observable<any> {
        return of({ id, name: `Product ${id}`, price: 100 * id, description: `Description ${id}` });
    }
}
