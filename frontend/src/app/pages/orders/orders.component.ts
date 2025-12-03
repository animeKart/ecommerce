import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/api.models';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [CurrencyPipe, DatePipe, RouterLink],
    templateUrl: './orders.component.html',
    styles: ``
})
export class OrdersComponent {
    orderService = inject(OrderService);

    orders = signal<Order[]>([]);
    loading = signal(false);

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        this.loading.set(true);
        this.orderService.getUserOrders().subscribe({
            next: (orders) => {
                this.orders.set(orders);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Failed to load orders:', err);
                this.loading.set(false);
                alert('Failed to load orders: ' + err.message);
            }
        });
    }

    getStatusColor(status: string): string {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'PROCESSING': return 'bg-blue-100 text-blue-800';
            case 'SHIPPED': return 'bg-purple-100 text-purple-800';
            case 'DELIVERED': return 'bg-green-100 text-green-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
}
