import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [FormsModule, RouterLink, CommonModule],
    template: `
    <div class="reset-password-container">
      <div class="reset-password-card">
        <h2>Reset Password</h2>
        
        @if (errorMessage) {
          <div class="alert error">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {{ errorMessage }}
          </div>
        }
        
        @if (successMessage) {
          <div class="alert success">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            {{ successMessage }}
          </div>
          <div class="redirect-message">
            Redirecting to login in {{ countdown }} seconds...
          </div>
        }
        
        @if (!successMessage && !tokenError) {
          <p class="subtitle">Enter your new password below.</p>
          
          <form (ngSubmit)="submit()">
            <div class="form-group">
              <label for="newPassword">New Password</label>
              <input 
                [(ngModel)]="newPassword" 
                name="newPassword" 
                type="password" 
                id="newPassword"
                placeholder="Enter new password"
                required
                minlength="6"
                [disabled]="isLoading">
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input 
                [(ngModel)]="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                id="confirmPassword"
                placeholder="Confirm new password"
                required
                [disabled]="isLoading">
            </div>
            
            @if (passwordMismatch) {
              <div class="validation-error">Passwords do not match</div>
            }
            
            <button type="submit" class="btn-primary" [disabled]="isLoading || !isFormValid()">
              @if (isLoading) {
                <span class="spinner"></span>
                Resetting...
              } @else {
                Reset Password
              }
            </button>
          </form>
        }
        
        @if (tokenError) {
          <div class="back-link">
            <a routerLink="/forgot-password">Request a new reset link</a>
          </div>
        }
        
        <div class="back-link">
          <a routerLink="/login">← Back to Login</a>
        </div>
      </div>
    </div>
  `,
    styles: `
    .reset-password-container {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    }
    
    .reset-password-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 2.5rem;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    
    h2 {
      color: #fff;
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      text-align: center;
    }
    
    .subtitle {
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }
    
    .form-group {
      margin-bottom: 1.25rem;
    }
    
    label {
      display: block;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    input {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }
    
    input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
    
    input:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }
    
    input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .validation-error {
      color: #fca5a5;
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
    
    .btn-primary {
      width: 100%;
      padding: 0.875rem 1.5rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
    }
    
    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .alert {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    .alert svg {
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .alert.success {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #86efac;
    }
    
    .alert.error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fca5a5;
    }
    
    .redirect-message {
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
    
    .back-link {
      text-align: center;
      margin-top: 1.5rem;
    }
    
    .back-link a {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }
    
    .back-link a:hover {
      color: #6366f1;
    }
  `
})
export class ResetPasswordComponent implements OnInit {
    private authService = inject(AuthService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    token = '';
    newPassword = '';
    confirmPassword = '';
    isLoading = false;
    successMessage = '';
    errorMessage = '';
    tokenError = false;
    countdown = 3;

    get passwordMismatch(): boolean {
        return this.confirmPassword.length > 0 && this.newPassword !== this.confirmPassword;
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.token = params['token'] || '';
            if (!this.token) {
                this.tokenError = true;
                this.errorMessage = 'Invalid or missing reset token. Please request a new password reset link.';
            }
        });
    }

    isFormValid(): boolean {
        return this.newPassword.length >= 6 &&
            this.newPassword === this.confirmPassword &&
            this.token.length > 0;
    }

    submit() {
        if (!this.isFormValid()) return;

        this.isLoading = true;
        this.errorMessage = '';

        this.authService.resetPassword(this.token, this.newPassword).subscribe({
            next: () => {
                this.successMessage = 'Your password has been reset successfully!';
                this.isLoading = false;
                this.startCountdown();
            },
            error: (err) => {
                this.errorMessage = err.message || 'Failed to reset password. The link may have expired.';
                this.isLoading = false;
                if (err.message?.includes('expired') || err.message?.includes('invalid')) {
                    this.tokenError = true;
                }
            }
        });
    }

    private startCountdown() {
        const interval = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                clearInterval(interval);
                this.router.navigate(['/login']);
            }
        }, 1000);
    }
}
