import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/goods.reducer';
import {RouterModule, Routes} from '@angular/router';
import {GoodsComponent} from './containers/goods.component';
import {GoodsListComponent} from './components/goods-list/goods-list.component';
import {GoodsEditComponent} from './components/goods-edit/goods-edit.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {GoodsData} from './goods-data';
import { EffectsModule } from '@ngrx/effects';
import { GoodsEffects } from './state/goods.effects';

@NgModule({
  declarations: [
    GoodsComponent,
    GoodsListComponent,
    GoodsEditComponent
  ],
  imports: [
    SharedModule,
    InMemoryWebApiModule.forRoot(GoodsData),
    RouterModule.forChild([
      { path: 'goods', component: GoodsComponent }
    ]),
    StoreModule.forFeature('goods', reducer),
    EffectsModule.forFeature(
      [ GoodsEffects ]
    ),
  ]
})
export class GoodsModule { }
