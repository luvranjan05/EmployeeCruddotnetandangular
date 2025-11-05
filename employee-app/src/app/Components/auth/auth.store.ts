import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';
export interface AuthState {
  isLoginMode: boolean;
  isLoading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private state = {
    $isLoginMode: signal<boolean>(true),
    $isLoading: signal<boolean>(false),
    $error: signal<string | null>(null),
  } as const;

  public readonly $isLoginMode = this.state.$isLoginMode.asReadonly();
  public readonly $isLoading = this.state.$isLoading.asReadonly();
  public readonly $error = this.state.$error.asReadonly();

  public readonly $modeText = computed(() => 
    this.$isLoginMode() ? 'Login' : 'Register'
  );

  public readonly $toggleButtonText = computed(() =>
    this.$isLoginMode() ? "Don't have an account? Register" : 'Already have an account? Login'
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // Public API methods - these are the ONLY ways to update state
  toggleMode(): void {
    // This updates the signal value
    this.state.$isLoginMode.set(!this.state.$isLoginMode());
    this.clearError();
  }

  setLoading(loading: boolean): void {
    this.state.$isLoading.set(loading);
  }

  setError(error: string): void {
    this.state.$error.set(error);
  }

  clearError(): void {
    this.state.$error.set(null);
  }

  async authenticate(userData: { userName: string; password: string }): Promise<void> {
    this.setLoading(true);
    this.clearError();

    try {
      const authRequest = this.$isLoginMode() 
        ? this.authService.login(userData) 
        : this.authService.register(userData);

      const res = await authRequest.toPromise();
      
      this.setLoading(false);
      
      if (this.$isLoginMode()) {
        this.toastr.success('Login successful!');
        this.router.navigate(['/employee']);
      } else {
        this.toastr.success('Registration successful! Please log in.');
        this.state.$isLoginMode.set(true);
      }
    } catch (err: any) {
      this.setLoading(false);
      const errorMsg = err.error?.message || 'Something went wrong. Please try again.';
      this.setError(errorMsg);
      this.toastr.error(errorMsg);
    }
  }
}