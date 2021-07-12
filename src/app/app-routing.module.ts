import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./views/category-master/category-master.module').then(m => m.CategoryMasterModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./views/product-master/product-master.module').then(m => m.ProductMasterModule)
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'categories',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
