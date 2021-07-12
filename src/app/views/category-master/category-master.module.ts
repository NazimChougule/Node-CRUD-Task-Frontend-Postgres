import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryMasterComponent } from './category-master.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  }
]

@NgModule({
  declarations: [CategoryListComponent, CategoryMasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true
    })
  ]
})
export class CategoryMasterModule { }
