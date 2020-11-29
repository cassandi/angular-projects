import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { CartComponent } from './cart/cart.component';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'electronic-store';
  products$: Observable<any>;
  cart$: Observable<any>;
  cart;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private dialog: MatDialog,
    update: SwUpdate,
    private snackBar: MatSnackBar
    ) {
    this.products$ = this.productsService.getProducts();
    this.cart$ = this.cartService.cart$.subscribe(cart => this.cart = cart);

    update.available.subscribe(event => {
      this.snackBar.open('New Update available', 'Install Now', {
        duration: 5000
      }).onAction().subscribe(() => {
        update.activateUpdate().then(() => location.reload());
      });
    });
    update.checkForUpdate();
  }

  displayNetworkStatus() {
    if (navigator.onLine) {
      document.querySelector('body').style.filter = '';
    } else {
      document.querySelector('body').style.filter = 'grayscale(1)';
    }
  }

  ngOnInit() {
    this.displayNetworkStatus();
    window.addEventListener('online', this.displayNetworkStatus);
    window.addEventListener('offline', this.displayNetworkStatus);
  }

  onAddProduct(count, product) {
    this.cartService.addToCart(count, product);
  }

  openCart() {
    this.dialog.open(CartComponent, {
      width: '500px',
    });
  }
}
