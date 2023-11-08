import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Relaschool';
  loginForm: boolean = true;
  signupForm: boolean = false;

  showLoginForm(){
    this.loginForm = true;
    this.signupForm = false;
  }

  showSignupForm(){
    this.loginForm = false;
    this.signupForm = true;
  }
}
