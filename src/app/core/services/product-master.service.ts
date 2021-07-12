import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductMasterService {

  constructor(private http: HttpClient) { }

  getProductList(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products?page=${page}&pageSize=${pageSize}`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products/${id}`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/products`, productData);
  }

  updateProduct(id: number, productData: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/products/${id}`, productData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }
}
