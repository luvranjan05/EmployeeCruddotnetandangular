
import { Injectable, } from '@angular/core';
import { BehaviorSubject, interval, map, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdownSubject = new BehaviorSubject<string>('');
  public countdown$ = this.countdownSubject.asObservable();
  private countdownInterval: any;

  startCountdown(): void {
    this.stopCountdown();
    
    this.countdownInterval = interval(1000).pipe(
      map(() => this.calculateTimeRemaining())
    ).subscribe(time => {
      this.countdownSubject.next(time);
    });
  }

  stopCountdown(): void {
    if (this.countdownInterval) {
      this.countdownInterval.unsubscribe();
      this.countdownInterval = null;
    }
  }

  private calculateTimeRemaining(): string {
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(18, 30, 0, 0);

    if (now >= endTime) {
      this.stopCountdown();
      return "00:00:00";
    }

    const diff = endTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  getWorkProgress(): number {
    const now = new Date();
    const startTime = new Date();
    startTime.setHours(9, 30, 0, 0); 
    const endTime = new Date();
    endTime.setHours(18, 30, 0, 0); 

    const totalWorkTime = endTime.getTime() - startTime.getTime();
    const elapsedTime = now.getTime() - startTime.getTime();

    return Math.min(Math.max((elapsedTime / totalWorkTime) * 100, 0), 100);
  }
}