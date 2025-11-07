import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

/**
 * Application-level configuration for Angular app
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Enable zone-based change detection with event coalescing
    // This optimizes performance by batching multiple events into a single change detection cycle
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    // Provide routing configuration for the app
    provideRouter(routes),

    // Configure HttpClient with global interceptors
    // Here, we attach authInterceptor to automatically add Authorization headers to requests
    provideHttpClient(withInterceptors([authInterceptor])),

    // Enable Angular animations globally
    provideAnimations(),

    // Configure Toastr (notification library) globally
    provideToastr({
      timeOut: 4000,              // Duration of toast visibility in ms
      positionClass: 'toast-top-right', // Position of toast on the screen
      preventDuplicates: false,   // Allow multiple identical toasts
      closeButton: true,          // Show close button on each toast
      progressBar: true,          // Show progress bar
      progressAnimation: 'decreasing', // Animation type for progress bar
      tapToDismiss: true,         // Dismiss toast on click
      easeTime: 300,              // Animation speed for showing/hiding toast
      enableHtml: false,          // Allow HTML content in toast
      maxOpened: 3,               // Maximum number of toasts visible at once
      autoDismiss: true,          // Automatically dismiss older toasts when maxOpened exceeded
      newestOnTop: true,          // Show newest toast on top
      titleClass: 'toast-title',  // CSS class for toast title
      messageClass: 'toast-message' // CSS class for toast message
    })
  ]
};
