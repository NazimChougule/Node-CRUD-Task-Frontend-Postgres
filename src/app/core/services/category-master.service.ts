import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryMasterService {

  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/categories`);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/categories/${id}`);
  }

  createCategory(categoryData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/categories`, categoryData);
  }

  updateCategory(id: number, categoryData: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/categories/${id}`, categoryData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }
}
