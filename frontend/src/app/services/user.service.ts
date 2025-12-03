import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { ApiResponse, User } from '../models/api.models';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private api = inject(ApiService);

    getProfile(): Observable<User> {
        return this.api.get<ApiResponse<User>>('/api/users/profile').pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }

    updateProfile(data: Partial<User>): Observable<User> {
        return this.api.put<ApiResponse<User>>('/api/users/profile', data).pipe(
            map(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.data;
            })
        );
    }
}
