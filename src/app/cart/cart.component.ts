import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[CommonModule,RouterModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.http.get<any[]>('https://bakendrepo.onrender.com/cart').subscribe(
      (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      (error) => {
        console.error('Failed to fetch cart items', error);
      }
    );
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();
    }
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    this.calculateTotal();
  }

  clearCart() {
    this.http.delete('https://bakendrepo.onrender.com/cart/clear').subscribe(
      (response) => {
        alert('Cart cleared successfully');
        this.cartItems = [];
        this.totalPrice = 0;
      },
      (error) => {
        console.error('Failed to clear cart', error);
      }
    );
  }

  buy() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty. Add items first.');
      return;
    }
    alert('Purchase successful! Thank you for shopping.');
    this.clearCart();
  }
}
