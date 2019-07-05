import { Component, OnInit } from '@angular/core';
import {IProduct} from './product';
import {ProductService} from "./product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  // selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string ;
  filteredProducts: IProduct[];
  errorMessage: string;
  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
console.log('filtered product',this.filteredProducts);
  }
  products: IProduct[] = [];
  constructor(private productService: ProductService,
              private route: ActivatedRoute){
  }
toggleImage(): void{
  this.showImage = !this.showImage;
}
  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

    console.log('iam in');
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }
onRatingClicked(message: string): void {
    this.pageTitle = 'Product List:' + message;
}
performFilter(filterBy: string): IProduct[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product: IProduct) =>
  product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}
}
