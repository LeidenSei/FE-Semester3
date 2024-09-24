import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { RegisterUser } from '../interfaces/register-user';

@Injectable({
  providedIn: 'root'
})export class AuthUserService {

  private apiUrl = 'http://localhost:7038/api/auth/';
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) { }

  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email, password });
    return this.http.post(this.apiUrl + "login", body, { headers });
  }

  register(data: RegisterUser): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.post<RegisterUser>(this.apiUrl+'register', data, {headers});
  }

  saveTokenUser(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authUserToken', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authUserToken');
    }
    return null;
  }

  getUsernameFromToken():string | null {
    const token = this.getToken();
    if(token){
      if (this.isTokenExpired(token)) {
        this.logout(); 
        return null;
      }
      const decodedToken: any = jwtDecode(token);
      
      return decodedToken.name;
    }

    return null;
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      if (this.isTokenExpired(token)) {
        this.logout(); 
        return null;
      }

      const decodedToken: any = jwtDecode(token);
      return decodedToken.role;
    }
    return null;
  }
  isTokenExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  isAdmin(): boolean {
    const role = this.getRoleFromToken();
    return role === 'Admin';
  }

  isUser(): boolean {
    const role = this.getRoleFromToken();
    return role === 'User';
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authUserToken');
    }
  }
}