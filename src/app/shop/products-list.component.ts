import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ForProductDirective } from './catalog/for-product.directive';
import { Product } from './catalog/product.interface';

@Component({
  selector: 'products-list',
  template: `
    <ng-container *forProduct="let product ofType 'default'">
        <h4>{{product.name}}</h4>
        <cart-item-control class="float-right" [product]="product"></cart-item-control>
    </ng-container>

    <div class="list-group">
      <div class="list-group-item" *ngFor="let product of products">
        <ng-container *ngTemplateOutlet="getTemplate(product); context: getContext(product)"></ng-container>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductsListComponent implements AfterContentInit, AfterViewInit {
  @Input()
  products: Product[];

  @ContentChildren(ForProductDirective, { read: ForProductDirective })
  productContainers = new QueryList<ForProductDirective>();

  @ViewChild(ForProductDirective, { read: ForProductDirective, static: true })
  defaultTemplate: ForProductDirective;

  templates: { [type: string]: TemplateRef<any> } = {};

  ngAfterContentInit() {
    this.productContainers.forEach(container => {
      this.templates[container.forProductOfType] = container.template;
    });
  }

  ngAfterViewInit() {
    this.templates['default'] = this.defaultTemplate.template;
  }

  getTemplate(product) {
    return this.templates[product.type || 'default'];
  }

  getContext(product) {
    return {
      $implicit: product,
    };
  }
}
