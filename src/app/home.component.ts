import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductsService } from './shop/catalog/products.service';
import { Observable } from 'rxjs';
import { Product } from './shop/catalog/product.interface';

@Component({
  selector: 'home-page',
  template: `
  <div class="row">
    <div class="col">
      <products-list [products]="products$ |async">

        <ng-container *forProduct="let product ofType 'promo'">
          <div>🎉🎉🎉 👇👇👇 PROMO 👇👇👇 🎉🎉🎉</div>
          <h3>{{product.name}}</h3>
          <cart-item-control class="float-right" [product]="product"></cart-item-control>
          <div>🎉🎉🎉 👆👆👆 PROMO 👆👆👆 🎉🎉🎉</div>
        </ng-container>

        <!-- WE WANT TO USE THIS TEMPLATE BY DEFAULT WHEN PRODUCT DOES NOT HAVE A TYPE -->
        <ng-container *forProduct="let product ofType 'default'">
          <h3>Check out {{product.name}}!!! It's awesome!!!</h3>
          <cart-item-control class="float-right" [product]="product"></cart-item-control>
        </ng-container>

      </products-list>
    </div>
    <div class="col-3">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">In Cart</h4>
        </div>
        <cart-widget></cart-widget>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .card {
      outline: 1px solid red;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomePageComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    public products: ProductsService,
  ) {
    this.products$ = this.products.fetchAll();
  }

  ngOnInit() {
  }
}
