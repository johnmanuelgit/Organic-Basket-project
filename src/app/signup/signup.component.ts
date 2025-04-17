import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, RouterModule, RouterLink,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  showPassword:boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
user ={name:'',email:'',password:''};

constructor (private http:HttpClient){}

register(){
  this.http.post('http://localhost:3000/register',this.user).subscribe(res=>alert('Registered Successfully'),
err=>{
  if(err.status === 400){
    alert('email already registerd');
  }
  else{
    alert('registeration failed');
  }
})
}
}
