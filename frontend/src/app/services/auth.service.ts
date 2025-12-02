import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private api = inject(ApiService);
    private router = inject(Router);

    // Signal to track if user is logged in
    isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

    login(credentials: any) {
        return this.api.post<{ token: string }>('/api/auth/login', credentials).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
                this.isLoggedIn.set(true);
                this.router.navigate(['/']);
            })
        );
    }

    register(data: any) {
        return this.api.post('/api/auth/register', data);
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn.set(false);
        this.router.navigate(['/login']);
    }
}
