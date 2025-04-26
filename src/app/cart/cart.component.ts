import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from './cart.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;
  userId: string = '';
  isLoading: boolean = true;

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit() {
    // Get user details first
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user._id;
  
    // First load from local storage for immediate display
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  
    // Then try to sync with backend if user is logged in
    if (this.userId) {
      this.cartService.fetchCartFromBackend().subscribe({
        next: (backendItems: any) => {
          if (backendItems && backendItems.length > 0) {
            // Merge local and backend carts, preferring backend data
            this.cartItems = this.mergeCarts(this.cartItems, backendItems);
            this.cartService.updateLocalCart(this.cartItems);
            this.calculateTotal();
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching cart', err);
          // Continue with local cart if backend fails
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }
  
  
  // Add this method to merge carts
  mergeCarts(localCart: any[], backendCart: any[]): any[] {
    const merged = [...backendCart];
    
    // Add items from local cart that don't exist in backend
    localCart.forEach(localItem => {
      if (!backendCart.some(backendItem => backendItem.name === localItem.name)) {
        merged.push(localItem);
      }
    });
    
    return merged;
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );
  }

  buy() {
    this.cartService.buyProduct(this.totalPrice);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item, item.quantity - 1);
    }
  }

  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item, item.quantity + 1);
  }
  remove(item: any) {
  this.cartService.removeItem(item);
}


  clearCart() {
    this.cartService.clearCart();
  }
}