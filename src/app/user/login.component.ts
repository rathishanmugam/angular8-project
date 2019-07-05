import {NgForm} from "@angular/forms";
import {Component} from "@angular/core";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor() {}
  pageTitle = 'Login';
  errorMessage: string;
  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userNam;
      const password = loginForm.form.value.password;
    }
  }
}
