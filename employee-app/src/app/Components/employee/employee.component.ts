import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../Models/employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  selectedEmployee: Employee = this.getEmptyEmployee();
  showModal = false;
  isEditMode = false;
  searchTerm = '';
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  pageNumbers: number[] = [];
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentUser: any;

  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadEmployees();
  }


  navigateToAttendance(): void {
    this.router.navigate(['/attendance']);
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.applyFilterAndSort();
      },
      error: (error) => {
        this.toastr.error('Failed to load employees');
        console.error('Error loading employees:', error);
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.toastr.success('Logged out successfully');
    this.router.navigate(['/login']);
  }

  openModel(employee?: Employee): void {
    this.isEditMode = !!employee;
    this.selectedEmployee = employee ? { ...employee } : this.getEmptyEmployee();
    this.showModal = true;
  }

  closeModel(): void {
    this.showModal = false;
    this.selectedEmployee = this.getEmptyEmployee();
  }

  getEmptyEmployee(): Employee {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      emailId: '',
      age: 0,
      salary: 0,
      status: true
    };
  }

  saveEmployee(): void {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.selectedEmployee.id, this.selectedEmployee).subscribe({
        next: () => {
          this.toastr.success('Employee updated successfully');
          this.loadEmployees();
          this.closeModel();
        },
        error: (error) => {
          this.toastr.error('Failed to update employee');
          console.error('Error updating employee:', error);
        }
      });
    } else {
      this.employeeService.addEmployee(this.selectedEmployee).subscribe({
        next: () => {
          this.toastr.success('Employee added successfully');
          this.loadEmployees();
          this.closeModel();
        },
        error: (error) => {
          this.toastr.error('Failed to add employee');
          console.error('Error adding employee:', error);
        }
      });
    }
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.toastr.success('Employee deleted successfully');
          this.loadEmployees();
        },
        error: (error) => {
          this.toastr.error('Failed to delete employee');
          console.error('Error deleting employee:', error);
        }
      });
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilterAndSort();
  }

  applyFilterAndSort(): void {
    let filtered = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      emp.emailId.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const aValue = (a as any)[this.sortColumn];
        const bValue = (b as any)[this.sortColumn];

        if (typeof aValue === 'string') {
          return this.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return this.sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }
      });
    }

    this.filteredEmployees = filtered;
    this.updatePagination();
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilterAndSort();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  isFieldInvalid(field: any): boolean {
    return field.invalid && (field.dirty || field.touched);
  }

  getEmailError(field: any): string {
    if (field.errors?.['required']) return 'Email is required';
    if (field.errors?.['email']) return 'Please enter a valid email';
    return '';
  }

  getAgeError(field: any): string {
    if (field.errors?.['required']) return 'Age is required';
    if (field.errors?.['min']) return 'Age must be at least 18';
    if (field.errors?.['max']) return 'Age must be at most 65';
    return '';
  }

  getSalaryError(field: any): string {
    if (field.errors?.['required']) return 'Salary is required';
    if (field.errors?.['min']) return 'Salary must be positive';
    return '';
  }
}