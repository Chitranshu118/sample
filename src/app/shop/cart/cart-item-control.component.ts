import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '../catalog/product.interface';
import { CartService } from './cart.service';
import { CartItem } from './cart-item.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'cart-item-control',
  template: `
    <span *ngIf="item; else notInCart">
      <button (click)="cartService.removeProduct(product)">-</button>
      <input disabled [value]="item.amount">
      <button (click)="cartService.addProduct(product)">+</button>
    </span>
    <ng-template #notInCart>
      <button (click)="cartService.addProduct(product)">Add to Cart</button>
    </ng-template>
  `,
  styles: [`
    input {
      width: 2.5em;
      text-align: center;
    }
  `],
})
export class CartItemControlComponent implements OnInit {
  @Input()
  product: Product;

  item: CartItem;

  cartItem$: Observable<CartItem>;

  constructor(
    readonly cartService: CartService,
  ) {
  }

  ngOnInit() {
    this.cartItem$ = this.cartService.getItemUpdates(this.product.id);
    this.cartItem$.subscribe((item) => this.item = item);
  }
}
