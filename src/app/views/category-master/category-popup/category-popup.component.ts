import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryMasterService } from 'src/app/core/services/category-master.service';

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrls: ['./category-popup.component.scss']
})
export class CategoryPopupComponent implements OnInit {

  @Input() data;

  categoryForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private categoryMasterService: CategoryMasterService,
    private toastrService: ToastrService) {
    this.createForm();
  }

  createForm(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.event === 'Edit') {
      this.categoryForm.patchValue({
        categoryName: this.data.content.categoryName
      });
    }
  }

  submit(): void {
    if (this.categoryForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    this.isSubmitted = false;
    if (this.data.event !== 'Edit') {
      const params = {
        categoryName: this.categoryForm.value.categoryName
      }
      this.categoryMasterService.createCategory(params).subscribe(res => {
        this.toastrService.success('Category created successfully');
        this.activeModal.close();
      }, err => {
        this.toastrService.error('This category already exist or the name is not valid');
      });
    } else {
      const params = {
        categoryName: this.categoryForm.value.categoryName
      }
      this.categoryMasterService.updateCategory(this.data.content.id, params).subscribe(res => {
        this.toastrService.success('Category updated successfully');
        this.activeModal.close();
      }, err => {
        this.toastrService.error('This category already exist or the name is not valid');
      });
    }
  }

}
