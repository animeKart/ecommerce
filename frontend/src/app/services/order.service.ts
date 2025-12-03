import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { ApiResponse, Order, CreateOrderRequest, OrderStatus } from '../models/api.models';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private api = inject(ApiService);

    createOrder(request: CreateOrderRequest): Observable<Order> {
        return this.api.post<ApiResponse<Order>>('/api/orders', request).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    getUserOrders(): Observable<Order[]> {
        return this.api.get<ApiResponse<Order[]>>('/api/orders').pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    getOrderById(id: string): Observable<Order> {
        return this.api.get<ApiResponse<Order>>(`/api/orders/${id}`).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    // Admin operations
    getAllOrders(): Observable<Order[]> {
        return this.api.get<ApiResponse<Order[]>>('/api/orders/all').pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    updateOrderStatus(id: string, status: OrderStatus): Observable<Order> {
        return this.api.put<ApiResponse<Order>>(`/api/orders/${id}/status?status=${status}`, {}).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }
}
