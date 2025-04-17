import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactMessage {
  fullName: string;
  email: string;
  mobile: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://api.example.com/contact'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  sendMessage(message: ContactMessage): Observable<any> {
    return this.http.post(this.apiUrl, message);
  }
}