import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  private cartItemsCountSubject = new BehaviorSubject<number>(0);
  private apiUrl = 'https://bakendrepo.onrender.com/cart';
  
  // Add these properties to fix the errors
  cartItemsCount$: Observable<number>;
  
  constructor(private http: HttpClient) {
    // Initialize the observable
    this.cartItemsCount$ = this.cartItemsCountSubject.asObservable();
    
    // Load cart from localStorage on service initialization
    const savedCart = localStorage.getItem('cart');
   
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
      this.updateCartItemsCount();
    }
  }
  
  // Add this method to fix the error
  fetchCartFromBackend(): Observable<any> {
    const user = this.getUser();
    if (user && user._id) {
      return this.http.get(`${this.apiUrl}/${user._id}`);
    }
    return new Observable(observer => {
      observer.next([]);
      observer.complete();
    });
  }
  
  private updateCartItemsCount() {
    const count = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartItemsCountSubject.next(count);
  }
  
  getCart(): any[] {
    return this.cartItems;
  }
  
  getCartObservable(): Observable<any[]> {
    return this.cartSubject.asObservable();
  }
  
  // Sync with backend if user is logged in
syncWithBackend() {
  const user = this.getUser();
  if (user && user._id && this.cartItems.length > 0) {
    this.http.post(`${this.apiUrl}/sync/${user._id}`, {
      items: this.cartItems
    }).subscribe({
      next: () => console.log('Cart bulk synced successfully'),
      error: (err) => console.error('Sync error', err)
    });
  }
}

  // Get user from localStorage
  getUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (e) {
        console.error('Error parsing user JSON', e);
        return null;
      }
    }
    return null;
  }
  
  // Add item to cart (local + backend if logged in)
  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = {
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1
      };
      this.cartItems.push(newItem);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
    this.updateCartItemsCount();
    const user = this.getUser();
    if (user && user._id) {
      this.http.post(this.apiUrl, {
        userId: user._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: existingItem ? existingItem.quantity : 1
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).subscribe({
        next: () => {
          console.log('Item added to backend cart');
          this.syncWithBackend();
        },
        error: (err) => {
          console.error('Add to cart error:', err);
          alert('Failed to add item to backend cart. Item saved locally.');
          this.syncWithBackend();
        }
      });
    } else {
      console.warn('User not logged in or user ID missing');
      alert('Item saved locally. Please log in to sync with backend.');
    }
  }
  // Update quantity in both local storage and backend
  updateQuantity(item: any, newQuantity: number) {
    // Update local
    const existingItem = this.cartItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.cartSubject.next(this.cartItems);
      this.updateCartItemsCount();
    }
    
    // Update backend if user is logged in
    const user = this.getUser();
    if (user && user._id) {
      // For simplicity, we'll use the name as identifier since items might not have _id
      this.http.put(`${this.apiUrl}/${user._id}/updateByName`, {
        productName: item.name,
        quantity: newQuantity
    })
    .subscribe({
        next: () => console.log('Quantity updated in backend'),
        error: (err) => console.error('Update quantity error', err)
      });
    }
  }
  
  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
    this.cartSubject.next(this.cartItems);
    this.updateCartItemsCount();
    
    // Clear from backend if user is logged in
    const user = this.getUser();
    if (user && user._id) {
      this.http.delete(`${this.apiUrl}/${user._id}`).subscribe({
        next: () => console.log('Backend cart cleared'),
        error: (err) => console.error('Clear cart error', err)
      });
    }
  }
  
  buyProduct(totalPrice: number) {
  this.http.post<any>('https://bakendrepo.onrender.com/payment/create-order',{
    amount:totalPrice,
    currency:'INR'
  }).subscribe(order=>{
    const options = {
      key:'rzp_test_QIN4sfPHDDt9hq',
      amount:order.amount,
      currency:order.currency,
      name:'John Manuvel',
      description:'Welcome',
      order_id:order.id,
      handler:(response:any)=>{
        console.log('Payment Successfull!',response);
        alert('Payment Successfull!');
      },
      prefill:{
        name:'John Manuvel',
        email:'sjohnmanuelpc@gmail.com',
        contact:'1234567890'
      },
      theme:{
        color:'#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();},
    error =>{
      console.error('Order creation failed', error);
  })
  }
}

