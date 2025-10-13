import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);


  isLoginMode = signal(true);
  isLoading = signal(false);
  

  modeText = computed(() => 
    this.isLoginMode() ? 'Login' : 'Register'
  );
  

  toggleButtonText = computed(() =>
    this.isLoginMode() ? "Don't have an account? Register" : 'Already have an account? Login'
  );

  authForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.authForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleMode(): void {
  
    this.isLoginMode.set(!this.isLoginMode());  //set initial signal values like login will open first
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields');
      return;
    }


    this.isLoading.set(true);  //set metthod jisse signal update ho jaye
    const userData = this.authForm.value;

    const authRequest = this.isLoginMode()
      ? this.authService.login(userData)
      : this.authService.register(userData);

    authRequest.subscribe({
      next: (res) => {

        this.isLoading.set(false);
        if (this.isLoginMode()) {
          this.toastr.success('Login successful!');
          this.router.navigate(['/employee']);
        } else {
          this.toastr.success('Registration successful! Please log in.');
          this.isLoginMode.set(true);
          this.authForm.reset();
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMsg = err.error?.message || 'Something went wrong. Please try again.';
        this.toastr.error(errorMsg);
      }
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.authForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
