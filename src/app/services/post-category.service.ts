import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostCategory } from '../interfaces/post-category';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostCategoryService {
  private apiUrl = 'https://localhost:7038/api/postcategory';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addPostCategory(postCategory: PostCategory): Observable<PostCategory> {
    const headers = this.getAuthHeaders();
    return this.http.post<PostCategory>(this.apiUrl, postCategory, { headers });
  }

  updatePostCategory(postCategory: PostCategory, id: number): Observable<PostCategory> {
    const headers = this.getAuthHeaders();
    return this.http.put<PostCategory>(`${this.apiUrl}/${id}`, postCategory, { headers });
  }

  deletePostCategory(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getPostCategoryById(id: number): Observable<PostCategory> {
    const headers = this.getAuthHeaders();
    return this.http.get<PostCategory>(`${this.apiUrl}/${id}`, { headers });
  }

  searchPostCategories(searchParams: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<PostCategory[]>(`${this.apiUrl}/search`, searchParams, { headers });
  }

  checkPostCategoryNameExists(name: string): Observable<boolean> {
    const headers = this.getAuthHeaders();
    return this.http.get<boolean>(`${this.apiUrl}/checkNameExists?name=${name}`, { headers });
  }

  checkPostCategoryHasPosts(id: number): Observable<boolean> {
    const headers = this.getAuthHeaders();
    return this.http.get<boolean>(`${this.apiUrl}/hasPosts/${id}`, { headers });
  }
}