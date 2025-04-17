import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword = false;
  user = {
    email: '',
    password: ''
  };
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

constructor (private http:HttpClient){}

login(){
  this.http.post<any>('http://localhost:3000/login',this.user).subscribe(
    (res)=>{
      localStorage.setItem('token',res.token);
      alert('login successful!');
    },
    err => {
      if (err.status === 404) {
        alert("User not found");
      } else if (err.status === 401) {
        alert("Incorrect password");
      } else {
        alert("Login failed");
      }
    }
  );
}
}
