import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryMasterService } from 'src/app/core/services/category-master.service';
import { CategoryPopupComponent } from '../category-popup/category-popup.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categoryList: any;

  constructor(
    private modalService: NgbModal,
    private categoryMasterService: CategoryMasterService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryMasterService.getCategoryList().subscribe(res => {
      this.categoryList = res.data.categories;
    });
  }

  openCategoryPopup(event, category) {
    const data = {
      event: event,
      content: category
    }
    const dialogRef = this.modalService.open(CategoryPopupComponent, { centered: true });
    dialogRef.componentInstance.data = data;
    dialogRef.result.then(() => {
      this.getAllCategories();
    }, () => { });
  }

  deleteCategory(id) {
    this.categoryMasterService.deleteCategory(id).subscribe(res => {
      this.toastrService.success('Category deleted successfully');
      this.getAllCategories();
    });
  }

}
