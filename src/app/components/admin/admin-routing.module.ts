import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterviewAdminComponent } from '../masterview-admin/masterview-admin.component';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from '../product/product.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', component: MasterviewAdminComponent, children: [
    { path: '', component: HomeComponent},
    { path: 'category', component: CategoryComponent},
    { path: 'product', component: ProductComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
