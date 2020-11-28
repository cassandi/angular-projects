import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, ProductService } from '../product.service';

@Component({
  selector: 'in-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  products$: Observable<IProduct[]> = this.productsService.products$;
  delete: boolean = false;
  productToBeDeleted;
  productOpen;
  selectedProduct: IProduct;

  constructor(private productsService: ProductService) { }

  trackById(index, item) {
    return item.id;
  }

  ngOnInit(): void {
  }

  onEdit(product) {
    this.productOpen = true;
    this.selectedProduct = product;
  }

  onDelete(product) {
    this.delete = true;
    this.productToBeDeleted = product;
  }

  onAdd() {
    this.productOpen = true;
    this.selectedProduct = undefined;
  }

  handleCancel() {
    this.delete = false;
  }

  confirmDelete() {
    this.handleCancel();
    this.productsService.removeProduct(this.productToBeDeleted);
  }

  handleFinish(event) {
    if (event && event.product) {
      if (this.selectedProduct) {
        this.productsService.editProduct(this.selectedProduct.id, event.product);
      } else {
        this.productsService.addProduct(event.product);
      }
    }
    this.productOpen = false;
  }

}
