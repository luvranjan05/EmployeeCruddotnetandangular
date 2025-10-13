import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})   //  Yeh Injectable decorator hai. providedIn: 'root' ka matlab hai ki Angular is EmployeeService ka sirf ek hi object (instance) poori application ke liye banayega.
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/api/Employee';

  constructor(private http: HttpClient) { } // HttpClient ko inject kar rahe hain taaki hum HTTP requests bhej saken.
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}