import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import {ProductService} from "./product.service";
import {IProduct, ProductResolved} from "./product";

@Component({
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  private id: number;
  pageTitle: string = 'Product Detail';
  errorMessage: string;
product : IProduct | undefined;
  constructor(private route: ActivatedRoute,
              private router: Router){
              // private productService: ProductService) {
  }

  ngOnInit(): void {
    const resolvedData:ProductResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
    // console.log(this.route.snapshot.paramMap.get('id'));
    // this.id = +this.route.snapshot.paramMap.get('id');
    // this.getProduct(this.id);
  }

  // getProduct(id: number) {
  //   this.productService.getProduct(id).subscribe(
  //     product => this.product = product,
  //     error => this.errorMessage = <any>error);
  //   console.log('the product :', this.product);
  // }

  onBack() {
    this.router.navigate(['/products']);
  }

  onProductRetrieved(product: IProduct): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
