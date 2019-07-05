import {Component, OnInit,OnDestroy,ElementRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup,FormArray,Validators,FormControlName} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './product.service';
import {Observable,Subscription} from "rxjs";
import {NumberValidators} from "../shared/number.validator";
import {ProductResolver} from "./product-resolver.service";
import {IProduct,ProductResolved} from "./product";

@Component({
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Edit';
  errorMessage: string;
  productForm: FormGroup;
  product: IProduct;
  private sub: Subscription;

  // // Use with the generic validation message class
  // displayMessage: { [key: string]: string } = {};
  // private validationMessages: { [key: string]: { [key: string]: string } };
  // // private genericValidator: GenericValidator;

  get tags(): FormArray {
    return <FormArray> this.productForm.get('tags');
  }
  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private fb: FormBuilder){}
  ngOnInit(): void {

    // this.route.data.subscribe(data => {
    //   const resolvedData: ProductResolved = data['resolvedData'];
    //   // this.displayProduct(resolvedData.product);
    //   this.errorMessage = resolvedData.error;
    //    this.onProductRetrieved(resolvedData.product);
    // });

    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });

  // this.validationMessages = {
  //   productName: {
  //     required: 'Product name is required.',
  //     minlength: 'Product name must be at least three characters.',
  //     maxlength: 'Product name cannot exceed 50 characters.'
  //   },
  //   productCode: {
  //     required: 'Product code is required.'
  //   },
  //   starRating: {
  //     range: 'Rate the product between 1 (lowest) and 5 (highest).'
  //   }
  // };

  // Read the product Id from the route parameter
  this.sub = this.route.paramMap.subscribe(
    params => {
      const id = +params.get('id');
      this.getProduct(id);
    }
  );
}

  // onProductRetrieved(product: IProduct): void {
  //   this.product = product;
  //   if (!this.product) {
  //     this.pageTitle = 'No product found';
  //   } else {
  //     if (this.product.id === 0) {
  //       this.pageTitle = 'Add Product';
  //     } else {
  //       this.pageTitle = `Edit Product: ${this.product.productName}`;
  //     }
  //   }
  // }


ngOnDestroy(): void {
   this.sub.unsubscribe();
}

// ngAfterViewInit(): void {
//   // Watch for the blur event from any input element on the form.
//   const controlBlurs: Observable<any>[] = this.formInputElements
//   .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
//
// // Merge the blur event observable with the valueChanges observable
// merge(this.productForm.valueChanges, ...controlBlurs).pipe(
//   debounceTime(800)
// ).subscribe(value => {
//   this.displayMessage = this.genericValidator.processMessages(this.productForm);
// });
// }


  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe(
        (product: IProduct) => this.displayProduct(product),
        (error: any) => this.errorMessage = <any> error
      );
  }
  displayProduct(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;
console.log('retreeeee',this.product);
    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }


  saveProduct(): void {
    if (this.productForm.valid ) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.productService.updateProduct(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}
