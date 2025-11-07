[1mdiff --git a/employee-app/src/app/Components/auth/auth.component.css b/employee-app/src/app/Components/auth/auth.component.css[m
[1mindex 7ff88e2..fa0ecf9 100644[m
[1m--- a/employee-app/src/app/Components/auth/auth.component.css[m
[1m+++ b/employee-app/src/app/Components/auth/auth.component.css[m
[36m@@ -18,3 +18,114 @@[m
 input.is-invalid {[m
   border-color: #dc3545;[m
 }[m
[32m+[m[32m/* auth.component.css */[m
[32m+[m
[32m+[m[32m/* Container */[m
[32m+[m[32m.auth-container {[m
[32m+[m[32m  max-width: 400px;[m
[32m+[m[32m  margin: 50px auto;[m
[32m+[m[32m  padding: 30px 25px;[m
[32m+[m[32m  background-color: #ffffff;[m
[32m+[m[32m  border-radius: 12px;[m
[32m+[m[32m  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);[m
[32m+[m[32m  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Heading */[m
[32m+[m[32m.auth-container h2 {[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  margin-bottom: 25px;[m
[32m+[m[32m  font-size: 28px;[m
[32m+[m[32m  color: #333;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Form Groups */[m
[32m+[m[32m.form-group {[m
[32m+[m[32m  margin-bottom: 20px;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  flex-direction: column;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.form-group label {[m
[32m+[m[32m  font-weight: 600;[m
[32m+[m[32m  margin-bottom: 6px;[m
[32m+[m[32m  color: #555;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.form-group input {[m
[32m+[m[32m  padding: 10px 12px;[m
[32m+[m[32m  border-radius: 6px;[m
[32m+[m[32m  border: 1px solid #ccc;[m
[32m+[m[32m  font-size: 16px;[m
[32m+[m[32m  transition: border-color 0.3s, box-shadow 0.3s;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.form-group input:focus {[m
[32m+[m[32m  border-color: #5a67d8; /* purple-blue */[m
[32m+[m[32m  box-shadow: 0 0 5px rgba(90, 103, 216, 0.5);[m
[32m+[m[32m  outline: none;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Invalid input styling */[m
[32m+[m[32m.form-group input.invalid {[m
[32m+[m[32m  border-color: #e53e3e;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.error {[m
[32m+[m[32m  color: #e53e3e;[m
[32m+[m[32m  font-size: 13px;[m
[32m+[m[32m  margin-top: 5px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Buttons */[m
[32m+[m[32m.btn {[m
[32m+[m[32m  display: inline-block;[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m  padding: 12px 0;[m
[32m+[m[32m  font-size: 16px;[m
[32m+[m[32m  border-radius: 8px;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  transition: background-color 0.3s, transform 0.2s;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.btn-primary {[m
[32m+[m[32m  background-color: #5a67d8;[m
[32m+[m[32m  color: white;[m
[32m+[m[32m  border: none;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.btn-primary:hover:not(:disabled) {[m
[32m+[m[32m  background-color: #434190;[m
[32m+[m[32m  transform: translateY(-1px);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.btn-primary:disabled {[m
[32m+[m[32m  opacity: 0.7;[m
[32m+[m[32m  cursor: not-allowed;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.btn-link {[m
[32m+[m[32m  margin-top: 15px;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  background: none;[m
[32m+[m[32m  border: none;[m
[32m+[m[32m  color: #5a67d8;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  text-decoration: underline;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.btn-link:hover {[m
[32m+[m[32m  color: #434190;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m/* Responsive */[m
[32m+[m[32m@media (max-width: 480px) {[m
[32m+[m[32m  .auth-container {[m
[32m+[m[32m    padding: 20px 15px;[m
[32m+[m[32m  }[m
[32m+[m[32m  .btn {[m
[32m+[m[32m    font-size: 15px;[m
[32m+[m[32m    padding: 10px 0;[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[41m+[m
[1mdiff --git a/employee-app/src/app/Components/auth/auth.component.html b/employee-app/src/app/Components/auth/auth.component.html[m
[1mindex cd17607..798cf59 100644[m
[1m--- a/employee-app/src/app/Components/auth/auth.component.html[m
[1m+++ b/employee-app/src/app/Components/auth/auth.component.html[m
[36m@@ -1,57 +1,52 @@[m
[31m-<div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">[m
[31m-  <div class="card shadow-lg" style="width: 400px;">[m
[31m-    <div class="card-header bg-primary text-white text-center">[m
[31m-      <h4 class="mb-0">{{ modeText() }}</h4>[m
[32m+[m[32m<div class="auth-container">[m
[32m+[m[32m  <h2>{{ authStore.$modeText() }}</h2>[m
[32m+[m[41m  [m
[32m+[m[32m  <form [formGroup]="authForm" (ngSubmit)="onSubmit()">[m
[32m+[m[32m    <div class="form-group">[m
[32m+[m[32m      <label for="userName">Username</label>[m
[32m+[m[32m      <input[m[41m [m
[32m+[m[32m        type="text"[m[41m [m
[32m+[m[32m        id="userName"[m[41m [m
[32m+[m[32m        formControlName="userName"[m
[32m+[m[32m        [class.invalid]="isInvalid('userName')">[m
[32m+[m[32m      <div class="error" *ngIf="isInvalid('userName')">[m
[32m+[m[32m        Username is required[m
[32m+[m[32m      </div>[m
     </div>[m
 [m
[31m-    <div class="card-body p-4">[m
[31m-      <form [formGroup]="authForm" (ngSubmit)="onSubmit()">[m
[31m-[m
[31m-        <div class="mb-3">[m
[31m-          <label for="userName" class="form-label">Username</label>[m
[31m-          <input[m
[31m-            type="text"[m
[31m-            id="userName"[m
[31m-            class="form-control"[m
[31m-            formControlName="userName"[m
[31m-            [class.is-invalid]="isInvalid('userName')"[m
[31m-            placeholder="Enter your username">[m
[31m-          <div *ngIf="isInvalid('userName')" class="invalid-feedback">[m
[31m-            Username is required[m
[31m-          </div>[m
[31m-        </div>[m
[32m+[m[32m    <div class="form-group">[m
[32m+[m[32m      <label for="password">Password</label>[m
[32m+[m[32m      <input[m[41m [m
[32m+[m[32m        type="password"[m[41m [m
[32m+[m[32m        id="password"[m[41m [m
[32m+[m[32m        formControlName="password"[m
[32m+[m[32m        [class.invalid]="isInvalid('password')">[m
[32m+[m[32m      <div class="error" *ngIf="isInvalid('password')">[m
[32m+[m[32m        Password is required[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </div>[m
 [m
[31m-        <div class="mb-4">[m
[31m-          <label for="password" class="form-label">Password</label>[m
[31m-          <input[m
[31m-            type="password"[m
[31m-            id="password"[m
[31m-            class="form-control"[m
[31m-            formControlName="password"[m
[31m-            [class.is-invalid]="isInvalid('password')"[m
[31m-            placeholder="Enter your password">[m
[31m-          <div *ngIf="isInvalid('password')" class="invalid-feedback">[m
[31m-            Password is required[m
[31m-          </div>[m
[31m-        </div>[m
[32m+[m[41m [m
[32m+[m[32m    <div class="error" *ngIf="authStore.$error()">[m
[32m+[m[32m      {{ authStore.$error() }}[m
[32m+[m[32m    </div>[m
 [m
[31m-        <button[m
[31m-          type="submit"[m
[31m-          class="btn btn-primary w-100 mb-3"[m
[31m-          [disabled]="isLoading() || authForm.invalid">[m
[31m-          <span *ngIf="isLoading()" class="spinner-border spinner-border-sm me-2"></span>[m
[31m-          {{ modeText() }}[m
[31m-        </button>[m
[32m+[m[32m    <button[m[41m [m
[32m+[m[32m      type="submit"[m[41m [m
[32m+[m[32m      class="btn btn-primary"[m
[32m+[m[32m      [disabled]="authStore.$isLoading()">[m
[32m+[m[41m      [m
[32m+[m[41m   [m
[32m+[m[32m      {{ authStore.$isLoading() ? 'Loading...' : authStore.$modeText() }}[m
[32m+[m[32m    </button>[m
[32m+[m[32m  </form>[m
 [m
[31m-        <div class="text-center">[m
[31m-          <button[m
[31m-            type="button"[m
[31m