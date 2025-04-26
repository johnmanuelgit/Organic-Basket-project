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
  private apiUrl = 'https://bakendrepo.onrender.com/api/cart';
  
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
      // For each item in local cart, send to backend
      this.cartItems.forEach(item => {
        this.http.post(this.apiUrl, {
          userId: user._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        }).subscribe({
          next: () => console.log('Item synced with backend'),
          error: (err) => console.error('Sync error', err)
        });
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
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
    this.updateCartItemsCount();
    
    // If user is logged in, sync with backend
    const user = this.getUser();
    if (user && user._id) {
      const quantityToAdd = existingItem ? existingItem.quantity : 1;
      
      this.http.post(this.apiUrl, {
        userId: user._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: quantityToAdd
      }).subscribe({
        next: (response) => {
          console.log('Item added to backend cart', response);
          // If successful, fetch the latest cart from backend to ensure sync
          this.fetchCartFromBackend().subscribe(backendItems => {
            if (backendItems && backendItems.length > 0) {
              this.cartItems = backendItems;
              localStorage.setItem('cart', JSON.stringify(this.cartItems));
              this.cartSubject.next(this.cartItems);
              this.updateCartItemsCount();
            }
          });
        },
        error: (err) => {
          console.error('Add to cart error', err);
          // Optionally retry or show error to user
        }
      });
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
      this.http.put(`${this.apiUrl}/${user._id}/updateByName`, {
        productName: item.name,
        quantity: newQuantity
      }).subscribe({
        next: () => console.log('Quantity updated in backend'),
        error: (err) => console.error('Update quantity error', err)
      });
    }
  }

  // In cart.service.ts
updateLocalCart(items: any[]): void {
  this.cartItems = items;
  localStorage.setItem('cart', JSON.stringify(items));
  this.cartSubject.next(items);
  this.updateCartItemsCount();
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
  removeItem(item: any) {
    const user = this.getUser();
    if (user && user._id) {
      this.http.delete(`${this.apiUrl}/${user._id}/item/${item.name}`)
        .subscribe({
          next: () => {
            console.log('Item removed from backend');
            // Local cart la yum remove panna
            this.cartItems = this.cartItems.filter(cartItem => cartItem.name !== item.name);
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
            this.cartSubject.next(this.cartItems);
            this.updateCartItemsCount();
          },
          error: (err) => console.error('Remove item error', err)
        });
    }
  }
  
}

