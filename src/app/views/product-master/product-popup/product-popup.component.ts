import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryMasterService } from 'src/app/core/services/category-master.service';
import { ProductMasterService } from 'src/app/core/services/product-master.service';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.scss']
})
export class ProductPopupComponent implements OnInit {

  @Input() data;

  productForm: FormGroup;
  isSubmitted: boolean = false;
  categoryList: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private productMasterService: ProductMasterService,
    private categoryMasterService: CategoryMasterService,
    private toastrService: ToastrService) {
    this.createForm();
    this.getAllCategories();
  }

  createForm(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  getAllCategories() {
    this.categoryMasterService.getCategoryList().subscribe(res => {
      this.categoryList = res.data.categories;
    });
  }

  ngOnInit(): void {
    if (this.data.event === 'Edit') {
      this.productForm.patchValue({
        productName: this.data.content.productName,
        category: this.data.content.category.id
      });
    }
  }

  submit(): void {
    if (this.productForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    this.isSubmitted = false;
    const params = {
      productName: this.productForm.value.productName,
      categoryId: this.productForm.value.category
    }
    if (this.data.event !== 'Edit') {
      this.productMasterService.createProduct(params).subscribe(res => {
        this.toastrService.success('Product created successfully');
        this.activeModal.close();
      }, err => {
        this.toastrService.error('This product already exist or the name is not valid');
      });
    } else {
      this.productMasterService.updateProduct(this.data.content.id, params).subscribe(res => {
        this.toastrService.success('Product updated successfully');
        this.activeModal.close();
      }, err => {
        this.toastrService.error('This product already exist or the name is not valid');
      });
    }
  }

}
