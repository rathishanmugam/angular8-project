import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductDetailGuard} from './product-detail.guard';
import {ProductDetailComponent} from './product-detail.component';
import {SharedModule} from '../shared/shared.module';
import {ProductEditComponent} from './product-edit.component';
import {ProductEditGuard} from './product-edit.guard';
import {ProductResolver} from './product-resolver.service';
import { ProductChildComponent } from './product-child/product-child.component';
import { ProductChildInfoComponent } from './product-child/product-child-info.component';
import {ProductChildTagsComponent} from './product-child/product-child-tags.component';
import {ProductChildGuard} from './product-child/product-child.guard';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {ProductData} from "./product-data";

@NgModule({
  imports: [
    SharedModule,
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      // {
      //   path: 'products',
      //   children: [
          { path:'', component : ProductComponent},
          {
            path: ':id',
            canActivate: [ProductDetailGuard],
            component: ProductDetailComponent,
            resolve: {resolvedData: ProductResolver}
          },
          {
            path: ':id/edit',
            canDeactivate: [ProductEditGuard],
            component: ProductEditComponent,
            // resolve: { resolvedData: ProductResolver }
          },
          {
            path: ':id/child',
            component: ProductChildComponent,
            canDeactivate: [ProductChildGuard],
            resolve: {resolvedData: ProductResolver},
            children: [
              {path: '', redirectTo: 'info', pathMatch: 'full'},
              {path: 'info', component: ProductChildInfoComponent},
              {path: 'tags', component: ProductChildTagsComponent}
            ]
          }
      //   ]
      // }
        ])
    ],
    declarations: [
  ProductDetailComponent,
      ProductComponent,
      ProductEditComponent,
      ProductChildComponent,
      ProductChildInfoComponent,
      ProductChildTagsComponent
    ]
})

export class ProductModule {

}
