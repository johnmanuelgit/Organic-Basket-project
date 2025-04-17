import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FontAwesomeModule, RouterModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isscrolled = false;
  showbutton = false;
  cartCount = 0;
isMenuOpen = false;
constructor (private cartService: CartService,private router:Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
ngOnInit() {
  this.cartService.cartItemsCount$.subscribe(count => {
    this.cartCount = count;
  });
}


toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

  

  scrolltop() {
    window.scrollTo({ top: 35, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isscrolled = window.scrollY > 50;
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    this.showbutton = scrollPosition >= pageHeight -600
  }
}
