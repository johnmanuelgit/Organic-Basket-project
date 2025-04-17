import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];

  // Observable to keep track of item count
  private cartItemsCount = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCount.asObservable();

  constructor() {
    this.loadCart();
    this.updateCartCount(this.getTotalItemCount());
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  private getTotalItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  private updateCartCount(count: number) {
    this.cartItemsCount.next(count);
  }

  getCart() {
    return this.cart;
  }

  addToCart(item: CartItem) {
    const existingItem = this.cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
    this.saveCart();
    this.updateCartCount(this.getTotalItemCount());
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
    this.updateCartCount(0);
  }
}
