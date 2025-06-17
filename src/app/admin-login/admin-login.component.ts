import { Component } from '@angular/core';
import { ToastService } from '../service/toast.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, RouterModule, RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

 showPassword = false;
  loginForm:FormGroup;
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

constructor (private http:HttpClient,private router:Router , private toast: ToastService){
  this.loginForm = new FormGroup({
   username: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
  });
}

login() {
  if (this.loginForm.invalid) {
    return;
  }

  this.http.post<any>('https://bakendrepo.onrender.com/admin-login', this.loginForm.value).subscribe({
    next: (res) => {
      localStorage.setItem('userId', res.Admin._id);
      localStorage.setItem('token', res.token);
      localStorage.setItem('Admin', JSON.stringify(res.Admin));
      localStorage.setItem('role',res.Admin.role,);
      const Role = localStorage.getItem('role');
      console.log(Role);
      if(Role){
        this.router.navigate(['/admin-dash'])
      }
    },
    error: (err) => {
      if (err.status === 404) {
        this.toast.error('User not found');
      } else if (err.status === 401) {
        this.toast.error('Incorrect password');
      } else {
        this.toast.error('Login failed');  
      }
    }
  });
}

}

