import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/api.models';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [FormsModule, DatePipe],
    templateUrl: './profile.component.html',
    styles: ``
})
export class ProfileComponent {
    userService = inject(UserService);
    authService = inject(AuthService);

    user = signal<User | null>(null);
    loading = signal(false);
    editing = signal(false);
    saving = signal(false);

    // Edit form
    editForm = {
        firstName: '',
        lastName: ''
    };

    ngOnInit() {
        this.loadProfile();
    }

    loadProfile() {
        this.loading.set(true);
        this.userService.getProfile().subscribe({
            next: (user) => {
                this.user.set(user);
                this.editForm.firstName = user.firstName;
                this.editForm.lastName = user.lastName;
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Failed to load profile:', err);
                this.loading.set(false);
                alert('Failed to load profile: ' + err.message);
            }
        });
    }

    startEditing() {
        this.editing.set(true);
    }

    cancelEditing() {
        const user = this.user();
        if (user) {
            this.editForm.firstName = user.firstName;
            this.editForm.lastName = user.lastName;
        }
        this.editing.set(false);
    }

    saveProfile() {
        this.saving.set(true);
        this.userService.updateProfile(this.editForm).subscribe({
            next: (user) => {
                this.user.set(user);
                this.editing.set(false);
                this.saving.set(false);
                alert('Profile updated successfully!');
            },
            error: (err) => {
                this.saving.set(false);
                console.error('Failed to update profile:', err);
                alert('Failed to update profile: ' + err.message);
            }
        });
    }
}
