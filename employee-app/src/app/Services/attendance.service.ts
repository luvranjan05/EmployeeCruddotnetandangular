import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';

export interface Attendance {
  id: number;
  userId: number;
  userName: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  workDuration: string | null;
  isPresent: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/Attendance';

  private todayAttendanceSubject = new BehaviorSubject<Attendance | null>(null);   //this will hold currenty value and starts with null 
  public todayAttendance$ = this.todayAttendanceSubject.asObservable(); //lets expose as public variable

  checkIn(): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkin`, {}).pipe(
      tap(() => this.loadTodayAttendance())
    );
  }

  checkOut(): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, {}).pipe(
      tap(() => this.loadTodayAttendance())
    );
  }

  getMyAttendance(month: number, year: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/my-attendance?month=${month}&year=${year}`).pipe(
      map(attendance => attendance.map(a => this.transformAttendance(a)))
    );
  }

  getUserAttendance(username: string, month: number, year: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/user/${username}?month=${month}&year=${year}`).pipe(
      map(attendance => attendance.map(a => this.transformAttendance(a)))
    );
  }

  getAllAttendance(month: number, year: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/all?month=${month}&year=${year}`).pipe(
      map(attendance => attendance.map(a => this.transformAttendance(a)))
    );  //pipe pipe is to chain operator that process the observable data before process 
  }

  loadTodayAttendance(): void {
    this.http.get<Attendance>(`${this.apiUrl}/today`).pipe(
      map(attendance => attendance ? this.transformAttendance(attendance) : null)
    ).subscribe(attendance => {
      this.todayAttendanceSubject.next(attendance);
    });
  }

  private transformAttendance(attendance: any): Attendance {
    return {
      ...attendance,
      date: new Date(attendance.date).toISOString().split('T')[0],
      checkIn: attendance.checkIn ? new Date(attendance.checkIn).toISOString() : null,
      checkOut: attendance.checkOut ? new Date(attendance.checkOut).toISOString() : null
    };
  }
}