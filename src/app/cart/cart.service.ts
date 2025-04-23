import { HttpClient } from '@angular/common/http';
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
  private cartItemsCount = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCount.asObservable();

  constructor(private http: HttpClient) {
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

    const userId = localStorage.getItem('userId')
    if(userId){
      const data = {
        ...item,
        userId:userId,
      };
      this.http.post('https://bakendrepo.onrender.com/api/cart',data).subscribe({
        next:()=> console.log('Item Saved To Backend.'),
        error:(err)=>console.error('failed to save item to backend',err)
      });
    }
  };
  fetchCartFromBackend(){
const userId = localStorage.getItem('userId');
this.http.get<CartItem[]>(`https://bakendrepo.onrender.com/api/cart/${userId}`).subscribe({
  next: (cartItems) => {
    this.cart = cartItems;
    this.saveCart(); // Optionally save it to localStorage
    this.updateCartCount(this.getTotalItemCount());
  },
  error: (err) => console.error('Failed to fetch cart from backend:', err),
});

  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
    this.updateCartCount(0);
  }
}
