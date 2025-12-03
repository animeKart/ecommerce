import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, User } from '../models/api.models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private api = inject(ApiService);
    private router = inject(Router);

    // Signals to track authentication state
    isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));
    currentUser = signal<LoginResponse | null>(this.getUserFromStorage());

    private getUserFromStorage(): LoginResponse | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    login(credentials: LoginRequest) {
        return this.api.post<ApiResponse<LoginResponse>>('/api/auth/login', credentials).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            }),
            tap(data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
                this.isLoggedIn.set(true);
                this.currentUser.set(data);
                this.router.navigate(['/']);
            })
        );
    }

    register(data: RegisterRequest) {
        return this.api.post<ApiResponse<User>>('/api/auth/register', data).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.isLoggedIn.set(false);
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

    isAdmin(): boolean {
        const user = this.currentUser();
        return user?.role === 'ADMIN';
    }
}

