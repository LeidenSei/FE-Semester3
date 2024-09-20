
import { EditOptionProductComponent } from './../option-product/edit-option-product/edit-option-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterviewAdminComponent } from '../masterview-admin/masterview-admin.component';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from '../product/product.component';
import { HomeComponent } from '../home/home.component';
import { AddCategoryComponent } from '../category/add-category/add-category.component';
import { EditCategoryComponent } from '../category/edit-category/edit-category.component';
import { AttributeProductComponent } from '../attribute-product/attribute-product.component';
import { AddAttributeProductComponent } from '../attribute-product/add-attribute-product/add-attribute-product.component';
import { EditAttributeProductComponent } from '../attribute-product/edit-attribute-product/edit-attribute-product.component';
import { OptionProductComponent } from '../option-product/option-product.component';
import { AddOptionProductComponent } from '../option-product/add-option-product/add-option-product.component';
import { PostCategoryComponent } from '../post-category/post-category.component';
import { AddPostCategoryComponent } from '../post-category/add-category-post/add-category-post.component';
import { EditPostCategoryComponent } from '../post-category/edit-category-post/edit-category-post.component';

const routes: Routes = [
  { path: '', component: MasterviewAdminComponent, children: [
    { path: '', component: HomeComponent},
    { path: 'category', component: CategoryComponent, children: [
      { path: '', component: AddCategoryComponent},
      { path: 'edit/:id', component: EditCategoryComponent }
    ]},
    { path: 'product', component: ProductComponent},
    { path: 'attribute', component:AttributeProductComponent, children: [
      { path: '', component:AddAttributeProductComponent},
      { path: 'edit/:id', component: EditAttributeProductComponent }
    ]},
    { path: 'option', component:OptionProductComponent, children: [
      { path: '', component:AddOptionProductComponent},
      { path: 'edit/:id', component: EditOptionProductComponent }
    ]},
    { path: 'category-post', component:PostCategoryComponent, children: [
      { path: '', component:AddPostCategoryComponent },
      { path: 'edit/:id', component:EditPostCategoryComponent }
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
