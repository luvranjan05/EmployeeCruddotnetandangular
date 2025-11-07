import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);// Get AuthService instance
  const token = authService.getToken();  //// Fetch stored token
  
  if (token) {           // If token exists
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);  // Pass modified request
  }
  
  return next(req);  // Pass original request if no token
}; 