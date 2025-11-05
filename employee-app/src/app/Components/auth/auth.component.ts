import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthStore } from './auth.store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private fb = inject(FormBuilder);
  public authStore = inject(AuthStore); 
  private toastr = inject(ToastrService);

 
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
    this.authStore.toggleMode();
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields');
      return;
    }

    const userData = this.authForm.value;
    this.authStore.authenticate(userData);
  }

  isInvalid(controlName: string): boolean {
    const control = this.authForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
