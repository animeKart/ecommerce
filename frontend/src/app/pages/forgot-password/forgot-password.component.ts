import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [FormsModule, RouterLink, CommonModule],
    template: `
    <div class="forgot-password-container">
      <div class="forgot-password-card">
        <h2>Forgot Password</h2>
        <p class="subtitle">Enter your email address and we'll send you a link to reset your password.</p>
        
        @if (successMessage) {
          <div class="alert success">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            {{ successMessage }}
          </div>
        }
        
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
        
        @if (!successMessage) {
          <form (ngSubmit)="submit()">
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                [(ngModel)]="email" 
                name="email" 
                type="email" 
                id="email"
                placeholder="Enter your email"
                required
                [disabled]="isLoading">
            </div>
            <button type="submit" class="btn-primary" [disabled]="isLoading || !email">
              @if (isLoading) {
                <span class="spinner"></span>
                Sending...
              } @else {
                Send Reset Link
              }
            </button>
          </form>
        }
        
        <div class="back-link">
          <a routerLink="/login">← Back to Login</a>
        </div>
      </div>
    </div>
  `,
    styles: `
    .forgot-password-container {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    }
    
    .forgot-password-card {
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
      line-height: 1.5;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
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
export class ForgotPasswordComponent {
    private authService = inject(AuthService);

    email = '';
    isLoading = false;
    successMessage = '';
    errorMessage = '';

    submit() {
        if (!this.email) return;

        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';

        this.authService.forgotPassword(this.email).subscribe({
            next: () => {
                this.successMessage = 'If an account exists with this email, you will receive a password reset link shortly.';
                this.isLoading = false;
            },
            error: (err) => {
                this.errorMessage = err.message || 'Something went wrong. Please try again.';
                this.isLoading = false;
            }
        });
    }
}
