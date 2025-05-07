import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';



@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user:any=true;
  loading = true;

  constructor (private router:Router,private http: HttpClient,private cartService: CartService){}



  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
   
  
    if(userId && token){
      const headers = { 'Authorization': `Bearer ${token}` };
    
      this.http.get<any>(`https://bakendrepo.onrender.com/api/user/profile/${userId}`, { headers }).subscribe(
        data => {
          console.log('User Data:', data);
          this.user = data;
          this.loading = false;
        },
        error => {
          console.error('Error fetching user data:', error);
          this.loading = false; 
        }
      );
    } else {
      console.log('No userId found in localStorage');
      this.loading = false; 
    }
  }
    
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    this.cartService.clearCart();

  }

}
