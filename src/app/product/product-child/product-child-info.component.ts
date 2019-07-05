import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IProduct } from '../product';

@Component({
  // selector: 'app-product-child-info',
  templateUrl: './product-child-info.component.html',
  styleUrls: ['./product-child-info.component.css']
})
export class ProductChildInfoComponent implements OnInit {

  // @ViewChild(NgForm) productForm: NgForm;

  errorMessage: string;
  product: IProduct;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      // if (this.productForm) {
      //   this.productForm.reset();
      // }

      this.product = data['resolvedData'].product;
    });
  }

}
