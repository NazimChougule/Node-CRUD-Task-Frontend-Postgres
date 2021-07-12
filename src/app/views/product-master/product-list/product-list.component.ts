import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductMasterService } from 'src/app/core/services/product-master.service';
import { ProductPopupComponent } from '../product-popup/product-popup.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  page: number = 1;
  pageSize: number = 10;
  collectionSize: number;

  productList;

  constructor(
    private modalService: NgbModal,
    private productMasterService: ProductMasterService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts(this.page - 1, this.pageSize);
  }

  getAllProducts(page, pageSize) {
    this.productMasterService.getProductList(page, pageSize).subscribe(res => {
      this.collectionSize = res.count;
      this.productList = res.data.products;
    });
  }

  pageChanged(page) {
    this.getAllProducts(page - 1, this.pageSize);
  }

  openProductPopup(event, product) {
    const data = {
      event: event,
      content: product
    }
    const dialogRef = this.modalService.open(ProductPopupComponent, { centered: true });
    dialogRef.componentInstance.data = data;
    dialogRef.result.then(() => {
      this.getAllProducts(this.page - 1, this.pageSize);
    }, () => { });
  }

  deleteProduct(id) {
    this.productMasterService.deleteProduct(id).subscribe(res => {
      this.toastrService.success('Product deleted successfully');
      this.getAllProducts(this.page - 1, this.pageSize);
    });
  }

}
