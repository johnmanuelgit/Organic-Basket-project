import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'https://bakendrepo.onrender.com/api/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.api);
  }

  getById(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  add(formData: FormData) {
    return this.http.post(this.api, formData);
  }

  update(id: string, formData: FormData) {
    return this.http.put(`${this.api}/${id}`, formData);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
