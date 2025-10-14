
import { Routes } from '@angular/router';

import { EmployeeComponent } from './Components/employee/employee.component';
import { AuthComponent } from './Components/auth/auth.component';
import { AttendanceComponent } from './Components/attendance/attendance.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];