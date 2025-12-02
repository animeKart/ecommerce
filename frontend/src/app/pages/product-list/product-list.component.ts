import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, AsyncPipe],
  templateUrl: './product-list.component.html',
  styles: ``
})
export class ProductListComponent {
  productService = inject(ProductService);
  products$ = this.productService.getAllProducts();
}
