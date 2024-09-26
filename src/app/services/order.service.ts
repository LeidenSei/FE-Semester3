import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { AuthService } from './auth.service';
import { SearchParams } from './search-params';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:7038/api/order';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createOrder(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, request, {
      headers: this.getAuthHeaders()
    });
  }
  getOrderByUserId(userId:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user-orders/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }


}