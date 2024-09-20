import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttributeOption } from '../interfaces/attribute-option';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeOptionService {

  private apiUrl = 'https://localhost:7038/api/attributeoption';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders() {
    const token = this.authService.getToken(); 
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Add Attribute Option
  addAttributeOption(option: AttributeOption): Observable<AttributeOption> {
    const headers = this.getAuthHeaders();
    return this.http.post<AttributeOption>(this.apiUrl, option, { headers });
  }

  // Update Attribute Option
  updateAttributeOption(option: AttributeOption, id: any): Observable<AttributeOption> {
    const headers = this.getAuthHeaders();
    return this.http.put<AttributeOption>(`${this.apiUrl}/${id}`, option, { headers });
  }

  // Delete Attribute Option
  deleteAttributeOption(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Get Attribute Option by ID
  getAttributeOptionById(id: string): Observable<AttributeOption> {
    const headers = this.getAuthHeaders();
    return this.http.get<AttributeOption>(`${this.apiUrl}/${id}`, { headers });
  }

  // Search Attribute Options
  searchAttributeOptions(searchParams: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/search`, searchParams, { headers });
  }  
}