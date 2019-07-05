import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  <nav class="navbar navbar-expand navbar-light bg-light">
    <a class="navbar-brand">{{title}}</a>
    <ul class="nav nav-pills">
      <li><a class="nav-link" [routerLink]="['/welcome']">Welcome</a> </li>
      <li><a class="nav-link" [routerLink]="['/products']">Product</a> </li>
      <li><a class="nav-link" [routerLink]="['/goods']">Goods</a> </li>
      <li><a class="nav-link" [routerLink]="['/login']">Login</a> </li>

    </ul>
  </nav>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  name = '';
}
