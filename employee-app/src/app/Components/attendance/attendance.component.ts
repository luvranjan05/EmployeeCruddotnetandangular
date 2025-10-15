import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttendanceService, Attendance } from '../../Services/attendance.service';
import { CountdownService } from '../../Services/countdown.service';
import { AuthService } from '../../Services/auth.service';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './attendance.component.html'
})
export class AttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);
  private countdownService = inject(CountdownService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  router = inject(Router);
  private toastr = inject(ToastrService);

  attendanceForm!: FormGroup;
  todayAttendance = signal<Attendance | null>(null);
  countdown = signal('');
  workProgress = signal(0);
  currentMonth = signal(new Date().getMonth() + 1);
  currentYear = signal(new Date().getFullYear());
  userAttendance = signal<Attendance[]>([]);
  allAttendance = signal<Attendance[]>([]);
  filteredAttendance = signal<Attendance[]>([]);
  selectedDate = signal<string | null>(null);
  selectedUser = signal<string>('');

  private fuse!: Fuse<Attendance>;

  isAdmin = computed(() => this.authService.isAdmin());
  currentUser = computed(() => this.authService.getCurrentUser());

  ngOnInit(): void {
    this.initializeForm();
    this.loadTodayAttendance();
    this.startCountdown();
    this.loadUserAttendance();
    if (this.isAdmin()) {
      this.loadAllAttendance();
    }
    this.initializeFuse();
  }


  private initializeForm(): void {
    this.attendanceForm = this.fb.group({
      selectedMonth: [this.currentMonth()],
      selectedYear: [this.currentYear()],
      searchUser: [''],
      attendanceEntries: this.fb.array([])
    });

    this.attendanceForm.get('searchUser')?.valueChanges.subscribe(searchTerm => {
      this.onUserSearch(searchTerm);
    });
  }


  get attendanceEntries(): FormArray {
    return this.attendanceForm.get('attendanceEntries') as FormArray;
  }

  createAttendanceEntry(attendance?: Attendance): FormGroup {
    return this.fb.group({
      userName: [attendance?.userName || ''],
      date: [attendance?.date || ''],
      checkIn: [attendance?.checkIn || null],
      checkOut: [attendance?.checkOut || null]
    });
  }


  private patchAttendanceEntries(attendanceData: Attendance[]) {
    this.attendanceEntries.clear();
    attendanceData.forEach(a => this.attendanceEntries.push(this.createAttendanceEntry(a)));
  }


  private initializeFuse(): void {
    const options = {
      keys: ['userName', 'date'],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2
    };
    this.fuse = new Fuse([], options);
  }

  private updateFuseIndex(attendanceData: Attendance[]): void {
    this.fuse.setCollection(attendanceData);
  }


  navigateToEmployees() {
    this.router.navigate(['/employee']);
  }


  private loadTodayAttendance(): void {
    this.attendanceService.todayAttendance$.subscribe(attendance => {
      this.todayAttendance.set(attendance);
    });
    this.attendanceService.loadTodayAttendance();
  }

  private startCountdown(): void {
    this.countdownService.countdown$.subscribe(time => this.countdown.set(time));
    this.countdownService.startCountdown();
    this.workProgress.set(this.countdownService.getWorkProgress());

    setInterval(() => {
      this.workProgress.set(this.countdownService.getWorkProgress());
    }, 60000);
  }

  private loadUserAttendance(): void {
    this.attendanceService.getMyAttendance(this.currentMonth(), this.currentYear())
      .subscribe({
        next: (attendance) => {
          this.userAttendance.set(attendance);
          this.filteredAttendance.set(attendance);
          this.patchAttendanceEntries(attendance);
        },
        error: () => this.toastr.error('Failed to load attendance')
      });
  }

  private loadAllAttendance(): void {
    this.attendanceService.getAllAttendance(this.currentMonth(), this.currentYear())
      .subscribe({
        next: (attendance) => {
          this.allAttendance.set(attendance);
          this.filteredAttendance.set(attendance);
          this.updateFuseIndex(attendance);
          this.patchAttendanceEntries(attendance);
        },
        error: () => this.toastr.error('Failed to load all attendance')
      });
  }


  checkIn(): void {
    this.attendanceService.checkIn().subscribe({
      next: () => this.toastr.success('Checked in successfully'),
      error: (err) => this.toastr.error(err.error?.message || 'Check-in failed')
    });
  }

  checkOut(): void {
    this.attendanceService.checkOut().subscribe({
      next: () => this.toastr.success('Checked out successfully'),
      error: (err) => this.toastr.error(err.error?.message || 'Check-out failed')
    });
  }


  onMonthYearChange(): void {
    const formValue = this.attendanceForm.value;
    this.currentMonth.set(formValue.selectedMonth);
    this.currentYear.set(formValue.selectedYear);
    
    this.loadUserAttendance();
    if (this.isAdmin()) this.loadAllAttendance();
  }

  onUserSearch(searchTerm?: string): void {
    const username = searchTerm || this.attendanceForm.get('searchUser')?.value;
    if (!username?.trim()) {
      this.filteredAttendance.set(this.isAdmin() ? this.allAttendance() : this.userAttendance());
      this.selectedUser.set('');
      return;
    }

    this.selectedUser.set(username);

    if (this.isAdmin()) {
      if (this.fuse && username.length >= 2) {
        const results = this.fuse.search(username);
        this.filteredAttendance.set(results.map(r => r.item));
      } else if (username.length < 2) {
        this.filteredAttendance.set(this.allAttendance());
      }
    } else {
      const filtered = this.userAttendance().filter(a =>
        a.date.includes(username) ||
        a.userName.toLowerCase().includes(username.toLowerCase())
      );
      this.filteredAttendance.set(filtered);
    }
  }

  clearSearch(): void {
    this.attendanceForm.get('searchUser')?.setValue('');
    this.selectedUser.set('');
    this.filteredAttendance.set(this.isAdmin() ? this.allAttendance() : this.userAttendance());
  }

  selectDate(date: string): void {
    this.selectedDate.set(date);
  }

  getAttendanceForDate(date: string): Attendance | null {
    const attendance = this.isAdmin() ? this.allAttendance() : this.userAttendance();
    return attendance.find(a => a.date === date) || null;
  }

  getStatusClass(attendance: Attendance): string {
    if (!attendance.checkIn) return 'bg-danger';
    if (!attendance.checkOut) return 'bg-warning';
    return 'bg-success';
  }

  getStatusText(attendance: Attendance): string {
    if (!attendance.checkIn) return 'Absent';
    if (!attendance.checkOut) return 'Working';
    return 'Completed';
  }

  formatTime(timeString: string | null): string {
    if (!timeString) return 'N/A';
    return new Date(timeString).toLocaleTimeString();
  }

  getUniqueUsers(): string[] {
    return [...new Set(this.allAttendance().map(a => a.userName))];
  }

  getCalendarWeeks(): any[][] {
    const weeks: any[][] = [];
    const year = this.currentYear();
    const month = this.currentMonth() - 1;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let currentDate = new Date(firstDay);
    currentDate.setDate(currentDate.getDate() - firstDay.getDay());

    while (currentDate <= lastDay || weeks.length < 6) {
      const week: any[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        const dateString = date.toISOString().split('T')[0];
        const attendance = this.getAttendanceForDate(dateString);
        const isCurrentMonth = date.getMonth() === month;

        week.push({ day: date.getDate(), date, dateString, isCurrentMonth, attendance });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }

    return weeks;
  }
}

//this is my attendance component ts