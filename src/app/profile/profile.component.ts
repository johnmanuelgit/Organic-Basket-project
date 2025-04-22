import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user:any=null;

  constructor (private router:Router,private http: HttpClient){}

ngOnInit(): void {
const userId = localStorage.getItem('userId');
if(userId){
  this.http.get<any>(`https://bakendrepo.onrender.com/api/user/profile/${userId}`).subscribe(
    data => {this.user=data},
    error => {
      console.error('Error fetching user data:', error);
    }
  );
}

}
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
